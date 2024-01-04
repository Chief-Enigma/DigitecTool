import React, { useState } from "react";
import { Link } from "react-router-dom";



export const UserRow = (props) => {


    const permissionObject = [];
    (props.userData.permissions).forEach((permission) => {
        permissionObject.push(
            <label className="PermissionBox">{permission}<span class="material-symbols-outlined">
                close
            </span></label>
        )
    })


    return (
        <tr className="EmployeeRow">
            <td>{props.userData.email}</td>
            <td>{props.userData.personalNumber}</td>
            <td>{props.userData.userRole}</td>
            <td>{permissionObject}</td>

        </tr>
    );
};
