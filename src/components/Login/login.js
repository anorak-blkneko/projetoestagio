import React, { Component } from 'react';

import { Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory  } from "react-router-dom";


import App from '../../App'
import "./stylelogin.css"

class Login extends Component {

  state = {
    usuarios: [],
    nome: "",
    senha: "",
    val: false,
}

  UrlU = 'https://api-estagio-renan-augusto.herokuapp.com/usuarios';

  componentDidMount () {
    fetch(this.UrlU)
            .then(Response => Response.json())
            .then(usuarios => this.setState({usuarios}))
            .catch(e => console.log(e));


  }

  ChangeNameValue = (e) => {
    this.setState({nome: e.target.value})
    /* console.log("name value:")
    console.log(this.state.nome) */
  }

  ChangeSenhaValue = (e) => {
    this.setState({senha: e.target.value})
    /* console.log("senha value:")
    console.log(this.state.senha) */
  }

  ValidadeData = () => {

    /* console.log("validate")
    console.log(this.state.usuarios)

    console.log(this.state.usuarios.some(u => u.nome_usuario === "tese" && u.senha_usuario === "123"))
     // console.log("deu")
     console.log("Verificar Nome:")
     console.log(this.state.nome)
     console.log("Verificar Senha:")
     console.log(this.state.senha) */



      var b = this.state.usuarios.some(u => u.nome_usuario === this.state.nome && u.senha_usuario === this.state.senha)
      this.state.val = b;
      /* console.log(this.state.val) */
      this.forceUpdate();

    
  }


  render() {
    return (

      <div>

        <div class="sidenav">
          <div class="login-main-text">
            {/* <h2>Elipse<br />Projetos industriais<br />&<br />Desenhos técnicos</h2> */}
            <img src="./elipseFullPNG.png" className="imgfit" />
          </div>
        </div>
        <div class="main">
          <div id="loginbox">
            <div class="col-sm-12 align-self-center">
              <div class="login-form">
                <form>
                  <div class="form-group">
                    <label>Usuário:</label>
                    <input id="USRBTN" type="text" class="form-control" placeholder="Usuário" value={this.state.nome} onChange={this.ChangeNameValue} />
                  </div>
                  <div class="form-group">
                    <label>Senha:</label>
                    <input
                      id="PASBTN"
                      type="password"
                      class="form-control"
                      placeholder="Senha"
                      value={this.state.senha}
                      onChange={this.ChangeSenhaValue}
                    />
                  </div>
                  {/* <button onClick={ () => this.ValidadeData()} class="btn btn-black">Login</button> */}
                  <a onClick={() => this.ValidadeData()} class="btn btn-primary">Autenticar</a>
{/* <button type="submit" class="btn btn-secondary">Register</button> */}
                  <a href="/Home" hidden={!this.state.val} class="btn btn-primary">Entrar</a>
                  {/* <a href="" class="btn btn-primary">Registrar</a> */}
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>




    )
  }

}






export default Login;