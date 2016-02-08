request = require 'request'
querystring = require 'querystring'

entities = ['people_eng', 'places_eng', 'companies_eng', 'organizations',
    'languages', 'drugs_eng', 'professions', 'universities', 'profanities',
    'films', 'internet', 'teams', ]

makeUrl = (paramaters, apiKey) ->
  host = "https://api.havenondemand.com/1/api/sync/extractentities/v2"

  if typeof paramaters is 'string'
    urlParams = 'text='+paramaters
    for entity in entities then urlParams += '&entity_type='+entity
    urlParams += '&show_alternatives=false'
  else if typeof paramaters is 'object'
    entities = paramaters.entity_type
    urlParams = querystring.stringify(paramaters)

  url = host + '?' + urlParams + '&apikey=' + apiKey


formatResults = (body) ->
  results = {}
  for b in body.entities
    if !results[b.type] then results[b.type] = []
    matches = []
    for m in b.matches then matches.push m.original_text
    additionalInformation = {}
    additionalInformation.wiki =
      if b.additional_information.hasOwnProperty 'wikipedia_eng'
        b.additional_information.wikipedia_eng
      else ''

    additionalInformation.image =
      if b.additional_information.hasOwnProperty 'image'
        b.additional_information.image
      else ''

    results[b.type].push({
      normalized_text: b.normalized_text
      matches: matches
      additional_information: additionalInformation
    })
  results


module.exports = (paramaters, apiKey, callback)->
  url = makeUrl paramaters, apiKey # Make the URL

  # Make the actual request, and call the callback
  request {url: url, json: true}, (error, response, body) ->
    if !error and response.statusCode == 200 then callback formatResults body
    else callback(error)
