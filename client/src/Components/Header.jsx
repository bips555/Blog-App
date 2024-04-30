import { Button, ModalHeader, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link ,useLocation} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
    const path = useLocation().pathname
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
          <Button className=" w-10 h-10 lg:hidden md:hidden " color="gray" pill>
            <FaMoon />
          </Button>
          <Link to="/sign-in">
            <Button gradientDuoTone='purpleToBlue'>
              SignIn
            </Button>
          </Link>
          <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === "/"} as={'div'}>
                <Link to='/'>
                    Home
                </Link>
            </Navbar.Link>
            <Navbar.Link  active={path === "/about"} as={'div'}>
            <Link to='/about'>
                    About
                </Link>
            </Navbar.Link>
            <Navbar.Link  active={path === "/projects"} as={'div'}>
            <Link to='/projects'>
                    Projects
                </Link>
            </Navbar.Link>
          </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
