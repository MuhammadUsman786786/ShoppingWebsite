import React, {useContext, useState} from 'react'
import * as bs from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {useHistory, useRouteMatch} from 'react-router-dom'

import AppContext from './context'
import './product-detail.scss'
import * as _ from 'lodash'

export default function Details() {
	let match = useRouteMatch()
	const history=useHistory()
	let [ hidden, setHidden ] = useState('-1')
	const {params: {productId: currentProductId} = {}} = match || {}
	const state = useContext(AppContext)
	const {
		products, addToCart = () => {
		}
	} = state || {}
	
	if (!state.categories) {
		return <div><h2>Loading...</h2></div>
	}
	const item = _.find(products, ({id}) => _.toString(id) === currentProductId) || {}
	if (_.isEmpty(item)) {
		return (
			<bs.Container>
				<h1>WARNING: I'm so sorry! The Product you are searching are not found.</h1>
			</bs.Container>
		)
	}
	
	console.log(state)
	return (
		<div className="rounded m-2" style={ {backgroundColor: "white", height: "37rem"} }>
			<h1 className="pt-5">
				{ item.name } -- ${ item.price }
			</h1>
			<div className="float-right m-5 p-2 " style={ {backgroundColor: "#000000"} }>
				<bs.Row noGutters className="m-0" style={ {backgroundColor: "#004876"} }>
					<img
						className='p-2'
						src={ require('../public/images/products/' + item.filename + hidden + '.png') }
						alt='main'
						height="300px"
						width="300px"
					/>
				</bs.Row>
				<bs.Row noGutters className='p-2 m-0' style={ {backgroundColor: "#004876"} }>
					<bs.Col md="3">
						<img className='border'
						     src={ require('../public/images/products/' + item.filename + '-1.png') }
						     alt='small-1'
						     style={ {height: '30px', width: '30px'} }
						     onMouseEnter={ () => setHidden('-1') }
						/>
					</bs.Col>
					<bs.Col md="3">
						<img className='border'
						     src={ require('../public/images/products/' + item.filename + '-2.png') }
						     alt='small-2'
						     style={ {height: '30px', width: '30px'} }
						     onMouseEnter={ () => setHidden('-2') }
						     onMouseLeave={ () => setHidden('-1') }
						/>
					</bs.Col>
					<bs.Col md="3">
						<img className='border'
						     src={ require('../public/images/products/' + item.filename + '-3.png') }
						     alt='small-3'
						     style={ {height: '30px', width: '30px'} }
						     onMouseEnter={ () => setHidden('-3') }
						     onMouseLeave={ () => setHidden('-1') }
						/>
					</bs.Col>
					<bs.Col md="3">
						<img
							className='border' src={ require('../public/images/products/' + item.filename + '-4.png') }
							alt='small-4'
							style={ {height: '30px', width: '30px'} }
							onMouseEnter={ () => setHidden('-4') }
							onMouseLeave={ () => setHidden('-1') }
						/>
					</bs.Col>
				</bs.Row>
			</div>
			<p className="pt-5 pl-3" style={ {textAlign: "left"} }>
				{ item.description }
			</p>
			<div className='card_button_container'>
				<Button onClick={ () => {
					addToCart(item)
					history.push('/cart')
				} }>Add To cart</Button>
			</div>
		</div>
	)
}
