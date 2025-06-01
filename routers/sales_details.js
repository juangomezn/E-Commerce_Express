import express from 'express';

const sales_detailsRouter = express.Router();

sales_detailsRouter.get('/',( req, res ) => res.send('All sales_details'));

sales_detailsRouter.get('/:id',
    ( req, res ) => res.send(`Sale Detail With ID: ${req.params.id}`)
);

sales_detailsRouter.post('/:id',
    ( req, res ) => res.send(`Creating a Sale Detail with ID ${req.params.id}`));

sales_detailsRouter.patch('/:id',
    ( req, res ) => res.send(`Updating Sale Detail with ID${req.params.id}`));

sales_detailsRouter.delete('/:id',( req, res ) => res.send(`Deleting a Sale Detail with ID ${req.params.id}`));

export default sales_detailsRouter;