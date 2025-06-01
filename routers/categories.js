import express from 'express';

const categoriesRouter = express.Router();

categoriesRouter.get('/',( req, res ) => res.send('All categories'));

categoriesRouter.get('/:id',
    ( req, res ) => res.send(`Categorie With ID: ${req.params.id}`)
);

categoriesRouter.post('/:id',
    ( req, res ) => res.send(`Creating a Categorie with ID ${req.params.id}`));

categoriesRouter.patch('/:id',
    ( req, res ) => res.send(`Updating Categorie with ID${req.params.id}`));

categoriesRouter.delete('/:id',( req, res ) => res.send(`Deleting a Categorie with ID ${req.params.id}`));

export default categoriesRouter;