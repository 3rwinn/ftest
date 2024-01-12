import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import financeService from "./financeService";
import { replaceInArray } from "../../utils/helpers";

const initialState = {
  totalSuiviBanque: 0,
  suiviBanque: [],
  ficheDimanches: [],
  isLoading: false,
  totalEntreeCaisse: 0,
  totalEntreeCaisseByDate: 0,
  entreesCaisse: [],
  totalSortieCaisse: 0,
  totalSortieCaisseByDate: 0,
  sortiesCaisse: [],
  stats: null,
};

export const getFinanceStats = createAsyncThunk(
  "finance/stats",
  async ({ mission, date_debut, date_fin }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.getFinanceStats(
        token,
        mission,
        date_debut,
        date_fin
      );
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible de récupérer les statistiques, merci de ré-essayer plus tard"
      );
    }
  }
);

export const getSuiviBanque = createAsyncThunk(
  "finance/getSuiviBanque",
  async ({ start_date, end_date }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.getSuiviBanque(token, start_date, end_date);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const getFicheDimanches = createAsyncThunk(
  "finance/getFicheDimanches",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.getFicheDimanches(token);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const addSuiviBanque = createAsyncThunk(
  "finance/addSuiviBanque",
  async (suiviData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.addSuiviBanque(suiviData, token);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const deleteSuiviBanque = createAsyncThunk(
  "finance/deleteSuiviBanque",
  async (suiviId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await financeService.deleteSuiviBanque(suiviId, token);
      return suiviId;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const editSuiviBanque = createAsyncThunk(
  "finance/editSuiviBanque",
  async (suiviData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.editSuiviBanque(
        suiviData.id,
        suiviData.datas,
        token
      );
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const getCaisseEntrees = createAsyncThunk(
  "finance/getCaisseEntrees",
  async ({ start_date, end_date }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.getCaisseEntrees(
        token,
        start_date,
        end_date
      );
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const getCaisseSorties = createAsyncThunk(
  "finance/getCaisseSorties",
  async ({ start_date, end_date }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.getCaisseSorties(
        token,
        start_date,
        end_date
      );
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const addCaisseEntree = createAsyncThunk(
  "finance/addCaisseEntree",
  async (caisseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.addCaisseEntree(caisseData, token);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const addCaisseSortie = createAsyncThunk(
  "finance/addCaisseSortie",
  async (caisseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.addCaisseSortie(caisseData, token);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const editCaisseEntree = createAsyncThunk(
  "finance/editCaisseEntree",
  async (entree, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.editCaisseEntree(
        entree.id,
        entree.datas,
        token
      );
      return response;
    } catch (error) {
      console.log("alpha yayayay", error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const editCaisseSortie = createAsyncThunk(
  "finance/editCaisseSortie",
  async (sortie, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await financeService.editCaisseSortie(
        sortie.id,
        sortie.datas,
        token
      );
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const deleteCaisseEntree = createAsyncThunk(
  "finance/deleteCaisseEntree",
  async (caisseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await financeService.deleteCaisseEntree(caisseId, token);
      return caisseId;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const deleteCaisseSortie = createAsyncThunk(
  "finance/deleteCaisseSortie",
  async (caisseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await financeService.deleteCaisseSortie(caisseId, token);
      return caisseId;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        "Impossible d'effectuer cette action, merci de ré-essayer plus tard"
      );
    }
  }
);

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSuiviBanque.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuiviBanque.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suiviBanque = action.payload.suivi_banque_by_date;
        state.totalSuiviBanque = action.payload.total_all_suivi_banque;
        state.missionSuivi = action.payload.missions_datas;
      })
      .addCase(getSuiviBanque.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addSuiviBanque.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSuiviBanque.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suiviBanque.push(action.payload);
      })
      .addCase(addSuiviBanque.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteSuiviBanque.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSuiviBanque.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suiviBanque = state.suiviBanque.filter(
          (suivi) => suivi.id !== action.payload
        );
      })
      .addCase(deleteSuiviBanque.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editSuiviBanque.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSuiviBanque.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suiviBanque = replaceInArray(state.suiviBanque, action.payload);
      })
      .addCase(editSuiviBanque.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getFicheDimanches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFicheDimanches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ficheDimanches = action.payload;
      })
      .addCase(getFicheDimanches.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getCaisseEntrees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCaisseEntrees.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.entreesCaisse = action.payload.results;
        state.entreesCaisse = action.payload.entree_caisse_by_date;
        state.totalEntreeCaisse = action.payload.total_all_entree_caisse;
        state.totalEntreeCaisseByDate =
          action.payload.total_entree_caisse_by_date;
      })
      .addCase(getCaisseEntrees.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCaisseSorties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCaisseSorties.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.sortiesCaisse = action.payload.results;
        state.sortiesCaisse = action.payload.sortie_caisse_by_date;
        state.totalSortieCaisse = action.payload.total_all_sortie_caisse;
        state.totalSortieCaisseByDate =
          action.payload.total_sortie_caisse_by_date;
      })
      .addCase(getCaisseSorties.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addCaisseEntree.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCaisseEntree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entreesCaisse.push(action.payload);
      })
      .addCase(addCaisseEntree.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addCaisseSortie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCaisseSortie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sortiesCaisse.push(action.payload);
      })
      .addCase(addCaisseSortie.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editCaisseEntree.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCaisseEntree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entreesCaisse = replaceInArray(
          state.entreesCaisse,
          action.payload
        );
      })
      .addCase(editCaisseEntree.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editCaisseSortie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCaisseSortie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sortiesCaisse = replaceInArray(
          state.sortiesCaisse,
          action.payload
        );
      })
      .addCase(editCaisseSortie.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCaisseEntree.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCaisseEntree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entreesCaisse = state.entreesCaisse.filter(
          (caisse) => caisse.id !== action.payload
        );
      })
      .addCase(deleteCaisseEntree.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCaisseSortie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCaisseSortie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sortiesCaisse = state.sortiesCaisse.filter(
          (caisse) => caisse.id !== action.payload
        );
      })
      .addCase(deleteCaisseSortie.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getFinanceStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFinanceStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getFinanceStats.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default financeSlice.reducer;
