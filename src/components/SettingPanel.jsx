import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import Button from "./Button";

function SettingPanel({ selectedNode, onSave, onCancel }) {
  const [inputValue, setInputValue] = useState(selectedNode.data.label);
  return (
    <div className="flex flex-col w-full">
      <div className="border-b-2 border-inherit w-full p-1 flex gap-2 items-center">
        <i
          onClick={onCancel}
          className="cursor-pointer hover:bg-gray-100 rounded"
        >
          <MdArrowBack />
        </i>
        <p className="text-center justify-self-center">{selectedNode.type}</p>
      </div>
      <div className="p-1">
        <label className="text-gray-300 block" htmlFor="message">
          Text
        </label>
        <textarea
          className="min-h-[4lh] max-h-[5lh] border border-gray-300 hover:border-gray-500 focus:border-gray-500 outline-none w-full p-1 rounded"
          id="message"
          name="message"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className=" flex justify-end">
          <Button
            variant="solid"
            onClick={() => {
              onSave(inputValue);
            }}
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={() => onCancel()}
            className={"ml-2"}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SettingPanel;
