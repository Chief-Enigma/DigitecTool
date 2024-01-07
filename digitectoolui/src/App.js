// Import React dependencis
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Layouts
import { LayoutMain } from "./LayoutComponents/MainLayout/LayoutMain";
import { DashboardLayoutMain } from "./LayoutComponents/DashboardLayout/DashboardLayoutMain";
import { AdminDashboardLayoutMain } from "./LayoutComponents/DashboardLayout/AdminDashboardLayoutMain";

// Import MainPages
import { HomeMain } from "./Pages/Home/HomeMain";
import { ShiftplanMain } from "./Pages/Shiftplan/ShiftplanMain";
import { PersonalShiftplanMain } from "./Pages/PersonalShiftplan/PersonalShiftplanMain";
import { AccountMain } from "./Pages/Account/AccountMain";
import { LoginMain } from "./Pages/Login/LoginMain";
import { NotFoundMain } from "./Pages/NotFound/NotFoundMain";

// Import MainDashboardPages
import { TodayMain } from "./Pages/Dashboard/Today/TodayMain";
import { ShiftChangeMain } from "./Pages/Dashboard/ShiftChange/ShiftChangeMain";
import { ReportSickMain } from "./Pages/Dashboard/ReportSick/ReportSickMain";
import { RequestHollidaysMain } from "./Pages/Dashboard/RequestHolliday/RequestHollidaysMain";
import { CreateShiftplanMain } from "./Pages/Dashboard/CreateShiftplan/CreateShiftplanMain";
import { EditShiftplanMain } from "./Pages/Dashboard/EditShiftplan/EditShiftplanMain";
import { EmployeesMain } from "./Pages/Dashboard/Employees/EmployeesMain";
import { TicketsMain } from "./Pages/Dashboard/Tickets/TicketsMain";
import { MaintenanceMain } from "./Pages/Dashboard/Maintenance/MaintenanceMain";
import { SettingsMain } from "./Pages/Dashboard/Settings/SettingsMain";
import { HelpMain } from "./Pages/Dashboard/Help/HelpMain";

// Import MainAdminDashboardPages
import { AdminTodayMain } from "./Pages/AdminDashboard/Today/AdminTodayMain";
import { AdminEmployeesMain } from "./Pages/AdminDashboard/Employees/AdminEmployeesMain";
import { AdminUsersMain } from "./Pages/AdminDashboard/Users/AdminUsersMain";
import { AdminPermissionsMain } from "./Pages/AdminDashboard/Permissions/AdminPermissionsMain";
import { AdminSettingsMain } from "./Pages/AdminDashboard/Settings/AdminSettingsMain";
import { AdminHelpMain } from "./Pages/AdminDashboard/Help/AdminHelpMain";

const ProtectedRoute = ({ element, requiredPermissions, requiredUserrole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  //console.log(user);

  const hasPermission = requiredPermissions
    ? requiredPermissions.some((permission) => {
        if (user.userrole === "sysadmin") {
          return true; // Grant access for sysadmin to everything
        }
        const hasPermission = user.permissions.includes(permission);
        // console.log(
        //   `Permission: ${permission}, Has Permission: ${hasPermission}`
        // );
        return hasPermission;
      })
    : true;

  const hasUserRole = requiredUserrole
    ? requiredUserrole.some((role) => {
        const hasUserRole = user.userrole === role;
        //console.log(`Role: ${role}, Has Role: ${hasUserRole}`);
        return hasUserRole;
      })
    : true;

  if (!hasPermission || !hasUserRole) {
    console.log("Redirecting to /dashboard/today");
    return <Navigate to="/dashboard/today" replace />;
  }

  // Pass the user prop to the nested components
  const protectedElement = React.cloneElement(element, { user });

  return protectedElement;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<ProtectedRoute element={<HomeMain />} />} />
          <Route
            path="plan"
            element={<ProtectedRoute element={<ShiftplanMain />} />}
          />
          <Route
            path="personalplan/:name"
            element={<ProtectedRoute element={<PersonalShiftplanMain />} />}
          />
          <Route
            path="dashboard"
            element={<ProtectedRoute element={<DashboardLayoutMain />} />}
          >
            <Route path="today" element={<TodayMain />} />
            <Route
              path="changeshift"
              element={
                <ProtectedRoute
                  element={<ShiftChangeMain />}
                  requiredPermissions={["changeshift"]}
                  requiredUserrole={["user", "admin", "sysadmin"]}
                />
              }
            />

            <Route
              path="reportsick"
              element={
                <ProtectedRoute
                  element={<ReportSickMain />}
                  requiredPermissions={["reportsick"]}
                  requiredUserrole={["user", "admin", "sysadmin"]}
                />
              }
            />

            <Route
              path="requestholliday"
              element={
                <ProtectedRoute
                  element={<RequestHollidaysMain />}
                  requiredPermissions={["requestholliday"]}
                  requiredUserrole={["user", "admin", "sysadmin"]}
                />
              }
            />

            <Route
              path="createplan"
              element={
                <ProtectedRoute
                  element={<CreateShiftplanMain />}
                  requiredPermissions={["createplan"]}
                  requiredUserrole={["user", "admin", "sysadmin"]}
                />
              }
            />

            <Route
              path="editplan"
              element={
                <ProtectedRoute
                  element={<EditShiftplanMain />}
                  requiredPermissions={["editplan"]}
                  requiredUserrole={["user", "admin", "sysadmin"]}
                />
              }
            />

            <Route
              path="employees"
              element={
                <ProtectedRoute
                  element={<EmployeesMain user={ProtectedRoute.user} />}
                  requiredPermissions={["employees", "editemployees"]}
                  requiredUserrole={["user", "admin", "sysadmin"]}
                />
              }
            />
            <Route
              path="tickets"
              element={
                <ProtectedRoute
                  element={<TicketsMain />}
                  requiredPermissions={["tickets"]}
                  requiredUserrole={["user", "admin", "sysadmin"]}
                />
              }
            />
            <Route
              path="maintenance"
              element={
                <ProtectedRoute
                  element={<MaintenanceMain />}
                  requiredPermissions={["maintenance"]}
                  requiredUserrole={["user", "admin", "sysadmin"]}
                />
              }
            />
            <Route path="settings" element={<SettingsMain />} />
            <Route path="help" element={<HelpMain />} />
          </Route>
          <Route
            path="admindashboard"
            element={
              <ProtectedRoute
                element={<AdminDashboardLayoutMain />}
                requiredUserrole={["admin", "sysadmin"]}
              />
            }
          >
            <Route path="today" element={<AdminTodayMain />} />
            <Route
              path="employees"
              element={
                <ProtectedRoute
                  element={<AdminEmployeesMain />}
                  requiredUserrole={["admin", "sysadmin"]}
                />
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute
                  element={<AdminUsersMain />}
                  requiredUserrole={["admin", "sysadmin"]}
                />
              }
            />
            <Route
              path="permissions"
              element={
                <ProtectedRoute
                  element={<AdminPermissionsMain />}
                  requiredUserrole={["admin", "sysadmin"]}
                />
              }
            />
            <Route path="settings" element={<AdminSettingsMain />} />
            <Route path="help" element={<AdminHelpMain />} />
          </Route>
          <Route
            path="account"
            element={<ProtectedRoute element={<AccountMain />} />}
          />
          <Route
            path="*"
            element={<ProtectedRoute element={<NotFoundMain />} />}
          />
        </Route>
        <Route path="login" element={<LoginMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
