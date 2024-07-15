import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AppProvider from "./context/AppState";
// import Missions from "./pages/settings/Missions";
import SlideOver from "./components/SlideOver";
// import Notification from "./components/Notification";
import Modal from "./components/Modal";
// import Paliers from "./pages/settings/Paliers";
// import Entrees from "./pages/settings/Entree";
// import Sorties from "./pages/settings/Sorties";
// import Membres from "./pages/quotidien/Membres";
// import Nouveaux from "./pages/quotidien/Nouveaux";
// import EngagementAnnuaire from "./pages/engagements/Annuaire";
// import Mouvement from "./pages/engagements/Mouvement";
// import Depenses from "./pages/engagements/Depenses";
// import EngagementOverview from "./pages/engagements/Overview";
// import Reporting from "./pages/engagements/Reporting";
// import CommandPalette from "./components/CommandPalette";
// import FiEntrees from "./pages/finances/FiEntrees";
// import FiSorties from "./pages/finances/FiSorties";
// import SuiviBanque from "./pages/finances/SuiviBanque";
// import FicheDimanche from "./pages/finances/FicheDimanche";
// import Communication from "./pages/quotidien/Communication";
// import Evenements from "./pages/quotidien/Evenements";
// import Utilisateurs from "./pages/quotidien/Utilisateurs";
import Account from "./pages/Account";
import Transferts from "./pages/Transferts";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/transferts"
            element={
              <PrivateRoute>
                <Transferts />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
     
      <Modal />
     
      <SlideOver />
    </AppProvider>
  );
}

export default App;
