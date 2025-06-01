import express from 'express';

const citiesRouter = express.Router();

citiesRouter.get('/',( req, res ) => res.send('All cities'));

citiesRouter.get('/:id',
    ( req, res ) => res.send(`City With ID: ${req.params.id}`)
);

citiesRouter.post('/:id',
    ( req, res ) => res.send(`Creating a City with ID ${req.params.id}`));

citiesRouter.patch('/:id',
    ( req, res ) => res.send(`Updating City with ID${req.params.id}`));

citiesRouter.delete('/:id',( req, res ) => res.send(`Deleting a City with ID ${req.params.id}`));

export default citiesRouter;