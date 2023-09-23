import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition, Disclosure } from "@headlessui/react";
import {
  BellIcon,
  CogIcon,
  HomeIcon,
  Bars2Icon,
  UserGroupIcon,
  XMarkIcon,
  BanknotesIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { classNames } from "../../utils/helpers";
import adsLogo from "../../assets/ctam-ads.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigationStaff = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    current: false,
  },

  {
    name: "Finances",
    icon: BanknotesIcon,
    current: false,
    children: [
      { name: "Entrées", href: "/finances/entrees" },
      { name: "Sorties", href: "/finances/sorties" },
      { name: "Suivi banque", href: "/finances/banque" },
      // { name: "Reporting", href: "/finances/reporting" },
      { name: "Fiche du dimanche", href: "/finances/fiche" },
    ],
  },
  {
    name: "Engagements",
    icon: UserGroupIcon,
    current: false,
    children: [
      { name: "Vue d'ensemble", href: "/engagements/overview" },
      { name: "Attributions", href: "/engagements/attributions" },
      { name: "Entrées", href: "/engagements/entrees" },
      { name: "Dépenses", href: "/engagements/depenses" },
      { name: "Reporting", href: "/engagements/reporting" },
    ],
  },
  {
    name: "Quotidien",
    icon: CalendarIcon,
    current: false,
    children: [
      { name: "Annuaire des membres", href: "/quotidien/membres" },
      { name: "Suivi des nouveaux", href: "/quotidien/nouveaux" },
      { name: "Evènements", href: "/quotidien/evenements" },
      { name: "Communication", href: "/quotidien/communication" },
    ],
  },
  {
    name: "Paramètres",
    href: "/settings",
    icon: CogIcon,
    current: false,
    children: [
      { name: "Missions", href: "/settings/missions" },
      { name: "Paliers", href: "/settings/paliers" },
      { name: "Types d'entrées", href: "/settings/entrees" },
      { name: "Types de sorties", href: "/settings/sorties" },
      { name: "Utilisateurs & rôles", href: "/settings/users" },
    ],
  },
];

const navigationCommon = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    current: false,
  },

  {
    name: "Finances",
    icon: BanknotesIcon,
    current: false,
    children: [
      { name: "Entrées", href: "/finances/entrees" },
      { name: "Sorties", href: "/finances/sorties" },
      { name: "Suivi banque", href: "/finances/banque" },
      // { name: "Reporting", href: "/finances/reporting" },
      { name: "Fiche du dimanche", href: "/finances/fiche" },
    ],
  },
  {
    name: "Engagements",
    icon: UserGroupIcon,
    current: false,
    children: [
      { name: "Vue d'ensemble", href: "/engagements/overview" },
      { name: "Attributions", href: "/engagements/attributions" },
      { name: "Entrées", href: "/engagements/entrees" },
      { name: "Dépenses", href: "/engagements/depenses" },
      { name: "Reporting", href: "/engagements/reporting" },
    ],
  },
  {
    name: "Quotidien",
    icon: CalendarIcon,
    current: false,
    children: [
      { name: "Annuaire des membres", href: "/quotidien/membres" },
      { name: "Suivi des nouveaux", href: "/quotidien/nouveaux" },
      { name: "Evènements", href: "/quotidien/evenements" },
      { name: "Communication", href: "/quotidien/communication" },
    ],
  },
];

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [navigationToShow, setNavigationToShow] = useState([]);
  React.useEffect(() => {
    if (user?.user?.is_staff) {
      setNavigationToShow(navigationStaff);
    } else {
      setNavigationToShow(navigationCommon);
    }
  }, [user]);

  const onLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const location = useLocation();

  const [menuActive, setMenuActive] = useState(0);
  useEffect(() => {
    navigationToShow.map((item, index) => {
      if (location.pathname === item.href) {
        setMenuActive(index);
      } else {
        item?.children?.map((subItem) => {
          if (subItem.href === location.pathname) {
            setMenuActive(index);
          }
        });
      }
    });
  }, [location, navigationToShow]);

  return (
    <>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-ctam-primary">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-14 w-auto"
                    src={adsLogo}
                    alt="Easywire logo"
                  />
                </div>
                <nav
                  className="mt-5 flex-shrink-0 h-full divide-y divide-ctamp-800 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="px-2 space-y-1">
                    {navigationToShow.map((item, index) =>
                      !item.children ? (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            menuActive === index
                              ? "bg-ctamp-800 text-white"
                              : "text-ctamp-100 hover:text-white hover:bg-ctamp-600",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                          aria-current={
                            menuActive === index ? "page" : undefined
                          }
                        >
                          <item.icon
                            className="mr-4 flex-shrink-0 h-6 w-6 text-ctamp-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ) : (
                        <Disclosure
                          as="div"
                          key={item.name}
                          className="space-y-1"
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  menuActive === index
                                    ? "bg-ctamp-800 text-white"
                                    : " text-ctamp-100 hover:text-white hover:bg-ctamp-600",
                                  "group w-full flex items-center pl-2 pr-1 py-2 text-left text-base font-medium rounded-md"
                                )}
                              >
                                <item.icon
                                  className="mr-4 flex-shrink-0 h-6 w-6 text-ctamp-200"
                                  aria-hidden="true"
                                />
                                <span className="flex-1">{item.name}</span>
                                <svg
                                  className={classNames(
                                    open
                                      ? "text-ctamp-400 rotate-90"
                                      : "text-ctamp-300",
                                    "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-ctamp-400 transition-colors ease-in-out duration-150"
                                  )}
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M6 6L14 10L6 14V6Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Disclosure.Button>
                              <Disclosure.Panel className="space-y-1">
                                {item.children.map((subItem) => (
                                  <Disclosure.Button
                                    key={subItem.name}
                                    as="a"
                                    href={subItem.href}
                                    className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-ctamp-200 rounded-md hover:text-white hover:bg-ctamp-600"
                                  >
                                    {subItem.name}
                                  </Disclosure.Button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )
                    )}
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-ctam-primary pt-5 pb-4 overflow-y-auto">
            <div className="flex flex-col items-center flex-shrink-0 px-4">
              <img className="h-14 w-auto" src={adsLogo} alt="CNAM logo" />
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-ctamp-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigationToShow.map((item, index) =>
                  !item.children ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        menuActive === index
                          ? "bg-ctamp-800 text-white"
                          : "text-ctamp-100 hover:text-white hover:bg-ctamp-600",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                      aria-current={menuActive === index ? "page" : undefined}
                    >
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-ctamp-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              menuActive === index
                                ? "bg-ctamp-800 text-white"
                                : " text-ctamp-100 hover:text-white hover:bg-ctamp-600",
                              "group w-full flex items-center pl-2 pr-1 py-2 text-left text-base font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className="mr-4 flex-shrink-0 h-6 w-6 text-ctamp-200"
                              aria-hidden="true"
                            />
                            <span className="flex-1">{item.name}</span>
                            <svg
                              className={classNames(
                                open
                                  ? "text-ctamp-400 rotate-90"
                                  : "text-ctamp-300",
                                "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-ctamp-400 transition-colors ease-in-out duration-150"
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 6L14 10L6 14V6Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                              <Disclosure.Button
                                key={subItem.name}
                                as="a"
                                href={subItem.href}
                                className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-ctamp-200 rounded-md hover:text-white hover:bg-ctamp-600"
                              >
                                {subItem.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="flex-1 flex"></div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                      {/* <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      /> */}
                      <div className="h-8 w-8 bg-gray-200 rounded-full">
                        <UserIcon />
                      </div>
                      <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>
                        {user?.user?.username}{" "}
                        {user?.mission?.libelle !== "all" && (
                          <>({user?.mission?.libelle})</>
                        )}
                      </span>
                      <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/account"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Parametres du compte
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => onLogout()}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Se déconnecter
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">
            <div className="mt-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
