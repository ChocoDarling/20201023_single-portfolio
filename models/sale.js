const Sequelize = require('sequelize');

module.exports = class Sale extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name : {
                type : Sequelize.STRING(40),
                allowNull : false,
            },
            count : {
                type : Sequelize.INTEGER(),
                allowNull : false,
            },
            saleCount : {
                type : Sequelize.INTEGER(),
                allowNull : false,
                defaultValue : 0,
            },
            price : {
                type : Sequelize.INTEGER(),
                allowNull : false,
            },
            information : {
                type : Sequelize.TEXT,
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
        db.Sale.belongsTo(db.User, { foreignKey : 'UserId', as : 'User' });
        db.Sale.belongsToMany(db.Hashtag, { 
            foreignKey : 'SaleId',
            as : 'Hashtags',
            through : 'HashtagsOfSales',
        });
        db.Sale.hasMany(db.Comment, { foreignKey : 'SaleId', as : 'Comments' });
        db.Sale.hasMany(db.Purchase, { foreignKey : 'SaleId', as : 'Purchases', });
    }
};