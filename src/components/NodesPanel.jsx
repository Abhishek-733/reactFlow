import React from "react";
import NodePreview from "./NodePreview";
import { NodeTypes } from "./Nodes/nodeTypes";
import { BsInfoCircleFill } from "react-icons/bs";

function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="p-1 w-full">
      <div className="text-gray-500 text-xs border-b border-gray-300 list-disc">
        <div className="flex gap-2 items-center font-bold">
          <BsInfoCircleFill />
          Info
        </div>
        <li>You can drag these nodes to the plane on the right</li>
        <li>Double click on Node to delete it</li>
        <li>Double click on edge to delete it</li>
        <li>Click on Node to edit message.</li>
      </div>

      <div className="flex flex-col gap-2">
        {Object.values(NodeTypes).map((node) => (
          <NodePreview
            nodeType={node.type}
            icon={node.icon}
            label={node.label}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}

export default NodesPanel;
