(function() {
  var entities, formatResults, makeUrl, querystring, request;

  request = require('request');

  querystring = require('querystring');

  entities = ['people_eng', 'places_eng', 'companies_eng', 'organizations', 'languages', 'drugs_eng', 'professions', 'universities', 'films', 'internet', 'teams'];

  makeUrl = function(paramaters, apiKey) {
    var entity, host, i, len, url, urlParams;
    host = "https://api.havenondemand.com/1/api/sync/extractentities/v2";
    if (typeof paramaters === 'string') {
      urlParams = 'text=' + paramaters;
      for (i = 0, len = entities.length; i < len; i++) {
        entity = entities[i];
        urlParams += '&entity_type=' + entity;
      }
      urlParams += '&show_alternatives=false';
    } else if (typeof paramaters === 'object') {
      entities = paramaters.entity_type;
      urlParams = querystring.stringify(paramaters);
    }
    return url = host + '?' + urlParams + '&apikey=' + apiKey;
  };

  formatResults = function(body) {
    var additionalInformation, b, i, j, len, len1, m, matches, ref, ref1, results;
    results = {};
    ref = body.entities;
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      if (!results[b.type]) {
        results[b.type] = [];
      }
      matches = [];
      ref1 = b.matches;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        m = ref1[j];
        matches.push(m.original_text);
      }
      additionalInformation = {};
      additionalInformation.wiki = b.additional_information.hasOwnProperty('wikipedia_eng') ? b.additional_information.wikipedia_eng : '';
      additionalInformation.image = b.additional_information.hasOwnProperty('image') ? b.additional_information.image : '';
      results[b.type].push({
        normalized_text: b.normalized_text,
        matches: matches,
        additional_information: additionalInformation
      });
    }
    return results;
  };

  module.exports = function(paramaters, apiKey, callback) {
    var url;
    url = makeUrl(paramaters, apiKey);
    return request({
      url: url,
      json: true
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        return callback(formatResults(body));
      } else {
        return callback(error);
      }
    });
  };

}).call(this);
/* (C) Alicia Sykes <alicia@aliciasykes.com> 2015           *\
\* MIT License. Read full license at: https://goo.gl/IL4lQJ */