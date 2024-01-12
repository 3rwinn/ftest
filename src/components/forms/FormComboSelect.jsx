import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FormComboSelect({
  label,
  name,
  datas = [],
  sideEvent = null,
}) {
  const [query, setQuery] = useState("");
  //   const [selectedPerson, setSelectedPerson] = useState();

  const { setFieldValue, errors, touched, values } = useFormikContext();
  //   let findedElement = datas.filter((el) => el.value === values[name])[0];

  useEffect(() => {
    if (sideEvent !== null) {
      sideEvent(values[name]);
    }
  }, [values[name]]);

  //   let selectedElement =
  //     values[name] === null || values[name] === ""
  //       ? {
  //           id: 0,
  //           name: "Rechercher ou cliquer pour choisir",
  //           value: "",
  //         }
  //       : findedElement === null || findedElement === undefined
  //       ? {
  //           id: 0,
  //           name: "Rechercher pour choisir",
  //           value: "",
  //         }
  //       : findedElement;
  // const [selected, setSelected] = useState(selectedElement);
  const [selected, setSelected] = useState();

  const filteredDatas =
    query === ""
      ? datas
      : datas.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={(val) => {
        console.log("ismo", val);
        let selectedItem = datas.find((it) => it.name === val);
        setSelected(selectedItem);
        setFieldValue(name, val.value);
      }}
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-mde-red focus:outline-none focus:ring-1 focus:ring-mde-red sm:text-sm"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          placeholder="Rechercher ou cliquer sur les flèches pour choisir"
          displayValue={(person) => person.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
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
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  );
}
