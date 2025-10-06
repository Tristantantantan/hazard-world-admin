import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    level: Yup.number().required('Level is required'),
    chapter: Yup.number().required('Chapter is required'),
    question: Yup.string().required('Question is required'),
    choices: Yup.array()
        .of(
            Yup.object().shape({
                letter: Yup.string().required('Letter is required'),
                choice: Yup.string().required('Choice text is required'),
            })
        )
        .min(2, 'At least two choices are required'),
    answer: Yup.string().required('Answer is required'),
});

const CreateEditQuestionModal = ({ show, handleClose, questionData, onSave, chapters, levels }) => {
    const initialValues = {
        level: questionData?.level || '',
        chapter: questionData?.chapter || '',
        question: questionData?.question || '',
        choices: questionData?.choices || [
            { letter: '', choice: '' },
        ],
        answer: questionData?.answer || '',
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        let question = values;

        const questionId = questionData?.id || null;

        if (questionId !== null) {
            question = { ...question, id: questionId };
        }

        onSave(question);
        setSubmitting(false);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{questionData ? 'Edit Question' : 'Create Question'}</Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group controlId="formChapter" className="mt-3">
                                <Form.Label>Chapter</Form.Label>
                                <Field as="select" name="chapter" className="form-select">
                                    <option value="">Select chapter</option>
                                    {chapters.map(chapter => (
                                        <option key={chapter.id} value={chapter.chapter}>{chapter.chapterName}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="chapter" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group controlId="formLevel">
                                <Form.Label>Level</Form.Label>
                                <Field as="select" name="level" className="form-select">
                                    <option value="">Select level</option>
                                    {levels.map(level => (
                                        <option key={level.id} value={level.level}>Level {level.level} - {level.levelName}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="level" component="div" className="text-danger" />
                            </Form.Group>


                            <Form.Group controlId="formQuestion" className="mt-3">
                                <Form.Label>Question</Form.Label>
                                <Field as="textarea" name="question" rows="3" className="form-control" />
                                <ErrorMessage name="question" component="div" className="text-danger" />
                            </Form.Group>

                            <FieldArray name="choices">
                                {({ push, remove }) => (
                                    <div className="mt-3">
                                        <h6>Choices</h6>
                                        {values.choices.map((choice, index) => (
                                            <Row key={index} className="mb-2">
                                                <Col>
                                                    <Field
                                                        name={`choices.${index}.letter`}
                                                        placeholder="Letter"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name={`choices.${index}.letter`}
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Col>
                                                <Col>
                                                    <Field
                                                        name={`choices.${index}.choice`}
                                                        placeholder="Choice text"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name={`choices.${index}.choice`}
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Col>
                                                <Col xs="auto">
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => remove(index)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        ))}
                                        <Button variant="primary" size="sm" onClick={() => push({ letter: '', choice: '' })}>
                                            Add Choice
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>


                            <Form.Group controlId="formAnswer" className="mt-3">
                                <Form.Label>Answer</Form.Label>
                                <Field as="select" name="answer" className="form-select">
                                    <option value="">Select the correct answer</option>
                                    {values.choices.map((choice, index) => (
                                        <option key={index} value={choice.letter}>
                                            {choice.letter}. {choice.choice}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="answer" component="div" className="text-danger" />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {questionData ? 'Update' : 'Create'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CreateEditQuestionModal;

