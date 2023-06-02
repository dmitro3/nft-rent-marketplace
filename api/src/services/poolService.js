const SxTApi = require('./sxtApi');

class PoolService {
  static async getAll({ accessToken }) {
    const resourceId = "TREXXGG.POOLS"
    const sqlText = `SELECT * FROM TREXXGG.POOLS INNER JOIN TREXXGG.CATEGORIES ON TREXXGG.POOLS.CATEGORYID = TREXXGG.CATEGORIES.ID;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getById({ accessToken, id }) {
    const resourceId = "TREXXGG.POOLS"
    const sqlText = `SELECT * FROM TREXXGG.POOLS INNER JOIN TREXXGG.CATEGORIES ON TREXXGG.POOLS.CATEGORYID = TREXXGG.CATEGORIES.ID WHERE TREXXGG.POOLS.ID = ${id};`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response[0];
  }

}

module.exports = PoolService;