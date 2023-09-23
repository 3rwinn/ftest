import React, { useState } from "react";
import { useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import { getAllText } from "../../utils/helpers";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FormMultiComboSelect({ tabName, label, datas }) {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  const sampleData = [
    {
      id: uuidv4(),
      numero: null,
    },
  ];

  let starterData =
    !values[tabName] || values[tabName] === null || values[tabName].length === 0
      ? sampleData
      : values[tabName];

  const [inputs, setInputs] = React.useState(starterData);

  const handleInputChange = (id, value) => {
    const newInputs = inputs.map((i) => {
      if (id === i.id) {
        // i[event.target.name] = event.target.value;
        i["numero"] = value;
      }
      return i;
    });

    console.log("newInputs", newInputs);

    setInputs(newInputs);
    setFieldValue(tabName, newInputs);
  };

  const handleAddInput = () => {
    const datas = [
      ...inputs,
      {
        id: uuidv4(),
        numero: null,
      },
    ];
    setInputs(datas);
    setFieldValue(tabName, datas);
  };

  const handleRemoveInput = (id) => {
    const values = [...inputs];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputs(values);

    setFieldValue(tabName, values);
  };

  console.log("erros", errors);

  // COMBO SELECT
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState();

  const filteredDatas =
    query === ""
      ? datas
      : datas.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <label className="block text-sm font-medium text-mde-gray mb-2">
        {label}
      </label>
      {errors[tabName] && touched[tabName] && (
        <p className="mt-2 mb-2 text-sm text-red-600" id="email-error">
          {getAllText(errors[tabName])} <br />
        </p>
      )}

      {inputs.map((input, index) => (
        <div
          key={index}
          className="mt-1 flex relative rounded-md shadow-sm mb-4"
        >
          {/* <input
            type="text"
            name="numero"
            onChange={(event) => handleInputChange(input.id, event)}
            value={input.numero}
            className="focus:ring-ctam-primary focus:border-ctam-primary block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="Numero de téléphone"
          /> */}
          <div className="w-full">
            <Combobox
              as="div"
              name="numero"
              value={selected}
              onChange={(val) => {
                //   console.log("ismo", val);
                //   let selectedItem = datas.find((it) => it.name === val);
                //   setSelected(selectedItem);
                //   console.log("selectedItem", selectedItem);
                console.log("val", val);
                handleInputChange(input.id, val.value);
              }}
            >
              <div className="relative mt-0">
                <Combobox.Input
                  className="w-full rounded-l-md border border-gray-300 bg-white px-4 py-2 pl-3 pr-10 shadow-sm focus:border-mde-red focus:outline-none focus:ring-1 focus:ring-mde-red sm:text-sm"
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  placeholder="Rechercher ou cliquer sur les flèches pour choisir"
                  displayValue={(person) => person.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 mr-2 focus:outline-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>

                {filteredDatas.length > 0 && (
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredDatas.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        value={person}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                            active ? "bg-mde-red text-white" : "text-gray-900"
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <span
                              className={classNames(
                                "block truncate",
                                selected && "font-semibold"
                              )}
                            >
                              {person.name}
                            </span>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active ? "text-white" : "text-mde-red"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>

          {index === inputs.length - 1 ? (
            <>
              <button
                type="button"
                onClick={handleAddInput}
                className={classNames(
                  inputs.length > 1
                    ? "-ml-2 relative inline-flex items-center space-x-2 px-4 py-2 border border-green-300 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-1 focus:ring-mde-green focus:border-mde-green"
                    : "-ml-2 relative inline-flex items-center rounded-r-md space-x-2 px-4 py-2 border border-green-300 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-1 focus:ring-mde-green focus:border-mde-green"
                )}
              >
                <PlusSmallIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              {inputs.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveInput(input.iname)}
                  className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-red-300 text-sm font-medium rounded-r-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
                >
                  <MinusSmallIcon className="h-4 w-4" />
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => handleRemoveInput(input.id)}
              className="-ml-2 relative inline-flex items-center space-x-2 px-4 py-2 border border-red-300 text-sm font-medium rounded-r-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
            >
              <MinusSmallIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export default FormMultiComboSelect;
