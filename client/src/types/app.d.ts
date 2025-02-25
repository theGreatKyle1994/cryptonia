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

  type FavoriteHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    crypto: Crypto
  ) => Promise<void>;

  type Symbol = "" | `\u2228` | `\u2227`;

  interface HeaderData {
    [key as string]: Symbol;
    name: Symbol;
    symbol: Symbol;
    price: Symbol;
    change: Symbol;
  }

  type TableHeaderTitle = "name" | "symbol" | "price" | "change";

  type FilterHandler = (newFilter: Table.TableHeaderTitle) => void;

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

  type APIRequest = (APIRequestConfig: APIRequestConfig) => void;

  type APIData = [
    APIFormData,
    React.Dispatch<React.SetStateAction<APIFormData>>,
    APIRequest
  ];
}

export namespace Modal {
  interface ModalProps {
    tableData: Table.TableData;
    setTableData: React.Dispatch<React.SetStateAction<Table.TableData>>;
  }
}
