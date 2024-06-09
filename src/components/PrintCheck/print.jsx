import React from "react";
import html2pdf from "html2pdf.js";

const print = () => {
  const savePdf = () => {
    const element = document.getElementById("content");

    // Set options for pdf conversion
    const opt = {
      margin: [10, 0, 10, 0], // top, left, bottom, right
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Adjust content size for A4
    const originalWidth = element.offsetWidth;
    const a4WidthInPx = 595.28 * 2; // 210 mm in pixels at 72 DPI

    element.style.width = `${a4WidthInPx}px`;

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        // Reset the element's width after saving
        element.style.width = `${originalWidth}px`;
      });
  };

  return (
    <div>
      <div id="content">
        /* Your content here */
        <p dir="rtl">
          בודק מוסמך ע׳׳י משרד הפנים ונציבות כבאות והצלה מס׳ היתר 12016 לפי תקן
          129/1
          <br></br>
          בודק מוסמך מטעם מכון התקנים הישראלי מס׳ תעודה 25-649 לפי תקן 1928(NFPA
          25)
          <br></br>
          בודק מוסמך למז׳׳ח מטעם משרד הבריאות מ׳ס היתר 2108
        </p>
        <h4 dir="rtl">ממונה בטיחות אש בכיר</h4>
        <h3 dir="rtl">
          מערכת כיבוי במים (ספרינקלרים) *מזח * אספקת ציוד כיבוי אש{" "}
        </h3>
        <h4 dir="ltr">
          info@nrg-center.co.il : רח׳ גזית 9 פתח תקווה * טלפון 03-9040844 * פקס
          03-9041940 * דוא׳׳ל
        </h4>
      </div>
      <button onClick={savePdf}>Save as PDF</button>
    </div>
  );
};

export default print;
