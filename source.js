export default state =>{

	let pointer = state
	let path = []

	return {

		prop( key ){
			pointer = pointer[ key ]
			path.push( key )
			return this
		},

		path( list ){
			list.map( key => this.prop(key) )
			return this
		},

		end(){
			pointer = state
			path = []
			return this
		},

		set( value ){

			let where  = path[ path.length-1 ]
			let parent = path[ path.length-2 ]

			if( !where ){
				state = value
				pointer = state
			}else if(!parent) {
				state[ where ] = value
				pointer = value
			}else{
				path.reduce( (acc, key) =>{
					if( parent in acc ){
						acc[ parent ][ where ] = value
						pointer = value
						acc = acc[ key ]
					}
					return acc
				}, state)
			}

			return this
		},

		then( fn ){
			this.set( fn( pointer ) )
			return this
		},

		propset( key, value ){
			pointer[key] = value
			return this
		},

		map( fn ){
			this.set( pointer.map( fn ) )
			return this
		},

		filter( fn ){
			this.set( pointer.filter( fn ) )
			return this
		},

		reduce( fn, option ){
			this.set( pointer.reduce( fn, option ) )
			return this
		},

		value(){
			return state
		},

		data(){
			return pointer
		}
	}
}
