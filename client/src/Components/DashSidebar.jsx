import React from "react";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocumentText } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../app/user/userSlice.js";
import { useSelector } from "react-redux";
export default function DashSidebar() {
  const {currentUser} = useSelector(state=>state.user)
  const location = useLocation();
  const [tab, setTab] = useState();
  const dispatch = useDispatch()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
   
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignOut =  async () =>
{
  try{
const res= await fetch(`/api/user/signout`,
{
  method:'POST'
})
const data = await res.json()

if(!res.ok)
{
  console.log(data.message)
}
else
{
dispatch(signoutSuccess())
}
  }
  catch(error)
  {

  }
}
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard/?tab=profile'>
          <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? "Admin":"User"} labelColor="dark" as='div'>
            Profile
          </Sidebar.Item>
          </Link>
          {
            currentUser.isAdmin &&    <Link to='/dashboard/?tab=posts'>
            <Sidebar.Item 
            active={tab === 'posts'}
            className='mt-1'
            as='div'
            icon={HiDocumentText}>
              Posts
            </Sidebar.Item>
          </Link>
          }
   
          <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
