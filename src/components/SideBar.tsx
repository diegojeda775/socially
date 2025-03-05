import { currentUser } from "@clerk/nextjs/server"

async function SideBar() {
  const authUser = await currentUser();
  if(!authUser) return 
  return (
    <div>SideBar</div>
  )
}

export default SideBar