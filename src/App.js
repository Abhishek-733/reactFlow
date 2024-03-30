import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import SideBar from "./components/SideBar";

import "./index.css";
import SettingPanel from "./components/SettingPanel";
import NodesPanel from "./components/NodesPanel";
import Header from "./components/Header";
import AppLayout from "./components/AppLayout";
import {
  NODE_TYPES_COMPONENT_MAP,
  NodeTypes,
} from "./components/Nodes/nodeTypes";
import { getEdgeId, getNodeId } from "./utils/utils";

const initialNodes = [
  {
    id: "1",
    type: "message",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(JSON.parse(localStorage.getItem("nodes"))?JSON.parse(localStorage.getItem("nodes")):initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(JSON.parse(localStorage.getItem("edges"))?JSON.parse(localStorage.getItem("edges")):[]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        let idx = eds.findIndex((ed) => ed.source === params.source);
        if (idx !== -1) {
          let newEdge = {
            ...eds[idx],
            target: params.target,
          };

          let newEdges = [...eds];
          newEdges.splice(idx, 1, newEdge);

          return newEdges;
        }

        return [
          ...eds,
          {
            id: getEdgeId(),
            ...params,
            markerEnd: {
              type: MarkerType.Arrow,
            },
          },
        ];
        // return addEdge(params, eds);
      }),
    [setEdges]
  );

  const onSaveFlow = useCallback(() => {
    let count = 0;
    if (!edges.length) return alert("no edges present");
    for (let i = 0; i < nodes.length; i++) {
      let found = false;
      for (let j = 0; j < edges.length; j++) {
        if (nodes[i].id === edges[j].source || nodes[i].id === edges[j].target) {
          found = true;
          break;
        }
      }
      if (!found) count++;
      if (count >= 1) break;
    }
    if (count >= 1) return alert("An node is not connected");
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    return alert("saved successfully");
  }, [edges, nodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onEditSave = useCallback(
    (label) => {
      setNodes(() => {
        return nodes.map((item) => {
          if (item.id === selectedNode?.id) {
            return {
              ...item,
              data: { ...item.data, label },
            };
          }
          return item;
        });
      });
      setSelectedNode(null);
    },
    [nodes, selectedNode?.id, setNodes]
  );

  const onCancel = () => {
    setSelectedNode(null);
  };

  const onNodeDoubleClick = useCallback(
    (event, node) => {
      // Delete node
      setNodes((prevNodes) => prevNodes.filter((i) => i.id !== node.id));
      setSelectedNode(null);
    },
    [setNodes]
  );

  const onEdgesDoubleClick = useCallback(
    (event, edg) => {
      // Delete edge
      setEdges((prevEdges) => prevEdges.filter((i) => i.source !== edg.source));
    },
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
      setNodes((prevNodes) => {
        return prevNodes.map((item) => {
          return {
            ...item,
            data: { ...item.data, isSelected: item.id === node.id },
          };
        });
      });
    },
    [setNodes]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !NodeTypes.hasOwnProperty(type)) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getNodeId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <AppLayout>
      <Header onSaveFlow={onSaveFlow} />

      <div
        style={{
          gridArea: "main",
        }}
        className="h-full w-full"
        ref={reactFlowWrapper}
      >
        <ReactFlowProvider>
          <ReactFlow
            // style={{ width: "70vw", height: "100%" }}
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDoubleClick={onNodeDoubleClick}
            onEdgeDoubleClick={onEdgesDoubleClick}
            nodeTypes={NODE_TYPES_COMPONENT_MAP}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      <SideBar>
        {selectedNode ? (
          <SettingPanel
            key={selectedNode.id}
            selectedNode={selectedNode}
            onSave={onEditSave}
            onCancel={onCancel}
          />
        ) : (
          <NodesPanel />
        )}
      </SideBar>
    </AppLayout>
  );
};

export default App;
