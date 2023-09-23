import React, { Fragment } from "react";
import { useAppContext } from "../context/AppState";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { ServerIcon, } from "@heroicons/react/24/solid";
import {
  ExclamationCircleIcon,
  FolderPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const projects = [
  {
    id: 1,
    name: "Workflow Inc. / Website Redesign",
    category: "Projects",
    url: "#",
  },
  // More projects...
];

const users = [
  {
    id: 1,
    name: "Leslie Alexander",
    url: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More users...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CommandPalette() {
  const { commandPaletteOpen, switchCommandPalette } = useAppContext();

  const [rawQuery, setRawQuery] = React.useState("");

  const query = rawQuery.toLowerCase().replace(/^[#>]/, "");


  return (
    <Transition.Root
      show={commandPaletteOpen}
      as={Fragment}
      afterLeave={() => setRawQuery("")}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-[9999] overflow-y-auto p-4 sm:p-6 md:p-20"
        onClose={switchCommandPalette}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(item) => (window.location = item.url)}
          >
            <div className="relative">
              <ServerIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                onChange={(event) => setRawQuery(event.target.value)}
              />
            </div>


            <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
              Type{" "}
              <kbd
                className={classNames(
                  "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                  rawQuery.startsWith("#")
                    ? "border-mde-red text-mde-red"
                    : "border-gray-400 text-gray-900"
                )}
              >
                #
              </kbd>{" "}
              <span className="sm:hidden">for projects,</span>
              <span className="hidden sm:inline">to access projects,</span>
              <kbd
                className={classNames(
                  "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                  rawQuery.startsWith(">")
                    ? "border-mde-red text-mde-red"
                    : "border-gray-400 text-gray-900"
                )}
              >
                &gt;
              </kbd>{" "}
              for users, and{" "}
              <kbd
                className={classNames(
                  "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                  rawQuery === "?"
                    ? "border-mde-red text-mde-red"
                    : "border-gray-400 text-gray-900"
                )}
              >
                ?
              </kbd>{" "}
              for help.
            </div>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

export default CommandPalette;
