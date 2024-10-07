const Book = require('../models/Book');

// Obtenir tous les livres
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ajouter livre
const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = await Book.create({ title, author, status: 'available' });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier livre
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }

    book.title = title;
    book.author = author;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un livre
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }

    await book.destroy();
    res.json({ message: 'Livre supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};
