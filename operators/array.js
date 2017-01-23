;(function( F ){

	['map', 'reduce', 'filter', 'find', 'forEach'].map(function( method ){
		F.add(method, function( fn ){
			return this.then(function( array ){
				return array[method](fn);
			});
		});
	});

})( walker )
