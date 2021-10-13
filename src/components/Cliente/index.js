import React, { Component, useState, useEffect } from 'react';
import PubSub from 'pubsub-js';

import { Table, Button, Form, FormGroup, Label, Input, Alert  } from 'reactstrap';
import { getDefaultNormalizer } from '@testing-library/dom';

import "../StyleSheet.css";

const disablebtn = false;



class PessoaImport extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';

    state = {
        pessoas: [],
        DropV: null
    }

    componentDidMount() {
        PubSub.subscribe('edit-cliente', (topic, cliente) =>{
            console.log("pubsub cliente")
            console.log(cliente.id_pessoa)
            this.setState({DropV: cliente.id_pessoa});
        });


        fetch(this.Url)
            .then(Response => Response.json())
            .then(pessoas => this.setState({pessoas}))
            .catch(e => console.log(e));

    }

    InputChange = (params) => {
        this.setState({DropV: params.target.value})
        this.props.changeHandler(params.target.value, "id_pessoa");
        console.log("param")
        console.log(params.target.value)
    }



    

    render() {
        
        
        const {pessoas} = this.props;
        

        return(
            <div>
                <center>
                    <select className="DropdownC" onChange={e=>(this.InputChange(e))} value={this.state.DropV}>
                        <option disabled selected>-- Selecione --</option>
                        {
                            this.state.pessoas.map(x=>{
                                return(
                                    <option title={x.id_pessoa} value={x.id_pessoa} >{x.nome_pessoa}</option>
                                    
                                )
                                
                            })
                            
                        }
                        
                    </select>
    
                    
                </center>
                
    
                
            </div>
            
        );

    }

    

}

class EnderecoImport extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/endereco';

    state = {
        enderecos: [],
        DropV: null
    }

    componentDidMount() {
        PubSub.subscribe('edit-cliente', (topic, cliente) =>{
            console.log("pubsub cliente")
            console.log(cliente.id_endereco)
            this.setState({DropV: cliente.id_endereco});
        });


        fetch(this.Url)
            .then(Response => Response.json())
            .then(enderecos => this.setState({enderecos}))
            .catch(e => console.log(e));

    }

    InputChange = (params) => {
        this.setState({DropV: params.target.value})
        this.props.changeHandler(params.target.value, "id_endereco");
        console.log("param")
        console.log(params.target.value)
    }



    

    render() {
        
        
        const {enderecos} = this.props;
        

        return(
            <div>
                <center>
                    <select className="DropdownC" onChange={e=>(this.InputChange(e))} value={this.state.DropV}>
                        <option disabled selected>-- Selecione --</option>
                        {
                            this.state.enderecos.map(x=>{
                                return(
                                    <option title={x.id_endereco} value={x.id_endereco} >{x.logradouro}</option>
                                    
                                )
                                
                            })
                            
                        }
                        
                    </select>
    
                    
                </center>
                
    
                
            </div>
            
        );

    }

    

}

class EmailImport extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/email';

    state = {
        emails: [],
        DropV: null
    }

    componentDidMount() {
        PubSub.subscribe('edit-cliente', (topic, cliente) =>{
            console.log("pubsub cliente")
            console.log(cliente.id_email)
            this.setState({DropV: cliente.id_email});
        });


        fetch(this.Url)
            .then(Response => Response.json())
            .then(emails => this.setState({emails}))
            .catch(e => console.log(e));

    }

    InputChange = (params) => {
        this.setState({DropV: params.target.value})
        this.props.changeHandler(params.target.value, "id_email");
        console.log("param")
        console.log(params.target.value)
    }



    

    render() {
        
        
        const {emails} = this.props;
        

        return(
            <div>
                <center>
                    <select className="DropdownC" onChange={e=>(this.InputChange(e))} value={this.state.DropV}>
                        <option disabled selected>-- Selecione --</option>
                        {
                            this.state.emails.map(x=>{
                                return(
                                    <option title={x.id_email} value={x.id_email} >{x.email}</option>
                                    
                                )
                                
                            })
                            
                        }
                        
                    </select>
    
                    
                </center>
                
    
                
            </div>
            
        );

    }

    

}

class TelefoneImport extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/telefone';

    state = {
        telefones: [],
        DropV: null
    }

    componentDidMount() {
        PubSub.subscribe('edit-cliente', (topic, cliente) =>{
            console.log("pubsub cliente")
            console.log(cliente.id_telefone)
            this.setState({DropV: cliente.id_telefone});
        });


        fetch(this.Url)
            .then(Response => Response.json())
            .then(telefones => this.setState({telefones}))
            .catch(e => console.log(e));

    }

    InputChange = (params) => {
        this.setState({DropV: params.target.value})
        this.props.changeHandler(params.target.value, "id_telefone");
        console.log("param")
        console.log(params.target.value)
    }



    

    render() {
        
        
        const {telefones} = this.props;
        

        return(
            <div>
                <center>
                    <select className="DropdownC" onChange={e=>(this.InputChange(e))} value={this.state.DropV}>
                        <option disabled selected>-- Selecione --</option>
                        {
                            this.state.telefones.map(x=>{
                                return(
                                    <option title={x.id_telefone} value={x.id_telefone} >{x.telefone}</option>
                                    
                                )
                                
                            })
                            
                        }
                        
                    </select>
    
                    
                </center>
                
    
                
            </div>
            
        );

    }

    

}




class FormCli extends Component {


    /* constructor(props) {
        super(props)
        this.state = {model: {id_pessoa: 0, id_pessoa: 0, uf: '', complemento: '', logradouro: '', cep: '', numero: ''}};
        //this.handlestate = this.handlestate.bind(this);
        
    } */

    handlestate(e, field){
        //this.setState({ id_pessoa: e.target.value});
       // this.state.model.id_pessoa = e;
        
        console.log("Handle E");
        console.log(e);
        console.log("Handle field");
        console.log(field);
        this.setValuesPe(e, field)
        //this.setState({ id_pessoa: e});
        
    }

    setValuesPe = (e, field) => {
        const { model } = this.state;
        model[field] = e;
        this.setState({model});
    }

    state = {model: {id_cliente: 0, id_pessoa: 0, cnpj: '', id_endereco: 0, id_email: 0, id_telefone: 0}};


    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({model});
    }

    create = () => {
        //this.setState({ model: {id_pessoa: 0, id_pessoa: 3, uf: '', complemento: '', logradouro: '', cep: '', numero: ''} })
        this.props.clientesCreate(this.state.model);
    }

    componentDidMount(){
        PubSub.subscribe('edit-cliente', (topic, cliente) =>{
            this.setState({model: cliente});
        });
    }

    


    render() {
        return (
            <Form>

                <FormGroup>
                    <div className="row">
                        <div className="col-md-12">

                        <label >Pessoa:</label>
                        <PessoaImport changeHandler={this.handlestate.bind(this)} />


                        </div>
                    </div> 
                </FormGroup>

                <br/>

                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-12">

                        <label >CNPJ:</label>
                        <Input id="cnpj" type="text" value={this.state.model.cnpj} placeholder="cnpj..." onChange={e => this.setValues(e, 'cnpj')}></Input>
                        </div>
                    </div> 
                </FormGroup>

                <br/>

                <FormGroup>
                    <div className="row">
                        <div className="col-md-12">

                        <label >Enderecos:</label>
                        <EnderecoImport changeHandler={this.handlestate.bind(this)} />


                        </div>
                    </div> 
                </FormGroup>

                <br/>

                <FormGroup>
                    <div className="row">
                        <div className="col-md-12">

                        <label >Email:</label>
                        <EmailImport changeHandler={this.handlestate.bind(this)} />


                        </div>
                    </div> 
                </FormGroup>

                <br/>

                <FormGroup>
                    <div className="row">
                        <div className="col-md-12">

                        <label >Telefone:</label>
                        <TelefoneImport changeHandler={this.handlestate.bind(this)} />


                        </div>
                    </div> 
                </FormGroup>

                <br/>
                <Button color="primary" id="btnreg" onClick={this.create} disabled={disablebtn}> Registrar</Button>
                
            </Form>
            
        );
    }
}

class ListCli extends Component {

    state = {
        pessoas: [],
        enderecos: [],
        email: [],
        telefone: [],
    }

    delete = (id_pessoa) => {
        this.props.deleteclientes(id_pessoa);
    }

    onEdit = (clientes) => {
        PubSub.publish('edit-cliente', clientes);
    }

    UrlP = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';
    UrlE = 'https://api-estagio-renan-augusto.herokuapp.com/endereco';
    UrlM = 'https://api-estagio-renan-augusto.herokuapp.com/email';
    UrlT = 'https://api-estagio-renan-augusto.herokuapp.com/telefone';
    componentDidMount() {
        fetch(this.UrlP)
            .then(Response => Response.json())
            .then(pessoas => this.setState({pessoas}))
            .catch(e => console.log(e));


        fetch(this.UrlE)
        .then(Response => Response.json())
        .then(enderecos => this.setState({enderecos}))
        .catch(e => console.log(e));


        fetch(this.UrlM)
        .then(Response => Response.json())
        .then(email => this.setState({email}))
        .catch(e => console.log(e));


        fetch(this.UrlT)
        .then(Response => Response.json())
        .then(telefone => this.setState({telefone}))
        .catch(e => console.log(e));

    }

    
    render() {

        const {clientes} = this.props;
        console.log(clientes);
        console.log("List pessoas")
        console.log(this.state.pessoas.filter(p => p.id_pessoa == 2).map(fp => fp.nome_pessoa))

        return (
            <Table className="table-bordered text-center table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Nome Pessoa</th>
                        <th>CNPJ</th>
                        <th>Endereço</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        clientes.map(clientes => (
                            
                            <tr key={clientes.id_cliente}>
                                <td>{this.state.pessoas.filter(pes => pes.id_pessoa == clientes.id_pessoa).map(filpes => filpes.nome_pessoa)}</td>
                                <td>{clientes.cnpj}</td>
                                <td>{this.state.enderecos.filter(end => end.id_endereco == clientes.id_endereco).map(filend => filend.logradouro)}</td>
                                <td>{this.state.email.filter(mail => mail.id_email == clientes.id_email).map(filmail => filmail.email)}</td>
                                <td>{this.state.telefone.filter(tel => tel.id_telefone == clientes.id_telefone).map(filtel => filtel.telefone)}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e=> this.onEdit(clientes)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(clientes.id_pessoa)}>Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }

}

export default class CliBox extends Component {


    Url = 'https://api-estagio-renan-augusto.herokuapp.com/cliente';

    state = {
        clientes: [],
        message: { text: 'Nessa página você pode cadastrar, deletar e alterar clientes.', alert: '' }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(clientes => this.setState({clientes}))
            .catch(e => console.log(e));

    }

    save = (clientes) => {
        let data = {
            id_cliente: parseInt(clientes.id_cliente),
            id_pessoa: parseInt(clientes.id_pessoa),
            cnpj: clientes.cnpj,
            id_endereco: parseInt(clientes.id_endereco),
            id_email: parseInt(clientes.id_email),
            id_telefone: parseInt(clientes.id_telefone),
        };
        console.log("clientes: ");
        console.log(clientes);
        console.log("data: ");
        console.log(data);
        const requestInfo = {
            method: data.id_cliente !== 0? 'PATCH': 'POST' ,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };


        if(data.id_cliente === 0){
            //CREATE

            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .finally(newcliente => {
                console.log("then2");
                newcliente = data;
                console.log("new cliente:");
                console.log(newcliente);
                let { clientes } = this.state;
                clientes.push(newcliente);
                this.setState({clientes, message: { text: 'Cliente cadastrado com sucesso! Recarregando...', alert: 'success' }});
                this.timerMessage(3500);
                this.timerRefresh(3500);
                
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id_cliente}`, requestInfo)
            .then(response => response.json())
            .finally(updatedcliente => {
                console.log("edit then2")
                updatedcliente = data;
                console.log("updatecliente:" + updatedcliente);
                let { clientes} = this.state;
                let position = clientes.findIndex(clientes => clientes.id_cliente === data.id_cliente);
                clientes[position] = updatedcliente;
                this.setState({clientes, message: { text: 'Cliente atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));

        }


        /* if(data.id === 0){
            //CREATE
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newcliente => {
                console.log("then2");
                let { clientes} = this.state;
                clientes.push(newcliente);
                this.setState({clientes, message: { text: 'Serviço cadastrado com sucesso!', alert: 'success' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedcliente => {
                let { clientes} = this.state;
                let position = clientes.findIndex(clientes => clientes.id_pessoa=== data.id);
                clientes[position] = updatedcliente;
                this.setState({clientes, message: { text: 'Serviço atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        } */

        
    }

    delete = (id_cliente) => {
        fetch(`${this.Url}/${id_cliente}`, {method: 'DELETE'})
            .then(response => response.json())
            .finally(rows => {
                const clientes = this.state.clientes.filter(clientes => clientes.id_cliente !== id_cliente);
                this.setState({ clientes, message: { text: 'Cliente deletado com sucesso!', alert: 'danger' } });
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: 'Nessa página você pode cadastrar, deletar e alterar clientes.', alert: ''} });

        }, duration);
        
    }

    timerRefresh = (duration) => {
        setTimeout(() => {
           window.location.reload();
            

        }, duration);
        
    }


    render() {
        return (
            <div>
                {
                    this.state.message.text !== 'Nessa página você pode cadastrar, deletar e alterar clientes.'? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : <Alert color='dark' className="text-center"> Nessa página você pode cadastrar, deletar e alterar clientes. </Alert>
                }
            
                <div className="row">
                    
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de clientes</h2>
                        <FormCli
                     clientesCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">

                        <h2 className="font-weight-bold text-center"> Lista de clientes</h2>
                        <ListCli
                     clientes={this.state.clientes} deleteclientes={this.delete} />
                    </div>

                </div>

            </div>
        );
    }
}