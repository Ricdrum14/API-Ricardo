    import express, { Router } from 'express';
    import * as pollution from '../controllers/pollution.controllers';

    const router: Router = express.Router();

    router.get("/", pollution.getAll); // Retrieve all pollution entries
    router.get("/:id", pollution.getOne); // Retrieve a single pollution entry by id
    router.post("/", pollution.create); // Create a new pollution entry
    router.put("/:id", pollution.update); // Update a pollution entry by id
    router.delete("/:id", pollution.remove); // Delete a pollution entry by id

    export default (app: express.Application): void => {
        app.use('/api/pollutions', router); // Prefix all routes with /api/pollution
    };