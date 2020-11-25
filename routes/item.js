const router = require("express").Router();
const Op = require("sequelize").Op;
const { Sale, Hashtag, Purchase, sequelize } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const query = req.query;
    if (query.where) {
      const tempArr = query.where;
      query.where = {};
      query.where[tempArr[0]] = tempArr[1];
    } else {
      query.where = {
        saleCount: {
          [Op.notLike]: "0",
        },
      };
    }
    if (query.whatItems) {
      if (query.whatItems === "new") {
        query.order = [[sequelize.col("id"), "DESC"]];
      }
      if (query.whatItems === "popular") {
        query.order = [[sequelize.col("score"), "DESC"]];
      }
      query.whatItems = "";
    }
    if (query.limit) query.limit = parseInt(query.limit);
    let Sales = await Sale.findAll(query);
    res.send(Sales);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const query = req.query;
    if (query.where) {
      const tempArr = query.where;
      query.where = {};
      query.where[tempArr[0]] = tempArr[1];
    } else {
      query.where = {
        saleCount: {
          [Op.notLike]: "0",
        },
      };
    }
    if (query.whatItems) {
      if (query.whatItems === "new") {
        query.order = [[sequelize.col("id"), "DESC"]];
      }
      if (query.whatItems === "popular") {
        query.order = [[sequelize.col("score"), "DESC"]];
      }
      query.whatItems = "";
    }
    if (query.limit) query.limit = parseInt(query.limit);
    let Sales = await Sale.findAll(query);
    res.send(Sales);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
