import { render } from '@testing-library/react';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';

import Navbar from './components/Navbar/Navbar'
import Header from './components/Header';
import ServBox from './components/Servico';
import PessBox from './components/Pessoa';
import TesteForm from './components/Teste';
import EndBox from './components/Endereco';
import EmailBox from './components/Email';
import TelBox from './components/Telefone';
import CliBox from './components/Cliente';
import FuncBox from './components/Funcionario';
import OrcBox from './components/Orcamento';
import OrcCliBox from './components/OrcamentoCliente';
import OrcConBox from './components/OrcamentoConcluido';
import Login from './components/Login/login'


class App extends Component {
  

  state = {
    open: false
  };
  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open
      };
    });
  };

  handleClickOutside = event => {
  if (this.container.current && !this.container.current.contains(event.target)) {
    this.setState({
      open: false,
      });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

  } 
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  container= React.createRef();
  state = {
  open: false,
  };

  render(){
    return (


    

      <Router>
        {/* <Link to="/">Home</Link>
  
        <Link to="/about">About</Link>
  
        <Link to="/Servicos">Serviço</Link>
  
        <Link to="/Pessoas">Pessoas</Link>
  
        <Link to="/Enderecos">Endereço</Link>
  
        <Link to="/Testes">Testes</Link> */}
        
        
  
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
  
          <Route path="/Enderecos" exact>
              <Endereco />
          </Route>
  
          <Route path="/Emails" exact>
              <Email />
          </Route>
  
          <Route path="/Telefones" exact>
              <Telefone />
          </Route>
  
          <Route path="/Clientes" exact>
              <Cliente />
          </Route>
  
          <Route path="/Funcionarios" exact>
              <Funcionario />
          </Route>
  
          <Route path="/Orcamentos" exact>
              <Orcamento />
          </Route>
  
          <Route path="/OrcamentosCliente" exact>
              <OrcamentoCliente />
          </Route>
  
          <Route path="/OrcamentosConcluidos" exact>
              <OrcamentoConcluido />
          </Route>
  
          <Route path="/Home" exact>
              <Home />
          </Route>

          <Route path="/" exact>
              <LoginPage />
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
  
}

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>
      

      <div className="container">

      <img src="/elipseFullPNG.png" className="img-responsive2"></img>

      
      
      
      </div>

      <div id="footer">

            <p>Elipse Projetos Industriais & Desenhos Técnicos</p>

      </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
    
  );
}

function About() {
  return (
    <div className="homebg">
      
      

      <div className="container">
      
      <Header title="Página de Orçamentos"/>
      <br />
      
      </div>

    </div>
    
  );
}

function Servico(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

    <div className="container">
      
      <Header title="Página de Serviços"/>
      <br />
      <ServBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function Pessoa(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

      <div className="container">
      <Header title="Página de Pessoas"/>
      <br />
      <PessBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function Endereco(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

      <div className="container">
      <Header title="Página de Endereços"/>
      <br />
      <EndBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function Email(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

      <div className="container">
      <Header title="Página de Emails"/>
      <br />
      <EmailBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function Telefone(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

      <div className="container">
      <Header title="Página de Telefones"/>
      <br />
      <TelBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function Cliente(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

      <div className="container">
      <Header title="Página de Clientes"/>
      <br />
      <CliBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function Funcionario(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

      <div className="container">
      <Header title="Página de Funcionarios"/>
      <br />
      <FuncBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function Orcamento(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

      <div className="container">
      <Header title="Página de Orçamentos"/>
      <br />
      <OrcBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function OrcamentoCliente(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

      <div className="container">
      <Header title="Orçamentos de Clientes"/>
      <br />
      <OrcCliBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function OrcamentoConcluido(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    isAuthenticated && (
    <div className="homebg">
      <Navbar/>

      <div className="container">
      <Header title="Orçamentos Concluidos"/>
      <br />
      <OrcConBox />
    </div>

    </div>

    ) || !isAuthenticated && (
      <div>
        <Login />
      </div>
    )
    
  );

}

function LoginPage() {
  return (
    <div>

      <Login />

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
