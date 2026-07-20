import { LoginResponse, ProfileResponse, UserProfile } from '../types';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const DEMO_USERS: Record<string, { password: string; profile: UserProfile }> = {
  'tony@stark.com': {
    password: 'password123',
    profile: {
      id: '1',
      email: 'tony@stark.com',
      firstName: 'Tony',
      lastName: 'Stark',
      userName: 'Iron',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  },
  'steve@rogers.com': {
    password: 'password456',
    profile: {
      id: '2',
      email: 'steve@rogers.com',
      firstName: 'Steve',
      lastName: 'Rogers',
      userName: 'Cap',
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    },
  },
};

const demoProfiles = new Map(
  Object.values(DEMO_USERS).map(({ profile }) => [profile.email, { ...profile }])
);

function parseDemoEmail(token: string): string | null {
  if (!token.startsWith('demo:')) return null;
  return token.slice(5);
}

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

const api = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    if (DEMO_MODE) {
      const user = DEMO_USERS[email];
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      return delay({
        status: 200,
        message: 'User successfully logged in',
        body: { token: `demo:${email}` },
      });
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<LoginResponse>(response);
  },

  getProfile: async (token: string): Promise<ProfileResponse> => {
    if (DEMO_MODE) {
      const email = parseDemoEmail(token);
      const profile = email ? demoProfiles.get(email) : undefined;
      if (!profile) {
        throw new Error('User not found');
      }
      return delay({
        status: 200,
        message: 'Successfully got user profile data',
        body: profile,
      });
    }

    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<ProfileResponse>(response);
  },

  updateProfile: async (token: string, newUserName: string): Promise<ProfileResponse> => {
    if (DEMO_MODE) {
      const email = parseDemoEmail(token);
      const profile = email ? demoProfiles.get(email) : undefined;
      if (!profile) {
        throw new Error('User not found');
      }
      const updated = {
        ...profile,
        userName: newUserName,
        updatedAt: new Date().toISOString(),
      };
      demoProfiles.set(email!, updated);
      return delay({
        status: 200,
        message: 'User profile updated',
        body: updated,
      });
    }

    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: newUserName }),
    });
    return handleResponse<ProfileResponse>(response);
  },
};

export default api;
