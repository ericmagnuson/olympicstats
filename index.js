/*jshint esversion: 6 */

export default class OlympicStats {
    constructor() {
        // Set the values we need to store as long as the object is alive.
        // If we keep the running time total and the current count of entries
        // for each action, we can calculate averages without having to store
        // each entry.
        this.currentRunningTimePerAction = [];  // array<sportString><integr|decimal>
        this.currentCountPerAction = [];        // array<sportString><integer>
    }

    addAction(jsonEntry) {
        // Let's convert JSON string to an object and also make sure it is valid JSON
        var entry, action, time;

        jsonEntry = jsonEntry || ''; // Prevent null input errors

        try {
            entry = JSON.parse(jsonEntry);
        } catch (error) {
            return "Error: string was not valid JSON";
        }

        // Let's do some quick validation and make sure "name" and "time" keys exist
        if (!entry.hasOwnProperty('action')) {
            return "Error: make sure to include an action";
        }

        if (!entry.hasOwnProperty('time')) {
            return "Error: make sure to include a time";
        }

        // Storing vals in vars for easier access
        action = entry.action;
        time = entry.time;

        // Make sure action is a non-empty string
        if (typeof action !== "string" || action === "") {
            return "Error: make sure action is a string";
        }

        // Make sure time is a number
        if (typeof time !== "number" || time === "") {
            return "Error: make sure time is a number (int or decimal)";
        }

        // Does the sport exist already in current arrays? If not, add it...
        if (
            !this.currentRunningTimePerAction.hasOwnProperty(action) ||
            !this.currentCountPerAction.hasOwnProperty(action)
        ) {
            this.currentRunningTimePerAction[action] = time;
            this.currentCountPerAction[action] = 1;
        }
        // ...if so, update existing entries
        else {
            this.currentRunningTimePerAction[action] += time;
            this.currentCountPerAction[action] += 1;
        }

        return "Success adding " + jsonEntry;
    }

    getStats() {
        // @todo I'm making an array on every call of this. This could probably be more efficient.
        // @todo Fix the rounding errors (https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8)
        var currentStats = [];

        // Let's sort the keys (this adds some predictability at the expense of
        // extra time complexity) before calculating the current average for each action.
        Object.keys(this.currentCountPerAction).sort().forEach((item) => {
            currentStats.push({
                action: item,
                avg: Math.round(this.currentRunningTimePerAction[item] / this.currentCountPerAction[item] * 100) / 100
            });
        });

        return JSON.stringify(currentStats);
    }
}



console.log("Initializing class instance sample");
let stats = new OlympicStats();
console.log(stats.addAction('{"action": "jump", "time": 0.87}'));
console.log(stats.addAction('{"action": "sprint", "time": 1e2}'));
console.log(stats.addAction('{"action": "jump", "time": 9.3}'));
console.log(stats.addAction('{"action": "sprint", "time": 150}'));
console.log(stats.addAction('{"action": "sprint", "time": 300}'));
console.log(stats.addAction('{"action": "jump", "time": 13.1}'));
console.log(stats.getStats());
