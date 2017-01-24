# walker [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A Function to walk over complex json data structure.
Highly inspired on [functional lenses](https://medium.com/@dtipson/functional-lenses-d1aba9e52254#.c2ht4rctb)
Also inspired on some patterns used on `jQuery`, `Underscore` and `Rxjs`.

## Motivation

> Sometimes we just want a simple functionality to simplify our life without having to overload our heads with
difficult and hard concepts of functional programming...

Walker is just an abstraction to help us to walk through `json` data structures, modify them and get the values or the entire data structure.

```js
	var user = {
		name: "Bob",
		addresses: [
			{street: '99 Maple', zip: 94004, type: 'home'},
			{street: '2302 Powell', zip: 94001, type: 'work'}
		]
	};

	var result = walker( user )
		.propset('name', 'Clark Kent')
		.path(['addresses', 1, 'street'])
		.set('Av. Brg. Faria Lima - SP - Brazil')
		.prev()
		.propset('zip', '04538-133');

	console.log( result.data() );
	// OUTPUT:
	// {street: 'Av. Brg. Faria Lima - SP - Brazil', zip: '04538-133', type: 'work'}

	console.log( result.value() );
	// OUTPUT:
	// var user = {
	// 	name: "Bob",
	// 	addresses: [
	// 		{street: '99 Maple', zip: 94004, type: 'home'},
	// 		{street: 'Av. Brg. Faria Lima - SP - Brazil', zip: '04538-133', type: 'work'}
	// 	]
	// };
```

## API

### .prop( String )
Access a property and change `walker` context to that property.

### .path( Array[String] )
A shortcut to avoid several `.prop()` calls.

### .prev( [Number] )
Returns a level in the context. It can receive a number of levels to return to.

### .set( Any )
Changes the value of the current context.

### .propset( String, Any )
Changes the value of the current property, without changing context.

### .then( Function( data ) )
The same as `.set` but uses a function to change the value of the current context. *The callback has to return any value* .

### .data()
Returns the raw data of the current context.

### .value()
Returns the entire json data structure with all modifications applied.

## Extensions

It's possible to extend `walker` with new operators, just check the `operators/array.js` to see how it's done.


Example: Adding `.map` operator:

```js
(function( F ){
	F.add(method, function( fn ){
		return this.then(function( array ){
			return array.map(fn);
		});
	});
})(walker)
```

Usage:

```js
var result = walker({ items:[1,2,3] })
	.prop('items')
	.map(function(item){ return item*2; });

console.log( result.data() );
// [ 2, 4, 6 ]
console.log( result.value() );
// { items:[ 2, 4, 6 ]}
```

## Roadmap

- Performance improvements
- More operators
