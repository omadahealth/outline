// @flow
import Sequelize from 'sequelize';
import EncryptedField from 'sequelize-encrypted';
import debug from 'debug';

export const encryptedFields = EncryptedField(
  Sequelize,
  process.env.SECRET_KEY
);

export const DataTypes = Sequelize;
export const Op = Sequelize.Op;

console.log('AHHHHHHHHHHH');

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: debug('sql'),
  typeValidation: true,
});
