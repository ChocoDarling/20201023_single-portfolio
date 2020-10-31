const Sequelize = require('sequelize');

module.exports = class Img extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            url : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true,
            },
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Img',
            tableName : 'imgs',
            paranoid : false,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        // db.Hashtag.belongsToMany(db.Post, {
        //     through : 'PostHashtag'
        // });
    }
}