const Sequelize = require('sequelize');

module.exports = class Purchase extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            count : {
                type : Sequelize.STRING(100),
                allowNull : false,
            },
            price : {
                type : Sequelize.STRING(100),
                allowNull : false,
            },
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Purchase',
            tableName : 'purchases',
            paranoid : true,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Purchase.belongsTo(db.User);
        // db.Purchase.hasOne(db.Sale, { as : 'Sale' });
        db.Purchase.belongsToMany(db.Sale, {
            foreignKey : 'PurchaseId',
            as : 'Sale',
            through : 'Trade',
        });
        // db.Sale.belongsTo(db.User);
    }
};