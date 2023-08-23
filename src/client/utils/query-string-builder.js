import { stringify } from "qs";
const escapeRegexCharacacters = (str) =>
  str
    .replace(/\\/g, "\\\\")
    .replace(/\*/g, "\\*")
    .replace(/\?/g, "\\?")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/\^/g, "\\^")
    .replace(/\$/g, "\\$")
    .replace(/\|/g, "\\|")
    .replace(/\+/g, "\\+");

function mapFilters(passedFilters, searchArr = []) {
  let mappedData = {
    filter: {
      where: {
        and: [],
        or: [],
      },
    },
  };

  if (searchArr.length) {
    const searchArrMappedData = { or: [] };
    searchArr.forEach(element => {
      searchArrMappedData.or.push({
        [element.field]: element.type === '=' ? element.value : { regex: element.value }
      });
    });
    mappedData.filter.where.and.push(searchArrMappedData);
  }

  const reducedFilters = passedFilters.reduce((reducedValue, current) => {
    const { type: operator, value } = current;
    if (reducedValue[current.field]) {
      if (current.subFields) {
        current.subFields.forEach((subField) =>
          reducedValue[current.field].push({
            operator,
            value,
            field: `$${current.field}.${subField}$`,
          })
        );
      } else {
        reducedValue[current.field].push({ operator, value });
      }
      if (current.alias) {
        if (Array.isArray(current.alias)) {
          current.alias.forEach(aliasField => {
            reducedValue[current.field].push({ aliasField, operator, value });
          });
        }
      }
    } else {
      if (current.subFields) {
        reducedValue[current.field] = [];
        current.subFields.forEach((subField) =>
          reducedValue[current.field].push({
            operator,
            value,
            field: `$${current.field}.${subField}$`,
          })
        );
      } else {
        reducedValue[current.field] = [{ operator, value }];
      }
      if (current.alias) {
        if (Array.isArray(current.alias)) {
          current.alias.forEach(aliasField => {
            reducedValue[current.field].push({ aliasField, operator, value });
          });
        }
      }
    }
    return reducedValue;
  }, {});
  Object.keys(reducedFilters).forEach((filterField) => {
    const fieldData = { or: [] }
    reducedFilters[filterField].forEach((element) => {
      let mappedFieldData = null;
      const fieldKey = element.aliasField || filterField;
      const value =
        !!element.value &&
          !Array.isArray(element.value) &&
          typeof element.value === "string"
          ? encodeURIComponent(escapeRegexCharacacters(element.value))
          : element.value;
      console.log("value", value);
      if (element.operator === "=") {
        mappedFieldData = { [fieldKey]: value };
      }

      if (element.operator === "in") {
        mappedFieldData = { [fieldKey]: { in: [...value] } };
      }
      if (element.operator === "contains") {
        mappedFieldData = { [fieldKey]: { contains: [value] } };
      }
      if (element.operator === "notContains") {
        mappedFieldData = {
          not: { [fieldKey]: { contains: [value] } },
        };
      }

      if (mappedFieldData === null) {
        mappedFieldData = {
          [element.field ? element.field : fieldKey]: {
            [element.operator]: value,
          },
        };
      }

      fieldData.or.push(mappedFieldData);
    });

    mappedData.filter.where.and.push(fieldData);
  });

  return mappedData;
}

export const queryStringBuilder = (
  limit = 0,
  offset = 0,
  searchArr = [],
  filterArr = [],
  sortObj = null,
  hasSearchValue = false
) => {
  let queryString = stringify(mapFilters(filterArr, searchArr), { encode: false });

  if (limit > 0) {
    queryString += `&filter[limit]=${limit}`;
  }

  if (offset > 0) {
    queryString += `&filter[offset]=${offset}`;
  }

  if (queryString.length > 0) {
    queryString = `?${queryString}`;
  }

  if (sortObj && sortObj.order && sortObj.field) {
    queryString += `&filter[order]=${sortObj.field}%20${sortObj.order}`;
  }

  return queryString;
};
