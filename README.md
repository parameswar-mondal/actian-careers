# Actian Careers - Your Take-Home API Project Challenge!
Your task is to create a simple Node.js RESTful application with only one endpoint that 
makes an API call to Actian Careers and request an HTML page, and parse through the HTML 
to retrieve list of titles of open positions for a department.
The application endpoint should work for every department section under Open Positions
from https://www.actian.com/company/careers link. 
The http response content must contain a list of titles of open positions for a department 
with appropriate http status code.

## Used tools and technologies
- Node.js (v18.15.0)
- Express.js (v4.18.2)
- OpenAPI/Swagger for open api documentation
- mocha and chai for test cases
- Istanbul, nyc (istanbul's successor) for code coverage report

## Used PORT
Express Server running Port: ```3000```

## How to install dependencies in the express server?
`npm install`

## How to run the express server?
`npm start`


## Endpoint URL
`http://localhost:3000/api/open-positions?department=Engineering`


## Postman Endpoints

### Get the list of open positions for a depertment
```
Method: GET
Endpoint: /api/open-positions?department={department}
Host: http://localhost:3000
URL: http://localhost:3000/api/open-positions?department={department}
```

## Postman Success Request:
![success message](./success.png)

## Postman Failed Request:
![fail message](./fail.png)

## OpenAPI/Swagger URL
`http://localhost:3000/api-docs`

![open api](./swagger.png)

## Integration Tests
Within the `tests` directory, we wrote the test cases for this application. Below are the scenarios:

- Implemented one positive test case.
- Implemented three negative test cases.
### How to run the integration testing?
`npm run test`

![integration test](./integration-test.png)

## Code Coverage Report
The coverage report will include information on the percentage of code covered, highlighting which lines were executed during the tests and which lines were not.

### How to run the code coverage report?
`npm run coverage`

![code coverage](./codecoderage.png)

### How the code coverage report looks like in the html web page:
A new `coverage` directory will automatically be created inside of this application once the `npm run coverage` command has been executed.
The `index.html` page is located in the `coverage` directory, and when you open it, the browser will provide a report on the code coverage. Please check below; it will look like this: 

![code coverage](./coverageReport.png)
