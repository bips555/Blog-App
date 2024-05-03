import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../app/Theme/themeSlice.js";
import { signoutSuccess } from "../app/user/userSlice.js";
const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch()
  const {theme} = useSelector(state=>state.theme)

  const { currentUser } = useSelector((state) => state.user);
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
    <>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 rounded-lg text-indigo-100 bg-gradient-to-r from-red-500 via-blue-500 to-orange-500">
            Biplov's
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search"
            rightIcon={AiOutlineSearch}
            className="hidden md:inline lg:inline"
          />
        </form>
        <Button
          className="flex items-center justify-center lg:hidden md:hidden w-12 h-10"
          color="gray"
          pill
        >
          <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button
            className=" w-10 h-10 flex items-center justify-center"
            color="gray"
            onClick={()=>dispath(toggleTheme())}
            pill
          >
            {theme ===  'light' ? (<FaSun />):(<FaMoon/>)
            }
          </Button>
          {currentUser ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm ">
                    @{currentUser.username}
                  </span>
                  <span className="block text-sm ">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Header>
                 <Link to='/dashboard?tab=profile'>
                 <Dropdown.Item>Profile</Dropdown.Item>
                 </Link>
                </Dropdown.Header>
                <Dropdown.Header>
              
                 <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                
             
                </Dropdown.Header>
              </Dropdown>
            </>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                SignIn
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
