import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SearchState {
  prompts: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SearchState = {
  prompts: [],
  status: "idle",
  error: null,
};

export const saveSearchPrompt = createAsyncThunk(
  "search/saveSearchPrompt",
  async (
    payload: { userId: string; prompt: string; response: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        "https://66fbb8fc8583ac93b40cec5b.mockapi.io/todo",
        {
          ...payload,
          isSaved: false,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSearchPrompts = createAsyncThunk(
  "search/getSearchPrompts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://66fbb8fc8583ac93b40cec5b.mockapi.io/todo"
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePrompt = createAsyncThunk(
  "search/deletePrompt",
  async (promptId: string, thunkAPI) => {
    try {
      await axios.delete(
        `https://66fbb8fc8583ac93b40cec5b.mockapi.io/todo/${promptId}`
      );
      return promptId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const savePrompt = createAsyncThunk(
  "search/savePrompt",
  async (promptId: string, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://66fbb8fc8583ac93b40cec5b.mockapi.io/todo/${promptId}`,
        { isSaved: true }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removePrompt = createAsyncThunk(
  "search/removePrompt",
  async (promptId: string, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://66fbb8fc8583ac93b40cec5b.mockapi.io/todo/${promptId}`,
        { isSaved: false }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveSearchPrompt.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        saveSearchPrompt.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.prompts.push(action.payload);
        }
      )
      .addCase(
        saveSearchPrompt.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )

      .addCase(getSearchPrompts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getSearchPrompts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.prompts = action.payload;
        }
      )
      .addCase(
        getSearchPrompts.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )

      .addCase(deletePrompt.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePrompt.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.prompts = state.prompts.filter(
          (prompt) => prompt.id !== action.payload
        );
      })
      .addCase(deletePrompt.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(savePrompt.pending, (state) => {
        state.status = "loading";
      })
      .addCase(savePrompt.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        const index = state.prompts.findIndex(
          (prompt) => prompt.id === action.payload.id
        );
        if (index !== -1) {
          state.prompts[index] = action.payload;
        }
      })
      .addCase(savePrompt.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(removePrompt.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removePrompt.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        const index = state.prompts.findIndex(
          (prompt) => prompt.id === action.payload.id
        );
        if (index !== -1) {
          state.prompts[index] = action.payload;
        }
      })
      .addCase(removePrompt.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
