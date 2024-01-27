import React, { useState, useEffect } from "react";

import Post from "../../../../Functions/Api/Requests/Post";
import Put from "../../../../Functions/Api/Requests/Put";

export const TicketEditorMain = ({ onCloseTicketEditor, ticketNumber }) => {
  const ticketLayOut = {
    id: {},
    ticketNumber: "newTicket",
    ticketState: "",
    creationDate: "",
    ticketTitle: "",
    ticketLocations: [],
    AKZ: "",
    createdBy: "",
    ticketText: "",
  };
  const [ticket, setTicket] = useState();
  const [serverResponse, setServerResponse] = useState("");
  const locations = ["A", "A-TS", "A-AKL", "A-WE", "B", "SR"];
  const ticketStates = ["open", "to plan", "planed", "closed"];

  const getStateColor = (state) => {
    switch (state) {
      case "open":
        return "10, 207, 3";
      case "to plan":
        return "250, 174, 10";
      case "closed":
        return "250, 38, 10";
      case "planed":
        return "10, 76, 250";
      default:
        return "";
    }
  };

  useEffect(() => {
    if(ticketNumber){
      
    }

    
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
        ticketText: updatedText,
      }));

      const cursorPosition = selectionStart + 1;
      e.target.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    if (
      selectedLocation &&
      !ticket.ticketLocations.includes(selectedLocation)
    ) {
      setTicket((prevData) => ({
        ...prevData,
        ticketLocations: [...prevData.ticketLocations, selectedLocation],
      }));
    }
  };

  const handleRemoveLocation = (location) => {
    setTicket((prevData) => ({
      ...prevData,
      ticketLocations: prevData.ticketLocations.filter(
        (loc) => loc !== location
      ),
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
  const saveTicket = async (ticketnumber) => {
    console.log("PDF Button on Ticket: ", ticketnumber);
  };

  const cancelTicket = async (ticketnumber) => {
    console.log("Edit Button on Ticket: ", ticketnumber);
  };

  const deleteTicket = async (ticketnumber) => {
    console.log("Delete Button on Ticket: ", ticketnumber);
    localStorage.removeItem("ticketInput");
    onCloseTicketEditor(false);
  };

  return (
    <div className="TicketEditor">
      <div className="TicketEditorHeader">
        <h2>Ticket Editor</h2>
        <button
          className="TicketButton back"
          onClick={() => onCloseTicketEditor(false)}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>
      <div className="row">
        <div className="col-100">
          <div className="TicketContainer">
            <div>
              <div className="row">
                <div className="col-40">
                  <label className="TicketLabel" htmlFor="TicketNumber">
                    Ticket-Nummer
                  </label>
                  <input
                    readOnly
                    id="TicketNumber"
                    name="ticketNumber"
                    value={
                      ticket.ticketNumber === "newTicket"
                        ? "- - -"
                        : ticket.ticketNumber
                    }
                  />
                </div>
                <div className="col-40">
                  <label className="TicketLabel" htmlFor="CreationDate">
                    Erstellungs Datum
                  </label>
                  <input
                    readOnly
                    id="CreationDate"
                    name="creationDate"
                    value={ticket.creationDate}
                  />
                </div>
                <div className="col-20">
                  <label className="TicketLabel" htmlFor="TicketState">
                    Ticket-Status
                  </label>
                  <select
                    id="TicketState"
                    name="ticketState"
                    value={ticket.ticketState}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: `rgba(${getStateColor(
                        ticket.ticketState
                      )}, 0.3)`,
                      borderColor: `rgba(${getStateColor(
                        ticket.ticketState
                      )}, 1)`,
                    }}
                  >
                    <option
                      value=""
                      disabled
                      style={{ backgroundColor: "#333" }}
                    >
                      Status wählen..
                    </option>
                    {ticketStates.map((ticketState) => (
                      <option
                        key={ticketState}
                        value={ticketState}
                        style={{ backgroundColor: "#333" }}
                      >
                        {ticketState}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label className="TicketLabel" htmlFor="AKZ">
                    Anlagenkennzeichnung
                  </label>
                  <input
                    id="AKZ"
                    name="AKZ"
                    value={ticketNumber}
                    // value={ticket.AKZ}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-25">
                  <label className="TicketLabel" htmlFor="TicketLocation">
                    Bereich
                  </label>
                  <select
                    id="TicketLocation"
                    name="selectedLocation"
                    value=""
                    onChange={handleLocationChange}
                  >
                    <option value="" disabled>
                      Bereich wählen...
                    </option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-50 LocationContainer">
                  {ticket.ticketLocations.map((location) => (
                    <label key={location} className="TicketLocationLabel">
                      <span className="TicketLocationText">{location}</span>
                      <span
                        className="material-symbols-outlined"
                        onClick={() => handleRemoveLocation(location)}
                      >
                        close
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <label className="TicketLabel" htmlFor="TicketTitle">
                Ticket-Titel
              </label>
              <input
                id="TicketTitle"
                name="ticketTitle"
                value={ticket.ticketTitle}
                onChange={handleInputChange}
              />
              <label className="TicketLabel" htmlFor="TicketText">
                Ticket-Text
              </label>
              <textarea
                id="TicketText"
                name="ticketText"
                value={ticket.ticketText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <div className="row TicketButtonContainer">
                <button
                  className="TicketButton save"
                  onClick={() => saveTicket(ticket.ticketNumber)}
                >
                  <span className="material-symbols-outlined">save</span>
                  <span className="TicketButtonText">Ticket Speichern</span>
                </button>
                <button
                  className="TicketButton cancel"
                  onClick={() => cancelTicket(ticket.ticketNumber)}
                >
                  <span className="material-symbols-outlined">close</span>
                  <span className="TicketButtonText">Abbrechen</span>
                </button>
                <button
                  className="TicketButton delete"
                  onClick={() => deleteTicket(ticket.ticketNumber)}
                >
                  <span className="material-symbols-outlined">delete</span>
                  <span className="TicketButtonText">Ticket Löschen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
