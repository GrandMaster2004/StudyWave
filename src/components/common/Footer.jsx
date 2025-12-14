import React from "react"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom"

import Logo from "../../assets/Logo/Logo-Full-Light.jpg"
import { FooterLink2 } from "../../data/footer-links"

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
]
const Plans = ["Paid memberships", "For students", "Business solutions"]
const Community = ["Forums", "Chapters", "Events"]

function Footer() {
  return (
    <div className="bg-richblack-800">
      <div className="relative mx-auto flex w-11/12 max-w-maxContent items-center justify-between gap-8 pt-4 leading-6 text-richblack-400 md:pt-14 lg:flex-row">
        <div className="flex w-[100%] flex-col border-b border-richblack-700 pb-5 lg:flex-row">
          {/* Section 1 */}
          <div className="flex flex-row flex-wrap justify-between gap-3 pl-3 lg:w-[50%] lg:border-r lg:border-richblack-700 lg:pr-5">
            <div className="mb-7 flex w-full flex-col gap-3 sm:w-[48%] lg:w-[30%] lg:pl-0">
              <img
                src={Logo || "/placeholder.svg"}
                alt="TechAscend Logo"
                className="w-32 object-contain sm:w-40"
              />
              <h1 className="text-[16px] font-semibold text-richblack-50">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  )
                })}
              </div>

              <div className="mt-2 flex gap-3 text-lg">
                <FaFacebook className="cursor-pointer transition-colors hover:text-richblack-50" />
                <FaGoogle className="cursor-pointer transition-colors hover:text-richblack-50" />
                <FaTwitter className="cursor-pointer transition-colors hover:text-richblack-50" />
                <FaYoutube className="cursor-pointer transition-colors hover:text-richblack-50" />
              </div>
            </div>

            <div className="mb-7 w-full sm:w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-richblack-50">
                Resources
              </h1>

              <div className="mt-2 flex flex-col gap-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  )
                })}
              </div>

              <h1 className="mt-7 text-[16px] font-semibold text-richblack-50">
                Support
              </h1>
              <div className="mt-2 cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="mb-7 w-full sm:w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-richblack-50">
                Plans
              </h1>

              <div className="mt-2 flex flex-col gap-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  )
                })}
              </div>
              <h1 className="mt-7 text-[16px] font-semibold text-richblack-50">
                Community
              </h1>

              <div className="mt-2 flex flex-col gap-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-row flex-wrap justify-between gap-3 pl-3 lg:mt-0 lg:w-[50%] lg:pl-5">
            {FooterLink2.map((ele, i) => {
              return (
                <div
                  key={i}
                  className="mb-7 w-full sm:w-[48%] lg:w-[30%] lg:pl-0"
                >
                  <h1 className="text-[16px] font-semibold text-richblack-50">
                    {ele.title}
                  </h1>
                  <div className="mt-2 flex flex-col gap-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-4 pb-0 text-sm text-richblack-400 md:pb-1 lg:flex-row lg:gap-0">
        {/* Section 1 */}
        <div className="flex w-full flex-col items-center justify-center gap-3 lg:w-auto lg:flex-row lg:justify-start">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-0">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={`${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "cursor-pointer border-r border-richblack-700 transition-all duration-200 hover:text-richblack-50"
                  } px-3 py-1`}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center lg:text-right">
          Made with ❤️ Tech Classes
        </div>
      </div>
    </div>
  )
}

export default Footer
