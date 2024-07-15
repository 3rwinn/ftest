import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { replaceInArray } from "../../utils/helpers";
import transfertService from "./transfertService";

const initialState = {
  clients: [],
  transferts: [],
  isLoading: false,
};

export const getClient = createAsyncThunk(
  "transferts/search/client",
  async (keywords, thunkAPI) => {
    try {
      console.log("real", keywords);
      const token = thunkAPI.getState().auth.user.token;
      return await transfertService.searchClient(token, keywords);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransferts = createAsyncThunk(
  "transfert/transferts/getAll",
  async ({ start_date, end_date }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transfertService.getTransferts(token, start_date, end_date);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTransfert = createAsyncThunk(
  "transfert/transfert/create",
  async (transfertData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transfertService.createTransfert(transfertData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        (error.response &&
          error.response.data &&
          error.response.data.non_field_errors) ||
        "Impossible d'ajouter cette transfert, veuillez réessayer plus tard." ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const transfertSlice = createSlice({
  name: "transfert",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = action.payload.CUSTOMERS;
      })
      .addCase(getClient.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTransfert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransfert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transferts.push(action.payload);
      })
      .addCase(createTransfert.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTransferts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransferts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transferts = action.payload.results;
      })
      .addCase(getTransferts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default transfertSlice.reducer;
