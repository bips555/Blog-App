import React from "react";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from "react-icons/hi";
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
          {
             currentUser.isAdmin &&    <Link to='/dashboard/?tab=dash'>
             <Sidebar.Item 
             active={tab === 'dash' || !tab}
             className='mt-1'
             as='div'
             icon={HiChartPie}>
               Dashboard
             </Sidebar.Item>
           </Link>
          }
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
          {
            currentUser.isAdmin &&    <Link to='/dashboard/?tab=users'>
            <Sidebar.Item 
            active={tab === 'users'}
            className='mt-1'
            as='div'
            icon={HiOutlineUserGroup}>
              Users
            </Sidebar.Item>
          </Link>
          }
           {
            currentUser.isAdmin &&    <Link to='/dashboard/?tab=comments'>
            <Sidebar.Item 
            active={tab === 'comments'}
            className='mt-1'
            as='div'
            icon={HiAnnotation}>
              Comments
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
