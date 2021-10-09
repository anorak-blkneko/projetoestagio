import React, { Component, useState, useEffect } from 'react';
import PubSub from 'pubsub-js';

import { Table, Button, Form, FormGroup, Label, Input, Alert  } from 'reactstrap';
import { getDefaultNormalizer } from '@testing-library/dom';

import "../StyleSheet.css";

const disablebtn = false;




function TesteForm()
{

    

    const FormEndVar = new FormEnd;

    const EndBoxVar = new EndBox;

    const UrlP = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';

    const[result,idpessoa]=useState([]);
    useEffect(() => {
        fetch(UrlP,
            {
                method: 'Get',
                headers:{
                    'Content-Type':'application/json',
                }
            })
            .then(resp => resp.json())
            .then(resp => idpessoa(resp))
    },[])

    const [GetP, SetP] = useState("")
    /* const Phand = e => {
        SetP(e.target.value)
        //FormEndVar.state.model.idpessoa = parseInt(GetP);
       // FormEndVar.pnum = parseInt(GetP);
        //EndBoxVar.PID = parseInt(GetP);
        //FormEndVar.handlestate(parseInt(GetP));
        console.log(FormEndVar.state.model);

        
    } */

    //FormEndVar.state.model.idpessoa = GetP;
    const Phand = e =>{
        SetP(e.target.value);
    }
    console.log(GetP);

    const ValueP = () => {
        console.log("VP GP");
        console.log(GetP);
        return GetP;
    }

    const InputChange = (params) => {
        FormEndVar.changeHandler(params);
    }

    

    

    return(
        <div>
            <center>
                <select className="DropdownC" onChange={e => InputChange(e.target.value)}>
                    <option disabled selected>-- Selecione --</option>
                    {
                        result.map(x=>{
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

class PessoaTeste extends Component {

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

    InputChange = (params) => {
        this.props.changeHandler(params.target.value);
        console.log("param")
        console.log(params.target.value)
    }



    

    render() {
        
        
        const {pessoas} = this.props;
        

        return(
            <div>
                <center>
                    <select className="DropdownC" onChange={e=>(this.InputChange(e))}>
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




class FormEnd extends Component {


    /* constructor(props) {
        super(props)
        this.state = {model: {id_endereco: 0, idpessoa: 0, uf: '', complemento: '', logradouro: '', cep: '', numero: ''}};
        //this.handlestate = this.handlestate.bind(this);
        
    } */

    handlestate(e){
        //this.setState({ idpessoa: e.target.value});
       // this.state.model.idpessoa = e;
        
        console.log("Handle E");
        console.log(e);
        this.setValuesPe(e, "idpessoa")
        //this.setState({ idpessoa: e});
        
    }

    setValuesPe = (e, field) => {
        const { model } = this.state;
        model[field] = e;
        this.setState({model});
    }

    state = {model: {id_endereco: 0, idpessoa: 3, uf: '', complemento: '', logradouro: '', cep: '', numero: ''}};


    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({model});
    }

    create = () => {
        //this.setState({ model: {id_endereco: 0, idpessoa: 3, uf: '', complemento: '', logradouro: '', cep: '', numero: ''} })
        this.props.enderecosCreate(this.state.model);
    }

    componentDidMount(){
        PubSub.subscribe('edit-endereco', (topic, endereco) =>{
            this.setState({model: endereco});
        });
    }

    


    render() {
        return (
            <Form>
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-12">

                        <label >Logradouro:</label>
                        <Input id="logradouro" type="text" value={this.state.model.logradouro} placeholder="Logradouro..." onChange={e => this.setValues(e, 'logradouro')}></Input>
                        </div>
                    </div> 
                </FormGroup>

                <br/>

                <FormGroup>
                    <div className="row">
                        <div className="col-md-6">
                            <Label>CEP:</Label>
                            <Input id="cep" type="text"  value={this.state.model.cep} placeholder="CEP: 00.000-00" onChange={e => this.setValues(e, 'cep') } />
                        </div>
                        <div className="col-md-6">
                            <Label>UF:</Label>
                            <Input id="uf" type="text" value={this.state.model.uf} placeholder="UF: SP" onChange={e => this.setValues(e, 'uf') } />
                        </div>
                    </div>
                </FormGroup>

                <br/>

                <FormGroup>
                    <div className="row">
                        <div className="col-md-6">
                            <Label>Complemento:</Label>
                            <Input id="complemento" type="text"  value={this.state.model.complemento} placeholder="Casa, Apartamento..." onChange={e => this.setValues(e, 'complemento') } />
                        </div>
                        <div className="col-md-6">
                            <Label>Numero:</Label>
                            <Input id="numero" type="text" value={this.state.model.numero} placeholder="100, 1111..." onChange={e => this.setValues(e, 'numero') } />
                        </div>
                    </div>
                </FormGroup>

                <FormGroup>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">

                        <label >Pessoa:</label>
                        <PessoaTeste changeHandler={this.handlestate.bind(this)} />


                        </div>
                    </div> 
                </FormGroup>

                <br/>
                <Button color="primary" id="btnreg" onClick={this.create} disabled={disablebtn}> Registrar</Button>
                
            </Form>
            
        );
    }
}

class ListEnd extends Component {

    delete = (id_endereco) => {
        this.props.deleteenderecos(id_endereco);
    }

    onEdit = (enderecos) => {
        PubSub.publish('edit-endereco', enderecos);
    }

    
    render() {

        const {enderecos} = this.props;
        console.log(enderecos);

        return (
            <Table className="table-bordered text-center table-striped">
                <thead className="table-dark">
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Logradouro</th>
                        <th>CEP</th>
                        <th>UF</th>
                        <th>Complemento</th>
                        <th>Numero</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        enderecos.map(enderecos => (
                            
                            <tr key={enderecos.id_endereco}>
                                {/* <td>{enderecos.id_endereco}</td> */}
                                <td>{enderecos.logradouro}</td>
                                <td>{enderecos.cep}</td>
                                <td>{enderecos.uf}</td>
                                <td>{enderecos.complemento}</td>
                                <td>{enderecos.numero}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e=> this.onEdit(enderecos)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(enderecos.id_endereco)}>Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }

}

export default class EndBox extends Component {


    Url = 'https://api-estagio-renan-augusto.herokuapp.com/endereco';

    state = {
        enderecos: [],
        message: { text: 'Nessa página você pode cadastrar, deletar e alterar Endereços.', alert: '' }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(Response => Response.json())
            .then(enderecos => this.setState({enderecos}))
            .catch(e => console.log(e));

    }

    save = (enderecos) => {
        let data = {
            id_endereco: parseInt(enderecos.id_endereco),
            idpessoa: parseInt(enderecos.idpessoa),
            uf: enderecos.uf,
            complemento: enderecos.complemento,
            logradouro: enderecos.logradouro,
            cep: enderecos.cep,
            numero: enderecos.numero,
        };
        console.log("enderecos: ");
        console.log(enderecos);
        console.log("data: ");
        console.log(data);
        const requestInfo = {
            method: data.id_endereco !== 0? 'PATCH': 'POST' ,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };


        if(data.id_endereco === 0){
            //CREATE

            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .finally(newendereco => {
                console.log("then2");
                newendereco = data;
                console.log("new endereco:");
                console.log(newendereco);
                let { enderecos } = this.state;
                enderecos.push(newendereco);
                this.setState({enderecos, message: { text: 'Endereço cadastrado com sucesso! Recarregando...', alert: 'success' }});
                this.timerMessage(3500);
                this.timerRefresh(3500);
                
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id_endereco}`, requestInfo)
            .then(response => response.json())
            .finally(updatedendereco => {
                console.log("edit then2")
                updatedendereco = data;
                console.log("updateendereco:" + updatedendereco);
                let { enderecos} = this.state;
                let position = enderecos.findIndex(enderecos => enderecos.id_endereco === data.id_endereco);
                enderecos[position] = updatedendereco;
                this.setState({enderecos, message: { text: 'Endereço atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));

        }


        /* if(data.id === 0){
            //CREATE
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newendereco => {
                console.log("then2");
                let { enderecos} = this.state;
                enderecos.push(newendereco);
                this.setState({enderecos, message: { text: 'Serviço cadastrado com sucesso!', alert: 'success' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
        } else {
            //EDIT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedendereco => {
                let { enderecos} = this.state;
                let position = enderecos.findIndex(enderecos => enderecos.id_endereco=== data.id);
                enderecos[position] = updatedendereco;
                this.setState({enderecos, message: { text: 'Serviço atualizado com sucesso!', alert: 'info' }});
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        } */

        
    }

    delete = (id_endereco) => {
        fetch(`${this.Url}/${id_endereco}`, {method: 'DELETE'})
            .then(response => response.json())
            .finally(rows => {
                const enderecos = this.state.enderecos.filter(enderecos => enderecos.id_endereco !== id_endereco);
                this.setState({ enderecos, message: { text: 'Endereço deletado com sucesso!', alert: 'danger' } });
                this.timerMessage(4000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: 'Nessa página você pode cadastrar, deletar e alterar Endereços.', alert: ''} });

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
                    this.state.message.text !== 'Nessa página você pode cadastrar, deletar e alterar Endereços.'? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : <Alert color='dark' className="text-center"> Nessa página você pode cadastrar, deletar e alterar Endereços. </Alert>
                }
            
                <div className="row">
                    
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de Endereços</h2>
                        <FormEnd
                     enderecosCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">

                        <h2 className="font-weight-bold text-center"> Lista de Endereços</h2>
                        <ListEnd
                     enderecos={this.state.enderecos} deleteenderecos={this.delete} />
                    </div>

                </div>

            </div>
        );
    }
}