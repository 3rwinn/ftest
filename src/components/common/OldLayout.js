import React, { useEffect, useState, Fragment } from "react";
import Avatar from "../../components/common/Avatar";
import H1 from "../../components/common/H1";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  XCircleIcon,
  MenuAlt2Icon,
  CollectionIcon,
  AcademicCapIcon,
} from "@heroicons/react/solid";
import Navigation from "../Navigation";
import { useLocation, Link, useNavigate } from "react-router-dom";
import userMenus from "../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { getProfiles } from "../../features/auth/authSlice";
import { logout } from "../../features/auth/authSlice";
import { useAppContext } from "../../context/AppState";
import { findProfileInArray } from "../../utils/helpers";
import backend from "../../constants/config";
import VersionBadge from "../versioning/VersionBadge";
import VersionMsg from "../versioning/VersionMsg";
import { getAppLastVersion } from "../../features/core/coreSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Layout({ role = "student", pageTitle, children, hideSide = false }) {
  const sidebarNavigation = userMenus[role];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [menuActive, setMenuActive] = useState(0);

  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, profiles } = useSelector((state) => state.auth);

  const { lastVersion } = useSelector((state) => state.core);

  useEffect(() => {
    dispatch(getAppLastVersion());
  }, [dispatch, location]);

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const { selectedProgramme, appVersion, setAppVersion } = useAppContext();

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    sidebarNavigation.map((item, index) => {
      if (
        location.pathname === item.href ||
        item?.sub?.includes(location.pathname)
      ) {
        return setMenuActive(index);
      }
      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="h-full flex md:overflow-x-hidden">
      {!hideSide && (
        <Fragment>
          {/*BEGIN - Aside menu */}
          <div className="hidden w-28 h-screen overflow-y-hidden bg-white md:fixed md:block">
            <div className="w-full flex flex-col justify-between h-full py-6">
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="flex flex-col space-y-3">
                  <img
                    // src={process.env.PUBLIC_URL + "/images/logoMDE.png"}
                    src={backend.MEDIAS + "/logoMDE.png"}
                    className="h-14 w-auto"
                    alt="MDE"
                  />
                  <VersionBadge
                    currentVersion={appVersion}
                    lastVersion={lastVersion}
                  />
                </div>
              </div>
              <div className="mx-auto w-full px-2 space-y-1">
                <div className="flex-1 mt-6 w-full px-2 space-y-1">
                  <Navigation
                    datas={sidebarNavigation}
                    menuActive={menuActive}
                  />
                </div>
              </div>
              <div className="mx-auto">
                <div
                  onClick={onLogout}
                  className="cursor-pointer text-mde-gray hover:text-mde-red-700 group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                >
                  <XCircleIcon
                    className="h-10 w-10 text-mde-red group-hover:text-mde-red-700"
                    aria-hidden="true"
                  />
                  <span className="mt-2 font-bold text-center">
                    Déconnexion
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/*END - Aside menu */}
          {/* Mobile menu */}
          <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-1 right-0 -mr-14 p-1">
                        <button
                          type="button"
                          className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <XCircleIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Close sidebar</span>
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 px-4 flex items-center">
                      <div className="flex flex-row space-x-2">
                        <img
                          className="h-8 w-auto"
                          // src={process.env.PUBLIC_URL + "/images/logoMDE.png"}
                          src={backend.MEDIAS + "/logoMDE.png"}
                          alt="MDE"
                        />
                        <VersionBadge
                          currentVersion={appVersion}
                          lastVersion={lastVersion}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                      <nav className="h-full flex flex-col">
                        <div className="space-y-1">
                          {sidebarNavigation.map((item, index) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                menuActive === index
                                  ? // ? "bg-mde-red text-mde-yellow"
                                    "bg-white text-mde-yellow"
                                  : "text-mde-gray hover:text-mde-red-700",
                                "group py-2 px-3 rounded-md flex items-center text-sm font-bold"
                              )}
                              aria-current={
                                menuActive === index ? "page" : undefined
                              }
                            >
                              <item.icon
                                className={classNames(
                                  menuActive === index
                                    ? "text-mde-yellow"
                                    : "text-mde-red-300 group-hover:text-mde-red",
                                  "mr-3 h-6 w-6"
                                )}
                                aria-hidden="true"
                              />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                          {role !== "admin" && (
                            <a
                              href="https://campus.mde.ci"
                              target="_blank"
                              rel="noreferrer"
                              className="cursor-pointer text-mde-gray hover:text-mde-red-700 group py-2 px-3 rounded-md flex items-center text-sm font-bold"
                            >
                              <AcademicCapIcon
                                className="text-mde-red-300 group-hover:text-mde-red
                                mr-3 h-6 w-6"
                                aria-hidden="true"
                              />
                              <span>Campus</span>
                            </a>
                          )}

                          <div
                            onClick={onLogout}
                            className="cursor-pointer text-mde-gray hover:text-mde-red-700 group py-2 px-3 rounded-md flex items-center text-sm font-bold"
                          >
                            <XCircleIcon
                              className="text-mde-red-300 group-hover:text-mde-red
                                  mr-3 h-6 w-6"
                              aria-hidden="true"
                            />
                            <span>Déconnexion</span>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </Fragment>
      )}

      <div
        className={classNames(
          !hideSide
            ? "flex-1 flex flex-col bg-mde-bg p-6 md:ml-28"
            : "flex-1 flex flex-col bg-mde-bg p-6"
        )}
      >
        {/* BEGIN - TopBar */}
        <div className="w-full">
          <VersionMsg
            currentVersion={appVersion}
            lastVersion={lastVersion}
            event={setAppVersion}
          />

          <div className="h-16 flex flex-row justify-between border-b border-mde-red items-center pb-4">
            {!hideSide && (
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-mde-red focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mde-red md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            )}
            <div>
              <H1>{pageTitle}</H1>
              {role === "admin" && (
                <div className="max-w-sm">
                  <div
                    onClick={() => navigate("/adm")}
                    className={`cursor-pointer text-opacity-90
                          group inline-flex items-center rounded-md text-base font-bold text-mde-gray hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-mde-gray focus-visible:ring-opacity-75`}
                  >
                    <span>{selectedProgramme?.libelle}</span>
                    <CollectionIcon
                      className={
                        "text-opacity-70 ml-2 h-5 w-5 text-mde-gray transition duration-150 ease-in-out group-hover:text-opacity-80"
                      }
                      aria-hidden="true"
                    />
                  </div>
                </div>
                // <Popover.Button className="flex items-center">
                //   <div
                //     // onClick={() => navigate("/adm")}
                //     className="cursor-pointer text-mde-gray text-sm font-bold"
                //   >
                //     AMP PUBLIC{" "}
                //   </div>
                //   <ChevronDownIcon
                //     className="h-6 w-6 text-mde-gray"
                //     aria-hidden="true"
                //   />
                // </Popover.Button>
              )}
            </div>
            <Menu as="div" className="ml-3 relative">
              <div className="flex flex-row items-center">
                <div className="mr-3 hidden md:block leading-none">
                  <span className="font-poppins font-bold  text-sm linr text-mde-gray">
                    {/* Bienvenue, <br />{" "} */}
                    Bienvenue,{" "}
                    <span className="font-bold text-dark">
                      {user?.user?.last_name} {user?.user?.first_name}
                    </span>
                    <span className="mt-2">
                      {role !== "admin" && (
                        <a
                          href="https://campus.mde.ci"
                          target="_blank"
                          rel="noreferrer"
                          className=" text-mde-gray hover:text-mde-red-70 flex items-center text-sm font-bold"
                        >
                          <AcademicCapIcon
                            className="text-mde-red-300 group-hover:text-mde-red
mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          <span className="text-mde-red-300">
                            Accéder au campus
                          </span>
                        </a>
                      )}
                    </span>
                  </span>
                </div>
                <Menu.Button className="max-w-xs rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-mde-red focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <Avatar
                    url={
                      findProfileInArray(profiles, user?.user?.id)?.profile
                        ?.photo
                    }
                    size={12}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {[
                    // { name: "Your Profile", href: "#" },
                    { name: "Se déconnecter", href: "#" },
                  ].map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <div
                          // href={item.href}
                          onClick={onLogout}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "cursor-pointer block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            {/* <div className="flex flex-row items-center">
              <Avatar url={findProfileInArray(profiles, user?.user?.id)?.profile?.photo} size={12} />
              <div className="ml-3 hidden md:block leading-none">
                <span className="font-poppins font-bold  text-sm linr text-mde-gray">
                  Bienvenue, <br />{" "}
                  <span className="font-bold text-dark">
                    {user?.user?.first_name} {user?.user?.last_name}
                  </span>
                </span>
              </div>
            </div> */}
          </div>
        </div>
        {/* END - TopBar */}
        {/* BEGIN - Content */}
        <div className="pt-4 w-full">{children}</div>
        {/* <div className="mx-auto pt-4">{children}</div> */}
        {/* END - Content */}
      </div>
    </div>
  );
}

export default Layout;
