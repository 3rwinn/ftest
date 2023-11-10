import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import engagementService from "./engagementService";
import { replaceInArray } from "../../utils/helpers";

const initialState = {
  engagements: [],
  totalEntree: 0,
  totalEntreeByDate: 0,
  mouvements: [],
  totalDepense: 0,
  totalDepenseByDate: 0,
  depenses: [],
  stats: [],
  isLoading: false,
};

export const getEngagementStats = createAsyncThunk(
  "engagement/stats/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.getEngagementStats(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEngagementStatsByMission = createAsyncThunk(
  "engagement/stats/getByMission",
  async (mission, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.getEngagementStatsByMission(
        token,
        mission
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEngagements = createAsyncThunk(
  "engagement/overview/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.getEngagements(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createEngagement = createAsyncThunk(
  "engagement/engagement/create",
  async (engagementData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.createEngagement(engagementData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.mission) ||
        (error.response &&
          error.response.data &&
          error.response.data.annee &&
          error.response.data.annee[0]) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter cette engagement, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editEngagement = createAsyncThunk(
  "engagement/overview/edit",
  async (engagement, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.editEngagement(
        engagement.id,
        engagement.datas,
        token
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier cette engagement, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteEngagement = createAsyncThunk(
  "engagement/overview/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.deleteEngagement(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer cet engagement, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// MOUVEMENTS
export const getMouvements = createAsyncThunk(
  "engagement/mouvements/getAll",
  async ({ start_date, end_date }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.getMouvements(token, start_date, end_date);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const newGetMouvements = createAsyncThunk(
  "engagement/mouvements/newGetAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.getMouvementsNew(
        token
         );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createMouvement = createAsyncThunk(
  "engagement/mouvement/create",
  async (mouvementData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.createMouvement(mouvementData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter cette mouvement, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editMouvement = createAsyncThunk(
  "engagement/mouvement/edit",
  async (mouvement, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.editMouvement(
        mouvement.id,
        mouvement.datas,
        token
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier cette mouvement, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMouvement = createAsyncThunk(
  "engagement/mouvement/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.deleteMouvement(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer cette mouvement, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// DEPENSES
export const getDepenses = createAsyncThunk(
  "engagement/depenses/getAll",
  async ({ start_date, end_date }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.getDepenses(token, start_date, end_date);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createDepense = createAsyncThunk(
  "engagement/depense/create",
  async (depenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.createDepense(depenseData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter cette depense, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editDepense = createAsyncThunk(
  "engagement/depense/edit",
  async (depense, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.editDepense(
        depense.id,
        depense.datas,
        token
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier cette depense, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteDepense = createAsyncThunk(
  "engagement/depense/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await engagementService.deleteDepense(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer cette depense, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const engagementSlice = createSlice({
  name: "engagement",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createEngagement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEngagement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.engagements.push(action.payload);
      })
      .addCase(createEngagement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getEngagements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEngagements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.engagements = action.payload.results;
      })
      .addCase(getEngagements.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteEngagement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEngagement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.engagements = state.engagements.filter(
          (engagement) => engagement.id !== action.payload
        );
      })
      .addCase(deleteEngagement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editEngagement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEngagement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.engagements = replaceInArray(state.engagements, action.payload);
      })
      .addCase(editEngagement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createMouvement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMouvement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mouvements.push(action.payload);
      })
      .addCase(createMouvement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMouvements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMouvements.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.mouvements = action.payload.results;
        state.totalEntree = action.payload.total_entree;
        state.totalEntreeByDate = action.payload.total_entree_by_date;
        state.mouvements = action.payload.entrees_by_date;
      })
      .addCase(getMouvements.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMouvement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMouvement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mouvements = state.mouvements.filter(
          (mouvement) => mouvement.id !== action.payload
        );
      })
      .addCase(deleteMouvement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editMouvement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMouvement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mouvements = replaceInArray(state.mouvements, action.payload);
      })
      .addCase(editMouvement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createDepense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDepense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.depenses.push(action.payload);
      })
      .addCase(createDepense.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getDepenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDepenses.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.depenses = action.payload.results;
        state.totalDepense = action.payload.total_depense;
        state.totalDepenseByDate = action.payload.total_depense_by_date;
        state.depenses = action.payload.depenses_by_date;
      })
      .addCase(getDepenses.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteDepense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDepense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.depenses = state.depenses.filter(
          (depense) => depense.id !== action.payload
        );
      })
      .addCase(deleteDepense.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editDepense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDepense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.depenses = replaceInArray(state.depenses, action.payload);
      })
      .addCase(editDepense.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getEngagementStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEngagementStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getEngagementStats.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getEngagementStatsByMission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEngagementStatsByMission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getEngagementStatsByMission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(newGetMouvements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newGetMouvements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mouvements = action.payload.results;
      })
      .addCase(newGetMouvements.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default engagementSlice.reducer;
