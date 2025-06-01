import express from 'express';

const productsRouter = express.Router();

productsRouter.get('/',( req, res ) => res.send('All products'));

productsRouter.get('/:id',
    ( req, res ) => res.send(`Product With ID: ${req.params.id}`)
);

productsRouter.post('/:id',
    ( req, res ) => res.send(`Creating a Product with ID ${req.params.id}`));

productsRouter.patch('/:id',
    ( req, res ) => res.send(`Updating Product with ID${req.params.id}`));

productsRouter.delete('/:id',( req, res ) => res.send(`Deleting a Product with ID ${req.params.id}`));

export default productsRouter;