;(function( exports ){

	function walker( state ){

		var pointer = state;
		var path = [];

		return {
			prop: function prop(key) {
				pointer = pointer[key];
				path.push(key);
				return this;
			},
			path: function path(list) {
				var _this = this;

				list.map(function (key) {
					return _this.prop(key);
				});
				return this;
			},
			end: function end() {
				pointer = state;
				path = [];
				return this;
			},
			set: function set(value) {

				var where = path[path.length - 1];
				var parent = path[path.length - 2];

				if( !where ){
					state = value;
					pointer = state;
				}else if(!parent) {
					state[ where ] = value;
					pointer = value;
				} else {
					path.reduce(function (acc, key) {
						if (parent in acc) {
							acc[parent][where] = value;
							pointer = value;
							acc = acc[key];
						}
						return acc;
					}, state);
				}

				return this;
			},
			then: function then(fn) {
				this.set(fn(pointer));
				return this;
			},
			propset: function propset(key, value) {
				pointer[key] = value;
				return this;
			},
			map: function map(fn) {
				this.set(pointer.map(fn));
				return this;
			},
			filter: function filter(fn) {
				this.set(pointer.filter(fn));
				return this;
			},
			reduce: function reduce(fn, option) {
				this.set(pointer.reduce(fn, option));
				return this;
			},
			value: function value() {
				return state;
			},
			data: function data() {
				return pointer;
			}
		};
	}

	// UMD export
	if ( typeof define === 'function' && define.amd ) {
		define(function () { return walker; });
	} else if ( typeof module !== 'undefined' && module.exports ){
		module.exports = walker;
	} else {
		exports.walker = walker;
	}

})( window );
