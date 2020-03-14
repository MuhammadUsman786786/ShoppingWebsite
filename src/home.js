import React from "react";
import * as bs from "react-bootstrap";
import Card from "./product-card";
import {useRouteMatch} from "react-router-dom";
import * as _ from 'lodash'
import AppContext from "./context";


const Home = (props) => {
	const match = useRouteMatch().params.catName;
	return (
		<AppContext.Consumer>
			{ context => {
				const {products = []} = context || {}
				const dataList = match ? _.filter(products, (item) => item.category.title === match) : products
				return <bs.Container fluid>
					<bs.Row className="justify-content-md-center">
						{ dataList.map(product => (
							<bs.Col md="3" key={ product.id }>
								<Card product={ product }/>
							</bs.Col>
						)) }
					</bs.Row>
				</bs.Container>
			} }
		</AppContext.Consumer>
	)
};

export default Home;
