import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "./Components/LayOut";
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
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setLoggedIn(false);
      return;
    }

    setLoggedIn(true);
    setPersonalNumber(user.personalnumber || "");
    setEmail(user.email || "");
    setUserRole(user.userrole || "");

    if ((userrole = "Admin")) {
      setAdminLoggedIn(true);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout loggedIn={loggedIn} adminloggedIn={adminloggedIn} />}
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
              <Dashboard
                loggedIn={loggedIn}
                personalnumber={personalnumber}
                userrole={userrole}
              />
            }
          />
          <Route
            path="AdminDashboard"
            element={<AdminDashboard adminloggedIn={adminloggedIn} />}
          />
          <Route
            path="Account"
            element={
              <Account loggedIn={loggedIn} personalnumber={personalnumber} />
            }
          />
          <Route path="LogIn" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
