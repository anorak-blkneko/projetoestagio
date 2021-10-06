import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import { Table, Button, Form, FormGroup, Label, Input, Alert  } from 'reactstrap';

class FormServ extends Component {

    state = {model: {id_servico: 0, nome: ''}};

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({model});
    }

    create = () => {
        this.setState({ model: {id_servico: 0, nome: ''} })
        this.props.servicesCreate(this.state.model);
    }

    componentDidMount(){
        PubSub.subscribe('edit-service', (topic, service) =>{
            this.setState({model: service});
        });
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-12">

                        <label >Nome:</label>
                        <Input id="nome" type="text" value={this.state.model.nome} placeholder="Nome do Serviço..." onChange={e => this.setValues(e, 'nome')}></Input>
                        </div>
                        

                    </div>
                    
                    
                </FormGroup>
                <br/>
                <Button color="primary" id="btnreg" onClick={this.create}> Registrar</Button>
                
            </Form>
            
        );
    }
}

class ListServ extends Component {

    delete = (id_servico) => {
        this.props.deleteServices(id_servico);
    }

    onEdit = (services) => {
        PubSub.publish('edit-service', services);
    }

    
    render() {

        const {services} = this.props;

        return (
            <Table className="table-bordered text-center table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map(services => (
                            <tr key={services.id_servico}>
                                <td>{services.id_servico}</td>
                                <td>{services.nome}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e=> this.onEdit(services)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(services.id_servico)}>Deletar</Button>
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

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/servico';

    state = {
        services: [],
        message: { text: '', alert: '' }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(services => this.setState({services}))
            .catch(e => console.log(e));

    }

    save = (services) => {
        let data = {
            id: parseInt(services.id_servico),
            nome: services.nome,
        };
        console.log(data);
        const requestInfo = {
            method: data.id !== 0? 'PATCH': 'POST' ,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        if(data.id === 0){
            //CREATE
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newService => {
                let { services} = this.state;
                services.push(newService);
                this.setState({services, message: { text: 'Serviço cadastrado com sucesso!', alert: 'success' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedService => {
                let { services} = this.state;
                let position = services.findIndex(services => services.id_servico=== data.id);
                services[position] = updatedService;
                this.setState({services, message: { text: 'Serviço atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        }

        
    }

    delete = (id_servico) => {
        fetch(`${this.Url}/${id_servico}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(rows => {
                const services = this.state.services.filter(services => services.id_servico != id_servico);
                this.setState({ services, message: { text: 'Serviço deletado com sucesso!', alert: 'danger' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: '', alert: ''} });
        }, duration);
        
    }


    render() {
        return (
            <div>
                {
                    this.state.message.text !== ''? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : ''
                }
            
                <div className="row">
                    
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de Serviços</h2>
                        <FormServ servicesCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">

                        <h2 className="font-weight-bold text-center"> Lista de Serviços</h2>
                        <ListServ services={this.state.services} deleteServices={this.delete} />
                    </div>

                </div>

            </div>
        );
    }
}