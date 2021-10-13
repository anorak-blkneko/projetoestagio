import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import { Table, Button, Form, FormGroup, Label, Input, Alert  } from 'reactstrap';
import { getDefaultNormalizer } from '@testing-library/dom';

const disablebtn = false;

class PessoaImport extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';

    state = {
        pessoas: [],
        DropV: null
    }

    componentDidMount() {
        PubSub.subscribe('edit-email', (topic, email) =>{
            console.log("pubsub endereco")
            console.log(email.id_pessoa)
            this.setState({DropV: email.id_pessoa});
        });


        fetch(this.Url)
            .then(Response => Response.json())
            .then(pessoas => this.setState({pessoas}))
            .catch(e => console.log(e));

    }

    InputChange = (params) => {
        this.setState({DropV: params.target.value})
        this.props.changeHandler(params.target.value);
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

class FormEmail extends Component {

    state = {model: {id_email: 0, id_pessoa: 0, email: ''}};

    handlestate(e){
        //this.setState({ id_pessoa: e.target.value});
       // this.state.model.id_pessoa = e;
        
        console.log("Handle E");
        console.log(e);
        this.setValuesPe(e, "id_pessoa")
        //this.setState({ id_pessoa: e});
        
    }

    setValuesPe = (e, field) => {
        const { model } = this.state;
        model[field] = e;
        this.setState({model});
    }

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({model});
    }

    create = () => {
        this.setState({ model: {id_email: 0, id_pessoa: 0, email: ''} })
        this.props.emailsCreate(this.state.model);
    }

    componentDidMount(){
        PubSub.subscribe('edit-email', (topic, email) =>{
            this.setState({model: email});
        });
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-12">

                        <label >Email:</label>
                        <Input id="email" type="text" value={this.state.model.email} placeholder="Endereço de Email..." onChange={e => this.setValues(e, 'email')}></Input>
                        </div>
                        

                    </div>
                    
                    
                </FormGroup>
                

                <FormGroup>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">

                        <label >Pessoa:</label>
                        <PessoaImport changeHandler={this.handlestate.bind(this)} />


                        </div>
                    </div> 
                </FormGroup>
                <br/>

                <Button color="primary" id="btnreg" onClick={this.create} disabled={disablebtn}> Registrar</Button>
                
            </Form>
            
        );
    }
}

class ListEmail extends Component {

    state = {
        pessoas: [],
    }

    delete = (id_email) => {
        this.props.deleteemails(id_email);
    }

    onEdit = (emails) => {
        PubSub.publish('edit-email', emails);
    }


    Url = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';
    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(pessoas => this.setState({pessoas}))
            .catch(e => console.log(e));

    }

    
    render() {

        const {emails} = this.props;
        console.log(emails);

        return (
            <Table className="table-bordered text-center table-striped">
                <thead className="table-dark">
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Nome da Pessoa</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        emails.map(emails => (
                            
                            <tr key={emails.id_email}>
                                {/* <td>{emails.id_email}</td> */}
                                <td>{this.state.pessoas.filter(pes => pes.id_pessoa == emails.id_pessoa).map(filpes => filpes.nome_pessoa)}</td>
                                <td>{emails.email}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e=> this.onEdit(emails)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(emails.id_email)}>Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }

}

export default class EmailBox extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/email';

    state = {
        emails: [],
        message: { text: 'Nessa página você pode cadastrar, deletar e alterar Emails.', alert: '' }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(emails => this.setState({emails}))
            .catch(e => console.log(e));

    }

    save = (emails) => {
        let data = {
            id_email: parseInt(emails.id_email),
            id_pessoa: parseInt(emails.id_pessoa),
            email: emails.email,
        };
        console.log("data: " + data);
        const requestInfo = {
            method: data.id_email !== 0? 'PATCH': 'POST' ,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };


        if(data.id_email === 0){
            //CREATE

            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .finally(newemail => {
                console.log("then2");
                newemail = data;
                console.log("new email:" + newemail);
                let { emails } = this.state;
                emails.push(newemail);
                this.setState({emails, message: { text: 'Email cadastrado com sucesso! Recarregando...', alert: 'success' }});
                this.timerMessage(3500);
                this.timerRefresh(3500);
                
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id_email}`, requestInfo)
            .then(response => response.json())
            .finally(updatedemail => {
                console.log("edit then2")
                updatedemail = data;
                console.log("updateemail:" + updatedemail);
                let { emails} = this.state;
                let position = emails.findIndex(emails => emails.id_email === data.id_email);
                emails[position] = updatedemail;
                this.setState({emails, message: { text: 'Email atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));

        }


        /* if(data.id === 0){
            //CREATE
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newemail => {
                console.log("then2");
                let { emails} = this.state;
                emails.push(newemail);
                this.setState({emails, message: { text: 'Serviço cadastrado com sucesso!', alert: 'success' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedemail => {
                let { emails} = this.state;
                let position = emails.findIndex(emails => emails.id_email=== data.id);
                emails[position] = updatedemail;
                this.setState({emails, message: { text: 'Serviço atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        } */

        
    }

    delete = (id_email) => {
        fetch(`${this.Url}/${id_email}`, {method: 'DELETE'})
            .then(response => response.json())
            .finally(rows => {
                const emails = this.state.emails.filter(emails => emails.id_email !== id_email);
                this.setState({ emails, message: { text: 'Email deletado com sucesso!', alert: 'danger' } });
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: 'Nessa página você pode cadastrar, deletar e alterar Emails.', alert: ''} });

        }, duration);
        
    }

    timerRefresh = (duration) => {
        setTimeout(() => {
           // window.location.reload();
            

        }, duration);
        
    }


    render() {
        return (
            <div>
                {
                    this.state.message.text !== 'Nessa página você pode cadastrar, deletar e alterar Emails.'? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : <Alert color='dark' className="text-center"> Nessa página você pode cadastrar, deletar e alterar Emails. </Alert>
                }
            
                <div className="row">
                    
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de Email</h2>
                        <FormEmail emailsCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">

                        <h2 className="font-weight-bold text-center"> Lista de Email</h2>
                        <ListEmail emails={this.state.emails} deleteemails={this.delete} />
                    </div>

                </div>

            </div>
        );
    }
}