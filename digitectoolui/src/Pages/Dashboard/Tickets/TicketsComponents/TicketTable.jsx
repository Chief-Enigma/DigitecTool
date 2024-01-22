import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import Post from "../../../../Functions/Api/Requests/Post";
import { TicketRow } from "./TicketRow";

export const TicketTable = ({ searchInput }) => {
  const [inputText, setInputText] = useState({
    id: {},
    TicketNumber: "1234",
    CreationDate: "2024-01-01",
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
    // Wenn die Tab-Taste gedrückt wird, füge einen Tabulator ein
    if (e.key === "Tab") {
      e.preventDefault(); // Verhindert den Standard-Tab-Fokuswechsel
      const { selectionStart, selectionEnd, value } = e.target;

      // Teile den Text in zwei Teile an der Cursorposition
      const textBeforeCursor = value.substring(0, selectionStart);
      const textAfterCursor = value.substring(selectionEnd);

      // Füge einen Tabulator an der Cursorposition ein
      const updatedText = textBeforeCursor + "\t" + textAfterCursor;

      // Aktualisiere den Text im State
      setInputText((prevData) => ({
        ...prevData,
        TicketText: updatedText,
      }));

      // Setze den Cursor nach dem eingefügten Tabulator
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

  const [tickets, setTickets] = useState([]);
  const [ticketsSearchResults, setTicketsSearchResults] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const result = await Get.GetAllTickets();
        setTickets(result);
        console.log(result);
      } catch (error) {
        console.error("Error getting tickets:", error);
      }
    };
    getTickets();
  }, []);

  const toggleRow = (ticketNumber) => {
    const newExpandedRows = [...expandedRows];
    const index = newExpandedRows.indexOf(ticketNumber);
    if (index !== -1) {
      newExpandedRows.splice(index, 1);
    } else {
      newExpandedRows.push(ticketNumber);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div>
      <table className="EmployeeTable">
        <tbody>
          <tr className="EmployeeRow EmployeeTitleRow">
            <td>Ticket Nr.</td>
            <td>Datum</td>
            <td>Bereich</td>
            <td>AKZ</td>
            <td>Erstellt von</td>
            <td></td>
          </tr>
          {tickets.map((ticket) => (
            <TicketRow
              key={ticket.ticketNumber}
              ticket={ticket}
              expanded={expandedRows.includes(ticket.ticketNumber)}
              toggleRow={toggleRow}
            />
          ))}
        </tbody>
      </table>
      <div>
        <h1>React Text Save Example</h1>
        <div>
          <label htmlFor="inputText">Eingabetext:</label>
          <textarea
            id="inputText"
            name="TicketText"
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
    </div>
  );
};
