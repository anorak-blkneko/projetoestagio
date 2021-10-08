import React, { Component, useState, useEffect } from 'react';


function TesteForm()
{

    const Url = 'https://api-estagio-renan-augusto.herokuapp.com/pessoa';
    const UrlS = 'https://api-estagio-renan-augusto.herokuapp.com/servico';

    const[result,idpessoa]=useState([]);
    useEffect(() => {
        fetch(Url,
            {
                method: 'Get',
                headers:{
                    'Content-Type':'application/json',
                }
            })
            .then(resp => resp.json())
            .then(resp => idpessoa(resp))
    },[])

    const[resultS,idservico]=useState([]);
    useEffect(() => {
        fetch(UrlS,
            {
                method: 'Get',
                headers:{
                    'Content-Type':'application/json',
                }
            })
            .then(resp => resp.json())
            .then(resp => idservico(resp))
    },[])

    return(
        <div>
            <center>
                <h2>DropdownList</h2>
                <br/>
                <select>
                    <option disabled selected>-- Selecione --</option>
                    {
                        result.map(x=>{
                            return(
                                <option title={x.id_pessoa}>{x.nome_pessoa}</option>
                                
                            )
                            
                        })
                        
                    }
                    
                </select>

                <br/>
                <select>
                    <option disabled selected>-- Selecione --</option>
                    {
                        resultS.map(s=>{
                            return(
                                <option title={s.id_servico}>{s.nome}</option>
                                
                            )
                            
                        })
                        
                    }
                    
                </select>
            </center>
        </div>
    );


}

export default TesteForm;