import UsersTable from "../../components/tables/UsersTable"
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

const Users = () => {
    return (
        <>
            <AdminNavbar />
            <div className="d-flex">
                <AdminSidebar />
                <div className="flex-grow-1">
                    <div className="px-3" style={{ marginLeft: '250px', marginTop: '56px' }}>
                        <UsersTable readOnly={false} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users
