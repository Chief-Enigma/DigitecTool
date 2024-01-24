import React, { useState, useEffect } from "react";

import Post from "../../../../Functions/Api/Requests/Post";
import Put from "../../../../Functions/Api/Requests/Put";

export const TicketEditorMain = ({ onCloseTicketEditor }) => {
  const ticketLayOut = {
    id: {},
    TicketNumber: "",
    TicketState: "open",
    CreationDate: "",
    TicketTitle: "",
    Locations: [],
    AKZ: "",
    CreatedBy: "",
    TicketText: "",
  };
  const [ticket, setTicket] = useState(ticketLayOut);
  const [serverResponse, setServerResponse] = useState("");
  const locations = ["A", "A-TS", "A-AKL", "A-WE", "B", "SR"];

  useEffect(() => {
    const storedTicket = localStorage.getItem("ticketInput");
    if (storedTicket) {
      setTicket(JSON.parse(storedTicket));
    } else {
      setTicket(ticketLayOut);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketInput", JSON.stringify(ticket));
  }, [ticket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevData) => ({
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

      setTicket((prevData) => ({
        ...prevData,
        TicketText: updatedText,
      }));

      const cursorPosition = selectionStart + 1;
      e.target.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;

    // Füge den ausgewählten Standort direkt zum Array hinzu, wenn er nicht schon existiert
    if (selectedLocation && !ticket.Locations.includes(selectedLocation)) {
      setTicket((prevData) => ({
        ...prevData,
        Locations: [...prevData.Locations, selectedLocation],
      }));
    }
  };

  const handleRemoveLocation = (location) => {
    setTicket((prevData) => ({
      ...prevData,
      Locations: prevData.Locations.filter((loc) => loc !== location),
    }));
  };

  const handleSaveButtonClick = async (e) => {
    e.preventDefault();
    try {
      console.log("Saved Ticket", ticket);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  return (
    <div>
      <h1>Ticket-Formular</h1>
      <div>
        <label>Ticket-Nummer:</label>
        <span>{ticket.TicketNumber}</span>
      </div>
      <div>
        <label>Erstellungsdatum:</label>
        <span>{ticket.CreationDate}</span>
      </div>
      <div>
        <label>Ticket-Titel:</label>
        <input
          type="text"
          name="TicketTitle"
          value={ticket.TicketTitle}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <div>
          {ticket.Locations.map((location) => (
            <div key={location}>
              {location}{" "}
              <button onClick={() => handleRemoveLocation(location)}>
                Entfernen
              </button>
            </div>
          ))}
        </div>
        <select onChange={handleLocationChange}>
          <option value="" disabled>
            Auswählen...
          </option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>AKZ:</label>
        <input
          type="text"
          name="AKZ"
          value={ticket.AKZ}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Ticket-Text:</label>
        <textarea
          name="TicketText"
          value={ticket.TicketText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ width: "100%", height: "100px" }}
        />
      </div>
      <button onClick={handleSaveButtonClick}>Speichern</button>

    </div>
  );
};
