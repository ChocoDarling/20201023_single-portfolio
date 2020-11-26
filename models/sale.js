const Sequelize = require("sequelize");

module.exports = class Sale extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        count: {
          type: Sequelize.INTEGER(),
          allowNull: false,
        },
        saleCount: {
          type: Sequelize.INTEGER(),
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER(),
          allowNull: false,
        },
        mainImg: {
          type: Sequelize.TEXT,
          defaultValue: null,
        },
        information: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER(),
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Sale",
        tableName: "sales",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Sale.belongsTo(db.User, { foreignKey: "UserId", as: "User" });
    db.Sale.belongsToMany(db.Hashtag, {
      foreignKey: "SaleId",
      as: "Hashtags",
      through: "HashtagsOfSales",
    });
    db.Sale.hasMany(db.Comment, { foreignKey: "SaleId", as: "Comments" });
    db.Sale.hasMany(db.Purchase, { foreignKey: "SaleId", as: "Purchases" });
  }
  static getOp() {
    return Sequelize.Op;
  }
};
