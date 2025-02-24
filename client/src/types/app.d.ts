export interface UserData {
  username: string;
  isAuthenticated: boolean;
}

export interface GlobalContext {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export type LogoutFunction = (navigateTo?: string) => void;

export namespace API {
  interface APIFormData {
    username: string;
    password: string;
    confirmPassword: string;
    newUsername: string;
    errors: {
      username: string;
      password: string;
      confirmPassword: string;
      newUsername: string;
    };
    successMsg: string;
    isBtnDisabled: boolean;
  }

  interface APIFormAdditive {
    successMsg?: string;
    isBtnDisabled?: boolean;
  }

  interface APIRequestConfig {
    method?: "get" | "post" | "put";
    route?: string;
    withCredentials?: boolean;
  }

  type APIRequestFunction = (APIRequestConfig: APIRequestConfig) => void;

  type APIData = [
    APIFormData,
    React.Dispatch<React.SetStateAction<APIFormData>>,
    APIRequestFunction
  ];
}
