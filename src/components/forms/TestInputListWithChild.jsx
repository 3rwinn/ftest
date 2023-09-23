import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/outline';

function TestInputListWithChild() {
    const [inputs, setInputs] = useState([{ id: 1, hasChild: false, child: null }]);
  
    const addInput = (parentId) => {
      const newId = inputs.length + 1;
      const newInput = { id: newId, hasChild: false, child: null };
  
      const newInputs = inputs.map((input) => {
        if (input.id === parentId) {
          return { ...input, hasChild: true, child: newInput };
        }
        return input;
      });
  
      setInputs([...newInputs, newInput]);
    };
  
    const removeInput = (id) => {
      const newInputs = inputs.filter((input) => input.id !== id);
      setInputs(newInputs);
    };
  
    const renderInput = (input) => {
      return (
        <div key={input.id} className="flex items-center space-x-4 mb-4">
          <input type="text" placeholder={`Input ${input.id}`} className="border border-gray-400 p-2 rounded" />
  
          {input.hasChild ? (
            <button onClick={() => removeInput(input.child.id)}>
              <MinusIcon className="h-5 w-5 text-red-500" />
            </button>
          ) : (
            <button onClick={() => addInput(input.id)}>
              <PlusIcon className="h-5 w-5 text-green-500" />
            </button>
          )}
        </div>
      );
    };
  
    const renderChildInput = (childInput) => {
      return (
        <div key={childInput.id} className="ml-6">
          {renderInput(childInput)}
        </div>
      );
    };
  
    return (
      <div>
        {inputs.map((input) => (
          <div key={input.id}>
            {renderInput(input)}
            {input.hasChild && renderChildInput(input.child)}
          </div>
        ))}
      </div>
    );
  }
  
  export default TestInputListWithChild;