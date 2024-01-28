// Import React dependencis
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Get from "./Functions/Api/Requests/Get";

// Import Layouts
import { LayoutMain } from "./LayoutComponents/MainLayout/LayoutMain";
import { DashboardLayoutMain } from "./LayoutComponents/DashboardLayout/DashboardLayoutMain";

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
import { EmployeesMain } from "./Pages/Dashboard/Employees/EmployeesMain";
import { TicketsMain } from "./Pages/Dashboard/Tickets/TicketsMain";
import { MaintenanceMain } from "./Pages/Dashboard/Maintenance/MaintenanceMain";
import { SettingsMain } from "./Pages/Dashboard/Settings/SettingsMain";
import { HelpMain } from "./Pages/Dashboard/Help/HelpMain";
import { UsersMain } from "./Pages/Dashboard/Users/UsersMain";
import { PermissionsMain } from "./Pages/Dashboard/Permissions/PermissionsMain";

const ProtectedRoute = ({ element, requiredPermissions, requiredUserrole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          var parsedUser = JSON.parse(storedUser);
          const AuthenticationResult = await Get.GetLoginCredentials(
            parsedUser.email
          );

          console.log(parsedUser);
          parsedUser.userrole = AuthenticationResult.returnCredentials.userRole;
          parsedUser.permissions =
            AuthenticationResult.returnCredentials.permissions;
          localStorage.setItem("user", JSON.stringify(parsedUser));
          parsedUser = JSON.parse(storedUser);
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
        return hasPermission;
      })
    : true;

  const hasUserRole = requiredUserrole
    ? requiredUserrole.some((role) => {
        const hasUserRole = user.userrole === role;
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
            <Route path="changeshift" element={<ShiftChangeMain />} />
            <Route path="reportsick" element={<ReportSickMain />} />
            <Route path="requestholliday" element={<RequestHollidaysMain />} />

            <Route
              path="editplan"
              element={
                <ProtectedRoute
                  element={<CreateShiftplanMain />}
                  requiredPermissions={["editplan"]}
                  requiredUserrole={["user", "manager", "admin", "sysadmin"]}
                />
              }
            />

            <Route path="employees" element={<EmployeesMain />} />
            <Route
              path="tickets"
              element={
                <ProtectedRoute
                  element={<TicketsMain />}
                  requiredPermissions={["tickets", "managetickets"]}
                  requiredUserrole={["user", "manager", "admin", "sysadmin"]}
                />
              }
            />
            <Route
              path="maintenance"
              element={
                <ProtectedRoute
                  element={<MaintenanceMain />}
                  requiredPermissions={["maintenance"]}
                  requiredUserrole={["user", "manager", "admin", "sysadmin"]}
                />
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute
                  element={<UsersMain />}
                  requiredUserrole={["admin", "sysadmin"]}
                />
              }
            />
            <Route
              path="permissions"
              element={
                <ProtectedRoute
                  element={<PermissionsMain />}
                  requiredUserrole={["admin", "sysadmin"]}
                />
              }
            />
            <Route path="settings" element={<SettingsMain />} />
            <Route path="help" element={<HelpMain />} />
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
