import React from "react";
import * as bs from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./home";
import About from "./about";
import Help from "./help";
import HeaderContainer from "./header";
import LeftSide from "./left-side";
import RightSide from "./right-side";
import FooterContainer from "./footer";
import Details from './product-detail';
import Cart from "./cart";

function App(props) {
  return (
    <div className="App">
      <Router>
        <bs.Container fluid className="p-0 min-vh-100 d-flex flex-column w-auto">
          <bs.Row noGutters className="flex-grow-0 flex-shrink-0 shadow-sm">
            <bs.Col
              className="px-3 py-2"
              style={{ backgroundColor: "#121C1C" }}
            >
              <HeaderContainer />
            </bs.Col>
          </bs.Row>
          <bs.Row noGutters className="flex-grow-1 flex-shrink-0 shadow-sm">
            <bs.Col
              md="2"
              className="px-3 py-4 shadow"
              style={{ backgroundColor: "silver" }}
            >
              <LeftSide />
            </bs.Col>
            <bs.Col md="8">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/help">
                  <Help />
                </Route>
                <Route path='/cart'>
                  <Cart />
                </Route>
                <Route path='/product/:productId'>
                  <Details />
                </Route>
                <Route path='/category/:catName'>
                  <Home />
                </Route>
              </Switch>
            </bs.Col>
            <bs.Col
              md="2"
              className="px-3 py-4 shadow"
              style={{ backgroundColor: "silver" }}
            >
              <RightSide />
            </bs.Col>
          </bs.Row>
          <bs.Row noGutters className="flex-grow-0 flex-shrink-0">
            <bs.Col className="px-3 py-2" style={{ backgroundColor: "silver" }}>
              <FooterContainer />
            </bs.Col>
          </bs.Row>
        </bs.Container>
      </Router>
    </div>
  );
}

export default App;
