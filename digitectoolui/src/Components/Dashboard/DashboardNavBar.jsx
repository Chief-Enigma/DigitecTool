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
                        <a>Main2</a>
                    </Link>
                </li>
                <li>
                    <Link to="main">
                        <a>Main3</a>
                    </Link>
                </li>
                <li>
                    <Link to="main">
                        <a>Main4</a>
                    </Link>
                </li>
                <li>
                    <Link to="main">
                        <a>Main5</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
