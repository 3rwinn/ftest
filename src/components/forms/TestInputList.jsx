import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/outline';

function TestInputList() {
  const [inputs, setInputs] = useState([{ id: 0, value: '' }]);

  const handleAddInput = () => {
    const newInputId = inputs[inputs.length - 1].id + 1;
    const newInput = { id: newInputId, value: '' };
    setInputs([...inputs, newInput]);
  };

  const handleDeleteInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const handleInputChange = (id, value) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value };
      } else {
        return input;
      }
    });
    setInputs(updatedInputs);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {inputs.map((input, index) => (
        <div key={input.id} className="flex items-center mt-4">
          <input
            type="text"
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            className="border border-gray-300 py-2 px-4 rounded-l"
          />
          {index === inputs.length - 1 ? (
            <button
              onClick={handleAddInput}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => handleDeleteInput(input.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r"
            >
              <MinusIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TestInputList;