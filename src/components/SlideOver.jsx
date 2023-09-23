import React, { Fragment, useEffect } from "react";
import { useAppContext } from "../context/AppState";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function SlideOver() {
  const {
    slideOverOpen,
    slideOverContent,
    switchSlideOver,
    setSlideOverContent,
  } = useAppContext();

  useEffect(() => {
    if (slideOverOpen === false) {
      setSlideOverContent(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideOverOpen]);

  return (
    <>
      <Transition.Root show={slideOverOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-[998] inset-0 overflow-hidden"
          onClose={() => null}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-2xl">
                  {slideOverContent && (
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1">
                        {/* Header */}
                        {/* <div className="bg-gray-50 px-4 py-6 sm:px-6"> */}
                        <div className="bg-mde-red px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between space-x-3">
                            <div className="space-y-1">
                              <Dialog.Title className="text-lg font-medium text-mde-yellow">
                                {" "}
                                {slideOverContent?.title}{" "}
                              </Dialog.Title>
                              <p className="text-sm text-white">
                                {slideOverContent?.description}
                              </p>
                            </div>
                            <div className="flex h-7 items-center">
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => switchSlideOver(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Divider container */}
                        <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                          {slideOverContent.body}
                        </div>
                      </div>

                      {/* Action buttons */}
                      {/* <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Create
                        </button>
                      </div>
                    </div> */}
                    </div>
                  )}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default SlideOver;
