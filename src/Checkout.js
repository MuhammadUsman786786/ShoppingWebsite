import React, {useContext, useState} from "react";
import AppContext from "./context";
import * as bs from 'react-bootstrap'
import {Card, Col, Container, Row} from 'react-bootstrap'
import {Field, Form, Formik} from 'formik'
import * as _ from 'lodash'
import * as Yup from 'yup';
import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios'
import {useHistory} from "react-router-dom";

const stripePromise = loadStripe('pk_test_RSHnc9ZcLlNQKCa1BiEGr86r00H8LL7B0S');
//
const checkoutSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required'),
	address1: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Address1 is Required'),
	address2: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Address2 is Required'),
	city: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('City is Required'),
	state: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('State is Required'),
	zipcode: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Zipcode is Required'),
});

const PaymentForm = props => {
	const {total, form: {isSubmitting = false} = {},changePaymentInfo=()=>{}} = props || {}
	return <Form>
		<Container>
			<Row>
				<Col>
					<Card>
						<Card.Header className="text-left font-weight-bold">Shipping</Card.Header>
						<Card.Body>
							<Input title="Name:" name="name" type="text"/>
							<Input title="Address 1:" name="address1" type="text"/>
							<Input title="Address 2:" name="address2" type="text"/>
							<Input title="City:" name="city" type="text"/>
							<Input title="State:" name="state" type="text"/>
							<Input title="Zipcode:" name="zipcode" type="text"/>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Header className="text-left font-weight-bold">Payment</Card.Header>
						<Card.Body>
							<CardElement onChange={changePaymentInfo}/>
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
	const [paymentInfo,setPaymentInfo]=useState({complete:false})
	const {
		getCartTotal = () => {
		},
		clearCart=()=>{}
	} = globalState || {}
	const total = getCartTotal(); // context.getCartTotal()
	const elements = useElements();
	const stripe = useStripe();
	const history = useHistory();
	const {setError}=props||{}
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
			validationSchema={ checkoutSchema }
			validateOnChange={ false }
			validateOnBlur={ false }
			onSubmit={ (values, actions, c) => {
				const {complete}=paymentInfo||{}
				if(!complete){
					actions.setSubmitting(false)
					setError('Payment information is not complete')
					return
				}
				actions.setSubmitting(true)
				setTimeout(async () => {
					const {total, name, address1, address2, city, state, zipcode,} = values || {}
					const params = {
						total, name, address1, address2, city, state, zipcode,
						item: {},
						payment_intent: {}
					}
					try {
						setError('')
						const {data:{client_secret}={}}=await axios.post('http://localhost:8000/sale/', params);
						const result=await stripe.confirmCardPayment(client_secret, {
							payment_method: {
								card: elements.getElement(CardElement),
								billing_details: {
									name: 'Jenny Rosen',
								},
							},
						})
						const {error}=result||{}
						if(!_.isEmpty(error)){
							setError('Payment Error is found')
						}else {
							setError('')
							history.push('/receipt')
							clearCart()
						}
						// const cardElement = elements.getElement(CardElement);
					} catch (e) {
					} finally {
						actions.setSubmitting(false)
					}
				}, 1000)
			} }
		>{ form => (
			<PaymentForm
				form={ form }
				total={ total }
				setError={setError}
				changePaymentInfo={(value)=>setPaymentInfo(value)}/>
		) }</Formik>
	)
};

const Input = (props) => {
	return <Field name={ props.name }>{ rProps => {
		const {form, field} = rProps || {}
		const {name} = field || {}
		const {errors} = form || {}
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
				{ !_.isEmpty(errors[name]) && form.touched[name] &&
				<div className="text-danger text-left">{ errors[name] }</div>
				}
			</bs.Form.Group>
		)
	} }</Field>
}


const Checkout = (props) => {
	const [error,setError]=useState('')
	return (
		<div className='cart-container'>
			{!_.isEmpty(error)&&<span className='text-danger'>{error}</span>}
			<h2 className='header-title'>Checkout</h2>
			<Elements stripe={ stripePromise }>
				<CheckoutController error={error} setError={setError}/>
			</Elements>
		</div>
	)
};

export default Checkout
