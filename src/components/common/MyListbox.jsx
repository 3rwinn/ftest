import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

const defaultDatas = [{ id: 0, name: "Aucun choix disponible" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MyListbox({ label, datas = defaultDatas, sideEvent = null }) {
  const [selectedPerson, setSelectedPerson] = useState(datas[0]);

  useEffect(() => {
    if (selectedPerson) {
      sideEvent && sideEvent(selectedPerson);
    }
  }, [selectedPerson]);

  // useEffect(() => {
  //   if (datas) {
  //     setSelectedPerson(datas[0]);
  //   }
  // }, [datas]);

  if (selectedPerson === undefined || selectedPerson === null) {
    return null;
  }

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Label className="block text-sm font-medium text-mde-gray">
        {label}
      </Listbox.Label>
      <div className="mt-1 relative">
        <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-mde-red focus:border-mde-red sm:text-sm">
          <span className="block truncate"> {selectedPerson.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {datas.map((data) => (
            <Listbox.Option
              key={data.id}
              value={data}
              // disabled={person.unavailable}
              className={({ active }) =>
                classNames(
                  active ? "text-white bg-mde-red" : "text-gray-900",
                  "cursor-default select-none relative py-2 pl-3 pr-9"
                )
              }
            >
              {data.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default MyListbox;
