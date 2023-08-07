import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Navbar } from "./Pages/Navbar";
import { AddPlan } from "./Pages/AddPlan";
import { ViewDetailed } from "./Pages/ViewDetailed";
import { AppProvider } from "./Pages/AppContextFile";
import { ModifyDate } from "./Pages/ModifyDate";
import { RegisteredPlansOnly } from "./Pages/RegisteredPlansOnly";

function App() {
  return (
    <div className="App">
      <Router>
        <AppProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:planId" element={<ViewDetailed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addPlan" element={<AddPlan />} />
            <Route
              path="/registeredPlansOnly"
              element={<RegisteredPlansOnly />}
            />
            <Route path="/modifyDate/:planId" element={<ModifyDate />} />
          </Routes>
        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
