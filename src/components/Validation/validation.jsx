import { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { supabase } from "../../supabase";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import logo from "../../assets/logo rng_.png";

import "./validation.css";

function Validation() {
  const [loader, setLoader] = useState(false);
  const contentRef = useRef(null);
  const [count, setCount] = useState();
  const [flagDate, setFlagDate] = useState(false);
  const [date, SetDate] = useState("");
  // const [person, setPerson] = useState("");
  // const [hangMoves, setHangMoves] = useState("");
  // const [sideMoves, setSideMoves] = useState("");
  // const [changes, setChanges] = useState("");
  const [sign, setSign] = useState();
  // const [textAreaName, setTextName] = useState("");
  // const [textAreaChanges, setTextChanges] = useState("");
  const signatureRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState();
  const [counter, setCounter] = useState(0);

  const [envURL, setEnvURL] = useState();

  const fetchCounter = async () => {
    const { data, error } = await supabase
      .from("counter")
      .select("value")
      .maybeSingle(); // Change to maybeSingle() to avoid errors if no rows or multiple rows are found

    if (error) {
      console.error("Error fetching counter:", error);
    } else if (data) {
      setCounter(data.value);
    } else {
      // Handle cases where no data is returned
      console.log(
        "No counter data found. Setting counter to default value of 0."
      );
      setCounter(0);
    }
  };

  const incrementCounter = async () => {
    // Fetch the current counter value
    const { data: currentData, error: fetchError } = await supabase
      .from("counter")
      .select("value")
      .eq("mis", 1)
      .single();

    if (fetchError) {
      console.error("Error fetching counter:", fetchError);
      return;
    }

    // Increment the counter value
    const newValue = currentData.value + 1;

    // Update the counter in the database
    const { data, error } = await supabase
      .from("counter")
      .update({ value: newValue })
      .eq("mis", 1);

    if (error) {
      console.error("Error updating counter:", error);
    } else {
      console.log("Counter incremented:", data);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const convertToPdf = async () => {
    await incrementCounter();

    await fetchCounter();

    const formattedDate = formatDate(selectedDate);
    setFlagDate(true);
    SetDate(formattedDate);

    const content = contentRef.current;
    const options = {
      filename: "nrg-center-recipt.pdf",
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

    console.log(content);

    html2pdf().set(options).from(content).save();
    const send = {
      number: count + 1,
    };
  };

  useEffect(() => {
    const env = import.meta.env;
    const apiUrl =
      env.MODE === "development"
        ? import.meta.env.VITE_APP_LOCAL_URL
        : import.meta.env.VITE_APP_URL_PROD;

    setEnvURL(apiUrl);

    fetchCounter();
  }, []);

  return (
    <div
      className="App"
      meta="UTF-8"
      content="width=device-width, initial-scale=1"
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
      ></link>
      <div className="big-continer" ref={contentRef}>
        <img className="vImage" src={logo} />
        <h3>טופס אישור תקינות מס ׳ {counter} </h3>
        <div className="temp-continer">
          <div className="header-form">
            {flagDate ? (
              <div
                className="date-div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h4>תאריך</h4>
                <h4
                  style={{
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  {date}
                </h4>
              </div>
            ) : (
              <div
                className="date-div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h4>בחרו תאריך</h4>
                <input
                  className="input-name"
                  type="date"
                  value={selectedDate}
                  style={{
                    width: "150px",
                    textAlign: "center",
                    height: "50px",
                  }}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            )}

            <div
              className="input-values"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <div className="moves-continer">
                <input
                  style={{ textAlign: "center" }}
                  type="text"
                  className="form-control"
                  dir="rtl"
                ></input>
                <h5>שם מלא</h5>
              </div>

              <div className="moves-continer">
                <input
                  style={{ textAlign: "center" }}
                  type="text"
                  className="form-control"
                  dir="rtl"
                ></input>
                <h5>כתובת</h5>
              </div>
              <div className="moves-continer">
                <input
                  style={{ textAlign: "center" }}
                  type="text"
                  className="form-control"
                  dir="rtl"
                ></input>
                <h5>דירה</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="text">
          <h4>הנדון : אישור תקינות למערכת הספרינקלרים הדירתית</h4>
          <p>הריני לאשר כי נבדקה מערכת הספרינקלרים הדירתית ונמצאה תקינה</p>
          <p>
            הבדיקה תקינה לדירה בלבד ולא כוללת בדיקת מערכת הספרינקלרים בבניין
          </p>
          <p>. תקינות הבדיקה היא ליום הבדיקה בלבד</p>
          <p> .אישור זה בתוקף לשנה </p>
        </div>
        <div className="flex-continer">
          <div
            className="changes-input"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h5 style={{}}>תסריט שינויים בדירה </h5>
            <input
              type="text"
              className="inputChanges"
              dir="rtl"
              id="persoInput"
              style={{ fontSize: "0.7rem", textAlign: "center" }}
            ></input>
          </div>

          <div
            className="input-values"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="moves-continer">
              <h5>הזזות</h5>

              <input
                style={{ fontSize: "0.7rem", textAlign: "center" }}
                type="text"
                className="sprinkel-input"
                dir="rtl"
              ></input>

              <h5> ספרינקלר תלוי בוצע</h5>
            </div>

            <div className="moves-continer">
              <h5>הזזות</h5>
              <input
                type="text"
                style={{ fontSize: "0.7rem", textAlign: "center" }}
                className="sprinkel-input"
                dir="rtl"
              ></input>
              <h5> ספרינקלר צד בוצע</h5>
            </div>
          </div>
        </div>
        <div className="down-row">
          <select
            style={{
              width: "100px",
              textAlign: "center",
            }}
            dir="rtl"
          >
            <option value="ron">רון גרגי</option>
            <option value="ofek">אופק גרגי</option>
            <option value="roei">רועי גרגי</option>
          </select>

          <p
            style={{
              marginRight: "20px",
            }}
          >
            : שם הבודק{" "}
          </p>
          <p>שם וחתימת הלקוח</p>
        </div>{" "}
        <div className="continer-sig">
          <div
            style={{
              border: "2px solid black",
            }}
          >
            <SignatureCanvas
              canvasProps={{
                width: 200,
                height: 100,
              }}
              className="signature-pad"
              ref={(data) => setSign(data)}
            />
          </div>
        </div>
        <button
          id="submitbtn"
          onClick={convertToPdf}
          disabled={!(loader === false)}
        >
          {loader ? <span>יורד</span> : <span>שמור והורד </span>}
        </button>
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
        <h4 dir="rtl">
          רח׳ גזית 9 פתח תקווה * טלפון 03-9040844 * פקס * 03-9041940 דוא׳׳ל
          info@nrg-center.co.il
        </h4>
      </div>
    </div>
  );
}

export default Validation;
