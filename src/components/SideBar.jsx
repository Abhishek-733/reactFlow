import React from "react";

const SideBar = ({ children }) => {
  return (
    <aside
      style={{ gridArea: "sidebar" }}
      className="w-[300px] h-full overflow-hidden border-2 border-gray-300"
    >
      {children}
    </aside>
  );
};
export default SideBar;
