import React from "react";
import { useFormikContext } from "formik";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { getAllText } from "../../utils/helpers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MultiFormField({ name }) {
  const { setFieldTouched, setFieldValue, values, touched, errors } =
    useFormikContext();

  let starterData =
    !values[name] || values[name] === null || values[name].length === 0
      ? [
          {
            ilabel: "Libellé de la question",
            type: "text",
            // iname: `${name}_1`,
            iname: `${name}_${uuidv4()}`,
            value: "",
            func: "add",
          },
        ]
      : values[name];

  const [inputs, setInputs] = React.useState(starterData);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputs];
    list[index]["value"] = value;

    setInputs(list);

    setFieldValue(name, inputs);
  };

  const handleAdd = () => {
    const list = [...inputs];
    // const newName = `${name}_${list.length + 1}`;
    const newName = `${name}_${uuidv4()}`;
    list.push({
      // ilabel: `Libellé de la question ${list.length + 1}`,
      ilabel: `Libellé de la question`,
      iname: newName,
      value: "",
      type: "text",
      func: "delete",
    });

    setInputs(list);

    setFieldValue(name, inputs);
  };

  const handleDelete = (iname) => {
    const list = inputs.filter((input) => input.iname !== iname);

    setInputs(list);

    setFieldValue(name, list);
  };

  return (
    <>
      <label className="block text-sm font-bold text-mde-gray">
        Questions supplémentaires
      </label>
      {errors[name] && touched[name] && (
        <p className="mt-2 mb-2 text-sm text-red-600" id="email-error">
          {getAllText(errors[name])}
        </p>
      )}
      {inputs.map((input, index) => (
        <div key={index} className="mb-4">
          <label
            htmlFor={input.iname}
            className="block text-sm font-medium text-mde-gray"
          >
            {input.ilabel}
          </label>

          <div
            className={classNames("mt-1 flex relative rounded-md shadow-sm")}
          >
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input
                onChange={(e) => handleChange(e, index)}
                onBlur={() => setFieldTouched(name)}
                id={input.iname}
                value={input.value}
                name={input.iname}
                type={input.type}
                className={classNames(
                  "focus:ring-mde-gray focus:border-mde-gray block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                )}
              />
              {index === inputs.length - 1 ? (
                <>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className={classNames(
                      inputs.length > 1
                        ? "-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-green-300 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-1 focus:ring-mde-green focus:border-mde-green"
                        : "-ml-px relative inline-flex items-center rounded-r-md space-x-2 px-4 py-2 border border-green-300 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-1 focus:ring-mde-green focus:border-mde-green"
                    )}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                  {inputs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDelete(input.iname)}
                      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-red-300 text-sm font-medium rounded-r-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-mde-red focus:border-mde-red"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleDelete(input.iname)}
                  className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-red-300 text-sm font-medium rounded-r-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-mde-red focus:border-mde-red"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MultiFormField;
