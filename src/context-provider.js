import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
import * as _ from 'lodash'

/** The context provider for our app */
export default class AppProvider extends React.Component {
	
	constructor(props) {
		super(props);
		this.actions = {};
		this.state = {
			categories: [],
			products: [],
			cart: {
				'12123': 8,
				'290298': 6
			}
		}
	}
	
	
	async componentDidMount() {
		try {
			const resp = await axios.get('http://localhost:8000/category');
			const resp2 = await axios.get('http://localhost:8000/product');
			this.setState({...this.state, categories: resp.data, products: resp2.data})
		} catch (e) {
		}
	}
	
	addToCart = (item) => {
		const {id} = item || {}
		const {cart = {}} = this.state
		const prevQuantity = cart[id] || 0
		this.setState({cart: {...cart, [id]: prevQuantity + 1}})
	}
	
	removeFromCart = (item) => {
		const {id} = item || {}
		const {cart = {}} = this.state
		const updatedCart = _.omit(cart, [ `${ id }` ])
		this.setState({cart: updatedCart})
	}
	
	render() {
		return (
			<AppContext.Provider value={ {
				...this.state,
				addToCart: this.addToCart,
				removeFromCart: this.removeFromCart,
			} }>
				<App/>
			</AppContext.Provider>
		)
	}
}
