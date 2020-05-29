import React from "react";

export default function StatRow(props) {
  let stat = Math.round(props.stat * 100);
  return (
    <>
      <p className={"text-gray-600"}>{props.label}</p>
      <div className={"flex items-center"} style={{ height: "10px" }}>
        <div
          className={` h-full`}
          style={{ width: `${stat}%`, backgroundColor: props.color }}
        ></div>
        {stat > 0 ? (
          <span className={"text-white"} style={{ lineHeight: 0 }}>
            {stat}
          </span>
        ) : (
          <span className={"text-white"}>{"-"}</span>
        )}
      </div>
    </>
  );
}
