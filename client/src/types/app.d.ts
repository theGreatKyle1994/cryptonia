export interface UserData {
  username: string;
  isAuthenticated: boolean;
}

export interface GlobalContext {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export type LogoutFunction = (navigateTo?: string) => void;
