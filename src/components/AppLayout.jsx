import React from "react";

function AppLayout({ children }) {
  return (
    <div
      className="h-screen w-screen grid"
      style={{
        gridTemplateAreas: `
                        "header header header"
                        "main main sidebar"
                        `,
        gridTemplateRows: "50px 1fr",
        gridTemplateColumns: "1fr 300px",
      }}
    >
      {children}
    </div>
  );
}

export default AppLayout;
