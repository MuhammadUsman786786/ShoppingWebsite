import React, {useContext} from 'react'
import * as bs from "react-bootstrap";
import { Link } from "react-router-dom";
import AppContext from "./context";

export default function LeftSide(props) {
  const state = useContext(AppContext)    
  if  (!state.categories){
    return <div><h2>Loading...</h2></div>
  }
  else{
    const categories = {}
    let total = 0
    for (const p of Object.values(state.products)){
      total += 1
      if (p.category.title in categories){
        categories[p.category.title] = categories[p.category.title] + 1
      }
      else {
        categories[p.category.title] = 1
      }
      // categories[p.category] = (categories[p.category] || 0) + 1 // this is the best javascript practice
    }
    
    return (
      <bs.Container>
        <bs.Col className="col-main bg-secondary">
          <bs.Nav className="flex-column" aria-controls="basic-navbar-nav">
            <Link to="/" className="nav-link" style={{ color: 'White' }}>
              All Products ({total})
            </Link>
            {Object.entries(categories).map(([key, value]) => {
              return (
                <Link key={key} to={`/category/${key}`} className="nav-link" style={{ color: 'White' }}>
                  {`${key} (${value})`}
                </Link>
              )
            })}
          </bs.Nav>
        </bs.Col>
      </bs.Container>
    )
  }
}
