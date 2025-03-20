export type Method = "get" | "post" | "put" | "delete";

export interface UserData {
  username: string;
  isAuthenticated: boolean;
}

export interface GlobalContext {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export type Logout = (navigateTo?: string) => void;

export namespace Route {
  interface RouteData {
    method: Method;
    route: string;
    apiRoute: string;
    routeTo: string;
    header: string;
    btnText: string;
    btnMsg: string;
  }
}

export namespace Table {
  interface Crypto {
    changePercent24Hr: string;
    explorer: string;
    id: string;
    marketCapUsd: string;
    maxSupply: string;
    name: string;
    priceUsd: string;
    rank: string;
    supply: string;
    symbol: string;
    volumeUsd24Hr: string;
    vwap24Hr: string;
  }

  type TableFilters =
    | "nameAsc"
    | "nameDesc"
    | "symbolAsc"
    | "symbolDesc"
    | "priceAsc"
    | "priceDesc"
    | "changeAsc"
    | "changeDesc"
    | "none";

  interface TableData {
    cryptoData: Crypto[];
    modal: { id: string };
    favoriteList: string[];
    tableFilter: TableFilters;
    filteredData: Crypto[];
  }

  interface HeaderData {
    name: stirng;
    symbol: stirng;
    price: stirng;
    change: stirng;
  }

  type FavoriteHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    crypto: Crypto
  ) => Promise<void>;

  type Symbols = "" | `\u2228` | `\u2227`;
  type SymbolHandler = (symbol: string) => Symbols;
  type TableTitles = "name" | "symbol" | "price" | "change";
  type FilterHandler = (filter: TableTitles) => void;
  type FilterReturnData = [HeaderData, FilterHandler];
}

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
    method?: Method;
    route?: string;
    withCredentials?: boolean;
  }

  type APIRequest = (APIRequestConfig: APIRequestConfig) => Promise<void>;

  type APIData = [
    APIFormData,
    React.Dispatch<React.SetStateAction<APIFormData>>,
    APIRequest
  ];

  interface APISuccess {
    success: {
      message: string;
    };
    username: string;
    userId: string;
  }

  interface APIError {
    errors: {
      username: { message: string };
      password: { message: string };
      confirmPassword: { message: string };
      newUsername: { message: string };
    };
  }
}

export namespace Modal {
  interface ModalProps {
    tableData: Table.TableData;
    setTableData: React.Dispatch<React.SetStateAction<Table.TableData>>;
  }
}
