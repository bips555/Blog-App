import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";

const FooterCom = () => {
  return (
    <>
      <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full mx-auto max-w-8xl">
          <div className="grid w-full justify-between sm:flex ">
            <div className="mt-5">
              <Link to="/" className="sm:text-xl dark:text-white font-semibold">
                <span className="px-2 py-1 rounded-lg text-indigo-100 bg-gradient-to-r from-red-500 via-blue-500 to-orange-500">
                  Biplov's
                </span>
                Blog
              </Link>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-3 grid-cols-3 sm:mt-5 sm:gap-3 gap-8 items-center justify-center">
              <div className="lg:my-0 md:my-0 sm:md-0 my-5">
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link href="/projects">
                    {/* prevents windows from blocking new window */}
                    My Projects
                  </Footer.Link>
                  <Footer.Link
                    href="https://www.linkedin.com/in/biplov-subedi-281282199/"
                    target="_blank"
                    rel="noopener noreferrrer"
                  >
                    LinkedIn
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow me" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://www.github.com/bips555"
                    target="_blank"
                    rel="noopener noreferrrer"
                  >
                    {/* prevents windows from blocking new window */}
                    Github
                  </Footer.Link>
                  <Footer.Link
                    href="https://www.instagram.com/subedibiplove1/"
                    target="_blank"
                    rel="noopener noreferrrer"
                  >
                    Instagram
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div className="sm:mt-0 md:mt-0 lg:mt-0">
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">
                    {/* prevents windows from blocking new window */}
                    Privacy policy
                  </Footer.Link>
                  <Footer.Link href="#">Terms and Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full flex lg:flex-row md:flex-row sm:flex-col lg:justify-between md:justify-between sm:justify-center  gap-3 items-center flex-col">
            <Footer.Copyright
              href="#"
              by="Biplov's Blog"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-3">
              <Footer.Icon
                href="https://www.facebook.com/biplove555/"
                icon={BsFacebook}
                target="_blank"
              />
              <Footer.Icon
                target="_blank"
                href="https://www.instagram.com/subedibiplove1/"
                icon={BsInstagram}
              />
              <Footer.Icon
                target="_blank"
                href="https://www.github.com/bips555"
                icon={BsGithub}
              />
              <Footer.Icon
                target="_blank"
                href="https://www.linkedin.com/in/biplov-subedi-281282199/"
                icon={BsLinkedin}
              />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default FooterCom;
