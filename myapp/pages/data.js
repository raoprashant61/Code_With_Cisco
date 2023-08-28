import React, { useState } from "react";
import styles from "../styles/data.module.css";
import HexagonGrid from "react-hexagon-grid";
import times from "lodash/times";
import { useNodeContext } from "../src/components/nodeContext";

async function fetchData(id) {
   
  try {
    const data = await fetch(`http://localhost:8000/view?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
      
        return res;
      });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const getHexProps = (hexagon) => {
    

  const { maxNodeValue, nodeNumbers, updateMaxNodeValue, updateNodeNumbers,nodeData,updateNodeData,  updateDetailData,
    detailData } =
    useNodeContext();

  return {
    style: {
      fill: myfunction(hexagon + 1),
      stroke: "white",
      zIndex: hexagon + 1,
      position: "relative",
    },
    onClick: () => {
      if (!nodeNumbers.includes(hexagon + 1)) {
        fetchData(hexagon + 1)
          .then((result) => {
            updateNodeNumbers(result.map(x=>x.to));
            updateNodeData(result);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
    
        updateDetailData(nodeData.filter(x=>x.to===hexagon+1).flatMap(obj => obj.type))
  
      }
    },
  };
};

function myfunction(value) {
  const { maxNodeValue, nodeNumbers, updateMaxNodeValue, updateNodeNumbers,nodeData,updateNodeData,  updateDetailData,
    detailData } =
    useNodeContext();

  if (nodeNumbers.includes(value)) {
    //  console.log(`${value} is present in the array.`);
    return "#410e69";
  } else {
    // console.log(`${value} is not present in the array.`);
    return "#d5dbe8";
  }
}

function myfunction2(value) {
  const { maxNodeValue, nodeNumbers, updateMaxNodeValue, updateNodeNumbers,nodeData,updateNodeData ,  updateDetailData,
    detailData} =
    useNodeContext();

  if (nodeNumbers.includes(value)) {
    //  console.log(`${value} is present in the array.`);
    return "white";
  } else {
    // console.log(`${value} is not present in the array.`);
    return "black";
  }
}

const renderHexagonContent = (hexagon) => {
  return (
    <text
      x="50%"
      y="50%"
      fontWeight="bold"
      fontSize={150}
      style={{ fill: myfunction2(hexagon + 1) }}
      textAnchor="middle"
    >
      {hexagon + 1}
    </text>
  );
};

let hexagons = times(1000, (id) => id);

const HexGrid = ({ numberOfGrids }) => {

    const { maxNodeValue, nodeNumbers, updateMaxNodeValue, updateNodeNumbers,nodeData,updateNodeData ,  updateDetailData,
        detailData} =
        useNodeContext();


  return (
    <>
      {detailData.length && <div style={{ textAlign: "center" }}>
            
            <h1>Below are the access control/s</h1>
            {detailData.map(x=>
                <h3 style={{color:'blue',fontWeight:'500',fontSize:'100',marginBottom:'2ch'}}>{x}</h3>
            )}

      </div>}
      <HexagonGrid
        gridWidth={1800}
        gridHeight={1000}
        hexagons={hexagons}
        hexProps={getHexProps}
        renderHexagonContent={renderHexagonContent}
      />
    </>
  );
};

export default HexGrid;
