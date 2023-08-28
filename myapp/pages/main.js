import React from "react";
import styles from "../styles/main.module.css";
import HexGrid from "./data";
import { NodeContextProvider } from "../src/components/nodeContext";
const ZoomContainer = () => {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          color: "#021130",
        }}
      >
        Node Visualization below
      </h1>
      <div className={styles.containerOuter}>
        <div className={styles.containerInner}>
          <div className={styles.content}>
            <NodeContextProvider>
              <HexGrid />
            </NodeContextProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZoomContainer;
