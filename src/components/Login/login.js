import React, { Component } from 'react';

import { Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory  } from "react-router-dom";


import App from '../../App'
import "./stylelogin.css"
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import HomeButton from './HomeButton';

class Login extends Component {

  state = {
    usuarios: [],
    nome: "",
    senha: "",
    val: false,
    message: { text: 'Ops, parece que você não está logado, para prosseguir, efetue o login.', alert: 'dark' },
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

  timerMessage = (duration) => {
    setTimeout(() => {
        this.setState({ message: { text: 'Ops, parece que você não está logado, para prosseguir, efetue o login.', alert: 'dark'} });
        this.forceUpdate();

    }, duration);
    
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

      if(!b){
        this.setState({message: { text: 'Usuario ou senha incorreto', alert: 'danger' }});
      }
      else{
        this.setState({message: { text: 'Logado com sucesso! Clique no botão "Entrar" para prosseguir', alert: 'success' }});
      }
      /* console.log(this.state.val) */
      this.timerMessage(3500);
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

          <br/>

                  {
                    this.state.message.text !== 'Ops, parece que você não está logado, para prosseguir, efetue o login.'? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : <Alert color='dark' className="text-center"> Ops, parece que você não está logado, para prosseguir, efetue o login. </Alert>
                  }
          <div id="loginbox">
            <div class="col-sm-12 align-self-center">
              <div class="login-form">
                <form>

                  <div class="form-group">

                  <LoginButton />
                  <LogoutButton />
                  <HomeButton />

                  
                  

                  </div>

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