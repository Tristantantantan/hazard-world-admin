import { useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUser, editUser } from '../../services/user';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    studentNumber: Yup.number().required('Student Number is required').typeError('Student Number is invalid'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    department: Yup.string().required('Department is required'),
    currentLevel: Yup.number().typeError('Current Level must be a number'),
    progress: Yup.number()
        .min(0, 'Progress must be at least 0')
        .max(100, 'Progress cannot exceed 100')
        .typeError('Progress must be a number'),
});

const CreateEditUserModal = ({ show, handleClose, user, onUpdate }) => {
    const initialValues = {
        name: user?.name || '',
        studentNumber: user?.studentNumber || '',
        email: user?.email || '',
        password: user?.password || '',
        department: user?.department || '',
        currentLevel: user?.currentLevel || 1,
        progress: user?.progress || 0,
    };

    useEffect(() => {
    }, [user]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (user && user.id) {
                await editUser(user.id, values);
            } else {
                values.email = `${values.email}@cityofmalabonuniversity.edu.ph`;
                await createUser(values);
            }

            onUpdate();
            handleClose();
        } catch (error) {
            console.error('Failed to update user', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{user ? 'Edit User' : 'Create User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.name && errors.name}
                                    placeholder="Enter user name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formStudentNumber" className="mt-3">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentNumber"
                                    value={values.studentNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.studentNumber && errors.studentNumber}
                                    placeholder="Enter student number"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.studentNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>Email</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && errors.email}
                                        placeholder="Enter user email"
                                    />
                                    <InputGroup.Text>@cityofmalabonuniversity.edu.ph</InputGroup.Text>
                                </InputGroup>
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>{user ? "Change Password" : "Password"}</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.password && errors.password}
                                    placeholder="Enter user password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formDepartment" className="mt-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="department"
                                    value={values.department}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.department && errors.department}
                                    placeholder="Enter department"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.department}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formCurrentLevel" className="mt-3">
                                <Form.Label>Current Level</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="currentLevel"
                                    value={values.currentLevel}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.currentLevel && errors.currentLevel}
                                    placeholder="Enter current level"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.currentLevel}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formProgress" className="mt-3">
                                <Form.Label>Progress</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="progress"
                                    value={values.progress}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.progress && errors.progress}
                                    placeholder="Enter progress (0-100)"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.progress}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="mt-4 d-flex justify-content-end">
                                <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="ms-2"
                                    disabled={isSubmitting}
                                >
                                    {user ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default CreateEditUserModal;
