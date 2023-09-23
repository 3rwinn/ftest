import React from "react";
import { useFormikContext } from "formik";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";
import { getAllText } from "../../utils/helpers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SpecialFormField({ tabName, placeholder = "" }) {
  const { setFieldTouched, setFieldValue, values, touched, errors } =
    useFormikContext();

  let starterData =
    !values[tabName] || values[tabName] === null || values[tabName].length === 0
      ? [
          {
            // ilabel: "Libellé de la question 1",
            ilabel: "Libellé de la question",
            type: "text",
            // iname: `${tabName}_1`,
            iname: `${tabName}_${uuidv4()}`,
            // value: placeholder ? placeholder : "",
            value: placeholder,
            func: "add",
            reponses: [
              {
                // rep_ilabel: "Reponse 1",
                rep_ilabel: "Reponse",
                // rep_iname: `${tabName}_1_reponse_1`,
                rep_iname: `${tabName}_reponse_${uuidv4()}`,
                rep_value: "",
                rep_func: "add",
                rep_veracite: false,
              },
            ],
          },
        ]
      : values[tabName];

  const [inputs, setInputs] = React.useState(starterData);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputs];
    list[index]["value"] = value;

    setInputs(list);

    setFieldValue(tabName, inputs);
  };

  const handleAdd = () => {
    const list = [...inputs];
    // const newName = `${tabName}_${list.length + 1}`;
    const newName = `${tabName}_${uuidv4()}`;
    list.push({
      // ilabel: `Libellé de la question ${list.length + 1}`,
      ilabel: `Libellé de la question`,
      iname: newName,
      // value: "",
      value: placeholder,
      type: "text",
      func: "delete",
      reponses: [
        {
          // rep_ilabel: "Reponse 1",
          rep_ilabel: "Reponse",
          // rep_iname: newName + "_reponse_1",
          rep_iname: newName + "_reponse_" + uuidv4(),
          rep_value: "",
          rep_veracite: false,
          rep_func: "add",
        },
      ],
    });

    setInputs(list);

    setFieldValue(tabName, inputs);
  };

  const handleDelete = (iname) => {
    const list = inputs.filter((input) => input.iname !== iname);

    setInputs(list);

    setFieldValue(tabName, list);
  };

  const handleAddReponse = (questionName) => {
    const list = [...inputs];
    let questionIndex = list.findIndex((q) => q.iname === questionName);

    let newReponseName = `${list[questionIndex].iname}_reponse_${
      list[questionIndex].reponses.length + 1
    }`;

    list[questionIndex].reponses.push({
      // rep_ilabel: `Reponse ${list[questionIndex].reponses.length + 1}`,
      rep_ilabel: `Reponse`,
      rep_iname: newReponseName,
      rep_value: "",
      rep_veracite: false,
      rep_func: "delete",
    });

    setInputs(list);

    setFieldValue(tabName, inputs);
  };

  const handleReponseChange = (e, questionName, reponseIndex) => {
    const { value } = e.target;
    const list = [...inputs];
    let questionIndex = list.findIndex((q) => q.iname === questionName);
    list[questionIndex].reponses[reponseIndex].rep_value = value;

    setInputs(list);

    setFieldValue(tabName, inputs);
  };

  const handleResponseVeraciteChange = (e, questionName, reponseIndex) => {
    const { value } = e.target;
    const booleanFromValue = value.toLowerCase() === "true";
    const list = [...inputs];
    let questionIndex = list.findIndex((q) => q.iname === questionName);
    list[questionIndex].reponses[reponseIndex].rep_veracite = booleanFromValue;

    setInputs(list);

    setFieldValue(tabName, inputs);
  };

  const handleDeleteReponse = (questionName, index) => {
    const list = [...inputs];
    let questionIndex = list.findIndex((q) => q.iname === questionName);

    list[questionIndex].reponses.splice(index, 1);

    setInputs(list);

    setFieldValue(tabName, list);
  };

  return (
    <>
      <label className="block text-sm font-bold text-mde-gray">Questions</label>
      {errors[tabName] && touched[tabName] && (
        <p className="mt-2 mb-2 text-sm text-red-600" id="email-error">
          {getAllText(errors[tabName])}
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
              {/* <input
                onChange={(e) => handleChange(e, index)}
                onBlur={() => setFieldTouched(tabName)}
                id={input.iname}
                value={input.value}
                name={input.iname}
                type={input.type}
                className={classNames(
                  "focus:ring-mde-gray focus:border-mde-gray block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                )}
              /> */}
              <textarea
                rows={3}
                onChange={(e) => handleChange(e, index)}
                onBlur={() => setFieldTouched(tabName)}
                id={input.iname}
                value={input.value}
                name={input.iname}
                type={input.type}
                className={classNames(
                  "focus:ring-mde-gray focus:border-mde-gray block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                )}
              ></textarea>
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
          {input.reponses.map((reponse, indexB) => (
            <div key={indexB} className="pt-2 pl-4">
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label
                    for={`${reponse.rep_iname}_veracite`}
                    className="sr-only"
                  >
                    Veracite
                  </label>
                  <select
                    onChange={(e) =>
                      handleResponseVeraciteChange(e, input.iname, indexB)
                    }
                    id={`${reponse.rep_iname}_veracite`}
                    name={`${reponse.rep_iname}_veracite`}
                    className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-mde-gray focus:ring-mde-gray sm:text-sm"
                  >
                    <option
                      selected={reponse.rep_veracite === true}
                      value="true"
                    >
                      Vrai
                    </option>
                    <option
                      selected={reponse.rep_veracite === false}
                      value="false"
                    >
                      Faux
                    </option>
                  </select>
                </div>

                <textarea
                  rows={2}
                  type="text"
                  onChange={(e) => handleReponseChange(e, input.iname, indexB)}
                  name={reponse.rep_iname}
                  id={reponse.rep_iname}
                  value={reponse.rep_value}
                  className="block w-full rounded-md border-gray-300 pl-20 pr-12 focus:border-mde-gray focus:ring-mde-gray sm:text-sm"
                  placeholder={reponse.rep_ilabel}
                ></textarea>
                {/* <input
                  type="text"
                  onChange={(e) => handleReponseChange(e, input.iname, indexB)}
                  name={reponse.rep_iname}
                  id={reponse.rep_iname}
                  value={reponse.rep_value}
                  className="block w-full rounded-md border-gray-300 pl-20 pr-12 focus:border-mde-gray focus:ring-mde-gray sm:text-sm"
                  placeholder={reponse.rep_ilabel}
                /> */}
                {indexB === input.reponses?.length - 1 ? (
                  <>
                    <button
                      onClick={() => handleAddReponse(input.iname)}
                      className={classNames(
                        input.reponses?.length > 1
                          ? "absolute inset-y-0 right-9 flex items-center pl-2 pr-3 border border-green-300 bg-green-50 hover:bg-green-100"
                          : "absolute inset-y-0 right-0 rounded-r-md flex items-center pl-2 pr-3 border border-green-300 bg-green-50 hover:bg-green-100"
                      )}
                    >
                      <PlusIcon className="h-4 w-4 text-green-700" />
                    </button>
                    {input.reponses?.length > 1 && (
                      <button
                        onClick={() => handleDeleteReponse(input.iname, indexB)}
                        className="absolute inset-y-0 right-0 flex items-center pl-2 pr-3 border border-red-300 rounded-r-md bg-red-50 hover:bg-red-100 "
                      >
                        <MinusIcon className="h-4 w-4 text-red-700" />
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleDeleteReponse(input.iname, indexB)}
                    className="absolute inset-y-0 right-0 flex items-center pl-2 pr-3 border border-red-300 rounded-r-md bg-red-50 hover:bg-red-100 "
                  >
                    <MinusIcon className="h-4 w-4 text-red-700" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default SpecialFormField;
