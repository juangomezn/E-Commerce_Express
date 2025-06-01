import express from 'express';

const payment_methodsRouter = express.Router();

payment_methodsRouter.get('/',( req, res ) => res.send('All Payment Methods'));

payment_methodsRouter.get('/:id',
    ( req, res ) => res.send(`Payment Methods With ID: ${req.params.id}`)
);

payment_methodsRouter.post('/:id',
    ( req, res ) => res.send(`Creating a Payment Methods with ID ${req.params.id}`));

payment_methodsRouter.patch('/:id',
    ( req, res ) => res.send(`Updating Payment Methods with ID${req.params.id}`));

payment_methodsRouter.delete('/:id',( req, res ) => res.send(`Deleting a Payment Methods with ID ${req.params.id}`));

export default payment_methodsRouter;