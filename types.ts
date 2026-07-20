export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  body: {
    token: string;
  };
}

export interface ProfileResponse {
  status: number;
  message: string;
  body: UserProfile;
}

export interface AccountInfo {
  id: string;
  title: string;
  amount: string;
  description: string;
}
