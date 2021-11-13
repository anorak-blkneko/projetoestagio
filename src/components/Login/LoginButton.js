import React from "react";
import { Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
import "./stylelogin.css"

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button color="info" className="btn btnL" onClick={() => loginWithRedirect()}>
            LOGIN
        </button>
    )
}

export default LoginButton