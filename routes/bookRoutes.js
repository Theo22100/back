const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Obtenir tous les livres
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Liste de tous les livres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Ajouter un nouveau livre
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 description: Le titre du livre
 *                 example: "Les Misérables"
 *               author:
 *                 type: string
 *                 description: L'auteur du livre
 *                 example: "Victor Hugo"
 *     responses:
 *       201:
 *         description: Livre ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 status:
 *                   type: string
 *       500:
 *         description: Erreur de serveur
 */
router.post('/', bookController.addBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Modifier un livre
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livre mis à jour avec succès
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.put('/:id', bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Supprimer un livre
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du livre à supprimer
 *     responses:
 *       200:
 *         description: Livre supprimé avec succès
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
