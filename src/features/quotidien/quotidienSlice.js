import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quotidienService from "./quotidienService";
import { replaceInArray } from "../../utils/helpers";

const initialState = {
  membres: [],
  communicationLists: [],
  evenements: [],
  timelines: [],
  isLoading: false,
  smsSent: false,
};

// ALERT SMS
export const sendAlertSms = createAsyncThunk(
  "quotidien/sms/send",
  async (smsData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.sendSms(smsData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.libelle) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'envoyer cette alerte SMS, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// TIMELINES
export const getTimelines = createAsyncThunk(
  "quotidien/timelines/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.getTimeLine(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTimeline = createAsyncThunk(
  "quotidien/timeline/create",
  async (timelineData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.createTimeLine(timelineData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response && error.response.data && error.response.data.action) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter cette timeline, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// EVENEMENTS
export const getEvenements = createAsyncThunk(
  "quotidien/evenements/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.getEvenements(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createEvenement = createAsyncThunk(
  "quotidien/evenement/create",
  async (evenementData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.createEvenement(evenementData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.libelle) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter cet événement, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editEvenement = createAsyncThunk(
  "quotidien/evenement/edit",
  async (evenement, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.editEvenement(
        evenement.id,
        evenement.datas,
        token
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier cet événement, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteEvenement = createAsyncThunk(
  "quotidien/evenement/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.deleteEvenement(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer cet événement, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// COMMNUCATIONS
export const getCommunicationLists = createAsyncThunk(
  "quotidien/communication/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.getCommunicationListe(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCommunicationList = createAsyncThunk(
  "quotidien/communication/create",
  async (listeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.createCommunicationListe(listeData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.libelle) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter cette liste, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editCommunicationList = createAsyncThunk(
  "quotidien/communication/edit",
  async (liste, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.editCommunicationListe(
        liste.id,
        liste.datas,
        token
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier cette liste, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCommunicationList = createAsyncThunk(
  "quotidien/communication/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.deleteCommunicationListe(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer cette liste, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// MEMBRES
export const getMembres = createAsyncThunk(
  "quotidien/membres/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.getMembres(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createMembre = createAsyncThunk(
  "quotidien/membre/create",
  async (membreData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.createMembre(membreData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.libelle) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter cette membre, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editMembre = createAsyncThunk(
  "quotidien/membre/edit",
  async (membre, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.editMembre(membre.id, membre.datas, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier cette membre, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadMembres = createAsyncThunk(
  "membre/upload",
  async (membreData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.uploadMembre(membreData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        (error.response && error.response.data && error.response.data.detail) ||
        (error.response &&
          error.response.data &&
          error.response.data.fichier) ||
        (error.response &&
          error.response.data &&
          error.response.data.mission) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'importer les participants via ce fichier. Merci de ré-essayer plus tard";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMembre = createAsyncThunk(
  "quotidien/membre/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotidienService.deleteMembre(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer cette membre, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const quotidienSlice = createSlice({
  name: "quotidien",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createMembre.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMembre.fulfilled, (state, action) => {
        state.isLoading = false;
        state.membres.push(action.payload);
      })
      .addCase(createMembre.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMembres.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.membres = action.payload.results;
      })
      .addCase(getMembres.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMembre.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMembre.fulfilled, (state, action) => {
        state.isLoading = false;
        state.membres = state.membres.filter(
          (membre) => membre.id !== action.payload
        );
      })
      .addCase(deleteMembre.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editMembre.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMembre.fulfilled, (state, action) => {
        state.isLoading = false;
        state.membres = replaceInArray(state.membres, action.payload);
      })
      .addCase(editMembre.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadMembres.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadMembres.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.membres = SpecialReplaceInArray(
        //   state.membres,
        //   action.payload.equipe
        // );
      })
      .addCase(uploadMembres.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCommunicationLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommunicationLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communicationLists = action.payload.results;
      })
      .addCase(getCommunicationLists.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCommunicationList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCommunicationList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communicationLists.push(action.payload);
      })
      .addCase(createCommunicationList.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editCommunicationList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCommunicationList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communicationLists = replaceInArray(
          state.communicationLists,
          action.payload
        );
      })
      .addCase(editCommunicationList.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCommunicationList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCommunicationList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communicationLists = state.communicationLists.filter(
          (liste) => liste.id !== action.payload
        );
      })
      .addCase(deleteCommunicationList.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getEvenements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvenements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.evenements = action.payload.results;
      })
      .addCase(getEvenements.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createEvenement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvenement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.evenements.push(action.payload);
      })
      .addCase(createEvenement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editEvenement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEvenement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.evenements = replaceInArray(state.evenements, action.payload);
      })
      .addCase(editEvenement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteEvenement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvenement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.evenements = state.evenements.filter(
          (evenement) => evenement.id !== action.payload
        );
      })
      .addCase(deleteEvenement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTimelines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTimelines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timelines = action.payload.results;
      })
      .addCase(getTimelines.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTimeline.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTimeline.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timelines.push(action.payload);
      })
      .addCase(createTimeline.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(sendAlertSms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendAlertSms.fulfilled, (state) => {
        state.isLoading = false;
        state.smsSent = true;
      })
      .addCase(sendAlertSms.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default quotidienSlice.reducer;
