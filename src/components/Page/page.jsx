import React from "react";

import { useRef, useState } from "react";
import "./page.css";
import html2pdf from "html2pdf.js";
import logo from "../../assets/logo rng_.png";

const Page = () => {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [addonText, setAddonText] = useState("");
  const contentRef = useRef(null);

  const changeText = () => {
    // const tempText = document.getElementById("textarea").value;
    const sentences = text.split(",");
    const processedText = sentences.map((sentence, index) => (
      <p key={index}>{sentence}</p>
    ));
    console.log(sentences);
    console.log(processedText);
    setAddonText(processedText);
  };

  const convertToPdf = () => {
    changeText();
    setSaved(true);

    const content = contentRef.current;
    const options = {
      filename: "nrg-center.pdf",
      margin: 1,
      image: { type: "jpeg" },
      html2canvas: { scale: 4 },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    };
    html2pdf().set(options).from(content).save();
  };

  return (
    <div className="main-div" ref={contentRef}>
      <div className="continer">
        <img className="vImage" src={logo} />

        {saved ? (
          <div className="text-finished ">
            <p>{addonText}</p>
          </div>
        ) : (
          <div className="textarea-div ">
            <textarea
              dir="rtl"
              rows="20"
              cols="40"
              id="textarea"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
          </div>
        )}

        <div>
          <button id="submitbtn" onClick={convertToPdf}>
            שמור והורד
          </button>
          <p dir="rtl" className="p-div">
            בודק מוסמך ע׳׳י משרד הפנים ונציבות כבאות והצלה מס׳ היתר 12016 לפי
            תקן 129/1
            <br></br>
            (NFPA 25 ) בודק מוסמך מטעם מכון התקנים הישראלי מס׳ תעודה 25-649 לפי
            תקן 1928
            <br></br>
            בודק מוסמך למז׳׳ח מטעם משרד הבריאות מ׳ס היתר 2108
          </p>
          <h4 dir="rtl">ממונה בטיחות אש בכיר</h4>
          <h3 dir="rtl">
            מערכת כיבוי במים (ספרינקלרים) *מז׳׳ח* אספקת ציוד כיבוי אש{" "}
          </h3>
          <h4 dir="rtl">
            info@nrg-center.co.il : רח׳ גזית 9 פתח תקווה * טלפון 03-9040844 *
            פקס 03-9041940 * דוא׳׳ל
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Page;
