import React, { useEffect, useState, useRef } from "react";
import { Transition } from "@headlessui/react";

const stepDatas = [
  { name: "Step 1", content: null, href: "#", status: "current" },
  { name: "Step 2", content: null, href: "#", status: "upcoming" },
  { name: "Step 3", content: null, href: "#", status: "upcoming" },
  { name: "Step 4", content: null, href: "#", status: "upcoming" },
];

function Wizard({ title }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [moving, setMoving] = useState("right");

  const [steps, setSteps] = useState(stepDatas);

  const prevStep = () => {
    setMoving("left");
    setSteps((old) =>
      old.map((v, i) => {
        if (i === currentStep) {
          v.status = "upcoming";
        } else if (i === currentStep - 1) {
          v.status = "current";
        }
        return v;
      })
    );
    setCurrentStep(currentStep - 1);
    return false;
  };

  const nextStep = async () => {
    setMoving("right");
    // getValues('firstname')

    if (true) {
      setSteps((old) =>
        old.map((v, i) => {
          if (i === currentStep) {
            v.status = "complete";
          } else if (i === currentStep + 1) {
            v.status = "current";
          }
          return v;
        })
      );
      setCurrentStep(currentStep + 1);
    }
    return false;
  };

  const wrapper = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(1);

  useEffect(() => {
    function handleResize() {
      if (wrapper.current !== null) {
        setWrapperWidth(wrapper.current.offsetWidth);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white flex">
        <div className="flex-1 flex flex-col justify-top py-12 px-4 sm:px-6 ">
          <h1>{title}</h1>
          <div
            className="flex items-start overflow-hidden w-96 sm:w-full"
            ref={wrapper}
          >
            <div className="flex flex-nowrap ">
              {steps?.map((step, index) => (
                <Transition
                  appear={false}
                  unmount={false}
                  show={currentStep === index}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom={
                    moving === "right"
                      ? `translate-x-96 opacity-0`
                      : `-translate-x-96 opacity-0`
                  }
                  enterTo={`translate-x-0 opacity-100`}
                  leave="transform transition ease-in-out duration-500 "
                  leaveFrom={`translate-x-0 opacity-100`}
                  leaveTo={
                    moving === "right"
                      ? `-translate-x-full opacity-0`
                      : `translate-x-full opacity-0`
                  }
                  className="w-0 bg-green-200 overflow-visible"
                  as="div"
                >
                  <div style={{ width: `${wrapperWidth}px` }}>
                    {step.content}
                  </div>
                </Transition>
              ))}
            </div>
          </div>
          <div className={`mt-2`}>
            <p className="text-sm font-medium mb-1 mt-3 text-center">
              Step {steps.findIndex((step) => step.status === "current") + 1} of{" "}
              {steps.length}
            </p>
            <nav
              className="flex items-center justify-center"
              aria-label="Progress"
            >
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={() => prevStep()}
              >
                Prev
              </button>
              <ol className="mx-8 flex items-center space-x-5">
                {steps.map((step, i) => (
                  <li key={`step_${i}`}>
                    {step.status === "complete" ? (
                      <a
                        href={step.href}
                        className="block w-2.5 h-2.5 bg-indigo-600 rounded-full hover:bg-indigo-900"
                      >
                        <span className="sr-only"></span>
                      </a>
                    ) : step.status === "current" ? (
                      <a
                        href={step.href}
                        className="relative flex items-center justify-center"
                        aria-current="step"
                      >
                        <span
                          className="absolute w-5 h-5 p-px flex"
                          aria-hidden="true"
                        >
                          <span className="w-full h-full rounded-full bg-indigo-200" />
                        </span>
                        <span
                          className="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full"
                          aria-hidden="true"
                        />
                        <span className="sr-only"></span>
                      </a>
                    ) : (
                      <a
                        href={step.href}
                        className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400"
                      >
                        <span className="sr-only"></span>
                      </a>
                    )}
                  </li>
                ))}
              </ol>
              <button
                type="button"
                disabled={currentStep === 3}
                onClick={() => nextStep()}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wizard;
