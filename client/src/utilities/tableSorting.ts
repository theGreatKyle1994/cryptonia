import type { Table } from "../types/app";

export const filterTable = (
  filter: Table.TableData["tableFilter"],
  cryptoData: Table.Crypto[]
): Table.Crypto[] => {
  const filterObj: { [key in string]: () => Table.Crypto[] } = {
    nameAsc: () =>
      cryptoData.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (b.name < a.name) return 1;
        return 0;
      }),
    nameDesc: () =>
      cryptoData.sort((a, b) => {
        if (a.name > b.name) return -1;
        else if (b.name > a.name) return 1;
        return 0;
      }),
    symbolAsc: () =>
      cryptoData.sort((a, b) => {
        if (a.symbol < b.symbol) return -1;
        else if (b.symbol < a.symbol) return 1;
        return 0;
      }),
    symbolDesc: () =>
      cryptoData.sort((a, b) => {
        if (a.symbol > b.symbol) return -1;
        else if (b.symbol > a.symbol) return 1;
        return 0;
      }),
    priceAsc: () =>
      cryptoData.sort((a, b) => Number(b.priceUsd) - Number(a.priceUsd)),
    priceDesc: () =>
      cryptoData.sort((a, b) => Number(a.priceUsd) - Number(b.priceUsd)),
    changeAsc: () =>
      cryptoData.sort(
        (a, b) => Number(b.changePercent24Hr) - Number(a.changePercent24Hr)
      ),
    changeDesc: () =>
      cryptoData.sort(
        (a, b) => Number(a.changePercent24Hr) - Number(b.changePercent24Hr)
      ),
    none: () => cryptoData,
  };

  return filterObj[filter]();
};

export const filterFavs = (
  favList: Table.TableData["favoriteList"],
  data: Table.TableData["cryptoData"]
) => data.filter((crypto) => favList.includes(crypto.id));
