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
		.end()
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

### .end()
Resets context to root.

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

### .map( fn ), .reduce( fn ), .filter( fn )
Same as native array methods, it gets a function which receive the current context and context must be an array.

## Roadmap
- More operators
