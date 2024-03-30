import React from "react";

function NodePreview({ onDragStart, nodeType, icon, label }) {
  return (
    <div
      className="flex items-center border hover:border-purple-500 gap-2 cursor-grab p-1 rounded"
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
    >
      <i>{icon}</i>
      {label}
    </div>
  );
}

export default NodePreview;
