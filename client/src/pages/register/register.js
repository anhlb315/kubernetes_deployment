import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services";
import { ROUTE } from "../../routes";

const initialState = {
    username: '',
    password: '',
}

export function Register() {
    const [registerState, setRegisterState] = useState(initialState);
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();

    const handleInput = (event) => {
        setRegisterState({
            ...registerState,
            [event.target.name]: event.target.value
        })
    }

    const register = async () => {
        try {
            setError(undefined);
            await AuthService.register(registerState);
            navigate(ROUTE.LOGIN);
        } catch (err) {
            setError("Failed to register.")
        }
    }

    return (
        <div className="page-container">
            <div className="authentication-form">
                <Form className="form-validation">
                    <div className="form-title">
                        Register
                    </div>

                    <div className="username-input input-box">
                        <Form.Group>
                            <Form.Label>Username</Form.Label>

                            <Form.Control
                                type="text"
                                name="username"
                                autoComplete="username"
                                maxLength="30"
                                onChange={handleInput}
                                onBlur={handleInput}
                            />
                        </Form.Group>
                    </div>

                    <div className="password-input input-box">
                        <Form.Group>
                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                type="password"
                                name="password"
                                autoComplete="password"
                                onChange={handleInput}
                                onBlur={handleInput}
                            />
                        </Form.Group>
                    </div>

                    <div className="validation-txt">
                        {!!error && (<div className="err-txt">{error}</div>)}
                    </div>

                    <div className="btn-row">
                        <Button onClick={register}>Register</Button>

                        <Link to="/login">Login</Link>
                    </div>

                </Form>
            </div>
        </div>)
}