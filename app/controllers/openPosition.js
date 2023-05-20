const rp = require('request-promise');
const config = require('../config');
const utility = require('../../utility');

module.exports = {
    async getDepartmentDetails(req, res, next) {
        try {
            let { department } = req.query;
            if (!department) {
                return res.status(400).send('Department is required!');
            }
            department = department.trim();

            const html = await rp(config.ACTIAN_URL);

            const results = await utility.getOpenPositions(html, department);

            if (results.allDepartments.length === 0 || !results.allDepartments.includes(department)) {
                return res.status(404).send('No department found!');
            }

            if (results.openPositions.length > 0) {
                return res.status(200).json(results.openPositions);
            } else {
                return res.status(404).send(`No open positions found for department "${department}"`);
            }
        } catch (err) {
            next(err);
        }
    }
};
