import React from "react";
import { useRouteError } from "react-router-dom";

function Error() {
  const err = useRouteError();
  console.log(err);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Oops!</h1>
      <h2>We encountered an error:</h2>
      <h3>
        {err.status} : {err.statusText}
      </h3>
    </div>
  );
}

export default Error;
