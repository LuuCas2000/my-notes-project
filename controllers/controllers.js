import { StatusCodes } from 'http-status-codes';
import { validationResult, matchedData } from 'express-validator';

// IMPORTS
import { connection } from '../database/database.js';

export const getNotesHandler = async (req, res) => {
   const results = await connection.query('SELECT * FROM mynotes');
   console.log(results);
  
   res.status(StatusCodes.OK).json({
    msg: 'OK',
    notes: results[0]
   });
};

export const getCurrentNote = async (req, res) => {
   const result = await connection.query('SELECT * FROM mynotes WHERE note_id=?', [req.params.id]);
   res.setHeader('Content-Type', 'application/json; charset=utf-8')
   res.status(StatusCodes.OK).json({
      msg: 'OK',
      note: result
   });
};

export const postNotesHandler = async (req, res) => {
   const result = validationResult(req);

   if (!result.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: result.array() });
   }

   // SANITIZED INPUT DATA
   const securNote = req.body.note;
   const securTitle = req.body.title;

   await connection.query('INSERT INTO mynotes(note, title) VALUES(?, ?)', [securNote, securTitle]);
   res.status(StatusCodes.CREATED).json({ msg: 'note successfully created' });
};

export const updateNotesHandler = async (req, res) => {
   const result = validationResult(req);

   if (!result.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: result.array() });
   }

   // SANITIZED INPUT DATA
   const securEditNote = req.body.note;
   const securTitle = req.body.title;

   console.log(req.body)
   console.log(req.params.id)

   const updated = {}

   if (securEditNote !== undefined) { // IF THE USER EDIT THE NOTE DATA
      updated.note = securEditNote;
   };

   if (securTitle !== undefined) { // IF THE USER EDIT THE NOTE DATA
      updated.title = securTitle;
   };

   // IF THE USER WANTS TO EDIT BOTH NOTE AND TITLE, THEY WILL BE INSERTED IN THE "UPDATED" OBJECT

   await connection.query('UPDATE mynotes SET ? WHERE note_id=?', [updated, req.params.id]);
   res.status(StatusCodes.OK).json({ msg: 'note successfully edited' });
};

export const deleteNotesHandler = async (req, res) => {
   await connection.query('DELETE FROM mynotes WHERE note_id=?', [req.params.id]);
   res.status(StatusCodes.OK).json({ msg: 'note successfully deleted' });
};
