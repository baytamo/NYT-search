// author: Bermond, Lindsey
$(document).ready(function () {

const nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const apiKey = "8fmnuqCO1OZMG1AntdaaGGBE5Agaw2Jn";
const apiKeyName = "api-key";
const queryName = "q";
const beginDate = "begin_date";
const endDate = "end_date";
let numberAlert = $("#numberAlert");
let yearAlert = $("#yearAlert");
let searchForm = $("form");
// searches the NYT API Database for a certain query
// @query is a serch term like 'election' or 'bitcoin'


  function search(query, filter) {
    const data = {};
    const $startYear = $("#startYear").val();
    const $endYear = $("#endYear").val();
    data[queryName] = query;
    data[apiKeyName] = apiKey;

    if ($startYear) {
      data[beginDate] = $startYear + "0101";
    }

    if ($endYear) {
      data[endDate] = $endYear + "1231";
    }

    if (parseInt($startYear) > parseInt($endYear)) {
      yearAlert.text("Start year must be before end year");
    }
    const $numberOfRecords = parseInt($("#numberOfRecords").val());
    if (!$numberOfRecords) {
      numberAlert.text(
        "Please add the number of records you'd like to retrieve."
      );
      return;
    }
    $.get(nytURL, data).then(function (response) {
      function recordAmount(arr) {
        for (let i = 0; i < $numberOfRecords; i++) {
          //render records
          const article = $("<div>").addClass("article");
          const articleTitle = $("<h1>").text(arr[i].headline.main);
          const articleDate = $("<p>").text(
            moment(arr[i].pub_date).format("MMM DD YYYY")
          );
          const authors = $("<p>").text(arr[i].byline.original);
          const articleSection = $("<p>").text(arr[i].section_name);
          const articleDescription = $("<p>").text(arr[i].abstract);
          const linkToArticle = $("<a>")
            .attr("href", arr[i].web_url)
            .text(arr[i].web_url);
          linkToArticle.attr("target", "_blank");

          article.append(
            articleTitle,
            articleDate,
            authors,
            articleSection,
            articleDescription,
            linkToArticle
          );
          $(".topArticles").append(article);
        }
      }
      recordAmount(response.response.docs);
      $("input").val("");
    });
  }

  // on click
  $(".searchButton").on("click", function () {
    numberAlert.text("");
    yearAlert.text("");
    $(".topArticles").empty();
    const $search = $.trim($("#search").val());
    search($search);
  });

  // clear button
  $(".clearButton").on("click", function () {
    $(".topArticles").empty();
    $("input").val("");
  });

});
