import React from "react";
import { Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const HomeButton = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        isAuthenticated && (
            <div>
                <a className="btn btn-sucess" href="/Home">
            Clique aqui para prosseguir!
        </a>

        <Route exact path="/">
            {isAuthenticated ? <Redirect to="/Home" /> : "/"}
        </Route>
            </div>
        

        
        )
    )
}

export default HomeButton