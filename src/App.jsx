import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AppProvider from "./context/AppState";
import SlideOver from "./components/SlideOver";
import Modal from "./components/Modal";
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
