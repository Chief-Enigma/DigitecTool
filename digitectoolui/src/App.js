import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { Layout } from "./Components/LayOut";
import { DashboardLayout } from "./Components/DashboardLayout";

import { Home } from "./Pages/Home";
import { Schichtplan } from "./Pages/Schichtplan";
import { PersonalPlan } from "./Pages/PersonalPlan";
import { Dashboard } from "./Pages/Dashboard";
import { AdminDashboard } from "./Pages/AdminDashboard";
import { Account } from "./Pages/Account";
import { LogIn } from "./Pages/LogIn";
import { NotFound } from "./Pages/NotFound";

function App() {
  // Permissions
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminloggedIn, setAdminLoggedIn] = useState(false);
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

    // if (user.userrole === "Admin") {
    //   setAdminLoggedIn(true);
    // }

    console.log(userrole);
    console.log(personalnumber);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout loggedIn={loggedIn} adminloggedIn={adminloggedIn} userrole={userrole}/>}
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

          <Route path="Dashboard" element={<DashboardLayout loggedIn={loggedIn}
            personalnumber={personalnumber}
            userrole={userrole} />} >
            <Route path="main" element={<Dashboard />} />
          </Route>

          <Route
            path="AdminDashboard"
            element={<AdminDashboard loggedIn={loggedIn} userrole={userrole} />}
          />
          <Route
            path="Account"
            element={
              <Account setLoggedIn={setLoggedIn} loggedIn={loggedIn} setUserRole={setUserRole} personalnumber={personalnumber} />
            }
          />
          <Route
            path="Login"
            element={
              <LogIn
                setLoggedIn={setLoggedIn}
                setPersonalNumber={setPersonalNumber}
                setUserRole={setUserRole}
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
