import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

export interface PollutionAttributes {
  id?: number;  // Make id optional
  titre: string;
  lieu?: string;
  date_observation?: Date;
  type_pollution?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  photo_url?: string;
}

interface PollutionModel extends Model<PollutionAttributes>, PollutionAttributes {}

export default function (sequelize: Sequelize): ModelStatic<PollutionModel> {
  const Pollution = sequelize.define<PollutionModel>("pollution", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lieu: {
      type: DataTypes.STRING
    },
    date_observation: {
      type: DataTypes.DATE
    },
    type_pollution: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    latitude: {
      // stocke les coordonnées GPS avec 6 décimales
      type: DataTypes.DECIMAL(9,6)
    },
    longitude: {
      type: DataTypes.DECIMAL(9,6)
    },
    photo_url: {
      type: DataTypes.STRING
    }
  });

  return Pollution;
};