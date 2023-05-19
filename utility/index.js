const cheerio = require('cheerio');

exports.getOpenPositions = (html, department) => {
    const $ = cheerio.load(html);
    const results = {};
    const openPositions = [];
    const allDepartments = [];

    $('div.lever-jobs-wrapper .job-posting').each((i, element) => {
        const jobDepartment = $(element).find('.job-heading .department').text();
        allDepartments.push(jobDepartment);

        if (jobDepartment.toLowerCase() === department.toLowerCase()) {
            $(element).find('.job-content .listing').each((j, joblist) => {
                const jobTitle = $(joblist).find('.job-name').text();
                openPositions.push(jobTitle);
            });
            return false; // Exit the loop if department is found
        }
    });

    results.allDepartments = allDepartments;
    results.openPositions = openPositions;
    return results;
};
