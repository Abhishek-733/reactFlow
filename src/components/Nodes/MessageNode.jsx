import { Handle, Position } from "reactflow";

export default function MessageNode({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div
        className={`border border-gray-500  bg-white rounded-sm w-[130px] ${
          data.isSelected ? "shadow-xl border-purple-600" : ""
        }`}
      >
        <div className="bg-cyan-500 h-4 text-xs">💬 Send message</div>
        <p className="text-xs min-h-6 whitespace-pre">{data.label}</p>
      </div>
    </>
  );
}
