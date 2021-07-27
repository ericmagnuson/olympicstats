# Olympic Stats

### Notes
1) For the sake of predictable output, I will return the average times sorted alphabetically by the "action" name.
2) I will also round returned values to the nearest 0.01 (not minding significant figures here) to keep things clean.

### Definitions
- "entry": One set of "action" and "time" (e.g. `{"action":"jump", "time":100}`)

### Assumptions
1) To help show how I'd do this in a real production environment, I thought it'd help to "theme" the challenge a little since the technical requirements are open-ended. Since the Olympics are going on right now and since the example input refers to sports, I'll make the assumption that this library will be used to keep track of sport-related actions and times. That will help direct the other assumptions.
2) "action" value, representing the name of a sport, should always be a string (I won't be too picky on which chars are allowed — a string could have numbers or punctuation)
3) "time" value should always be a number (could be int, could be decimal) in seconds. I'll assume any input containing multiple units (e.g. "1d 21h 33m") will have been converted to seconds when passed as a parameter
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
