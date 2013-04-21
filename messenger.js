var Msgr = (function(global, document) {
"use strict";

var _instance,
	callbacks = {};

function Messenger() {
	return _instance || (_instance = this instanceof Messenger ? this : new Messenger());
}

Messenger.prototype = {
	constructor: Messenger,
	send: function() {
		var args = [].slice.call(arguments),
			key = args.shift(),
			list = _getCallbackList(key);

		if (!list.length) {
			return;
		}
		setTimeout(function() {
			list.forEach(function(fn) {
                global.console.log(fn);
				fn.apply(null, args);
			});
		});
	},
	on: function(key, fn) {
        var list = _getCallbackList(key);

		list.push(fn);
	},
	off: function(key, fn) {
		var list = _getCallbackList(key),
			index = list.indexOf(fn);

		if (index > -1) {
			list.splice(index, 1);
		}
	},
	list: function(key) {
		return !key ? callbacks : _getCallbackList(key);
	},
	clear: function(key) {
		if (!callbacks[key]) {
			return;
		}
		delete callbacks[key];
	},
    reset: function() {
        callbacks = {};
    }
};

function _getCallbackList(key) {
    return callbacks[key] || (callbacks[key] = []);
}

return Messenger;

})((this.self || global), document);

