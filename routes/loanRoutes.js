const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

/**
 * @swagger
 * /api/loans:
 *   get:
 *     summary: Liste des emprunts
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: Liste des emprunts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   loan_date:
 *                     type: string
 *                     format: date-time
 *                   return_date:
 *                     type: string
 *                     format: date-time
 *                   User:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       firstname:
 *                         type: string
 *                       mail:
 *                         type: string
 *                   Book:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       status:
 *                         type: string
 */
router.get('/', loanController.listLoans);

/**
 * @swagger
 * /api/loans/{id}:
 *   get:
 *     summary: Obtenir les informations d'un emprunt
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'emprunt
 *     responses:
 *       200:
 *         description: Informations de l'emprunt
 *       404:
 *         description: Emprunt non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.get('/:id', loanController.getLoan);

/**
 * @swagger
 * /api/loans:
 *   post:
 *     summary: Ajouter un nouvel emprunt
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID de l'utilisateur qui emprunte le livre
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 description: ID du livre à emprunter
 *                 example: 1
 *     responses:
 *       201:
 *         description: Emprunt créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 loan:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     bookId:
 *                       type: integer
 *                     loan_date:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Livre déjà emprunté ou autre erreur de validation
 *       404:
 *         description: Utilisateur ou livre non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.post('/', loanController.addLoan);


/**
 * @swagger
 * /api/loans/{id}:
 *   put:
 *     summary: Modifier un emprunt
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'emprunt à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               return_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Emprunt mis à jour
 *       404:
 *         description: Emprunt non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.put('/:id', loanController.updateLoan);

/**
 * @swagger
 * /api/loans/{id}:
 *   delete:
 *     summary: Supprimer un emprunt
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'emprunt à supprimer
 *     responses:
 *       200:
 *         description: Emprunt supprimé
 *       404:
 *         description: Emprunt non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
