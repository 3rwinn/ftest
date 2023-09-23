import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
// import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const lists = [
  { id: 1, name: "Leadership", value: "modleadership" },
  { id: 2, name: "Ethique", value: "modeethique" },
];

function FormSelect({
  label,
  name,
  datas = lists,
  sideEvent = null,
  ...otherProps
}) {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  let findedElement = datas.filter((el) => el.value === values[name])[0];

  let selectedElement =
    values[name] === null || values[name] === ""
      ? {
          id: 0,
          name: "Cliquer pour choisir",
          value: "",
        }
      : findedElement === null || findedElement === undefined
      ? {
          id: 0,
          name: "Cliquer pour choisir",
          value: "",
        }
      : findedElement;
  const [selected, setSelected] = useState(selectedElement);


  useState(() => {
    if (sideEvent) {
      if (selectedElement) {
        sideEvent(selectedElement.value);
      } 
    }
  }, [selectedElement, sideEvent]);

  // if (selectedElement === undefined || selectedElement === null) {
  //   return (
  //     <div className="text-center">
  //       <span className="font-medium text-mde-gray">
  //         Aucun choix disponible
  //       </span>
  //     </div>
  //   );
  // }

  return (
    <Listbox
      value={selected}
      onChange={(val) => {
        let selectedItem = datas.find((it) => it.name === val);
        setSelected(selectedItem);
        setFieldValue(name, selectedItem.value);
        sideEvent && sideEvent(selectedItem.value);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-mde-gray">
            {label}
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-mde-red focus:border-mde-red sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {datas.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-mde-red" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={item.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {item.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-mde-red",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
            <div className="mb-4" />
          </div>
          {errors[name] && touched[name] && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors[name]}
            </p>
          )}
          {/* {errors[name] && touched[name] && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              // <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )} */}
        </>
      )}
    </Listbox>
  );
}
export default FormSelect;
