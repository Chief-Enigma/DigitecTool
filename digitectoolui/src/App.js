import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Importing Layouts
import { Layout } from "./Components/LayOut";
import { DashboardLayout } from "./Components/DashboardLayout";

// Importing Pages
import { Home } from "./Pages/Home";
import { Schichtplan } from "./Pages/Schichtplan";
import { PersonalPlan } from "./Pages/PersonalPlan";
import { Dashboard } from "./Pages/Dashboard";
import { AdminDashboard } from "./Pages/AdminDashboard";
import { Account } from "./Pages/Account";
import { LogIn } from "./Pages/LogIn";
import { NotFound } from "./Pages/NotFound";

// Importing Dashboard Pages
import { Today } from "./Pages/Dashboard/Today";
import { EditPlan } from "./Pages/Dashboard/EditPlan";
import { Employees } from "./Pages/Dashboard/Employees";
import { Tickets } from "./Pages/Dashboard/Tickets";
import { Settings } from "./Pages/Dashboard/Settings";

function App() {
  // Permissions
  const [loggedIn, setLoggedIn] = useState(false);
  const [userrole, setUserRole] = useState("");
  // Userdata
  const [personalnumber, setPersonalNumber] = useState("");

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setLoggedIn(false);
      return;
    }

    setLoggedIn(true);
    setUserRole(user.userrole || "");
    setPersonalNumber(user.personalnumber || "");

    console.log(userrole);
    console.log(personalnumber);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout loggedIn={loggedIn} userrole={userrole} />}
        >
          <Route
            index
            element={
              <Home loggedIn={loggedIn} personalnumber={personalnumber} />
            }
          />
          <Route
            path="Plan"
            element={
              <Schichtplan
                loggedIn={loggedIn}
                personalnumber={personalnumber}
              />
            }
          />
          <Route
            path="PersonalPlan/:personalnumber"
            element={<PersonalPlan />}
          />

          <Route
            path="Dashboard"
            element={
              <DashboardLayout
                loggedIn={loggedIn}
                personalnumber={personalnumber}
                userrole={userrole}
              />
            }
          >
            <Route path="today" element={<Today />} />
            <Route path="editplan" element={<EditPlan />} />
            <Route path="employees" element={<Employees />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="AdminDashboard"
            element={<AdminDashboard loggedIn={loggedIn} userrole={userrole} />}
          />
          <Route
            path="Account"
            element={
              <Account
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                setUserRole={setUserRole}
                personalnumber={personalnumber}
              />
            }
          />
          <Route
            path="Login"
            element={
              <LogIn
                setLoggedIn={setLoggedIn}
                setPersonalNumber={setPersonalNumber}
                setUserRole={setUserRole}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
