import AssessmentCards from "../../components/AssessmentCards"
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

const Assessments = () => {
    return (
        <>
            <AdminNavbar />
            <div className="d-flex">
                <AdminSidebar />
                <div className="flex-grow-1">
                    <div className="px-3" style={{ marginLeft: '250px', marginTop: '56px' }}>
                        <AssessmentCards />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assessments
