;(function( exports ){

	function F( data, tail ){
		var fn = data.call? data: function(){ return data; };
		return new Box( fn, tail );
	}

	F.add = function(name, method){
		Box.prototype[name] = method;
	};

	var Box = function( data, tail ){
		this._tail = tail;
		this._prop = tail? tail._prop: tail;
		this._data = function( v, prop ){
			if( tail ) return data(tail._data(v));
			return data(v);
		};
	}

	Box.prototype.prop = function( key ){
		this._prop = key;
		return F(function( data ){ return data[key]; }, this);
	};

	Box.prototype.path = function( path ){
		return path.reduce(function( p, key ){
			p._prop = key;
			return F(function( data ){ return data[key]; }, p);
		}, this);
	};

	Box.prototype.prev = function(n){
		if( !n )
			return this._tail;
		var p = this;
		for(var i = 0; i < n; i ++)
			p = p._tail;
		return p;
	};

	Box.prototype.set = function( value ){
		var data = this._tail.data();
		data[this._prop] = value;
		return this;
	};

	Box.prototype.propset = function( key, value ){
		var data = this._data();
		data[key] = value;
		return this;
	};

	Box.prototype.then = function( fn ){
		var data = this._tail.data()
		data[this._prop] = fn( data[this._prop] );
		return this;
	};

	Box.prototype.data = function(){
		return this._data();
	};

	Box.prototype.value = function(){
		var p = this;
		while( p._tail ) p = p._tail;
		this._data();
		return p._data();
	};

	if ( typeof define === 'function' && define.amd ) {
		define(function () { return F; });
	} else if ( typeof module !== 'undefined' && module.exports ){
		module.exports = F;
	} else {
		exports.walker = F;
	}

})( window );
