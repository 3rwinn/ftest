import React from "react";
import { useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import { getAllText } from "../../utils/helpers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FormFieldMultiple({ tabName, label }) {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  const sampleData = [
    {
      id: uuidv4(),
      numero: "",
    },
  ];

  let starterData =
    !values[tabName] || values[tabName] === null || values[tabName].length === 0
      ? sampleData
      : values[tabName];

  const [inputs, setInputs] = React.useState(starterData);

  const handleInputChange = (id, event) => {
    const newInputs = inputs.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputs(newInputs);
    setFieldValue(tabName, newInputs);
  };

  const handleAddInput = () => {
    const datas = [
      ...inputs,
      {
        id: uuidv4(),
        numero: "",
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
          <input
            type="text"
            name="numero"
            onChange={(event) => handleInputChange(input.id, event)}
            value={input.numero}
            className="focus:ring-ctam-primary focus:border-ctam-primary block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="Numero de téléphone"
          />

          {index === inputs.length - 1 ? (
            <>
              <button
                type="button"
                onClick={handleAddInput}
                className={classNames(
                  inputs.length > 1
                    ? "-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-green-300 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-1 focus:ring-mde-green focus:border-mde-green"
                    : "-ml-px relative inline-flex items-center rounded-r-md space-x-2 px-4 py-2 border border-green-300 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-1 focus:ring-mde-green focus:border-mde-green"
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
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-red-300 text-sm font-medium rounded-r-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
            >
              <MinusSmallIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export default FormFieldMultiple;
