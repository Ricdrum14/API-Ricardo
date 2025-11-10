import { Application } from 'express';
import pollutionRoutes from './pollution.routes';
import utilisateurRoutes from './utilisateur.routes';
import authRoutes from './auth.routes';

export default (app: Application): void => {
    pollutionRoutes(app);
    utilisateurRoutes(app);
    app.use('/api/auth', authRoutes);
};