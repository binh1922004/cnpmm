'use strict';

import Sequelize from 'sequelize'; // Import toàn bộ Sequelize

export default (sequelize, DataTypes) => {
    class User extends Sequelize.Model { // Kế thừa từ Sequelize.Model
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // định nghĩa mối quan hệ
        }
    }

    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        image: DataTypes.STRING,
        roleId: DataTypes.STRING,
        positionId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};