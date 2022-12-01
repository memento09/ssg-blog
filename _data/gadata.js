'use strict';

// Setting the aplication Credentials.
require('dotenv').config();

const metadata = require("./metadata.json");
const propertyId = metadata.googlePropertyId;

// Imports the Google Analytics Data API client library.
const {BetaAnalyticsDataClient} = require('@google-analytics/data');

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
module.exports = async function () {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "2022-11-27",
        endDate: "today",
      },
    ],
    metrics: [
      {
        name: "eventCount",
      },
    ],
    dimensions: [
      {
        name: "eventName",
      },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: {
          values: [
            "https://omeme-no-me.com/posts/20221116/"
          ]
        },
      },
    },
    limit: 1,
  });

  // console.log('Report result:');
  response.rows.forEach(row => {
    // console.log(`${propertyId}, ${row.metricValues[0].value}`);
    return row.metricValues[0].value;
  });
};