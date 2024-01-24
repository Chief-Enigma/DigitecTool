import React, { useState} from "react";

import Post from "../../../../Functions/Api/Requests/Post";

export const TicketAddMain = () => {
  const [inputText, setInputText] = useState({
    id: {},
    TicketNumber: "1234",
    TicketState: "open",
    CreationDate: "2024-01-01",
    TicketTitle: "Heeeloooo",
    Location: ["A"],
    AKZ: "moin",
    CreatedBy: "mmmm",
    TicketText: "hi",
  });
  const [serverResponse, setServerResponse] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputText((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.target;
      const textBeforeCursor = value.substring(0, selectionStart);
      const textAfterCursor = value.substring(selectionEnd);
      const updatedText = textBeforeCursor + "\t" + textAfterCursor;

      setInputText((prevData) => ({
        ...prevData,
        TicketText: updatedText,
      }));

      const cursorPosition = selectionStart + 1;
      e.target.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handleSaveButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await Post.SaveTicket(inputText);
      console.log(response);
      setServerResponse(response.ticketText);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  return (
    <div>
      <h1>React Text Save Example</h1>
      <div>
        <label htmlFor="inputText">Eingabetext:</label>
        <textarea
          id="inputText"
          name="TicketText"
          style={{ width: "100%", height: "100px" }}
          value={inputText.TicketText}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSaveButtonClick}>Speichern</button>
      <div>
        <h2>Serverantwort:</h2>
        <textarea
          readOnly
          value={serverResponse}
          style={{ width: "100%", height: "100px" }}
        />
      </div>
    </div>
  );
};
