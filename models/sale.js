const Sequelize = require('sequelize');

module.exports = class Sale extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name : {
                type : Sequelize.STRING(40),
                allowNull : false,
            },
            count : {
                type : Sequelize.STRING(100),
                allowNull : false,
            },
            price : {
                type : Sequelize.STRING(100),
                allowNull : false,
            },
            information : {
                type : Sequelize.STRING(100),
                allowNull : false,
            },
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Sale',
            tableName : 'sales',
            paranoid : true,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Sale.belongsTo(db.User);
        // db.Sale.belongsTo(db.Purchase);
        db.Sale.hasMany(db.Comment, { as : 'Comments' });
        db.Sale.belongsTo(db.Purchase, {
            foreignKey : 'SaleId',
            as : 'Purchases',
            through : 'Trade',
        });
        // db.Sale.belongsTo(db.User);
    }
};