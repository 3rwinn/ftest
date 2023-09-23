import React from "react";
import { useFormikContext } from "formik";
import { replaceInArray } from "../../utils/helpers";
import FormRadioSingle from "./FormRadioSingle";

function FormRadio({
  type,
  id,
  label,
  name,
  cas,
  previousChoice,
  choices = [],
}) {
  const { setFieldValue, values } = useFormikContext();

  console.log("ANSWEEE", values[name])

  let starterData =
    values[name] === null || values[name].length === 0 ? [] : values[name];

  const handleRadioChange = (e, choice, label) => {
    let list = [...starterData];
    const elementId = e.target.name;
    const isAnswerExist = list.filter((l) => l.id === elementId)[0];
    const newAnswer = {
      type: choice.type,
      id: elementId,
      label: label,
      cas: choice.casId,
      note: choice.value,
    };

    if (isAnswerExist === null || isAnswerExist === undefined) {
      list.push(newAnswer);
    } else {
      list = replaceInArray(list, newAnswer);
    }

    setFieldValue(name, list);
  };

  const addSomething = (obj) => {
    let newObj = { ...obj, type: type, casId: cas };
    return newObj;
  };

  return (
    <div className="mt-4 flex flex-col md:flex-row justify-between">
      <span className="mb-2 md:mb-0 font-medium text-sm text-mde-gray">
        {label}
      </span>
      <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10 justify-end">
        {/* <div className="flex space-x-6 md:space-x-14"> */}
        {choices.map((choosen, index) => (
          <div key={index} className="flex items-center">
            {/* <input
              onChange={(params) => setFieldValue(name, choosen.value)}
              id={`${id}-${index}`}
              name={name}
              type="radio"
              // defaultChecked={choosen.id === values[name]}
              className="focus:ring-mde-yellow h-4 w-4 text-mde-yellow border-gray-300"
            /> */}
            <FormRadioSingle
              id={`${id}-${index}`}
              // name={`${id}-anwser`}
              name={`${id}`}
              choice={addSomething(choosen)}
              sideEvent={handleRadioChange}
              // previousChecking={false}
              previousChecking={previousChoice}
              label={label}
            />
            <label
              htmlFor={`${id}-${index}`}
              className="ml-3 block text-sm font-bold text-mde-gray"
            >
              {choosen.value}
            </label>
          </div>
        ))}
      </div>
      {/* {errors[name] && touched[name] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors[name]}
        </p>
      )} */}
    </div>
  );
}

export default FormRadio;
