const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const User = require('./user');
const Comment = require('./comment');
const Sale = require('./sale');
const Purchase = require('./purchase');
const Hashtag = require('./hashtag');
const db = {};

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

db.sequelize = sequelize;
db.User = User;
db.Comment = Comment;
db.Sale = Sale;
db.Purchase = Purchase;
db.Hashtag = Hashtag;
User.init(sequelize);
Comment.init(sequelize);
Sale.init(sequelize);
Purchase.init(sequelize);
Hashtag.init(sequelize);
User.associate(db);
Comment.associate(db);
Sale.associate(db);
Purchase.associate(db);
Hashtag.associate(db);

module.exports = db;
