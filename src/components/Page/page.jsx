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
    const sentences = text.split("?");
    const processedText = sentences.map((sentence, index) => (
      <h1 key={index}>{sentence}</h1>
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
      textAlign: "center",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: window.devicePixelRatio, useCORS: true },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };
    html2pdf().set(options).from(content).save();
  };

  return (
    <div className="main-div" ref={contentRef} meta="UTF-8">
      <div className="continer">
        <img className="vImage" src={logo} />
        <div className="textarea-div">
          {saved ? (
            <div className="text-finished ">
              <h1 dir="rtl">{addonText} </h1>
            </div>
          ) : (
            <div style={{ alignItems: "center" }} className="textarea-div">
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
        </div>

        <div>
          <button id="submitbtn" onClick={convertToPdf}>
            שמור והורד
          </button>
          <div className="text2">
            <p dir="rtl">
              בודק מוסמך ע׳׳י משרד הפנים ונציבות כבאות והצלה מס׳ היתר 12016 לפי
              תקן 129/1
              <br></br>
              בודק מוסמך מטעם מכון התקנים הישראלי מס׳ תעודה 25-649 לפי תקן
              1928(NFPA 25)
              <br></br>
              בודק מוסמך למז׳׳ח מטעם משרד הבריאות מ׳ס היתר 2108
            </p>
            <h4>ממונה בטיחות אש בכיר</h4>
            <h3>מערכת כיבוי במים (ספרינקלרים) *מזח * אספקת ציוד כיבוי אש </h3>
            <h4 dir="rtl">
              רח׳ גזית 9 פתח תקווה * טלפון 03-9040844 * פקס * 03-9041940 דוא׳׳ל
              info@nrg-center.co.il
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
