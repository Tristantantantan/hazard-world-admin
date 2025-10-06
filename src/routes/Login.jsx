import Navbar from '../components/Navbar';
import { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { AuthContext } from '../auth/AuthContext.jsx';

const Login = () => {
    const [firebaseError, setFirebaseError] = useState('');
    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSignIn = (values, { setSubmitting, setErrors }) => {
        setFirebaseError('');
        try {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    dispatch({ type: 'LOGIN', payload: user })
                    navigate('/admin');
                })
        } catch (e) {
            console.error(e);
            setErrors({ email: 'Invalid email or password' });
        }
        setSubmitting(false);
    };

    return (
        <div>
            <Navbar />
            <div className="full-screen-bg">
                <div className="d-flex mx-auto">
                    <Card style={{ width: '30rem' }} className="px-2 py-4">
                        <Card.Title className="text-center mb-4 fs-2">Login as Admin</Card.Title>
                        <Card.Body>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSignIn}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Group controlId="formEmail" className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                                value={values.email}
                                                onChange={handleChange}
                                                isInvalid={touched.email && !!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="formPassword" className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Enter password"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={touched.password && !!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        {firebaseError && (
                                            <div className="text-danger mb-3">
                                                {firebaseError}
                                            </div>
                                        )}
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="w-100"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Logging in...' : 'Login'}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
