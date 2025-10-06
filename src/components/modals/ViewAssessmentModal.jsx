import { useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap"
import CreateEditQuestionModal from "./CreateEditQuestionModal";
import DeleteModal from "./DeleteModal";
import { deleteQuestion } from "../../services/assessment";

const ViewAssessmentModal = ({ show, handleClose, assessment, onSave, chapters, levels }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
    const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);

    const handleEditQuestion = (question) => {
        setSelectedQuestion(question);
        setShowEditQuestionModal(true);
        handleClose();
    }

    const handleDeleteQuestion = (question) => {
        setSelectedQuestion(question);
        setShowDeleteQuestionModal(true);
        handleClose();
    }

    const handleSave = (updatedQuestion) => {
        onSave(updatedQuestion);
        handleClose();
    }

    const confirmDelete = async (id) => {
        try {
            await deleteQuestion(id);
            handleCloseModal();
            handleSave({});
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const handleCloseModal = () => {
        setShowEditQuestionModal(false);
        setShowDeleteQuestionModal(false);
    }

    return (
        <>
            {
                assessment &&
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Level {assessment.level}: {assessment.levelName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup className="list-group-flush">
                            {
                                assessment.questions.map((question, idx) => (
                                    <ListGroup.Item key={question.id}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-bold pe-2">{idx + 1}. {question.question}</span>
                                            <div className="d-flex">
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditQuestion(question)}
                                                >
                                                    <i className="bi bi-pencil text-white"></i>
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteQuestion(question)}
                                                >
                                                    <i className="bi bi-trash text-white"></i>
                                                </Button>

                                            </div>
                                        </div>
                                        {question.choices.map(choice => (
                                            <div key={`${choice.letter}-${choice.choice}-${idx}`} className="py-2">
                                                <span className="fs-6">{choice.letter}. {choice.choice}</span>
                                            </div>
                                        ))}
                                        <div className="py-2">
                                            <span className="fs-6 text-danger">Answer: {question.answer}</span>
                                        </div>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Modal.Body>
                </Modal >
            }

            <CreateEditQuestionModal
                show={showEditQuestionModal}
                handleClose={handleCloseModal}
                questionData={selectedQuestion}
                onSave={handleSave}
                chapters={chapters}
                levels={levels} />

            <DeleteModal
                show={showDeleteQuestionModal}
                handleClose={() => setShowDeleteQuestionModal(false)}
                handleDelete={() => confirmDelete(selectedQuestion.id)}
                title="Delete Question"
                message="Are you sure you want to delete this question?"
            />
        </>
    )
}

export default ViewAssessmentModal
