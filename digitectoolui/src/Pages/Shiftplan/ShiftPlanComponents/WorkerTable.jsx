import React from "react";
import Worker from "./worker";

//import { Users } from "../DemoShiftPlan";

export default function WorkerTable({ workers }) {




  if (workers.length >= 15) {
    const midpoint = Math.ceil(workers.length / 2);
    const workersColumn1 = workers.slice(0, midpoint);
    const workersColumn2 = workers.slice(midpoint);
    const workerrows1 = [];
    const workerrows2 = [];

    workersColumn1.forEach((worker) => {
      workerrows1.push(<Worker worker={worker} />);
    });

    workersColumn2.forEach((worker) => {
      workerrows2.push(<Worker worker={worker} />);
    });


    return (
      <tr>
        <table>
          <td>
            <table className="WorkerTable DoubleWorkTable" >{workerrows1}</table>
          </td>
          <td>
            <table className="WorkerTable DoubleWorkTable">{workerrows2}</table>
          </td>
        </table>
      </tr>
    );

  } else {
    const workerrows = [];
    workers.forEach((worker) => {
      workerrows.push(<Worker worker={worker} />);
    });

    return (
      <tr>
        <table className="WorkerTable">{workerrows}</table>
      </tr>
    );
  }


}
