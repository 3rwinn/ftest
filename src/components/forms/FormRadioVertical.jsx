import React from "react";
import { useFormikContext } from "formik";
import { replaceInArray } from "../../utils/helpers";
import FormRadioSingle from "./FormRadioSingle";

function FormRadioVertical({ id, label, name, choices = [] }) {
  const { setFieldValue, values } = useFormikContext();

  // console.log("TEST", values[name])

  let starterData =
    values[name] === null || values[name].length === 0 ? [] : values[name];

  // const findObjectWithValue = (libelle, objects) => {
  //   if (objects?.length > 0) {
  //     for (let i = 0; i < objects?.length; i++) {
  //       if (objects[i]?.libelle === libelle) {
  //         return libelle;
  //       }
  //     }
  //   }
  //   return "none";
  // };

  const findObjectWithId = (id, objects) => {
    if (objects?.length > 0) {
      for (let i = 0; i < objects?.length; i++) {
        if (objects[i]?.id === id) {
          return objects[i]?.libelle;
        }
      }
    }
    return "none";
  };

  const handleChange = (e, choice, label) => {
    let list = [...starterData];
    const elementId = e.target.name;
    const isAnswerExist = list.filter((l) => l.id === elementId)[0];
    const newAnswer = {
      question: label,
      libelle: choice.value,
      id: e.target.name,
      value: choice.veracite,
    };

    if (isAnswerExist === null || isAnswerExist === undefined) {
      list.push(newAnswer);
    } else {
      list = replaceInArray(list, newAnswer);
    }

    setFieldValue(name, list);
  };

  return (
    <div className="mb-4">
      <label className="text-base font-bold text-mde-gray">{label}</label>
      {/* <p className="text-sm leading-5 text-gray-500">
        How do you prefer to receive notifications?
      </p> */}
      <fieldset className="mt-4">
        <legend className="sr-only">Reponse</legend>
        <div className="space-y-4">
          {choices.map((choice, index) => (
            <div key={choice.id} className="flex items-center">
              {/* <input
                onChange={(e) => handleChange(e, choice, label)}
                id={`${id}-${index}`}
                name={`${id}_answer`}
                type="radio"
                className="focus:ring-mde-yellow h-4 w-4 text-mde-yellow border-gray-300"
                // checked={isChecked(`${id}_answer`, prevAnswers)}
                // checked={selected === `${id}_answer`}
              /> */}
              <FormRadioSingle
                id={`${id}-${index}`}
                name={`${id}_answer`}
                label={label}
                choice={choice}
                sideEvent={handleChange}
                // previousChecking={findObjectWithValue(
                //   choice.value,
                //   values[name]
                // )}
                previousChecking={findObjectWithId(
                  `${id}_answer`,
                  values[name]
                )}
              />
              <label
                htmlFor={`${id}-${index}`}
                className="ml-3 block text-sm font-medium text-mde-gray"
              >
                {choice.value}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default FormRadioVertical;
