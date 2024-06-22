import React from "react";

import { useRef, useState, useEffect } from "react";
import "./page.css";
import html2pdf from "html2pdf.js";
import logo from "../../assets/logo rng_.png";

const Page = () => {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [addonText, setAddonText] = useState("");
  const contentRef = useRef(null);

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const date = today.toLocaleDateString();
    setCurrentDate(date);
  }, []);

  const changeText = () => {
    // const tempText = document.getElementById("textarea").value;
    const sentences = text.split("?");
    const processedText = sentences.map((sentence, index) => (
      <p className=" text-added" key={index}>
        {sentence}
      </p>
    ));
    console.log(sentences);
    console.log(processedText);
    setAddonText(processedText);
  };

  const convertToPdf = () => {
    changeText();
    setSaved(true);

    var elements = document.getElementsByClassName("text-p");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = "1rem"; // Change this value to the desired font size
    }

    var elements = document.getElementsByClassName("infoSprinkel");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = "1.2rem"; // Change this value to the desired font size
    }

    var elements = document.getElementsByClassName("info");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = "1rem"; // Change this value to the desired font size
    }

    const content = contentRef.current;
    const options = {
      filename: "nrg-center.pdf",
      margin: 1,
      image: { type: "jpeg" },
      textAlign: "center",
      html2canvas: { scale: 4 },
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

        {saved ? (
          <div className="text-finished ">
            <p className="text-added"> תאריך {currentDate}</p>
            <p className="text-added" dir="rtl">
              {addonText}{" "}
            </p>
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
          <p className="text-p" dir="rtl">
            בודק מוסמך ע׳׳י משרד הפנים ונציבות כבאות והצלה מס׳ היתר 12016 לפי
            תקן 129/1
            <br></br>
            בודק מוסמך מטעם מכון התקנים הישראלי מס׳ תעודה 25-649 לפי תקן
            1928(NFPA 25)
            <br></br>
            בודק מוסמך למז׳׳ח מטעם משרד הבריאות מ׳ס היתר 2108
          </p>
          <h4 className="infoSprinkel" dir="rtl">
            ממונה בטיחות אש בכיר
          </h4>
          <h3 className="infoSprinkel" dir="rtl">
            מערכת כיבוי במים (ספרינקלרים) *מזח * אספקת ציוד כיבוי אש{" "}
          </h3>
          <h4 className="info" dir="ltr">
            info@nrg-center.co.il : רח׳ גזית 9 פתח תקווה * טלפון 03-9040844 *
            פקס 03-9041940 * דוא׳׳ל
          </h4>
        </div>

        {saved == false ? (
          <div>
            <button id="submitbtn" onClick={convertToPdf}>
              שמור והורד
            </button>
          </div>
        ) : (
          <div className="temp-div"></div>
        )}
      </div>
    </div>
  );
};

export default Page;
