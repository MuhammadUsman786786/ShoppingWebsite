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
			cart: {}
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
	
	getCartTotal = () => {
		const {products = [], cart = {}} = this.state
		const productsMap = _.keyBy(products, 'id')
		const cartItemKeys = _.keys(cart)
		let netTotalPrice = 0
		_.map(cartItemKeys, (cartItemKey, index) => {
			const quantity = cart[cartItemKey]
			const cartItem = productsMap[cartItemKey] || {}
			const {price} = cartItem || {}
			const itemAccumulativePrice = quantity * price
			netTotalPrice = netTotalPrice + itemAccumulativePrice
		})
		return netTotalPrice
	}
	
	removeFromCart = (item) => {
		const {id} = item || {}
		const {cart = {}} = this.state
		const updatedCart = _.omit(cart, [ `${ id }` ])
		this.setState({cart: updatedCart})
	}
	
	clearCart =()=>{
		this.setState({cart:{}})
	}
	
	render() {
		return (
			<AppContext.Provider value={ {
				...this.state,
				addToCart: this.addToCart,
				removeFromCart: this.removeFromCart,
				getCartTotal: this.getCartTotal,
				clearCart:this.clearCart
			} }>
				<App/>
			</AppContext.Provider>
		)
	}
}
