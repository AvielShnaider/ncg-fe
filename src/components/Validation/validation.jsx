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
  const [person, setPerson] = useState("");
  const [hangMoves, setHangMoves] = useState("");
  const [sideMoves, setSideMoves] = useState("");
  const [changes, setChanges] = useState("");
  const [sign, setSign] = useState();
  const [textAreaName, setTextName] = useState("");
  const [textAreaChanges, setTextChanges] = useState("");
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
      .eq("id", 1)
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
      .eq("id", 1);

    if (error) {
      console.error("Error updating counter:", error);
    } else {
      console.log("Counter incremented:", data);
    }
  };

  const convertToPdf = () => {
    const content = contentRef.current;
    const options = {
      filename: "my-document.pdf",
      margin: 1,
      textAlign: "center",
      image: { type: "jpeg" },
      html2canvas: { scale: 4 },
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

    incrementCounter().then(() => {
      fetchCounter();
    });
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
    <div className="App" content="width=device-width, initial-scale=1">
      <div className="big-continer" ref={contentRef}>
        <img className="vImage" src={logo} />
        <h3>טופס אישור תקינות מס ׳ {counter} </h3>
        <div className="temp-continer">
          <div className="header-form">
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
                style={{ width: "150px", textAlign: "center", height: "50px" }}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

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
                  type="text"
                  className="form-control"
                  // value={hangMoves}
                  // onChange={(e) => setHangMoves(e.target.value)}
                  dir="rtl"
                ></input>
                <h5>שם מלא</h5>
              </div>

              <div className="moves-continer">
                <input
                  type="text"
                  className="form-control"
                  dir="rtl"
                  // value={sideMoves}
                  // onChange={(e) => setSideMoves(e.target.value)}
                ></input>
                <h5>כתובת</h5>
              </div>
              <div className="moves-continer">
                <input
                  type="text"
                  className="form-control"
                  dir="rtl"
                  // value={sideMoves}
                  // onChange={(e) => setSideMoves(e.target.value)}
                ></input>
                <h5>חברה </h5>
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
              style={{ fontSize: "0.7rem" }}
              // value={changes}
              // onChange={(e) => setChanges(e.target.value)}
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

              <input type="text" className="form-control" dir="rtl"></input>

              <h5> ספרינקלר תלוי בוצע</h5>
            </div>

            <div className="moves-continer">
              <h5>הזזות</h5>
              <input type="text" className="form-control" dir="rtl"></input>
              <h5> ספרינקלר צד בוצע</h5>
            </div>
          </div>
        </div>
        <div className="down-row">
          <select
            style={{
              width: "100px",
            }}
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
        <p>
          בודק מוסמך ע׳׳י משרד הפנים ונציבות כבאות והצלה מס׳ היתר 12016 לפי תקן
          129/1
          <br></br>
          (NFPA 25 ) בודק מוסמך מטעם מכון התקנים הישראלי מס׳ תעודה 25-649 לפי
          תקן 1928
          <br></br>
          בודק מוסמך למז׳׳ח מטעם משרד הבריאות מ׳ס היתר 2108
        </p>
        <h4>ממונה בטיחות אש בכיר</h4>
        <h3>מערכת כיבוי במים (ספרינקלרים) *מז׳׳ח* אספקת ציוד כיבוי אש </h3>
        <h4>
          nrg@nrg-center.com : רח׳ גזית 9 * טלפון 03-9040844 * פקס 03-9041940 *
          דוא׳׳ל
        </h4>
      </div>
    </div>
  );
}

export default Validation;
