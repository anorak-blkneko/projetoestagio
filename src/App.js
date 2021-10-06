import { render } from '@testing-library/react';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './components/Header';
import ServBox from './components/Servico';


function App() {
  return (

    <Router>

      
      <div>
      <Link to="/">Home</Link>

      <Link to="/about">About</Link>

      <Link to="/Servicos">Serviço</Link>

      </div>

      <Switch>

        <Route path="/about" exact>
            <About />
        </Route>

        <Route path="/Servicos" exact>
            <Servico />
        </Route>

        <Route path="/" exact>
            <Home />
        </Route>

      </Switch>


    </Router>

    /* <div className="container">
      <Header title="Serviços App"/>
      <br />
      <ServBox />
    </div> */
    
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return (
    <div>
      

      <div className="container">
      
      <Header title="Orçamentos App"/>
      <br />
      
      </div>

    </div>
    
  );
}

function Servico(){
  return (
    <div className="container">
      <Header title="Serviços App"/>
      <br />
      <ServBox />
    </div>
  );

}


export default App;
