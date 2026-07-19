import express from 'express';
import { body } from 'express-validator';

// CONTROLLER IMPORTS
import { getNotesHandler, getCurrentNote, postNotesHandler, updateNotesHandler, deleteNotesHandler } from '../controllers/controllers.js';

const router = express.Router();

// GET NOTES
router.route('/notes')
.get(getNotesHandler);

router.route('/note/:id')
.get(getCurrentNote);

// INSERT NOTE
router.route('/save') 
.post(body('note').notEmpty().withMessage('note text required').escape(),
body('title').notEmpty().withMessage('title required').escape(), postNotesHandler);

// UPDATE NOTE
router.route('/update/:id')
.patch(body('note').notEmpty().withMessage('note text required').escape(),
body('title').notEmpty().withMessage('title required').escape(),
updateNotesHandler);

// DELETE NOTE 
router.route('/delete/:id')
.delete(deleteNotesHandler);

export default router;