import React from "react";
import NodePreview from "./NodePreview";
import { NodeTypes } from "./Nodes/nodeTypes";

function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="p-1 w-full">
      <div className="text-gray-500 mb-1 text-xs">
        You can drag these nodes to the pane on the right
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
