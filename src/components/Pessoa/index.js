import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import { Table, Button, Form, FormGroup, Label, Input, Alert  } from 'reactstrap';
import { getDefaultNormalizer } from '@testing-library/dom';

const disablebtn = false;

class FormServ extends Component {

    state = {model: {id_pessoa: 0, nome_pessoa: ''}};

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({model});
    }

    create = () => {
        this.setState({ model: {id_pessoa: 0, nome_pessoa: ''} })
        this.props.pessoasCreate(this.state.model);
    }

    componentDidMount(){
        PubSub.subscribe('edit-pessoa', (topic, pessoa) =>{
            this.setState({model: pessoa});
        });
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-12">

                        <label >Nome:</label>
                        <Input id="nome" type="text" value={this.state.model.nome_pessoa} placeholder="Nome da pessoa..." onChange={e => this.setValues(e, 'nome_pessoa')}></Input>
                        </div>
                        

                    </div>
                    
                    
                </FormGroup>
                <br/>
                <Button color="primary" id="btnreg" onClick={this.create} disabled={disablebtn}> Registrar</Button>
                
            </Form>
            
        );
    }
}

class ListServ extends Component {

    delete = (id_pessoa) => {
        this.props.deletePessoas(id_pessoa);
    }

    onEdit = (pessoas) => {
        PubSub.publish('edit-pessoa', pessoas);
    }

    
    render() {

        const {pessoas} = this.props;
        console.log(pessoas);

        return (
            <Table className="table-bordered text-center table-striped">
                <thead className="table-dark">
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        pessoas.map(pessoas => (
                            
                            <tr key={pessoas.id_pessoa}>
                                {/* <td>{services.id_servico}</td> */}
                                <td>{pessoas.nome_pessoa}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e=> this.onEdit(pessoas)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(pessoas.id_pessoa)}>Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }

}

export default class ServBox extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';

    state = {
        pessoas: [],
        message: { text: 'Nessa página você pode cadastrar, deletar e alterar Pessoas.', alert: '' }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(pessoas => this.setState({pessoas}))
            .catch(e => console.log(e));

    }

    save = (pessoas) => {
        let data = {
            id_pessoa: parseInt(pessoas.id_pessoa),
            nome_pessoa: pessoas.nome_pessoa,
        };
        console.log("data:");
        console.log(data);
        const requestInfo = {
            method: data.id_pessoa !== 0? 'PATCH': 'POST' ,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };


        if(data.id_pessoa === 0){
            //CREATE

            
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .finally(newPessoa => {
                console.log("then2");
                newPessoa = data;
                console.log("new pessoa:");
                console.log(newPessoa);
                let { pessoas } = this.state;
                pessoas.push(newPessoa);
                this.setState({pessoas, message: { text: 'Pessoa cadastrada com sucesso! Recarregando...', alert: 'success' }});
                this.timerMessage(3500);
                this.timerRefresh(3500);
                
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            console.log("TO NO EDIT");
            fetch(`${this.Url}/${data.id_pessoa}`, requestInfo)
            .then(response => response.json())
            .finally(updatePessoa => {
                console.log("edit then2")
                updatePessoa = data;
                console.log("updateservice:" + updatePessoa);
                let { pessoas } = this.state;
                let position = pessoas.findIndex(pessoas => pessoas.id_pessoa === data.id_pessoa);
                pessoas[position] = updatePessoa;
                this.setState({pessoas, message: { text: 'Pessoa atualizada com sucesso!', alert: 'info' }});
                this.timerMessage(4000);
                <Alert color='dark' className="text-center"> Exemplo </Alert>
            })
            .catch(e => console.log(e));

        }


        /* if(data.id === 0){
            //CREATE
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newPessoa => {
                console.log("then2");
                let { services} = this.state;
                services.push(newPessoa);
                this.setState({services, message: { text: 'Serviço cadastrado com sucesso!', alert: 'success' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatePessoa => {
                let { services} = this.state;
                let position = services.findIndex(services => services.id_servico=== data.id);
                services[position] = updatePessoa;
                this.setState({services, message: { text: 'Serviço atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        } */

        
    }

    delete = (id_pessoa) => {
        fetch(`${this.Url}/${id_pessoa}`, {method: 'DELETE'})
            .then(response => response.json())
            .finally(rows => {
                const pessoas = this.state.pessoas.filter(pessoas => pessoas.id_pessoa !== id_pessoa);
                this.setState({ pessoas, message: { text: 'Pessoa deletada com sucesso!', alert: 'danger' } });
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: 'Nessa página você pode cadastrar, deletar e alterar Pessoas.', alert: ''} });
            

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
                    this.state.message.text !== 'Nessa página você pode cadastrar, deletar e alterar Pessoas.'? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : <Alert color='dark' className="text-center"> Nessa página você pode cadastrar, deletar e alterar Pessoas. </Alert>
                }
            
                <div className="row">
                    
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de Pessoas</h2>
                        <FormServ pessoasCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">

                        <h2 className="font-weight-bold text-center"> Lista de Pessoas</h2>
                        <ListServ pessoas={this.state.pessoas} deletePessoas={this.delete} />
                    </div>

                </div>

            </div>
        );
    }
}