const rp = require('request-promise');
const config = require('../config');
const utility = require('../../utility');
const error = new Error();
module.exports = {
    async getDepartmentDetails(req, res, next) {
        try {
            let { department } = req.query;
            if (!department) {
                error.statusCode = 400;
                error.message = 'Department is required!';
                return next(error);
            }
            department = department.trim();

            const html = await rp(config.ACTIAN_URL);

            const results = await utility.getOpenPositions(html, department);

            if (results.allDepartments.length === 0 || !results.allDepartments.includes(department)) {
                error.statusCode = 404;
                error.message = 'No department found!';
                return next(error);
            }

            if (results.openPositions.length > 0) {
                return res.status(200).json({ result: results.openPositions });
            } else {
                error.statusCode = 404;
                error.message = `No open positions found for department "${department}"`;
                return next(error);
            }
        } catch (err) {
            next(err);
        }
    }
};
