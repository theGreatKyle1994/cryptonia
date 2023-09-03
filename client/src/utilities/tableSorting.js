const filterTable = (filter, cryptoData) => {
  const filterObj = {
    nameAsc() {
      return cryptoData.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (b.name < a.name) return 1;
        return 0;
      });
    },
    nameDesc() {
      return cryptoData.sort((a, b) => {
        if (a.name > b.name) return -1;
        else if (b.name > a.name) return 1;
        return 0;
      });
    },
    symbolAsc() {
      return cryptoData.sort((a, b) => {
        if (a.symbol < b.symbol) return -1;
        else if (b.symbol < a.symbol) return 1;
        return 0;
      });
    },
    symbolDesc() {
      return cryptoData.sort((a, b) => {
        if (a.symbol > b.symbol) return -1;
        else if (b.symbol > a.symbol) return 1;
        return 0;
      });
    },
    priceAsc() {
      return cryptoData.sort((a, b) => b.priceUsd - a.priceUsd);
    },
    priceDesc() {
      return cryptoData.sort((a, b) => a.priceUsd - b.priceUsd);
    },
    changeAsc() {
      return cryptoData.sort(
        (a, b) => b.changePercent24Hr - a.changePercent24Hr
      );
    },
    changeDesc() {
      return cryptoData.sort(
        (a, b) => a.changePercent24Hr - b.changePercent24Hr
      );
    },
    none() {
      return cryptoData;
    },
  };
  return filterObj[filter]();
};

export default filterTable;
