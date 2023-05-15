const Pool = require('D:/system_mon/db')
const queries = require('D:/system_mon/api/queries');

const getOrg = (req, res) => {
    Pool.query(queries.getOrg, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getOrg,
};