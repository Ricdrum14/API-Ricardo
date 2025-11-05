import { Sequelize } from 'sequelize';
import config from '../config';
import initPollutionModel from './pollution.model';

const sequelize = new Sequelize(
  `postgres://${config.BDD.user}:${config.BDD.password}@${config.BDD.host}/${config.BDD.bdname}`,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      timestamps: false
    }
  }
);

interface Database {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  pollution: ReturnType<typeof initPollutionModel>;
}

const db: Database = {
  Sequelize,
  sequelize,
  pollution: initPollutionModel(sequelize)
};

export default db;