import React from "react";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <RingLoader
        color="#4fa94d" 
        loading={true} 
        size={80} 
        margin={2} 
      />
      <span
        style={{
          color: "green",
          fontWeight: "bolder",
          letterSpacing: "2px",
        }}
      >
        Loading...
      </span>
    </div>
  );
};

export default Loading;
