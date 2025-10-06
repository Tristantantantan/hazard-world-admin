import AnnouncementsTable from "../../components/tables/AnnouncementsTable"
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

const Announcements = () => {
    return (
        <>
            <AdminNavbar />
            <div className="d-flex">
                <AdminSidebar />
                <div className="flex-grow-1">
                    <div className="px-3" style={{ marginLeft: '250px', marginTop: '56px' }}>
                        <AnnouncementsTable readOnly={false} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Announcements
