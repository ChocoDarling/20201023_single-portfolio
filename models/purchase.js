const Sequelize = require("sequelize");

module.exports = class Purchase extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        mainImg: {
          type: Sequelize.TEXT,
          defaultValue: null,
        },
        userName: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        saleCount: {
          type: Sequelize.INTEGER(),
          allowNull: false,
        },
        price: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        CommentId: {
          type: Sequelize.INTEGER(),
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Purchase",
        tableName: "purchases",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Purchase.belongsTo(db.User, { foreignKey: "UserId", as: "User" });
    db.Purchase.belongsTo(db.Sale, { foreignKey: "SaleId", as: "Sale" });
  }
};
