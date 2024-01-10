import React from "react";

export const TicketsMain = () => {
  return (
    <div className="DashboardContendBox">
      <h1>Tickets</h1>
      <div>
        <table className="EmployeeTable">
          <tbody>
            <tr className="EmployeeRow EmployeeTitleRow">
              <td>Tciekt Nr.</td>
              <td>Datum</td>
              <td>Bereich</td>
              <td>Erstellt von</td>
            </tr>
            <tr className={`EmployeeRow`}>
              <td>
                Nr. 00001
              </td>
              <td>9.1.2024</td>
              <td>A A-AKL</td>
              <td>Zeljko Sakac</td>
            </tr>
            
              <tr className="ExpandedRow">
                <td colSpan="5">
                  {/* Render additional employee information and buttons here */}
                  <div className="EmployeeDataContainer.open" style={{padding: '10px'}}>
                    <p>Bitte lassen den RBG so wie ist, ich übernehmen das Problem mit RBG. Muss mal mit Beewen Diskutieren.
                      RBG hat mehr Probleme
                      -  NH00 Sicherungen 63 A ( zum gluck habe wir welche gefunden ) sind beim Sathees bestelt ( fragen wann die kommen haben keine an Lager )
                      - RBG hat in komische  Position stehen geblieben ( sehr tif in Bolzen geschlagen )
                      - Ich vermuten das Datenlichtschranke auch kaputt ist</p>
                  </div>
                </td>
              </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};
