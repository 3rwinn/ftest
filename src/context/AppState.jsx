import React, { createContext } from "react";

const progFromLocalStorage = JSON.parse(localStorage.getItem("ctam_prog"));
// const sessionFromLocalStorage = JSON.parse(localStorage.getItem("mde_session"));

const initialState = {
  slideOverOpen: false,
  slideOverContent: null,
  commandPaletteOpen: false,
  notificationOpen: false,
  notificationContent: null,
  modalOpen: false,
  modalContent: null,
  selectedProgramme: progFromLocalStorage ? progFromLocalStorage : null,
  // selectedSession: sessionFromLocalStorage ? sessionFromLocalStorage : null,
  selectedSession: null,
};

export const AppContext = createContext(initialState);

const AppReducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_SLIDE_OVER": {
      return {
        ...state,
        slideOverOpen: action.payload,
      };
    }
    case "SET_SLIDE_OVER_CONTENT": {
      return {
        ...state,
        slideOverContent: action.payload,
      };
    }
    case "SWITCH_NOTIFICATION": {
      return {
        ...state,
        notificationOpen: action.payload,
      };
    }
    case "SET_NOTIFICATION_CONTENT": {
      return {
        ...state,
        notificationContent: action.payload,
      };
    }
    case "SWITCH_MODAL": {
      return {
        ...state,
        modalOpen: action.payload,
      };
    }
    case "SET_MODAL_CONTENT": {
      return {
        ...state,
        modalContent: action.payload,
      };
    }
    case "SWITCH_COMMAND_PALETTE": {
      return {
        ...state,
        commandPaletteOpen: action.payload,
      };
    }
    case "SET_SELECTED_PROGRAMME": {
      return {
        ...state,
        selectedProgramme: action.payload,
      };
    }
    case "SET_SELECTED_SESSION": {
      return {
        ...state,
        selectedSession: action.payload,
      };
    }
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  function setProgramme(prog) {
    dispatch({
      type: "SET_SELECTED_PROGRAMME",
      payload: prog,
    });
    localStorage.setItem("mde_prog", JSON.stringify(prog));
  }

  function setSession(session) {
    // if (session) localStorage.setItem("mde_session", JSON.stringify(session));
    dispatch({
      type: "SET_SELECTED_SESSION",
      payload: session,
    });
  }

  function switchSlideOver(bool) {
    dispatch({
      type: "SWITCH_SLIDE_OVER",
      payload: bool,
    });
  }

  function setSlideOverContent(data) {
    dispatch({
      type: "SET_SLIDE_OVER_CONTENT",
      payload: data,
    });
  }

  function switchNotification(bool) {
    dispatch({
      type: "SWITCH_NOTIFICATION",
      payload: bool,
    });
  }

  function setNotificationContent(data) {
    dispatch({
      type: "SET_NOTIFICATION_CONTENT",
      payload: data,
    });
  }

  function switchModal(bool, content) {
    dispatch({
      type: "SWITCH_MODAL",
      payload: bool,
    });

    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: content,
    });
  }

  function switchCommandPalette(bool) {
    dispatch({
      type: "SWITCH_COMMAND_PALETTE",
      payload: bool,
    });
  }

  function showNotif(type, title, description) {
    setNotificationContent({
      type: type,
      title: title,
      description: description,
    });

    showNotif(true);
  }

  return (
    <AppContext.Provider
      value={{
        slideOverOpen: state.slideOverOpen,
        slideOverContent: state.slideOverContent,
        notificationOpen: state.notificationOpen,
        notificationContent: state.notificationContent,
        commandPaletteOpen: state.commandPaletteOpen,
        selectedProgramme: state.selectedProgramme,
        selectedSession: state.selectedSession,
        modalOpen: state.modalOpen,
        modalContent: state.modalContent,
        appVersion: state.appVersion,
        switchModal,
        setProgramme,
        setSession,
        switchSlideOver,
        setSlideOverContent,
        switchNotification,
        setNotificationContent,
        showNotif,
        switchCommandPalette,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  let all = React.useContext(AppContext);
  return all;
};

export default AppProvider;
