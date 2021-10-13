import { render } from '@testing-library/react';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './components/Header';
import ServBox from './components/Servico';
import PessBox from './components/Pessoa';
import TesteForm from './components/Teste';
import EndBox from './components/Endereco';
import EmailBox from './components/Email';


function App() {
  return (

    <Router>
      {/* <Link to="/">Home</Link>

      <Link to="/about">About</Link>

      <Link to="/Servicos">Serviço</Link>

      <Link to="/Pessoas">Pessoas</Link>

      <Link to="/Enderecos">Endereço</Link>

      <Link to="/Testes">Testes</Link> */}
      
      <div>
        <ul class="topnav">
          <li><a href="/">Inicio</a></li>
          <li><a href="/about">Sobre</a></li>
          <li><a href="/servicos">Serviços</a></li>
          <li><a href="/pessoas">Pessoas</a></li>
          <li><a href="/enderecos">Endereços</a></li>
          <li><a href="/emails">Emails</a></li>
          <li><a href="/testes">Testes</a></li>
          <li class="right"><a href="/sair">Sair</a></li>
        </ul>
      </div>

      <Switch>

        <Route path="/about" exact>
            <About />
        </Route>

        <Route path="/Servicos" exact>
            <Servico />
        </Route>

        <Route path="/Pessoas" exact>
            <Pessoa />
        </Route>

        <Route path="/Testes" exact>
            <Teste />
        </Route>

        <Route path="/Enderecos" exact>
            <Endereco />
        </Route>

        <Route path="/Emails" exact>
            <Email />
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

function Pessoa(){
  return (
    <div className="container">
      <Header title="Pessoas App"/>
      <br />
      <PessBox />
    </div>
  );

}

function Endereco(){
  return (
    <div className="container">
      <Header title="Endereços App"/>
      <br />
      <EndBox />
    </div>
  );

}

function Email(){
  return (
    <div className="container">
      <Header title="Emails App"/>
      <br />
      <EmailBox />
    </div>
  );

}

function Teste() {
  return (
    <div>
      <Header title="Testes App"/>
      <br />
      <TesteForm />

    </div>
  );
}


export default App;
