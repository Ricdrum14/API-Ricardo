// const { v4: uuidv4 } = require ("uuid");

const db = require("../models");
const Pollution = db.pollution;


exports.getAll = async (req, res) => {
    try{
        const type = req.query.typePollution
        const condition = type ? { typePollution: type } : undefined;

        const data = await Pollution.findAll({ where: condition });

        res.status(200).json(data);
     
    }catch(err){
            console.error("Erreur lors de la récupération des pollutions :", err);
        res.status(500).json({
        message:
        err.message ||
        "Une erreur est survenue lors de la récupération des pollutions.",
        });
    }
};


exports.getOne = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Pollution.findByPk(id);

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `Pollution with id=${id} not found.` });
        }
    }catch(err){
            console.error("Erreur lors de la récupération de la pollution :", err);
        res.status(500).json({
        message:
        err.message ||
        "Une erreur est survenue lors de la récupération de la pollution.",
        });
    }   
}

