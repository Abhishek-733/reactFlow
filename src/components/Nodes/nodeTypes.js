import MessageNode from "./MessageNode";

export const NodeTypes = {
  message: {
    type: "message",
    label: "Message",
    icon: "💬",
    component: MessageNode,
  },
};

export const NODE_TYPES_COMPONENT_MAP = Object.values(NodeTypes).reduce(
  (map, nodeType) => {
    map[nodeType.type] = nodeType.component;
    return map;
  },
  {}
);
