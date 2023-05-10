const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/open-positions/:department', async (req, res) => {
    const department = req.params.department;
    if (!department) {
        return res.status(400).send('Department is required!');
    }

    const url = `https://www.actian.com/company/careers`;
    try {
        const html = await rp(url);
        const $ = cheerio.load(html);
        const openPositions = [];
        const allDepartments = [];

        $('div.lever-jobs-wrapper .job-posting').each((i, element) => {
            // find the department name and push it to an array
            const jobDepartment = $(element).find('.job-heading .department').text();
            allDepartments.push(jobDepartment);

            // check whether the department name matches or not
            if (jobDepartment.toLowerCase() === department.toLowerCase()) {
                // find the open job listing and do iterating by each open job
                $(element).find('.job-content .listing').each((j, joblist) => {
                    // find the job title
                    const jobTitle = $(joblist).find('.job-name').text();

                    // push open job title to ana array
                    openPositions.push(jobTitle);
                });
                // below return statement is helping to exit from the loop because it found the department
                // if we want to continue the itenary for every department then we can comment out the below return statement
                return false;
            }
        });

        if (allDepartments.length === 0 || !allDepartments.includes(department)) {
            return res.status(404).send('No department found!');
        }

        if (openPositions.length > 0) {
            return res.status(200).json(openPositions);
        } else {
            return res.status(404).send(`No open positions found for department "${department}"`);
        }

    } catch (err) {
        return res.status(500).send('An error occurred while fetching the open positions.');
    }
});

// Error Handling Middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            success: (error.status == 200) ? true : false,
            message: error.message
        }
    });
});

app.listen(PORT, () => console.log(`Server is listening on port:: ${PORT}`));
