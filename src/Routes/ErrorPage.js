import React from "react";

function errorPage() {
  return (
    <div style={{ marginTop: "28rem", top: 0, width: "100%" }}>
      <h1 style={{ color: "white" }}>
        The page you requested cannot be found please go <a href="/"> back </a>
      </h1>
    </div>
  );
}

export default errorPage;
