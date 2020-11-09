const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email : {
                type : Sequelize.STRING(40),
                allowNull : true,
                unique : true,
            },
            password : {
                type : Sequelize.STRING(100),
                allowNull : true,
            },
            nick : {
                type : Sequelize.STRING(15),
                allowNull : false,
                unique : true,
            },
            name : {
                type : Sequelize.STRING(15),
                allowNull : true,
            },
            phoneNumber : {
                type : Sequelize.STRING(15),
                allowNull : true,
            },
            score : {
                type : Sequelize.INTEGER(3),
                allowNull : false,
                defaultValue : 0,
            },
            provider : {
                type : Sequelize.STRING(10),
                allowNull : false,
                defaultValue : 'local',
            },
            snsId : {
                type : Sequelize.STRING(30),
                allowNull : true,
            },
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'User',
            tableName : 'users',
            paranoid : true,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasMany(db.Sale, { foreignKey : 'UserId', as : 'Sales' });
        db.User.hasMany(db.Comment, { foreignKey : 'UserId', as : 'Comments', });
        db.User.hasMany(db.Purchase, { foreignKey : 'UserId', as : 'Purchases' });
    }
};