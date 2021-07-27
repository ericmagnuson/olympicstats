/*jshint esversion: 6 */

import assert from 'assert';
import OlympicStats from '../index.js';

describe('OlympicStats class', () => {
    it('should handle malformed JSON string', () => {
        var result = new OlympicStats().addAction('{{}');
        assert.match(result, /Error/);
    });

    it('should handle empty input', () => {
        var result = new OlympicStats().addAction('');
        assert.match(result, /Error/);
    });

    it('should handle missing action parameter', () => {
        var result = new OlympicStats().addAction('{"time": 100}');
        assert.match(result, /Error/);
    });

    it('should handle missing time parameter', () => {
        var result = new OlympicStats().addAction('{"action": "jump"}');
        assert.match(result, /Error/);
    });

    it('should handle empty action parameter', () => {
        var result = new OlympicStats().addAction('{"action": "", "time": 100}');
        assert.match(result, /Error/);
    });

    it('should handle empty time parameter', () => {
        var result = new OlympicStats().addAction('{"action": "swim", "time": null}');
        assert.match(result, /Error/);
    });

    it('should return empty array when getStats() runs before any entries inputted', () => {
        var result = new OlympicStats().getStats();
        assert.equal(result, '[]');
    });

    it('should handle extra key–value pairs in an entry', () => {
        var result = new OlympicStats().addAction('{"action": "jump", "time": 0.87, "difficulty": "hard"}');
        assert.match(result, /Success/);
    });

    it('should handle null input', () => {
        var result = new OlympicStats().addAction(null);
        assert.match(result, /Error/);
    });

    it('should handle number input', () => {
        var result = new OlympicStats().addAction(123);
        assert.match(result, /Error/);
    });

    it('should handle empty object input', () => {
        var result = new OlympicStats().addAction({});
        assert.match(result, /Error/);
    });

    it('should handle immensely large input', () => {
        var stats = new OlympicStats();

        stats.addAction('{"action":"jump","time":1e23}');
        stats.addAction('{"action":"run","time":75e45}');
        stats.addAction('{"action":"jump","time":1e23}');

        assert.equal(stats.getStats(), '[{"action":"jump","avg":1e+23},{"action":"run","avg":7.5e+46}]');
    });

    it('should pass example scenario', () => {
        var stats = new OlympicStats();

        stats.addAction('{"action":"jump","time":100}');
        stats.addAction('{"action":"run","time":75}');
        stats.addAction('{"action":"jump","time":200}');

        assert.equal(stats.getStats(), '[{"action":"jump","avg":150},{"action":"run","avg":75}]');
    });

});
