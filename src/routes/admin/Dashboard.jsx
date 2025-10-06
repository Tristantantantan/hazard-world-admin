import { Col, Row } from "react-bootstrap";
import DashboardCards from "../../components/DashboardCards";
import AnnouncementsTable from "../../components/tables/AnnouncementsTable";
import UsersTable from "../../components/tables/UsersTable";
import UserLevelProgressChart from "../../components/UserLevelProgressChart";
import UserRankingChart from "../../components/UserRankingChart";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

const Dashboard = () => {
    return (
        <>
            <AdminNavbar />
            <div className="d-flex">
                <AdminSidebar />
                <div className="flex-grow-1">
                    <div className="flex-grow-1 p-3" style={{ marginLeft: '250px', marginTop: '56px' }}>
                        <DashboardCards />

                        <div className="container my-4">
                            <div className="d-flex mb-3">
                                <span className="fs-5 fw-bold">User Progress and Rankings</span>
                            </div>
                            <Row className="mb-4">
                                <Col md={6}>
                                    <UserLevelProgressChart />
                                </Col>
                                <Col md={6}>
                                    <UserRankingChart />
                                </Col>
                            </Row>
                        </div>

                        <UsersTable readOnly={true} />
                        <AnnouncementsTable readOnly={true} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
