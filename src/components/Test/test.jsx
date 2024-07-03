import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./test.css";

const ExampleComponent = () => {
  const signCanvas = useRef(null);

  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // מונע מעבר לשורה חדשה ב-textarea
      const newText = text + "\n"; // הוספת שורת מעבר לטקסט הנוכחי
      setText(newText); // עדכון ה-state עם הטקסט החדש
      setDisplayText(
        newText.split("\n").map((str, index) => (
          <React.Fragment key={index}>
            {str}
            <br />
          </React.Fragment>
        ))
      );

      console.log(text);
      console.log(displayText);
    }
  };
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="container">
      <textarea
        id="myTextarea"
        rows="10"
        cols="30"
        dir="rtl"
        placeholder="כתוב כאן..."
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // שינוי ל-onKeyDown
        style={{ width: "100%", maxWidth: "100%", height: "150px" }}
      />

      <p>{displayText}</p>
    </div>
  );
};

export default ExampleComponent;
