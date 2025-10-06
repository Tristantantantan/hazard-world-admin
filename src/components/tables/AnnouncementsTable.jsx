import { useState, useEffect } from 'react';
import { Table, Form, Button, Pagination } from 'react-bootstrap';
import { deleteAnnouncement, getAnnouncements } from '../../services/announcement';
import Loading from '../Loading';
import CreateEditAnnouncementModal from '../modals/CreateEditAnnouncementModal';
import DeleteModal from '../modals/DeleteModal';

const AnnouncementsTable = ({ readOnly }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const itemsPerPage = 5;

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // Filtered data based on search term
    const filteredAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const response = await getAnnouncements();
            setAnnouncements(response);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        } finally { setLoading(false); }
    };

    const handleCreate = () => {
        setSelectedAnnouncement(null);
        setShowEditModal(true);
    }

    const handleEdit = (id) => {
        const announcementToEdit = announcements.find(ann => ann.id === id);
        setSelectedAnnouncement(announcementToEdit);
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        fetchAnnouncements();
    };

    const handleClose = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedAnnouncement(null);
    };

    const handleDelete = async (id) => {
        setShowDeleteModal(true);
        try {
            await deleteAnnouncement(id);
            handleUpdate();
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container my-4">
            {!readOnly &&
                <div className="d-flex justify-content-end py-2">
                    <Button variant="primary" size="sm" className="me-2" onClick={() => handleCreate()}>
                        <i className="bi bi-plus text-white me-2"></i>
                        Add Announcement
                    </Button>
                </div>
            }
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-5 fw-bold">Announcements</span>
                <Form.Control
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ maxWidth: '300px' }}
                />
            </div>
            {loading && <Loading />}
            {
                !loading && <div>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Body</th>
                                {!readOnly && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {currentAnnouncements.map((announcement) => (
                                <tr key={announcement.id}>
                                    <td scope='row'>{announcement.title}</td>
                                    <td>{announcement.body}</td>
                                    {!readOnly &&
                                        <td>
                                            <div className="d-flex">
                                                <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(announcement.id)}>
                                                    <i className="bi bi-pencil text-white"></i>
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(announcement.id)}
                                                >
                                                    <i className="bi bi-trash text-white"></i>
                                                </Button>
                                            </div>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                    <Pagination>
                        {[...Array(totalPages).keys()].map(pageNumber => (
                            <Pagination.Item
                                key={pageNumber + 1}
                                active={pageNumber + 1 === currentPage}
                                onClick={() => handlePageChange(pageNumber + 1)}
                            >
                                {pageNumber + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>

                    <CreateEditAnnouncementModal
                        show={showEditModal}
                        handleClose={handleClose}
                        announcement={selectedAnnouncement}
                        onUpdate={handleUpdate}
                    />
                    <DeleteModal
                        show={showDeleteModal}
                        handleClose={() => setShowDeleteModal(false)}
                        handleDelete={() => handleDelete(selectedAnnouncement.id)}
                        title="Delete Announcement"
                        message="Are you sure you want to delete this announcement?"
                    />

                </div>
            }
        </div>
    );
};

export default AnnouncementsTable;
