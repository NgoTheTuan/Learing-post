import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Alert from '../layout/AlertMessage'


const RegisterForm = () => {

    //Context 
    const { registerUser } = useContext(AuthContext)

    //
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(null)

    const { username, password, confirmPassword } = registerForm

    const onChangeRegisterForm = event => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value
        })
    }



    const register = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert({
                type: 'danger',
                message: 'Password do not match '
            })
            setTimeout(() => setAlert(null), 3000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({
                    type: 'danger',
                    message: registerData.message
                })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log('Error: ');
        }
    }




    return (
        <React.Fragment>
            <Alert info={alert} />

            <Form className='my-4' onSubmit={register}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />


                </Form.Group>
                <Button variant='success' type='submit'>
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>
                        Login
                    </Button>
                </Link>
            </p>
        </React.Fragment>
    )
}

export default RegisterForm