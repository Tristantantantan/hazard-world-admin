import { useState, useEffect } from 'react';
import { Table, Form, Button, Pagination } from 'react-bootstrap';
import { deleteUser, getUsers } from '../../services/user';
import Loading from '../Loading';
import CreateEditUserModal from '../modals/CreateEditUserModal';
import DeleteModal from '../modals/DeleteModal';
import ViewUserAssessmentModal from '../modals/ViewUserAssessmentModal';

const UsersTable = ({ readOnly }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewUserModal, setShowViewUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filtered data based on search term
    const filteredUsers = users.filter(users =>
        users.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getUsers();
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally { setLoading(false); }
    }

    const handleCreate = () => {
        setSelectedUser(null);
        setShowEditModal(true);
    }

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowViewUserModal(true);
    }

    const handleEdit = (id) => {
        const userToEdit = users.find(ann => ann.id === id);
        setSelectedUser(userToEdit);
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        fetchUsers();
    };

    const handleClose = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const handleDelete = async (id) => {
        const userToDelete = users.find(ann => ann.id === id);
        setSelectedUser(userToDelete);
        setShowDeleteModal(true);
    }

    const confirmDelete = async (id) => {
        try {
            await deleteUser(id);
            handleUpdate();
            handleClose();
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container my-4">
            {
                !readOnly &&
                <div className="d-flex justify-content-end py-2">
                    <Button variant="primary" size="sm" className="me-2" onClick={() => handleCreate()}>
                        <i className="bi bi-plus text-white me-2"></i>
                        Add User
                    </Button>
                </div>
            }
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-5 fw-bold">Users</span>
                <Form.Control
                    type="text"
                    placeholder="Search by name"
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
                                <th>Student No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                {/* <th>Current Level</th>
                                <th>Progress</th> */}
                                {!readOnly && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.studentNumber}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.department}</td>
                                    {/* <td>{user.currentLevel}</td>
                                    <td>{user.progress}%</td> */}
                                    {!readOnly &&
                                        <td>
                                            <div className="d-flex">
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleViewUser(user)}
                                                >
                                                    <i className="bi bi-eye text-white"></i>
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEdit(user.id)}
                                                >
                                                    <i className="bi bi-pencil text-white"></i>
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(user.id)}
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

                    <ViewUserAssessmentModal
                        user={selectedUser}
                        show={showViewUserModal}
                        handleClose={() => setShowViewUserModal(false)} />

                    <CreateEditUserModal
                        show={showEditModal}
                        handleClose={handleClose}
                        user={selectedUser}
                        onUpdate={handleUpdate}
                    />
                    <DeleteModal
                        show={showDeleteModal}
                        handleClose={() => setShowDeleteModal(false)}
                        handleDelete={() => confirmDelete(selectedUser.id)}
                        title="Delete User"
                        message="Are you sure you want to delete this user?"
                    />
                </div>
            }
        </div>
    );
};

export default UsersTable;
