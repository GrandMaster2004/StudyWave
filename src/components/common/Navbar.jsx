"use client"

import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import * as FiIcons from "react-icons/fi"
import { IoIosArrowDown } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import * as Icons from "react-icons/vsc"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

// import logo from "../../assets/Logo/Logo-Full-Light.png"
import { sidebarLinks } from "../../data/dashboard-links"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { totalItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [catalogOpen, setcatalogOpen] = useState(false)

  const location = useLocation()
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const [subLinks, setSubLinks] = useState([])

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API)
      console.log("CATEGORIES>>>", result.data.data)
      setSubLinks(result.data.data)
    } catch (error) {
      console.log("Can't fetch the category list")
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchSubLinks()
    console.log("SUBLINKS>>>", subLinks)
  }, [])

  const getIcon = (iconName) => {
    const iconLibraries = { ...Icons, ...BsIcons, ...AiIcons, ...FiIcons }
    return iconLibraries[iconName] || Icons.VscCircleFilled
  }

  const isDashboardRoute = location.pathname.startsWith("/dashboard")

  const filteredDashboardLinks = sidebarLinks.filter((link) => {
    if (link.type && user?.accountType !== link.type) return false
    return true
  })

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          {/* <img
            src={logo || "/placeholder.svg"}
            loading="lazy"
            width={160}
            height={32}
            className="w-32 sm:w-40 md:w-[160px]"
            alt="Logo"
          ></img> */}
        </Link>

        {/* Navbar links */}
        <nav className="hidden md:block">
          <ul className="flex flex-row gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer flex-row items-center gap-1
                                                ${
                                                  matchRoute(
                                                    "/catalog/:catalogName"
                                                  )
                                                    ? "text-yellow-25"
                                                    : "text-richblack-25"
                                                }
                                                `}
                  >
                    <p>{link.title}</p>
                    <IoIosArrowDown />

                    <div className="invisible absolute left-[50%] top-[50%] z-[1000]  flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks?.length ? (
                        <>
                          {subLinks
                            ?.filter((subLink) => subLink?.course?.length > 0)
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Buttons */}
        <div className=" hidden items-center gap-x-4 md:flex">
          {/* {console.log(token)} */}
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <RxCross2 fontSize={24} className="text-[#AFB2BF]" fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 top-14 z-50 max-h-[calc(100vh-3.5rem)] w-full overflow-y-auto bg-richblack-800 p-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-y-2 text-richblack-25">
            {token && isDashboardRoute && (
              <>
                <li className="mb-2 w-full border-b border-richblack-700 pb-2">
                  <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-richblack-300">
                    Dashboard
                  </div>
                </li>
                {filteredDashboardLinks.map((link) => {
                  const Icon = getIcon(link.icon)
                  return (
                    <li key={link.id} className="w-full">
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                          matchRoute(link.path)
                            ? "border-l-4 border-yellow-50 bg-yellow-800 text-yellow-50"
                            : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
                        }`}
                      >
                        <Icon className="text-lg" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  )
                })}
                {/* Settings Link */}
                <li className="w-full">
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                      matchRoute("/dashboard/settings")
                        ? "border-l-4 border-yellow-50 bg-yellow-800 text-yellow-50"
                        : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
                    }`}
                  >
                    <Icons.VscSettingsGear className="text-lg" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="mb-2 mt-2 w-full border-b border-richblack-700 pb-2">
                  <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-richblack-300">
                    Navigation
                  </div>
                </li>
              </>
            )}

            {/* Regular Navigation Links */}
            {NavbarLinks.map((link, index) => (
              <li key={index} className="w-full">
                {link.title === "Catalog" ? (
                  <div className="relative w-full">
                    <button
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3 font-semibold text-richblack-25 transition-colors hover:bg-richblack-700 ${
                        matchRoute("/catalog/:catalogName")
                          ? "bg-richblack-700 text-yellow-25"
                          : ""
                      }`}
                      onClick={() => setcatalogOpen((prev) => !prev)}
                    >
                      <span>{link.title}</span>
                      <IoIosArrowDown
                        className={`text-sm transition-transform duration-300 ${
                          catalogOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {catalogOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 w-full divide-y divide-richblack-600 overflow-hidden rounded-md border border-richblack-700 bg-richblack-800 shadow-md"
                      >
                        {loading ? (
                          <div className="py-4 text-center text-richblack-100">
                            Loading...
                          </div>
                        ) : subLinks?.length ? (
                          subLinks
                            .filter((sublink) => sublink?.course?.length > 0)
                            .map((sublink, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${sublink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                onClick={() => {
                                  setcatalogOpen(false)
                                  setMobileMenuOpen(false)
                                }}
                              >
                                <div className="px-4 py-3 text-sm text-richblack-100 transition-colors hover:bg-richblack-700 hover:text-yellow-25">
                                  {sublink.name}
                                </div>
                              </Link>
                            ))
                        ) : (
                          <div className="py-4 text-center text-richblack-300">
                            No Courses Found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full justify-center rounded-lg py-3 text-richblack-25 transition-colors hover:bg-richblack-700 hover:text-yellow-25"
                  >
                    <p
                      className={`${
                        matchRoute(link?.path) ? "text-yellow-25" : ""
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}

            <div className="mt-4 w-full border-t border-richblack-700 pt-4">
              {token === null ? (
                <div className="flex w-full flex-col items-center gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full max-w-xs"
                  >
                    <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 transition-colors hover:bg-richblack-700">
                      Log in
                    </button>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full max-w-xs"
                  >
                    <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 transition-colors hover:bg-richblack-700">
                      Sign up
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link
                      to="/dashboard/cart"
                      className="relative"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-richblack-700">
                        <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                        <span className="text-richblack-100">Cart</span>
                        {totalItems > 0 && (
                          <span className="grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                            {totalItems}
                          </span>
                        )}
                      </div>
                    </Link>
                  )}
                  <ProfileDropdown />
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
