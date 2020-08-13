// authors: Bermond, Lindsey
// Constant values for the NYT API. Set up as const to avoid misspellings in the future
const nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const apiKey = '8fmnuqCO1OZMG1AntdaaGGBE5Agaw2Jn';
const apiKeyName = 'api-key';
const queryName = 'q';
// searches the NYT API Database for a certain query
// @query is a serch term like 'election' or 'bitcoin'
function search(query) {
    const data = {};
    data[queryName] = query;
    data[apiKeyName] = apiKey;
    $.get(nytURL, data).then(function (response) {
        // TODO: Do something with response
        console.log(response);
    });
}
$(document).ready(function () {
    // HTML Elements
    const $search = $('<#search>');
    const $numberOfRecords = $('<#"numberOfRecords>');
    const $startYear = $('<#startYear>');
    const $endYear = $('<#endYear>');
    // TODO: On Click Events
});