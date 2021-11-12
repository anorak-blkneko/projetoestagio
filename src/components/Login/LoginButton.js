import React from "react";
import { Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button color="info" className="btn btn-sucess" onClick={() => loginWithRedirect()}>
            Log In
        </button>
    )
}

export default LoginButton