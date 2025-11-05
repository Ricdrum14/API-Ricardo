import { Request, Response } from 'express';
import db from '../models';
import { PollutionAttributes } from '../models/pollution.model';

const Pollution = db.pollution;

interface PollutionQuery {
    typePollution?: string;
}

type CreatePollutionBody = Partial<Omit<PollutionAttributes, 'id'>> & {
    titre: string;  // Only titre is required
};

// Get all pollution records, optionally filtered by typePollution
export const getAll = async (req: Request<{}, {}, {}, PollutionQuery>, res: Response) => {
    try {
        const type = req.query.typePollution;
        const condition = type ? { typePollution: type } : undefined;

        const data = await Pollution.findAll({ where: condition });
        res.status(200).json(data);
    } catch (err) {
        console.error("Erreur lors de la récupération des pollutions :", err);
        res.status(500).json({
            message: err instanceof Error 
                ? err.message 
                : "Une erreur est survenue lors de la récupération des pollutions."
        });
    }
};


// Get a single pollution record by ID
export const getOne = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = req.params.id;
        const data = await Pollution.findByPk(id);

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `Pollution with id=${id} not found.` });
        }
    } catch (err) {
        console.error("Erreur lors de la récupération de la pollution :", err);
        res.status(500).json({
            message: err instanceof Error 
                ? err.message 
                : "Une erreur est survenue lors de la récupération de la pollution."
        });
    }
};

// Create a new pollution record
export const create = async (req: Request<{}, {}, CreatePollutionBody>, res: Response) => {
    try {
        // Validate request
        if (!req.body.titre) {
            res.status(400).json({
                message: "Le titre ne peut pas être vide!"
            });
            return;
        }

        // Create a Pollution instance
        const pollutionData: CreatePollutionBody = {
            titre: req.body.titre,
            lieu: req.body.lieu,
            date_observation: req.body.date_observation,
            type_pollution: req.body.type_pollution,
            description: req.body.description,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            photo_url: req.body.photo_url
        };

        const pollution = await Pollution.create(pollutionData);
        
        res.status(201).json(pollution);
    } catch (err) {
        console.error("Erreur lors de la création de la pollution :", err);
        res.status(500).json({
            message: err instanceof Error 
                ? err.message 
                : "Une erreur est survenue lors de la création de la pollution."
        });
    }
};

// Update a pollution record by ID
export const update = async (req: Request<{ id: string }, {}, Partial<CreatePollutionBody>>, res: Response) => {
    try {
        const id = req.params.id;

        // Validate if there's data to update
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                message: "Les données pour la mise à jour ne peuvent pas être vides!"
            });
            return;
        }

        const num = await Pollution.update(req.body, {
            where: { id }
        });

        if (num[0] === 1) {
            const updatedPollution = await Pollution.findByPk(id);
            res.status(200).json({
                message: "La pollution a été mise à jour avec succès.",
                data: updatedPollution
            });
        } else {
            res.status(404).json({
                message: `Impossible de mettre à jour la pollution avec id=${id}. La pollution n'a peut-être pas été trouvée.`
            });
        }
    } catch (err) {
        console.error("Erreur lors de la mise à jour de la pollution :", err);
        res.status(500).json({
            message: err instanceof Error 
                ? err.message 
                : "Une erreur est survenue lors de la mise à jour de la pollution."
        });
    }
};

// Delete a pollution record by ID
export const remove = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = req.params.id;
        const num = await Pollution.destroy({
            where: { id }
        });

        if (num === 1) {
            res.status(200).json({
                message: "La pollution a été supprimée avec succès."
            });
        } else {
            res.status(404).json({
                message: `Impossible de supprimer la pollution avec id=${id}. La pollution n'a peut-être pas été trouvée.`
            });
        }
    } catch (err) {
        console.error("Erreur lors de la suppression de la pollution :", err);
        res.status(500).json({
            message: err instanceof Error 
                ? err.message 
                : "Une erreur est survenue lors de la suppression de la pollution."
        });
    }
};
