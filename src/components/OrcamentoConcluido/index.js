import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import { Table, Button, Form, FormGroup, Label, Input, Alert  } from 'reactstrap';
import { getDefaultNormalizer } from '@testing-library/dom';
import moment from 'moment';

const disablebtn = false;

class ClienteImport extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/cliente';
    UrlP = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';

    state = {
        pessoas: [],
        clientes: [],
        DropV: null
    }

    componentDidMount() {
        PubSub.subscribe('edit-orcamento', (topic, orcamento) =>{
            console.log("pubsub orcamento")
            console.log(orcamento.id_cliente)
            this.setState({DropV: orcamento.id_cliente});
        });


        fetch(this.Url)
            .then(Response => Response.json())
            .then(clientes => this.setState({clientes}))
            .catch(e => console.log(e));


            fetch(this.UrlP)
            .then(Response => Response.json())
            .then(pessoas => this.setState({pessoas}))
            .catch(e => console.log(e));

    }

    InputChange = (params) => {
        this.setState({DropV: params.target.value})
        this.props.changeHandler(params.target.value, "id_cliente");
        console.log("param")
        console.log(params.target.value)
    }



    

    render() {
        
        
        const {clientes} = this.props;
        

        return(
            <div>
                <center>
                    <select className="DropdownC" onChange={e=>(this.InputChange(e))} value={this.state.DropV}>
                        <option disabled selected>-- Selecione --</option>
                        {
                            this.state.clientes.map(x=>{
                                return(
                                    <option title={x.id_cliente} value={x.id_cliente} >{this.state.pessoas.filter(pes => pes.id_pessoa == x.id_pessoa).map(filpes => filpes.nome_pessoa)}</option>
                                    
                                )
                                
                            })
                            
                        }
                        
                    </select>
    
                    
                </center>
                
    
                
            </div>
            
        );

    }

    

}

class FuncionarioImport extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/funcionario';
    UrlP = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';

    state = {
        pessoas: [],
        funcionarios: [],
        DropV: null
    }

    componentDidMount() {
        PubSub.subscribe('edit-orcamento', (topic, orcamento) =>{
            console.log("pubsub orcamento")
            console.log(orcamento.id_funcionario)
            this.setState({DropV: orcamento.id_funcionario});
        });


        fetch(this.Url)
            .then(Response => Response.json())
            .then(funcionarios => this.setState({funcionarios}))
            .catch(e => console.log(e));

            fetch(this.UrlP)
            .then(Response => Response.json())
            .then(pessoas => this.setState({pessoas}))
            .catch(e => console.log(e));
    

    }

    InputChange = (params) => {
        this.setState({DropV: params.target.value})
        this.props.changeHandler(params.target.value, "id_funcionario");
        console.log("param")
        console.log(params.target.value)
    }



    

    render() {
        
        
        const {funcionarios} = this.props;
        

        return(
            <div>
                <center>
                    <select className="DropdownC" onChange={e=>(this.InputChange(e))} value={this.state.DropV}>
                        <option disabled selected>-- Selecione --</option>
                        {
                            this.state.funcionarios.map(x=>{
                                return(
                                    <option title={x.id_funcionario} value={x.id_funcionario} >{this.state.pessoas.filter(pes => pes.id_pessoa == x.id_pessoa).map(filpes => filpes.nome_pessoa)}</option>
                                    
                                )
                                
                            })
                            
                        }
                        
                    </select>
    
                    
                </center>
                
    
                
            </div>
            
        );

    }

    

}

class ServicoImport extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/servico';

    state = {
        servicos: [],
        DropV: null
    }

    componentDidMount() {
        PubSub.subscribe('edit-orcamento', (topic, orcamento) =>{
            console.log("pubsub orcamento")
            console.log(orcamento.id_servico)
            this.setState({DropV: orcamento.id_servico});
        });


        fetch(this.Url)
            .then(Response => Response.json())
            .then(servicos => this.setState({servicos}))
            .catch(e => console.log(e));

    }

    InputChange = (params) => {
        this.setState({DropV: params.target.value})
        this.props.changeHandler(params.target.value, "id_servico");
        console.log("param")
        console.log(params.target.value)
    }



    

    render() {
        
        
        const {servicos} = this.props;
        

        return(
            <div>
                <center>
                    <select className="DropdownC" onChange={e=>(this.InputChange(e))} value={this.state.DropV}>
                        <option disabled selected>-- Selecione --</option>
                        {
                            this.state.servicos.map(x=>{
                                return(
                                    <option title={x.id_servico} value={x.id_servico} >{x.nome}</option>
                                    
                                )
                                
                            })
                            
                        }
                        
                    </select>
    
                    
                </center>
                
    
                
            </div>
            
        );

    }

    

}



class FormOrcCon extends Component {

    handlestateCri(e, field){
        //this.setState({ id_pessoa: e.target.value});
       // this.state.model.id_pessoa = e;
        
        console.log("Handle E");
        console.log(moment.utc(e).format('YYYY-MM-DD'));
        console.log("Handle field");
        console.log(field);
       // this.setValuesPe(e, field)
       console.log("handle state entered");
       this.forceUpdate();

       if(field == "data_criacao"){
            PubSub.publish('edit-orcamento-datas-cri', moment.utc(e).format('YYYY-MM-DD'), field);
       }

       
        
        //this.setState({ id_pessoa: e});
        
    }

    handlestateEnd(e, field){
        //this.setState({ id_pessoa: e.target.value});
       // this.state.model.id_pessoa = e;
        
        console.log("Handle E");
        console.log(moment.utc(e).format('YYYY-MM-DD'));
        console.log("Handle field");
        console.log(field);
       // this.setValuesPe(e, field)
       console.log("handle state entered");
       this.forceUpdate();

       if (field == "data_entrega"){
        PubSub.publish('edit-orcamento-end-datas', moment.utc(e).format('YYYY-MM-DD'), field);

       }

       
        
        //this.setState({ id_pessoa: e});
        
    }

    setValuesPe = (e, field) => {
        const { model } = this.state;
        model[field] = e;
        this.setState({model});
    }

    state = {model: {id_orcamento: 0, id_cliente: 0, id_funcionario: 0, id_servico: 0, data_criacao: '', data_entrega: '', valor: 0, status_andamento: ''}};

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({model});

        if(field == "data_criacao")
        this.handlestateCri(this.state.model.data_criacao, field);

        if(field == "data_entrega")
        this.handlestateEnd(this.state.model.data_entrega, field);


    }

    create = () => {
        this.setState({ model: {id_orcamento: 0, id_cliente: 0, id_funcionario: 0, id_servico: 0, data_criacao: '', data_entrega: '', valor: 0, status_andamento: ''} })
        this.props.orcamentosCreate(this.state.model);
    }

    componentDidMount(){
        PubSub.subscribe('edit-orcamento', (topic, orcamento) =>{
            this.setState({model: orcamento});
            console.log("Date:")
        console.log(this.state.model)
        console.log("Moment")
        //console.log(moment(this.state.model.data_criacao).add(1, 'day').format('YYYY/MM/DD'))
        //console.log(moment(this.state.model.data_criacao).add(1, 'day').format('DD/MM/YYYY'))
        });
    }


    render() {
        return (
            <Form>

                <FormGroup>
                    <div className="row">
                        <div className="col-md-6">
                            <Label>Data de Criação:</Label>
                            <Input id="data_criacao" type="date"  value={moment.utc(this.state.model.data_criacao).format('YYYY-MM-DD')} placeholder="" onChange={e => this.setValues(e, 'data_criacao') } />
                        </div>
                        <div className="col-md-6">
                            <Label>Data de Entrega:</Label>
                            <Input id="data_entrega" type="date" value={moment.utc(this.state.model.data_entrega).format('YYYY-MM-DD')} placeholder="" onChange={e => this.setValues(e, 'data_entrega') } />
                        </div>
                    </div>
                </FormGroup>

                <br/>
                
            </Form>
            
        );
    }
}

class ListOrcCon extends Component {

    state = {
        DataCri: '',
        DataEnd: '',
        orcamentosS: [],
        pessoas: [],
        clientes: [],
        funcionarios: [],
        servicos: [],
    }

    delete = (id_orcamento) => {
        this.props.deleteorcamentos(id_orcamento);
    }

    onEdit = (orcamentos) => {
        PubSub.publish('edit-orcamento', orcamentos);
    }

    UrlO = 'https://api-estagio-renan-augusto.herokuapp.com/orcamento';
    UrlP = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';
    UrlC = 'https://api-estagio-renan-augusto.herokuapp.com/cliente';
    UrlF = 'https://api-estagio-renan-augusto.herokuapp.com/funcionario';
    UrlS = 'https://api-estagio-renan-augusto.herokuapp.com/servico';
    componentDidMount() {
        fetch(this.UrlC)
            .then(Response => Response.json())
            .then(clientes => this.setState({clientes}))
            .catch(e => console.log(e));

        fetch(this.UrlP)
        .then(Response => Response.json())
        .then(pessoas => this.setState({pessoas}))
        .catch(e => console.log(e));


        fetch(this.UrlF)
        .then(Response => Response.json())
        .then(funcionarios => this.setState({funcionarios}))
        .catch(e => console.log(e));


        fetch(this.UrlS)
        .then(Response => Response.json())
        .then(servicos => this.setState({servicos}))
        .catch(e => console.log(e));

        fetch(this.UrlO)
        .then(Response => Response.json())
        .then(orcamentosS => this.setState({orcamentosS}))
        .catch(e => console.log(e));

        PubSub.subscribe('edit-orcamento-datas-cri', (topic, cri) =>{
            console.log("pubsub novo")
            console.log(cri)
            console.log("data value CRI")
            this.setState({DataCri: cri});
            console.log(this.state.DataCri)
            this.forceUpdate();
        });

        PubSub.subscribe('edit-orcamento-end-datas', (topic, end) =>{
            console.log("pubsub end")
            console.log(end)
            console.log("data value END")
            this.setState({DataEnd: end});
            console.log(this.state.DataEnd)
            this.forceUpdate();
        });

    }

    
    render() {

        const {orcamentos} = this.props;
        var TotalValue = 0;
        console.log(orcamentos);

        return (
            <div>

                <Table className="table-bordered text-center table-striped">
                <thead className="table-dark">
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Cliente</th>
                        <th>Funcionário</th>
                        <th>Serviço</th>
                        <th>Data de Criação</th>
                        <th>Data de Entrega</th>
                        <th>Valor</th>
                        <th>status_andamento</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.orcamentosS.filter(orc => orc.status_andamento.toUpperCase().trim() == 'CONCLUIDO' || orc.status_andamento.toUpperCase().trim() == 'CONCLUÍDO' ).filter(orc => (moment.utc(orc.data_criacao).format('YYYY-MM-DD')) >=  (moment.utc(this.state.DataCri).format('YYYY-MM-DD')) ).filter(orc => (moment.utc(orc.data_entrega).format('YYYY-MM-DD')) <= (moment.utc(this.state.DataEnd).format('YYYY-MM-DD')) ).map( orc => (
                            <tr key={orc.id_orcamento}>
                                {/* <td>{orcamentos.id_orcamento}</td> */}
                                {/* <td>{this.state.pessoas.filter(pes => pes.id_pessoa == orcamentos.id_pessoa).map(filpes => filpes.nome_pessoa)}</td> */}
                                {/* <td>{orcamentos.id_orcamento}</td> */}
                                <td>{this.state.pessoas.filter(pes => pes.id_pessoa == (this.state.clientes.filter(cli => cli.id_cliente == orc.id_cliente).map(filcli => filcli.id_pessoa)) ).map(filpes => filpes.nome_pessoa)}</td>
                                {/* <td>{orcamentos.id_funcionario}</td> */}
                                <td>{this.state.pessoas.filter(pes => pes.id_pessoa == (this.state.funcionarios.filter(fun => fun.id_funcionario == orc.id_funcionario).map(filfun => filfun.id_pessoa)) ).map(filpes => filpes.nome_pessoa)}</td>
                                {/* <td>{orcamentos.id_servico}</td> */}
                                <td>{this.state.servicos.filter(ser => ser.id_servico == orc.id_servico).map(filser => filser.nome)}</td>
                                <td>{moment.utc(orc.data_criacao).format('DD-MM-YYYY')}</td>
                                <td>{moment.utc(orc.data_entrega).format('DD-MM-YYYY')}</td>
                                <td>{orc.valor}</td>
                                <td>{orc.status_andamento}</td>
                            </tr>
                            
                        ))

                        //<td>{this.state.pessoas.filter(pes => pes.id_pessoa == (this.state.clientes.filter(cli => cli.id_cliente == orcamentos.id_cliente).map(filcli => filcli.id_pessoa)) ).map(filpes => filpes.nome_pessoa)}</td>
                        
                        
                        
                    }
                </tbody>

                

            </Table>

            <div>

                    <Table className="table-bordered text-center table-striped">
                <thead className="table-dark">
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr>
                            
                            <td>{this.state.orcamentosS.filter(orc => orc.status_andamento.toUpperCase().trim() == 'CONCLUIDO' || orc.status_andamento.toUpperCase().trim() == 'CONCLUÍDO' ).filter(orc => (moment.utc(orc.data_criacao).format('YYYY-MM-DD')) >=  (moment.utc(this.state.DataCri).format('YYYY-MM-DD')) ).filter(orc => (moment.utc(orc.data_entrega).format('YYYY-MM-DD')) <= (moment.utc(this.state.DataEnd).format('YYYY-MM-DD')) ).reduce((total, currentValue) => total = total + parseFloat(currentValue.valor),0)}</td>
                        </tr>
                    }
                </tbody>
            </Table>



            </div>





            </div>
            

            

            
        );
    }

}

export default class OrcConBox extends Component {

    Url = 'https://api-estagio-renan-augusto.herokuapp.com/orcamento/';

    state = {
        orcamentos: [],
        message: { text: 'Nessa página você pode cadastrar, deletar e alterar Orçamentos.', alert: '' }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(orcamentos => this.setState({orcamentos}))
            .catch(e => console.log(e));

    }

    save = (orcamentos) => {
        let data = {
            id_orcamento: parseInt(orcamentos.id_orcamento),
            id_cliente: parseInt(orcamentos.id_cliente),
            id_funcionario: parseInt(orcamentos.id_funcionario),
            id_servico: parseInt(orcamentos.id_servico),
            data_criacao: orcamentos.data_criacao,
            data_entrega: orcamentos.data_entrega,
            valor: orcamentos.valor,
            status_andamento: orcamentos.status_andamento,
        };
        console.log("data: " + data);
        const requestInfo = {
            method: data.id_orcamento !== 0? 'PATCH': 'POST' ,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };


        if(data.id_orcamento === 0){
            //CREATE

            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .finally(neworcamento => {
                console.log("then2");
                neworcamento = data;
                console.log("new orcamento:" + neworcamento);
                let { orcamentos } = this.state;
                orcamentos.push(neworcamento);
                this.setState({orcamentos, message: { text: 'Orçamento cadastrado com sucesso! Recarregando...', alert: 'success' }});
                this.timerMessage(3500);
                this.timerRefresh(3500);
                
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id_orcamento}`, requestInfo)
            .then(response => response.json())
            .finally(updatedorcamento => {
                console.log("edit then2")
                updatedorcamento = data;
                console.log("updateorcamento:" + updatedorcamento);
                let { orcamentos} = this.state;
                let position = orcamentos.findIndex(orcamentos => orcamentos.id_orcamento === data.id_orcamento);
                orcamentos[position] = updatedorcamento;
                this.setState({orcamentos, message: { text: 'Orçamento atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));

        }


        /* if(data.id === 0){
            //CREATE
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(neworcamento => {
                console.log("then2");
                let { orcamentos} = this.state;
                orcamentos.push(neworcamento);
                this.setState({orcamentos, message: { text: 'Orçamento cadastrado com sucesso!', alert: 'success' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedorcamento => {
                let { orcamentos} = this.state;
                let position = orcamentos.findIndex(orcamentos => orcamentos.id_orcamento=== data.id);
                orcamentos[position] = updatedorcamento;
                this.setState({orcamentos, message: { text: 'Orçamento atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        } */

        
    }

    delete = (id_orcamento) => {
        fetch(`${this.Url}/${id_orcamento}`, {method: 'DELETE'})
            .then(response => response.json())
            .finally(rows => {
                const orcamentos = this.state.orcamentos.filter(orcamentos => orcamentos.id_orcamento !== id_orcamento);
                this.setState({ orcamentos, message: { text: 'Orçamento deletado com sucesso!', alert: 'danger' } });
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: 'Nessa página você pode cadastrar, deletar e alterar Orçamentos.', alert: ''} });

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
                    this.state.message.text !== 'Nessa página você pode cadastrar, deletar e alterar Orçamentos.'? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : <Alert color='dark' className="text-center"> Nessa página você pode cadastrar, deletar e alterar Orçamentos. </Alert>
                }
            
                <div className="row">
                    
                    <div className="col-md-12 my-3">
                        <h2 className="font-weight-bold text-center"> Selecione o intervalo de dias desejado</h2>
                        <FormOrcCon orcamentosCreate={this.save} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 my-3">

                        <h2 className="font-weight-bold text-center"> Lista de Orçamentos CONCLUÍDOS</h2>
                        <ListOrcCon orcamentos={this.state.orcamentos} deleteorcamentos={this.delete} />
                    </div>
                </div>

            </div>
        );
    }
}