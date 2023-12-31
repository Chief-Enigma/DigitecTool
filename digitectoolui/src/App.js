import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Importing Layouts
import { Layout } from "./Components/LayOuts/LayOut";
import { DashboardLayout } from "./Components/LayOuts/DashboardLayout";
import { AdminDashboardLayout } from "./Components/LayOuts/AdminDashboardLayout";

// Importing Pages
import { Home } from "./Pages/Home";
import { Schichtplan } from "./Pages/Schichtplan";
import { PersonalPlan } from "./Pages/PersonalPlan";
import { Account } from "./Pages/Account";
import { LogIn } from "./Pages/LogIn";
import { NotFound } from "./Pages/NotFound";

// Importing Dashboard Pages
import { Today } from "./Pages/Dashboard/Today";
import { EditPlan } from "./Pages/Dashboard/EditPlan";
import { Employees } from "./Pages/Dashboard/Employees";
import { Tickets } from "./Pages/Dashboard/Tickets";
import { Settings } from "./Pages/Dashboard/Settings";

// Importing AdminDashboard Pages
import { Users } from "./Pages/AdminDashboard/Users";
import {AdminSettings} from "./Pages/AdminDashboard/AdminSettings";

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
      setUserRole("");
      setPersonalNumber("");
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
          element={
            <Layout
              loggedIn={loggedIn}
              personalnumber={personalnumber}
              userrole={userrole}
            />
          }
        >
          <Route
            index
            element={
              <Home
                loggedIn={loggedIn}
                personalnumber={personalnumber}
                userrole={userrole}
              />
            }
          />
          <Route
            path="Plan"
            element={
              <Schichtplan
                loggedIn={loggedIn}
                personalnumber={personalnumber}
                userrole={userrole}
              />
            }
          />
          <Route
            path="PersonalPlan/:personalnumber"
            element={
              <PersonalPlan
                loggedIn={loggedIn}
                personalnumber={personalnumber}
                userrole={userrole}
              />
            }
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
            <Route
              path="today"
              element={
                <Today personalnumber={personalnumber} userrole={userrole} />
              }
            />
            <Route
              path="editplan"
              element={
                <EditPlan personalnumber={personalnumber} userrole={userrole} />
              }
            />
            <Route
              path="employees"
              element={
                <Employees
                  personalnumber={personalnumber}
                  userrole={userrole}
                />
              }
            />
            <Route
              path="tickets"
              element={
                <Tickets personalnumber={personalnumber} userrole={userrole} />
              }
            />
            <Route
              path="settings"
              element={
                <Settings personalnumber={personalnumber} userrole={userrole} />
              }
            />
          </Route>

          <Route
            path="AdminDashboard"
            element={
              <AdminDashboardLayout
                userrole={userrole}
              />
            }
          >
            <Route
              path="today"
              element={<Today personalnumber={personalnumber} />}
            />
            <Route
              path="employees"
              element={<Employees personalnumber={personalnumber} />}
            />
            <Route
              path="users"
              element={<Users personalnumber={personalnumber} />}
            />
            <Route
              path="settings"
              element={<AdminSettings personalnumber={personalnumber} />}
            />
          </Route>

          <Route
            path="Account"
            element={
              <Account
                setLoggedIn={setLoggedIn}
                setPersonalNumber={setPersonalNumber}
                setUserRole={setUserRole}
                loggedIn={loggedIn}
                personalnumber={personalnumber}
                userrole={userrole}
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
