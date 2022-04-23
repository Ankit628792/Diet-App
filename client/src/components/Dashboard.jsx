import { useSelector } from "react-redux"
import Navbar from "./Navbar"
import UserInfo from "./UserInfo";

function Dashboard() {
  const user = useSelector(state => state.auth.user)
  
  return (
    <>
      <main className="flex items-start w-full min-h-screen overflow-hidden bg-emerald-50">
        <Navbar />
        <section className=" w-full p-5 py-10 lg:p-10 flex-grow overflow-y-auto h-screen">
          {user && <UserInfo user={user} />}
        </section>
      </main>
    </>
  )
}

export default Dashboard

