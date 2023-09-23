import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AppProvider from "./context/AppState";
import Missions from "./pages/settings/Missions";
import SlideOver from "./components/SlideOver";
import Notification from "./components/Notification";
import Modal from "./components/Modal";
import Paliers from "./pages/settings/Paliers";
import Entrees from "./pages/settings/Entree";
import Sorties from "./pages/settings/Sorties";
import Membres from "./pages/quotidien/Membres";
import Nouveaux from "./pages/quotidien/Nouveaux";
import EngagementAnnuaire from "./pages/engagements/Annuaire";
import Mouvement from "./pages/engagements/Mouvement";
import Depenses from "./pages/engagements/Depenses";
import EngagementOverview from "./pages/engagements/Overview";
import Reporting from "./pages/engagements/Reporting";
import CommandPalette from "./components/CommandPalette";
import FiEntrees from "./pages/finances/FiEntrees";
import FiSorties from "./pages/finances/FiSorties";
import SuiviBanque from "./pages/finances/SuiviBanque";
import FicheDimanche from "./pages/finances/FicheDimanche";
import Communication from "./pages/quotidien/Communication";
import Evenements from "./pages/quotidien/Evenements";
import Utilisateurs from "./pages/quotidien/Utilisateurs";
import Account from "./pages/Account";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/finances/fiche"
            element={
              <PrivateRoute>
                <FicheDimanche />
              </PrivateRoute>
            }
          />
          <Route
            path="/finances/entrees"
            element={
              <PrivateRoute>
                <FiEntrees />
              </PrivateRoute>
            }
          />
          <Route
            path="/finances/sorties"
            element={
              <PrivateRoute>
                <FiSorties />
              </PrivateRoute>
            }
          />
          <Route
            path="/finances/banque"
            element={
              <PrivateRoute>
                <SuiviBanque />
              </PrivateRoute>
            }
          />
          <Route
            path="/engagements/overview"
            element={
              <PrivateRoute>
                <EngagementOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/engagements/attributions"
            element={
              <PrivateRoute>
                <EngagementAnnuaire />
              </PrivateRoute>
            }
          />
          <Route
            path="/engagements/entrees"
            element={
              <PrivateRoute>
                <Mouvement />
              </PrivateRoute>
            }
          />
          <Route
            path="/engagements/depenses"
            element={
              <PrivateRoute>
                <Depenses />
              </PrivateRoute>
            }
          />
          <Route
            path="/engagements/reporting"
            element={
              <PrivateRoute>
                <Reporting />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
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
          <Route
            path="/quotidien/membres"
            element={
              <PrivateRoute>
                <Membres />
              </PrivateRoute>
            }
          />
          <Route
            path="/quotidien/evenements"
            element={
              <PrivateRoute>
                <Evenements />
              </PrivateRoute>
            }
          />

          <Route
            path="/quotidien/communication"
            element={
              <PrivateRoute>
                <Communication />
              </PrivateRoute>
            }
          />
          <Route
            path="/quotidien/nouveaux"
            element={
              <PrivateRoute>
                <Nouveaux />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/missions"
            element={
              <PrivateRoute>
                <Missions />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/paliers"
            element={
              <PrivateRoute>
                <Paliers />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/entrees"
            element={
              <PrivateRoute>
                <Entrees />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/sorties"
            element={
              <PrivateRoute>
                <Sorties />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/users"
            element={
              <PrivateRoute>
                <Utilisateurs />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <CommandPalette />
      <Modal />
      <Notification />
      <SlideOver />
    </AppProvider>
  );
}

export default App;
