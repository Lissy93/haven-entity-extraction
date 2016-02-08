# haven-entity-extraction
> Node.js client for HP Haven OnDemand Entity Extraction

[![Dependency Status](https://david-dm.org/lissy93/haven-entity-extraction.svg)](https://david-dm.org/lissy93/haven-entity-extraction)
[![devDependency Status](https://david-dm.org/lissy93/haven-entity-extraction/dev-status.svg)](https://david-dm.org/lissy93/haven-entity-extraction#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/Lissy93/haven-entity-extraction/badges/gpa.svg)](https://codeclimate.com/github/Lissy93/haven-entity-extraction)

## Install
```
npm install git://github.com/Lissy93/haven-entity-extraction.git
```

## Usage
```javascript
var entityExtraction =  require('haven-entity-extraction');
var apiKey = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';
var string = 'dinosaurs are awesome and I love ice cream';

entityExtraction(string, apiKey, function(results){
    console.log(results); // Do some awesome stuff with results
});
```

There is also the option of passing a JSON object rather than a String as the first paramater, in order to specify additional options. See the [Haven OnDemand documentation](https://dev.havenondemand.com/apis/analyzesentiment#request) for full list of paramater options.


## Example Output
```javascript
{ profanities:
   [ { normalized_text: 'Weather',
       matches:
        [ 'Storm',
          'rain',
          'winds',
          'winds',
          'flooding',
          'Weather',
          'winds',
          'Winds' ],
       additional_information: { wiki: '', image: '' } } ],
  organizations:
   [ { normalized_text: 'Met Office',
       matches: [ 'Met Office', 'Met Office', 'Met Office' ],
       additional_information:
        { wiki: 'http://en.wikipedia.org/wiki/Met_Office',
          image: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Met_Office.svg' } } ],
  languages:
   [ { normalized_text: 'Cornish',
       matches: [ 'Cornish' ],
       additional_information:
        { wiki: 'http://en.wikipedia.org/wiki/Cornish_language',
          image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Britonia6hcentury.png' } } ],
  professions:
   [ { normalized_text: 'driver',
       matches: [ 'drivers' ],
       additional_information: { wiki: '', image: '' } } ],
  places_eng:
   [ { normalized_text: 'Wales',
       matches: [ 'Wales', 'Wales' ],
       additional_information:
        { wiki: 'http://en.wikipedia.org/wiki/Wales',
          image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Wales_2.svg' } },
     { normalized_text: 'Bristol',
       matches: [ 'Bristol' ],
       additional_information:
        { wiki: 'http://en.wikipedia.org/wiki/Bristol',
          image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Panorama_of_Bristol.jpg' } },
     { normalized_text: 'United Kingdom',
       matches: [ 'Britain', 'Britain' ],
       additional_information:
        { wiki: 'http://en.wikipedia.org/wiki/United_Kingdom',
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/050114_2495_london_city.jpg' } },
     { normalized_text: 'South Wales',
       matches: [ 'South Wales' ],
       additional_information:
        { wiki: 'http://en.wikipedia.org/wiki/South_Wales',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/British.coalfields.19th.century.jpg' } },
     { normalized_text: 'England',
       matches: [ 'England', 'England' ],
       additional_information:
        { wiki: 'http://en.wikipedia.org/wiki/England',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/London_Skyline.jpg' } } ] }

```

## Obtaining an API Key
Head over to [HP Haven OnDemand](https://www.havenondemand.com/login.html), log in or sign up and then navigate to the 'My Keys' page.
API Keys are free for under 50,000 requests monthly. (at the time of writing this)

## Development
See gulpfile.js for automated build tasks

## License
MIT � [Alicia Sykes](http://aliciasykes.com)
