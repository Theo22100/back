const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription user
const register = async (req, res) => {
  try {
    const { name, firstname, mail, password } = req.body;

    // Vérif si user existe déjà
    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
    }

    // Hasher mdp
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, firstname, mail, password: hashedPassword });

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Connexion user
const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // Vérif si user exist
    const user = await User.findOne({ where: { mail } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Comparer mdp
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Générer jeton JWT
    const token = jwt.sign({ id: user.id, mail: user.mail }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer liste users
const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, firstname, mail } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    user.name = name || user.name;
    user.firstname = firstname || user.firstname;
    user.mail = mail || user.mail;
    await user.save();

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  listUsers,
  updateUser,
  deleteUser,
};
