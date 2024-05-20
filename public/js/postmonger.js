// public/js/postmonger.js
(function(global) {
    var Postmonger = global.Postmonger = {};
    Postmonger.version = '0.0.14';
    Postmonger.Session = function() {
        // Implement your Postmonger session handling here
        var events = {};
        return {
            on: function(name, callback) {
                events[name] = events[name] || [];
                events[name].push(callback);
            },
            off: function(name, callback) {
                if (events[name]) {
                    var idx = events[name].indexOf(callback);
                    if (idx > -1) {
                        events[name].splice(idx, 1);
                    }
                }
            },
            trigger: function(name, data) {
                if (events[name]) {
                    events[name].forEach(function(callback) {
                        callback(data);
                    });
                }
            }
        };
    };
})(this);
