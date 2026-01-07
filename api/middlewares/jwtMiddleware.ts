// middlewares/jwtMiddleware.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Clé secrète pour signer/vérifier les tokens (à remplacer par une variable d'environnement en prod)
const JWT_SECRET: string = process.env.JWT_SECRET || 'ta_cle_secrete_ici';

// Étendre le type Request pour inclure user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Récupère le token du header Authorization (format: "Bearer <token>")
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token manquant ou invalide' });
    return;
  }

  const token = authHeader.substring(7); // Enlève "Bearer "

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Ajoute les infos utilisateur à la requête (ex: userId)
    next(); // Passe au prochain middleware/route
  } catch (error) {
    res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};

export default jwtMiddleware;
