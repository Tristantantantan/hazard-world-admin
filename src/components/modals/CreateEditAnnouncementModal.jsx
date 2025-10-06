import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createAnnouncement, editAnnouncement } from '../../services/announcement';

const CreateEditAnnouncementModal = ({ show, handleClose, announcement, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (announcement) {
            setTitle(announcement.title);
            setBody(announcement.body);
        } else {
            setTitle('');
            setBody('');
        }
    }, [announcement]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const announcementData = { title, body };
        try {
            if (announcement && announcement.id) {
                await editAnnouncement(announcement.id, announcementData);
            } else {
                await createAnnouncement(announcementData);
            }

            onUpdate();
            handleClose();
        } catch (error) {
            console.error("Failed to update announcement", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{announcement ? 'Edit Announcement' : 'Create Announcement'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter announcement title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBody" className="mt-3">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter announcement body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="mt-4 d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className="ms-2">
                            {announcement ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateEditAnnouncementModal;
