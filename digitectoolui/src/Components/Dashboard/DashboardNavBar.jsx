import React from "react";
import { Link } from "react-router-dom";
import "./DashboardNavBar.css"

export const DashboardNavBar = (props) => {
    return (
        <nav className="DashboardNavBar">
            <ul>
                <li>
                    <Link to="main">
                        <a>Today</a>
                    </Link>
                </li>
                <li>
                    <Link to="main">
                        <a>Schichtplan bearbeiten</a>
                    </Link>
                </li>
                <li>
                    <Link to="main">
                        <a>Mitarbeiter</a>
                    </Link>
                </li>
                <li>
                    <Link to="main">
                        <a>Tickets</a>
                    </Link>
                </li>
                <li>
                    <Link to="main">
                        <a>Einstellungen</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
