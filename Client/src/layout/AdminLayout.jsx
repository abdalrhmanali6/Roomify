import { Outlet } from "react-router-dom"
import SideBar from "../features/admin/components/SideBar"


const AdminLayout = () => {
  return (
    <div className="flex ">
    <SideBar/>
    <Outlet/>
    </div>
  )
}

export default AdminLayout