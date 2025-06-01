import express from 'express';

const usersRouter = express.Router();

usersRouter.get('/',( req, res ) => res.send('All users'));

usersRouter.get('/:id',
    ( req, res ) => res.send(`User With ID: ${req.params.id}`)
);

usersRouter.post('/:id',
    ( req, res ) => res.send(`Creating a User with ID ${req.params.id}`));

usersRouter.patch('/:id',
    ( req, res ) => res.send(`Updating User with ID${req.params.id}`));

usersRouter.delete('/:id',( req, res ) => res.send(`Deleting a User with ID ${req.params.id}`));

export default usersRouter;