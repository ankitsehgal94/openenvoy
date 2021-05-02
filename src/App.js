import React, { useState } from "react";

import isEmpty from "./loadash/loadash";
import readLines from "./utils/lineReader";

import "./App.css";
import logo from "./assets/logo.png";
import fileExtension from "./const";

function CodeEstimator() {
 const [file, setFile] = useState("");
 const [fileType, setFileType] = useState("");
 const [lineType, setLineType] = useState({});

 const showFile = async (e) => {
  const fileName = e.target.files[0]?.name;
  setFileType(fileName.split(".").pop());

  e.preventDefault();

  if (e.target?.files[0]) {
   const reader = new FileReader();
   reader.onload = async (e) => {
    const text = e.target.result;
    setFile(text);
    e.target.value = "";
   };
   reader.readAsText(e.target.files[0]);
  }
 };

 const readFile = () => {
  setLineType(readLines(file, fileExtension[fileType]));
 };

 return (
  <div className="main">
   <div className="wrapper">
    <div className="nav">
     <img src={logo} alt="Logo" />
     <h1>Lines of code estimator</h1>
    </div>
    <label>
     Upload Your File
     <input
      className="selectFileInput"
      type="file"
      onChange={(e) => showFile(e)}
     />
    </label>

    <button className="parseButton" onClick={readFile}>
     Parse File
    </button>

    {!isEmpty(lineType) && (
     <div>
      <h2>Number of blank lines {lineType["blank"]}</h2>
      <h2>Number of lines with comments {lineType["comment"]}</h2>
      <h2>Number of lines with code {lineType["code"]}</h2>
      <h2>Total number of lines {lineType["total"]}</h2>
     </div>
    )}
   </div>
  </div>
 );
}

export default CodeEstimator;
