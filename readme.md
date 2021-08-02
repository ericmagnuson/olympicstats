# Olympic Stats
_A library that collects sport times and returns current average times per sport._


### Prerequisites
- git
- Node.js
- npm

### Getting started
1) Clone the repo: `git clone https://github.com/ericmagnuson/olympicstats.git && cd olympicstats`
2) Install mocha: `npm install`
3) Run tests: `npm test`
4) Run any sample/test code appended below class definition: `npm start`


### Example usage
```js
let stats = new OlympicStats();

stats.addAction('{"action":"jump", "time":100}');
stats.addAction('{"action":"run", "time":75}');
stats.addAction('{"action":"jump", "time":200}');

console.log(stats.getStats());
```

### Documentation

#### `addAction(jsonEntry)`

__Accepts__

`jsonEntry`, a string where string is an encoded JSON object. The encoded JSON object must have two keys: `action` and `time`, where `action` is a string representing the name of a sport and where `time` is a number in seconds representing the duration of said activity.  See example usage above.

__Returns__

error string describing any input-related errors

#### `getStats()`

__Accepts__

None

__Returns__

string of encoded JSON array of objects representing the average times of each action passed into `addAction`.

### Notes
1) For the sake of predictable output, I will return the average times sorted alphabetically by the "action" name.
2) I will also round returned values to the nearest 0.01 (not minding significant figures here) to keep things clean.
3) Admittedly, I could break out some logic from `addAction()` and `getStats()` into helper functions (e.g. validating input, calculating a precisely rounded value), but the class is already pretty small that I don't think it'd be very beneficial.  If the class were expanded down the road to handle other types of stats, then it might be worth breaking out some reusable logic.

### Definitions
- "entry": One set of "action" and "time" (e.g. `{"action":"jump", "time":100}`)

### Assumptions
1) To help show how I'd do this in a real production environment, I thought it'd help to "theme" the challenge a little since the technical requirements are open-ended. Since the Olympics are going on right now and since the example input refers to sports, I'll make the assumption that this library will be used to keep track of sport-related actions and times. That will help direct the other assumptions.
2) "action" value, representing the name of a sport, should always be a string (I won't be too picky on which chars are allowed — a string could have numbers or punctuation (e.g. "3-on-3 basketball"))
3) "time" value should always be a number in seconds (could be integer, could be decimal). I'll assume any input containing multiple units (e.g. "1d 21h 33m") will have been converted to seconds before being passed in as a parameter.
4) If other keys are passed into an entry, let's not worry about them — we'll just pass over that info. We need only "action" and "time".

### Edge cases to catch
1) Missing input
2) Malformed input
3) Race conditions?
4) getStats called before any stats entered (should just return an empty array)
5) Negative numbers?
6) Null input

### Todos and extras
1) Publish on npm (BONUS)
2) Write more formal documentation (BONUS)
3) Consider calculating average on each insert (not when calling `getStats()`)
