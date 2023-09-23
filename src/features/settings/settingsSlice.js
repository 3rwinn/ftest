import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingsService from "./settingsService";
import { replaceInArray } from "../../utils/helpers";

const initialState = {
  missions: [],
  paliers: [],
  entrees: [],
  sorties: [],
  isLoading: false,
};

//  MISSIONS
export const getMissions = createAsyncThunk(
  "settings/missions/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.getMissions(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createMission = createAsyncThunk(
  "settings/mission/create",
  async (missionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.createMission(missionData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.libelle) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter cette mission, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editMission = createAsyncThunk(
  "settings/mission/edit",
  async (mission, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.editMission(
        mission.id,
        mission.datas,
        token
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier cette mission, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMission = createAsyncThunk(
  "settings/mission/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.deleteMission(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer cette mission, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  PALIERS
export const getPaliers = createAsyncThunk(
  "settings/paliers/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.getPaliers(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPalier = createAsyncThunk(
  "settings/palier/create",
  async (palierData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.createPalier(palierData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.libelle) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter ce palier, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editPalier = createAsyncThunk(
  "settings/palier/edit",
  async (palier, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.editPalier(palier.id, palier.datas, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier ce palier, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePalier = createAsyncThunk(
  "settings/palier/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.deletePalier(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer ce palier, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  ENTREES
export const getEntrees = createAsyncThunk(
  "settings/entrees/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.getEntrees(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createEntree = createAsyncThunk(
  "settings/entree/create",
  async (entreeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.createEntree(entreeData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.libelle) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter ce type d'entrée, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editEntree = createAsyncThunk(
  "settings/entree/edit",
  async (entree, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.editEntree(entree.id, entree.datas, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier ce type d'entrée, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteEntree = createAsyncThunk(
  "settings/entree/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.deleteEntree(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer ce type d'entrée, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//  SORTIE
export const getSorties = createAsyncThunk(
  "settings/sorties/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.getSorties(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createSortie = createAsyncThunk(
  "settings/sortie/create",
  async (sortieData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.createSortie(sortieData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.libelle) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter ce type de sortie, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editSortie = createAsyncThunk(
  "settings/sortie/edit",
  async (sortie, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.editSortie(sortie.id, sortie.datas, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de modifier ce type de sortie, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSortie = createAsyncThunk(
  "settings/sortie/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await settingsService.deleteSortie(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        "Impossible de supprimer ce type de sortie, veuillez réessayer plus tard.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createMission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions.push(action.payload);
      })
      .addCase(createMission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = action.payload.results;
      })
      .addCase(getMissions.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = state.missions.filter(
          (mission) => mission.id !== action.payload
        );
      })
      .addCase(deleteMission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editMission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = replaceInArray(state.missions, action.payload);
      })
      .addCase(editMission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createPalier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPalier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paliers.push(action.payload);
      })
      .addCase(createPalier.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPaliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paliers = action.payload.results;
      })
      .addCase(getPaliers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePalier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePalier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paliers = state.paliers.filter(
          (palier) => palier.id !== action.payload
        );
      })
      .addCase(deletePalier.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editPalier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPalier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paliers = replaceInArray(state.paliers, action.payload);
      })
      .addCase(editPalier.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createEntree.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEntree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entrees.push(action.payload);
      })
      .addCase(createEntree.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getEntrees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEntrees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entrees = action.payload.results;
      })
      .addCase(getEntrees.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteEntree.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEntree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entrees = state.entrees.filter(
          (entree) => entree.id !== action.payload
        );
      })
      .addCase(deleteEntree.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editEntree.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEntree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entrees = replaceInArray(state.entrees, action.payload);
      })
      .addCase(editEntree.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createSortie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSortie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sorties.push(action.payload);
      })
      .addCase(createSortie.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getSorties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSorties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sorties = action.payload.results;
      })
      .addCase(getSorties.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteSortie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSortie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sorties = state.sorties.filter(
          (sortie) => sortie.id !== action.payload
        );
      })
      .addCase(deleteSortie.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editSortie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSortie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sorties = replaceInArray(state.sorties, action.payload);
      })
      .addCase(editSortie.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default settingsSlice.reducer;
