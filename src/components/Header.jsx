import React from "react";
import Button from "./Button";

function Header({onSaveFlow}) {
  return (
    <nav
      className="bg-gray-300 flex justify-end px-4 py-1"
      style={{
        gridArea: "header",
      }}
    >
      <Button variant="outline" onClick={() =>onSaveFlow()}>Save</Button>
      </nav>
  );
}

export default Header;
