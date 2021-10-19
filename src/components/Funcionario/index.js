import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import { Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { getDefaultNormalizer } from '@testing-library/dom';

const disablebtn = false;

class PessoaImport extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';

    state = {
        pessoas: [],
        DropV: null
    }

    componentDidMount() {
        PubSub.subscribe('edit-funcionario', (topic, funcionario) =>{
            console.log("pubsub funcionario")
            console.log(funcionario.id_pessoa)
            this.setState({DropV: funcionario.id_pessoa});
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
        PubSub.subscribe('edit-funcionario', (topic, funcionario) =>{
            console.log("pubsub funcionario")
            console.log(funcionario.id_endereco)
            this.setState({DropV: funcionario.id_endereco});
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
        PubSub.subscribe('edit-funcionario', (topic, funcionario) =>{
            console.log("pubsub funcionario")
            console.log(funcionario.id_email)
            this.setState({DropV: funcionario.id_email});
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
        PubSub.subscribe('edit-funcionario', (topic, funcionario) =>{
            console.log("pubsub funcionario")
            console.log(funcionario.id_telefone)
            this.setState({DropV: funcionario.id_telefone});
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


class FormFunc extends Component {

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

    state = { model: { id_funcionario: 0, id_pessoa: 0, cpf: '', id_endereco: 0, id_email: 0, id_telefone: 0 } };

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({ model });
    }

    create = () => {
        this.setState({ model: { id_funcionario: 0, id_pessoa: 0, cpf: '', id_endereco: 0, id_email: 0, id_telefone: 0 } })
        this.props.funcionariosCreate(this.state.model);
    }

    componentDidMount() {
        PubSub.subscribe('edit-funcionario', (topic, funcionario) => {
            this.setState({ model: funcionario });
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

                            <label >cpf:</label>
                            <Input id="cpf" type="text" value={this.state.model.cpf} placeholder="cpf do Funcionário..." onChange={e => this.setValues(e, 'cpf')}></Input>
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


                <br />
                <Button color="primary" id="btnreg" onClick={this.create} disabled={disablebtn}> Registrar</Button>

            </Form>

        );
    }
}

class ListFunc extends Component {

    state = {
        pessoas: [],
        enderecos: [],
        email: [],
        telefone: [],
    }

    delete = (id_funcionario) => {
        this.props.deletefuncionarios(id_funcionario);
    }

    onEdit = (funcionarios) => {
        PubSub.publish('edit-funcionario', funcionarios);
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

        const { funcionarios } = this.props;
        console.log(funcionarios);

        return (
            <Table className="table-bordered text-center table-striped">
                <thead className="table-dark">
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Nome Pessoa</th>
                        <th>CPF</th>
                        <th>Endereco</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        funcionarios.map(funcionarios => (

                            <tr key={funcionarios.id_funcionario}>
                                {/* <td>{funcionarios.id_funcionario}</td> */}
                                <td>{this.state.pessoas.filter(pes => pes.id_pessoa == funcionarios.id_pessoa).map(filpes => filpes.nome_pessoa)}</td>
                                <td>{funcionarios.cpf}</td>
                                <td>{this.state.enderecos.filter(end => end.id_endereco == funcionarios.id_endereco).map(filend => filend.logradouro)}</td>
                                <td>{this.state.email.filter(mail => mail.id_email == funcionarios.id_email).map(filmail => filmail.email)}</td>
                                <td>{this.state.telefone.filter(tel => tel.id_telefone == funcionarios.id_telefone).map(filtel => filtel.telefone)}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e => this.onEdit(funcionarios)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(funcionarios.id_funcionario)}>Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }

}

export default class FuncBox extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/funcionario';

    state = {
        funcionarios: [],
        message: { text: 'Nessa página você pode cadastrar, deletar e alterar Funcionários.', alert: '' }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(funcionarios => this.setState({ funcionarios }))
            .catch(e => console.log(e));

    }

    save = (funcionarios) => {
        let data = {
            id_funcionario: parseInt(funcionarios.id_funcionario),
            id_pessoa: parseInt(funcionarios.id_pessoa),
            cpf: funcionarios.cpf,
            id_endereco: parseInt(funcionarios.id_endereco),
            id_email: parseInt(funcionarios.id_email),
            id_telefone: parseInt(funcionarios.id_telefone),
        };
        console.log("data: " + data);
        const requestInfo = {
            method: data.id_funcionario !== 0 ? 'PATCH' : 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };


        if (data.id_funcionario === 0) {
            //CREATE

            fetch(this.Url, requestInfo)
                .then(response => response.json())
                .finally(newfuncionario => {
                    console.log("then2");
                    newfuncionario = data;
                    console.log("new funcionario:" + newfuncionario);
                    let { funcionarios } = this.state;
                    funcionarios.push(newfuncionario);
                    this.setState({ funcionarios, message: { text: 'Funcionário cadastrado com sucesso! Recarregando...', alert: 'success' } });
                    this.timerMessage(3500);
                    this.timerRefresh(3500);

                })
                .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id_funcionario}`, requestInfo)
                .then(response => response.json())
                .finally(updatedfuncionario => {
                    console.log("edit then2")
                    updatedfuncionario = data;
                    console.log("updatefuncionario:" + updatedfuncionario);
                    let { funcionarios } = this.state;
                    let position = funcionarios.findIndex(funcionarios => funcionarios.id_funcionario === data.id_funcionario);
                    funcionarios[position] = updatedfuncionario;
                    this.setState({ funcionarios, message: { text: 'Funcionário atualizado com sucesso!', alert: 'info' } });
                    this.timerMessage(4000);
                })
                .catch(e => console.log(e));

        }


        /* if(data.id === 0){
            //CREATE
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newfuncionario => {
                console.log("then2");
                let { funcionarios} = this.state;
                funcionarios.push(newfuncionario);
                this.setState({funcionarios, message: { text: 'Funcionário cadastrado com sucesso!', alert: 'success' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedfuncionario => {
                let { funcionarios} = this.state;
                let position = funcionarios.findIndex(funcionarios => funcionarios.id_funcionario=== data.id);
                funcionarios[position] = updatedfuncionario;
                this.setState({funcionarios, message: { text: 'Funcionário atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        } */


    }

    delete = (id_funcionario) => {
        fetch(`${this.Url}/${id_funcionario}`, { method: 'DELETE' })
            .then(response => response.json())
            .finally(rows => {
                const funcionarios = this.state.funcionarios.filter(funcionarios => funcionarios.id_funcionario !== id_funcionario);
                this.setState({ funcionarios, message: { text: 'Funcionário deletado com sucesso!', alert: 'danger' } });
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: 'Nessa página você pode cadastrar, deletar e alterar Funcionários.', alert: '' } });

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
                    this.state.message.text !== 'Nessa página você pode cadastrar, deletar e alterar Funcionários.' ? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : <Alert color='dark' className="text-center"> Nessa página você pode cadastrar, deletar e alterar Funcionários. </Alert>
                }

                <div className="row">

                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de Funcionários</h2>
                        <FormFunc funcionariosCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">

                        <h2 className="font-weight-bold text-center"> Lista de Funcionários</h2>
                        <ListFunc funcionarios={this.state.funcionarios} deletefuncionarios={this.delete} />
                    </div>

                </div>

            </div>
        );
    }
}