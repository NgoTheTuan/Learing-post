import React from 'react'
import { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {

    //Context 
    const { loginUser } = useContext(AuthContext)

    //
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const { username, password } = loginForm

    const onChangeLoginForm = event => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        })
    }

    const login = async event => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                // navigate('/dashboard')
            } else {
                setAlert({
                    type: 'danger',
                    message: loginData.message
                })
            }
        } catch (error) {
            console.log('Error: ');
        }
    }

    return (
        <React.Fragment>
            <Form className='my-4' onSubmit={login}>

                <AlertMessage info={alert} />

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant='success' type="submit"> Login</Button>
            </Form>
            <p>Don't have acount!
                <Link to='/register'>
                    <Button variant='info' size='sm' className="ml-3"> Register</Button>
                </Link>
            </p>

        </React.Fragment>
    )
}

export default LoginForm