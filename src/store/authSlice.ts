import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { UserProfile } from "../types";
import api from "../services/api";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const storedToken = localStorage.getItem("argentBankToken");

const initialState: AuthState = {
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
  user: null,
  status: "idle",
  error: null,
};

/**
 * LOGIN
 */
export const loginUser = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.login(
        credentials.email,
        credentials.password
      );

      const token = response.body.token;

      if (!token) {
        return rejectWithValue(
          "Aucun token n'a été retourné par le serveur."
        );
      }

      localStorage.setItem("argentBankToken", token);

      return token;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Échec de la connexion.");
    }
  }
);

/**
 * GET USER PROFILE
 */
export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  string,
  { rejectValue: string }
>(
  "auth/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.getProfile(token);

      return response.body;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue(
        "Échec de la récupération du profil."
      );
    }
  }
);

/**
 * UPDATE USER PROFILE
 */
export const updateUserProfileName = createAsyncThunk<
  UserProfile,
  { token: string; newUserName: string },
  { rejectValue: string }
>(
  "auth/updateProfileName",
  async ({ token, newUserName }, { rejectWithValue }) => {
    try {
      const response = await api.updateProfile(
        token,
        newUserName
      );

      return response.body;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue(
        "Échec de la mise à jour du profil."
      );
    }
  }
);

/**
 * AUTH SLICE
 */
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("argentBankToken");
    },

    clearError: (state) => {
      state.error = null;

      if (state.status === "failed") {
        state.status = "idle";
      }
    },
  },

  extraReducers: (builder) => {
    /**
     * LOGIN
     */
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      }
    );

    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error =
        action.payload ?? "Échec de la connexion.";
      state.isAuthenticated = false;
    });

    /**
     * FETCH PROFILE
     */
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(
      fetchUserProfile.fulfilled,
      (state, action: PayloadAction<UserProfile>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      }
    );

    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error =
        action.payload ??
        "Échec de la récupération du profil.";

      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("argentBankToken");
    });

    /**
     * UPDATE PROFILE
     */
    builder.addCase(updateUserProfileName.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(
      updateUserProfileName.fulfilled,
      (state, action: PayloadAction<UserProfile>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      }
    );

    builder.addCase(updateUserProfileName.rejected, (state, action) => {
      state.status = "failed";
      state.error =
        action.payload ??
        "Échec de la mise à jour du profil.";
    });
  },
});

export const {
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;