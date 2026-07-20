
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../types';
import api from '../services/api';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const storedToken = localStorage.getItem('argentBankToken');

const initialState: AuthState = {
  token: storedToken,
  isAuthenticated: !!storedToken,
  user: null,
  status: 'idle',
  error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.login(credentials.email, credentials.password);
      const token = response.body.token;
      localStorage.setItem('argentBankToken', token);
      return token;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.getProfile(token);
      return response.body;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch profile');
    }
  }
);

export const updateUserProfileName = createAsyncThunk(
  'auth/updateProfileName',
  async ({ token, newUserName }: { token: string; newUserName: string }, { rejectWithValue }) => {
    try {
      const response = await api.updateProfile(token, newUserName);
      return response.body;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update profile');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('argentBankToken');
    },
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.status = 'succeeded';
      state.token = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Fetch Profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      // Si la récupération du profil échoue (ex: token invalide), on déconnecte
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('argentBankToken');
    });

    // Update Profile
    builder.addCase(updateUserProfileName.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.status = 'succeeded';
      state.user = action.payload;
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;