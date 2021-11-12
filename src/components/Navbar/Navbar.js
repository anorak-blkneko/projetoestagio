import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LogoutButton from '../Login/LogoutButton';

class Navbar extends Component{
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
          return(

            <div className="bs-component" >
  
        {/* <nav role="navigation">
  
          <ul class="topnav">
            <li><a href="/">Inicio</a></li>
            <li><a href="/about">Sobre</a></li>
            <li><a href="/servicos">Serviços</a></li>
            <li><a href="/pessoas">Pessoas</a></li>
            <li><a href="/enderecos">Endereços</a></li>
            <li><a href="/emails">Emails</a></li>
            <li><a href="/telefones">Telefones</a></li>
            <li><a href="/clientes">Clientes</a></li>
            <li><a href="/funcionarios">Funcionarios</a></li>
            <li><a href="/orcamentos">Orçamentos</a></li>
            <li><a>Relatórios</a>
              <ul class="dropdown">
  
              <li><a href="/orcamentoscliente">OrçamentosClientes</a></li>
              <li><a href="/orcamentosconcluidos">OrçamentosConcluidos</a></li>
  
              </ul>
  
            </li>
            
            <li class="right"><a href="/sair">Sair</a></li>
          </ul>
  
        </nav> */}
  
        <ul className="nav nav-tabs">
            <li className=""><a className="" data-toggle="tab" href="/Home"><img src="/elipselogo.jpg" className="img-responsive"></img></a></li>
            {/* <li className="nav-item "><a className="nav-link" data-toggle="tab" href="/">Inicio</a></li> */}
            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/servicos">Serviços</a></li>
            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/pessoas">Pessoas</a></li>
            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/enderecos">Endereços</a></li>
            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/emails">Emails</a></li>
            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/telefones">Telefones</a></li>
            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/clientes">Clientes</a></li>
            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/funcionarios">Funcionarios</a></li>
            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/orcamentos">Orçamentos</a></li>
            <li className="nav-item dropdown" onClick={this.handleButtonClick}><a className="nav-link dropdown-toggle" >Relatórios</a>

            <div className={this.state.open ? "dropdown-menu show" : "dropdown-menu"} x-placement="bottom-start">
              <a className="dropdown-item nav-link" href="/orcamentoscliente">Orçamentos De Clientes</a>
              <div className="dropdown-divider" />
              <a className="dropdown-item nav-link" href="/orcamentosconcluidos">Orçamentos Concluidos</a>
            </div>
            
              {/* <ul class="dropdown">
  
              <li><a href="/orcamentoscliente">OrçamentosClientes</a></li>
              <li><a href="/orcamentosconcluidos">OrçamentosConcluidos</a></li>
  
              </ul> */}
  
            </li>
            
            {/* <li class="nav-item right"><a className="nav-link" data-toggle="tab" href="/">Sair</a></li> */}
            <LogoutButton className="nav-link" data-toggle="tab" href="/" />
          </ul>

         
          
  
        
  
  
        </div>

          )
      }

}



export default Navbar;