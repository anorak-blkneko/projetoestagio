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
        PubSub.subscribe('edit-telefone', (topic, telefone) =>{
            console.log("pubsub telefone")
            console.log(telefone.id_pessoa)
            this.setState({DropV: telefone.id_pessoa});
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

class FormTel extends Component {

    state = {model: {id_telefone: 0, id_pessoa: 0, telefone: ''}};

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
        this.setState({ model: {id_telefone: 0, id_pessoa: 0, telefone: ''} })
        this.props.telefonesCreate(this.state.model);
    }

    componentDidMount(){
        PubSub.subscribe('edit-telefone', (topic, telefone) =>{
            this.setState({model: telefone});
        });
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-12">

                        <label >Telefone:</label>
                        <Input id="telefone" type="text" value={this.state.model.telefone} placeholder="Numero de telefone..." onChange={e => this.setValues(e, 'telefone')}></Input>
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

class LestTel extends Component {

    state = {
        pessoas: [],
    }

    delete = (id_telefone) => {
        this.props.deletetelefones(id_telefone);
    }

    onEdit = (telefones) => {
        PubSub.publish('edit-telefone', telefones);
    }


    Url = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';
    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(pessoas => this.setState({pessoas}))
            .catch(e => console.log(e));

    }

    
    render() {

        const {telefones} = this.props;
        console.log(telefones);

        return (
            <Table className="table-bordered text-center table-striped">
                <thead className="table-dark">
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Nome da Pessoa</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        telefones.map(telefones => (
                            
                            <tr key={telefones.id_telefone}>
                                {/* <td>{telefones.id_telefone}</td> */}
                                <td>{this.state.pessoas.filter(pes => pes.id_pessoa == telefones.id_pessoa).map(filpes => filpes.nome_pessoa)}</td>
                                <td>{telefones.telefone}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e=> this.onEdit(telefones)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(telefones.id_telefone)}>Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }

}

export default class TelBox extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/telefone';

    state = {
        telefones: [],
        message: { text: 'Nessa página você pode cadastrar, deletar e alterar telefones.', alert: '' }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(telefones => this.setState({telefones}))
            .catch(e => console.log(e));

    }

    save = (telefones) => {
        let data = {
            id_telefone: parseInt(telefones.id_telefone),
            id_pessoa: parseInt(telefones.id_pessoa),
            telefone: telefones.telefone,
        };
        console.log("data: ");
        console.log(data);
        const requestInfo = {
            method: data.id_telefone !== 0? 'PATCH': 'POST' ,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };


        if(data.id_telefone === 0){
            //CREATE

            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .finally(newtelefone => {
                console.log("then2");
                newtelefone = data;
                console.log("new telefone:" + newtelefone);
                let { telefones } = this.state;
                telefones.push(newtelefone);
                this.setState({telefones, message: { text: 'telefone cadastrado com sucesso! Recarregando...', alert: 'success' }});
                this.timerMessage(3500);
                this.timerRefresh(3500);
                
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id_telefone}`, requestInfo)
            .then(response => response.json())
            .finally(updatedtelefone => {
                console.log("edit then2")
                updatedtelefone = data;
                console.log("updatetelefone:" + updatedtelefone);
                let { telefones} = this.state;
                let position = telefones.findIndex(telefones => telefones.id_telefone === data.id_telefone);
                telefones[position] = updatedtelefone;
                this.setState({telefones, message: { text: 'telefone atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));

        }


        /* if(data.id === 0){
            //CREATE
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newtelefone => {
                console.log("then2");
                let { telefones} = this.state;
                telefones.push(newtelefone);
                this.setState({telefones, message: { text: 'Serviço cadastrado com sucesso!', alert: 'success' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedtelefone => {
                let { telefones} = this.state;
                let position = telefones.findIndex(telefones => telefones.id_telefone=== data.id);
                telefones[position] = updatedtelefone;
                this.setState({telefones, message: { text: 'Serviço atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        } */

        
    }

    delete = (id_telefone) => {
        fetch(`${this.Url}/${id_telefone}`, {method: 'DELETE'})
            .then(response => response.json())
            .finally(rows => {
                const telefones = this.state.telefones.filter(telefones => telefones.id_telefone !== id_telefone);
                this.setState({ telefones, message: { text: 'telefone deletado com sucesso!', alert: 'danger' } });
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: 'Nessa página você pode cadastrar, deletar e alterar telefones.', alert: ''} });

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
                    this.state.message.text !== 'Nessa página você pode cadastrar, deletar e alterar telefones.'? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : <Alert color='dark' className="text-center"> Nessa página você pode cadastrar, deletar e alterar telefones. </Alert>
                }
            
                <div className="row">
                    
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de telefone</h2>
                        <FormTel telefonesCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">

                        <h2 className="font-weight-bold text-center"> Lista de telefone</h2>
                        <LestTel telefones={this.state.telefones} deletetelefones={this.delete} />
                    </div>

                </div>

            </div>
        );
    }
}