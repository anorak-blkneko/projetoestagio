import React from "react";
import { Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <a className="nav-link" data-toggle="tab" href="/" onClick={() => logout()}>
            Sair
        </a>
    )
}

export default LogoutButton