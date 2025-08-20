// configdb.js (ESM)
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('node_fulltask', 'root', '10040109', {
  host: '127.0.0.1',      // thử '127.0.0.1' nếu localhost không kết nối
  dialect: 'mysql',
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
