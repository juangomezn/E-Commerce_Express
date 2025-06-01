import express from 'express';

const countriesRouter = express.Router();

countriesRouter.get('/',( req, res ) => res.send('All countries'));

countriesRouter.get('/:id',
    ( req, res ) => res.send(`Country With ID: ${req.params.id}`)
);

countriesRouter.post('/:id',
    ( req, res ) => res.send(`Creating a Country with ID ${req.params.id}`));

countriesRouter.patch('/:id',
    ( req, res ) => res.send(`Updating Country with ID${req.params.id}`));

countriesRouter.delete('/:id',( req, res ) => res.send(`Deleting a Country with ID ${req.params.id}`));

export default countriesRouter;