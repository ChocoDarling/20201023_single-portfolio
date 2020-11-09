const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userName : {
                type : Sequelize.STRING(100),
                allowNull : false,
            },
            content : {
                type : Sequelize.STRING(),
                allowNull : false,
            },
            score : {
                type : Sequelize.INTEGER(1),
                allowNull : false,
            },
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Comment',
            tableName : 'comments',
            paranoid : false,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey : 'UserId', as : 'User' });
        db.Comment.belongsTo(db.Sale, { foreignKey : 'SaleId', as : 'Sale' });
    }
};