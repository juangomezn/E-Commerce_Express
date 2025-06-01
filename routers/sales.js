import express from 'express';

const salesRouter = express.Router();

salesRouter.get('/',( req, res ) => res.send('All sales'));

salesRouter.get('/:id',
    ( req, res ) => res.send(`Sale With ID: ${req.params.id}`)
);

salesRouter.post('/:id',
    ( req, res ) => res.send(`Creating a Sale with ID ${req.params.id}`));

salesRouter.patch('/:id',
    ( req, res ) => res.send(`Updating Sale with ID${req.params.id}`));

salesRouter.delete('/:id',( req, res ) => res.send(`Deleting a Sale with ID ${req.params.id}`));

export default salesRouter;