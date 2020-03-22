import React, {useContext} from "react";
import AppContext from "./context";
import * as bs from 'react-bootstrap'
import {Card, Col, Container, Row} from 'react-bootstrap'
import {Field, Form, Formik} from 'formik'
import * as _ from 'lodash'
import axios from 'axios'
import CreditCardInput from 'react-credit-card-input';
import {emptyValidation} from "./validation";

/**
 * The form layout/html.
 * This component needs finishing.
 */

const PaymentForm = props => {
	const {total, form: {isSubmitting = false} = {}} = props || {}
	return <Form>
		<Container>
			<Row>
				<Col>
					<Card>
						<Card.Header className="text-left font-weight-bold">Shipping</Card.Header>
						<Card.Body>
							<Input prefix="Name:" title="Name:" name="name" type="text" validator={emptyValidation}/>
							<Input prefix="Address 1:" title="Address 1:" name="address1" type="text" validator={emptyValidation}/>
							<Input prefix="Address 2:" title="Address 2:" name="address2" type="text" validator={emptyValidation}/>
							<Input prefix="City:" title="City:" name="city" type="text" validator={emptyValidation}/>
							<Input prefix="State:" title="State:" name="state" type="text" validator={emptyValidation}/>
							<Input prefix="Zipcode:" title="Zipcode:" name="zipcode" type="text" validator={emptyValidation}/>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Header className="text-left font-weight-bold">Payment</Card.Header>
						<Card.Body>
							<CreditCardInput fieldClassName="input"/>
							<bs.Button
								type="submit"
								className="w-50 btn-success"
								block size={ 'md' } disabled={ isSubmitting }
								style={ {marginLeft: 'auto', marginRight: 'auto'} }>
								Purchase
								{ isSubmitting &&
								<bs.Spinner animation="border" variant="light" style={ {marginLeft: 10} } size="sm"/> }
							</bs.Button>
						</Card.Body>
					</Card>
					<span style={ {display: 'inherit', textAlign: 'left'} }>
						You will be charged for
						<span className="font-weight-bold">  { total }$</span>
					</span>
				</Col>
			</Row>
		</Container>
	</Form>
}

const CheckoutController = props => {
	const globalState = useContext(AppContext)
	const {
		getCartTotal = () => {
		}
	} = globalState || {}
	const total = getCartTotal(); // context.getCartTotal()
	return (
		<Formik
			initialValues={ {
				total: total,
				name: 'Conrad Fox',
				address1: '1234',
				address2: '5678',
				city: 'Provo',
				state: 'UT',
				zipcode: '84602',
			} }
			validateOnChange={ false }
			validateOnBlur={ false }
			validate={ values => {
				const errors = {};
				const {name, address1, city, state, zipcode} = values || {}
				if (_.isEmpty(name)) {
					errors.name = 'Name is Required'
				} else if (_.isEmpty(address1)) {
					errors.address1 = 'Address is Required'
				} else if (_.isEmpty(city)) {
					errors.city = 'City is Required'
				} else if (_.isEmpty(state)) {
					errors.state = 'state is Required'
				} else if (_.isEmpty(zipcode)) {
					errors.zipcode = 'City is Required'
				}
				return errors
			} }
			onSubmit={ async (values, actions) => {
				console.log('onsubmit')
				actions.setSubmitting(true)
				setTimeout(async () => {
					const {total, name, address1, address2, city, state, zipcode,} = values || {}
					const params = {
						total, name, address1, address2, city, state, zipcode,
						item: {},
						payment_intent: {}
					}
					try {
						axios.post('http://localhost:8000/sale/', params);
					} catch (e) {
					} finally {
						actions.setSubmitting(false)
					}
				}, 1000)
			} }
		>{ form => (
			<PaymentForm form={ form } total={ total }/>
		) }</Formik>
	)
};

const Input = (props) => {
	const {prefix,validator=()=>{}}=props||{}
	return <Field name={ props.name } >{ rProps => {
		const {field:{value}={},form={}}=rProps||{}
		const message=validator(value,prefix)
		return (<bs.Form.Group>
				{ props.title &&
				<div style={ {float: 'left'} }>
					<bs.Form.Label className='font-weight-bold'>{ props.title }</bs.Form.Label>
				</div>
				}
				<bs.Form.Control
					disabled={ props.disabled || false }
					type={ props.type }
					placeholder={ props.placeholder }
					{ ...rProps.field }
				/>
				{ !_.isEmpty(message) &&form.touched[props.name] &&
				<div className="text-danger text-left">{ message }</div>
				}
			</bs.Form.Group>
		)
	} }</Field>
}


const Checkout = (props) => {
	return (
		<div className='cart-container'>
			<h2 className='header-title'>Checkout</h2>
			<CheckoutController/>
		</div>
	)
};

export default Checkout
