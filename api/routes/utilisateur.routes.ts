import express, { Router } from 'express';
import * as utilisateur from '../controllers/utilisateur.controllers';

const router: Router = express.Router();

router.get('/', utilisateur.getAll);
router.get('/:id', utilisateur.getOne);
router.post('/', utilisateur.create);
router.put('/:id', utilisateur.update);
router.delete('/:id', utilisateur.remove);

export default (app: express.Application): void => {
  app.use('/api/utilisateurs', router);
};
