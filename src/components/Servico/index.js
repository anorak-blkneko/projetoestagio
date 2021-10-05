import React, { Component } from 'react';

import { Table, Button, Form, FormGroup, Label, Input  } from 'reactstrap';

class FormServ extends Component {

    state = {model: {id_servico: 0, nome: ''}};

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({model});
    }

    create = () => {
        let data = {
            id: parseInt(this.state.model.id_servico),
            nome: this.state.model.nome,
        };
        console.log(data)
        this.props.servicesCreate(data);
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
                                    <Button color="info" size="sm">Editar</Button>
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
    }

    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(services => this.setState({services}))
            .catch(e => console.log(e));

    }

    create = (services) => {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(services),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };
        fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newService => {
                let { services} = this.state;
                services.push(newService);
                this.setState({services});
            })
            .catch(e => console.log(e));
    }

    delete = (id_servico) => {
        fetch(`${this.Url}/${id_servico}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(rows => {
                const services = this.state.services.filter(services => services.id_servico != id_servico);
                this.setState({ services });
            })
            .catch(e => console.log(e));
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-6 my-3">
                    <h2 className="font-weight-bold text-center"> Cadastro de Serviços</h2>
                    <FormServ servicesCreate={this.create} />
                </div>
                <div className="col-md-6 my-3">

                    <h2 className="font-weight-bold text-center"> Lista de Serviços</h2>
                    <ListServ services={this.state.services} deleteServices={this.delete} />
                </div>

            </div>
        );
    }
}