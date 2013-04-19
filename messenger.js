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
			ary = callbacks[key];

		if (!ary) {
			return;
		}
		setTimeout(function() {
			ary.forEach(function(fn) {
				fn.apply(null, args);
			});
		});
	},
	on: function(key, fn) {
		if (!callbacks[key]) {
			callbacks[key] = [];
		}
		callbacks[key].push(fn);
	},
	off: function(key, fn) {
		if (!callbacks[key]) {
			return;
		}
		var ary = callbacks[key],
			index = ary.indexOf(fn);

		if (index > -1) {
			ary.splice(index, 1);
		}
	},
	list: function(key) {
		return !key ? callbacks : (callbacks[key] || [])
	},
	clear: function(key) {
		if (!callbacks[key]) {
			return;
		}
		delete callbacks[key];
	}
};

return Messenger;

})((this.self || global), document);

