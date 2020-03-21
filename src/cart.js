import React, {useContext} from "react";
import {default as bs, Button, Card, Table} from "react-bootstrap";
import * as _ from 'lodash'
import './cart.scss'
import AppContext from "./context";
import {useHistory} from "react-router-dom";

const TableHeader = () => {
	return <thead>
	<tr>
		<th/>
		<th>Product</th>
		<th>Quantity</th>
		<th>Price</th>
		<th>Extended</th>
		<th/>
	</tr>
	</thead>
}

const TableFooter = (props) => {
	const {title, subtitle} = props
	return <tr>
		<td/>
		<td className='table-item' style={ {fontWeight: 'bold'} }>{ title }</td>
		<td/>
		<td/>
		<td className='table-item table-item1' style={ {fontWeight: 'bold'} }>{ subtitle }</td>
		<td/>
	</tr>
}

const TableBody = () => {
	const globalState = useContext(AppContext)
	const {
		products, cart, removeFromCart = () => {
		}, getCartTotal = () => {
		}
	} = globalState || {}
	const productsMap = _.keyBy(products, 'id')
	const cartItemKeys = _.keys(cart)
	return <tbody>
	{
		_.map(cartItemKeys, (cartItemKey, index) => {
			const cartItem = productsMap[cartItemKey] || {}
			if (_.isEmpty(cartItem)) {
				return null
			}
			const {id, name, filename, price} = cartItem || {}
			const quantity = cart[cartItemKey]
			const itemAccumulativePrice = quantity * price
			return <tr key={ _.toString(id) }>
				<td style={ {width: 100, height: 100} }>
					<Card.Img variant="top" src={ `/images/products/${ filename }-1.png` } style={ {margin: 0, padding: 0} }/>
				</td>
				<td className='table-item'>{ name }</td>
				<td className='table-item'>{ cart[cartItemKey] }</td>
				<td className='table-item'>{ (price) }</td>
				<td className='table-item'>{ itemAccumulativePrice }</td>
				<td className='table-item'>
					<Button variant="outline-secondary" size={ 'sm' } onClick={ () => removeFromCart(cartItem) }>Remove</Button>
				</td>
			</tr>
		})
	}
	<TableFooter title={ 'Title' } subtitle={ getCartTotal() }/>
	<TableFooter/>
	</tbody>
}

const Cart = (props) => {
	const globalState = useContext(AppContext)
	const {cart = {}} = globalState || {}
	const history=useHistory()
	return (
		<div className='cart-container'>
			<h2 className='header-title'>Shopping Cart</h2>
			{
				_.isEmpty(cart) ? <h4 className='empty-message'>No Item is found</h4> :
					<Table responsive>
						<TableHeader/>
						<TableBody/>
					</Table>
			}
			{
				!_.isEmpty(cart) &&
				<Button type="submit" className="w-25 btn btn-success" block size={ 'md' } onClick={()=>history.push('/checkout')}>
					Checkout
				</Button>
			}
		</div>
	)
};

export default Cart
