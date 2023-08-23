import { addCaseSensitiveInRegex, replaceKeysWithSymbols } from './utils';

export const buildSearchQuery = (queryString, defaultOrderBy) => {
  let searchQuery = {
    sort: defaultOrderBy,
  };
  if (queryString.filter) {
    addLimitAndSkip(queryString, searchQuery);
    addWhereCondition(queryString, searchQuery);
    addOrderBy(queryString, searchQuery);
  }
  if (searchQuery.where) {
    searchQuery.where = replaceKeysWithSymbols(searchQuery.where);
    searchQuery.where = addCaseSensitiveInRegex(searchQuery.where);
  }
  return searchQuery;
};

let addLimitAndSkip = (queryString, searchQuery) => {
  if (queryString.filter.limit) {
    validateLimitandSkip(searchQuery, queryString, 'limit');
  }
  if (queryString.filter.skip) {
    validateLimitandSkip(searchQuery, queryString, 'skip');
  }
};

let addOrderBy = (queryString, searchQuery) => {
  if (queryString.filter.order) {
    if (typeof queryString.filter.order == 'string' && validateOrderBy(queryString.filter.order.split(' ')) == true) {
      let sort = queryString.filter.order.split(' ');
      searchQuery.sort = { [sort[0]]: parseInt(sort[1]) };
    } else {
      throw new Error('Invalid order query');
    }
  }
};

let addWhereCondition = (queryString, searchQuery) => {
  if (queryString.filter.where) {
    searchQuery.where = queryString.filter.where;
  }
};

let validateOrderBy = (orderby) => {
  let isError = false;
  if ((orderby.length == 2 && orderby[1] == 1) || orderby[1] == -1) {
    isError = true;
  }
  return isError;
};

let validateLimitandSkip = (searchQuery, queryString, type) => {
  searchQuery[type] = parseInt(queryString.filter[type]);
  if (isNaN(searchQuery[type])) {
    throw new Error(`Invalid ${type} in search string`);
  }
};
