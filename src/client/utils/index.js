export { default as validate } from "./validator";
export { default as responseFormatter } from "./response-formatter";
export { default as exportToFile } from "./exportToFile";
export * from "./query-string-builder";

export const getRCRedirectUri = (
  rc_authorize_uri,
  rc_client_Id,
  apiBaseUrl,
  state
) =>
  `${rc_authorize_uri}&client_id=${rc_client_Id}&redirect_uri=${apiBaseUrl}oauth2&state=${state}`;

export const debounce = (fn, time) => {
  let timeout;

  return function () {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export const getPageConfig = (pageKey, useSessionStorage) => {
  let pageConfig = {};
  if (!pageKey) {
    return pageConfig;
  }

  let pageConfigs = localStorage.getItem("page-config");
  if (useSessionStorage) {
    pageConfigs = sessionStorage.getItem("page-config");
  }

  if (pageConfigs) {
    try {
      pageConfigs = JSON.parse(pageConfigs);
      // TODO: token data
      // const tokenData = decodeToken(getToken());
      const tokenData = {};
      const userConfig = pageConfigs[tokenData.rcuser_uid];
      if (userConfig) {
        pageConfig = userConfig[pageKey];
      }

      return pageConfig;
    } catch (exception) {
      console.log("CONFIG ISSUE");
      return pageConfig;
    }
  }
};
export const updatePaginationOnDelete = (count, paginationState, callback) => {
  if (typeof count === "undefined") return;
  if (
    paginationState.pageNumber !== 1 &&
    count <= paginationState.pageSize * (paginationState.pageNumber - 1)
  ) {
    callback(paginationState.pageNumber - 1);
  }
};
export const setPageConfig = (pageKey, config, useSessionStorage = false) => {
  if (!pageKey || !config) {
    return;
  }

  let pageConfig = {};
  let pageConfigs = localStorage.getItem("page-config");
  if (useSessionStorage) {
    pageConfigs = sessionStorage.getItem("page-config");
  }

   // TODO: token data
  // const tokenData = decodeToken(getToken());
  const tokenData = {};
  if (pageConfigs) {
    try {
      pageConfigs = JSON.parse(pageConfigs);
      const userConfig = pageConfigs[tokenData.rcuser_uid];
      if (userConfig) {
        pageConfig = userConfig[pageKey];
      }
      pageConfig = {
        ...pageConfig,
        ...config,
      };

      const dataToSave = JSON.stringify({
        ...pageConfigs,
        [tokenData.rcuser_uid]: {
          ...userConfig,
          [pageKey]: pageConfig,
        },
      });

      if (useSessionStorage) {
        sessionStorage.setItem("page-config", dataToSave);
      } else {
        localStorage.setItem("page-config", dataToSave);
      }
    } catch (exception) {
      console.log("INVALID CONFIG");
      const dataToSave = JSON.stringify({
        pageKey: config,
      });

      if (useSessionStorage) {
        sessionStorage.setItem("page-config", dataToSave);
      } else {
        localStorage.setItem("page-config", dataToSave);
      }
    }
  } else {
    const dataToSave = JSON.stringify({
      [tokenData.rcuser_uid]: {
        [pageKey]: config,
      },
    });
    if (useSessionStorage) {
      sessionStorage.setItem("page-config", dataToSave);
    } else {
      localStorage.setItem("page-config", dataToSave);
    }
  }
};

// TODO: Optimize this.
export function mapData(data, map) {
  let mappedData = {};
  if (typeof data === "object" && !Array.isArray(data)) {
    Object.keys(data).forEach((dataKey) => {
      if (typeof data[dataKey] === "object") {
        if (!Array.isArray(data[dataKey])) {
          if (map[dataKey]) {
            if (typeof map[dataKey] === "object") {
              mappedData[map[dataKey].self] = mapData(
                data[dataKey],
                map[dataKey].child
              );
            } else {
              mappedData[map[dataKey]] = data[dataKey];
            }
          } else {
            mappedData[dataKey] = data[dataKey];
          }
        } else {
          mappedData[map[dataKey] || dataKey] = data[dataKey];
        }
      } else {
        mappedData[map[dataKey] || dataKey] = data[dataKey];
      }
    });
  }

  return mappedData;
}

function compareObject(value1, value2) {
  let areValuesEqual = true;

  if (!(value1 && value2)) {
    return false;
  }

  if (Object.keys(value1).length !== Object.keys(value2).length) {
    return false;
  }

  Object.keys(value2).forEach((key2) => {
    if (areValuesEqual) {
      if (Object.prototype.hasOwnProperty.call(value1, key2)) {
        if (typeof value1[key2] === typeof value2[key2]) {
          if (typeof value1[key2] === "object") {
            if (!compareObject(value1[key2], value2[key2])) {
              areValuesEqual = false;
            }
          } else {
            if (typeof value1[key2] === "function") {
              if (
                JSON.stringify(value1[key2]) !== JSON.stringify(value2[key2])
              ) {
                areValuesEqual = false;
              }
            } else {
              if (value1[key2] !== value2[key2]) {
                areValuesEqual = false;
              }
            }
          }
        } else {
          areValuesEqual = false;
        }
      } else {
        areValuesEqual = false;
      }
    }
  });

  return areValuesEqual;
}

export function areEqual(value1, value2) {
  let areValuesEqual = true;
  if (
    typeof value1 === typeof value2 &&
    Array.isArray(value1) === Array.isArray(value2)
  ) {
    if (typeof value1 === "object") {
      if (Array.isArray(value1)) {
        if (value1.length === value2.length) {
          value1.forEach((element1) => {
            if (typeof element1 === "object") {
              const objectsInValue2 = value2.filter(
                (element2) => typeof element2 === "object"
              );
              if (objectsInValue2.length > 0) {
                const equalObject2 = objectsInValue2
                  .filter(
                    (element) =>
                      Object.keys(element1).length ===
                      Object.keys(element).length
                  )
                  .find((element2) => {
                    return compareObject(element1, element2);
                  });

                if (!equalObject2) {
                  areValuesEqual = false;
                }
              } else {
                areValuesEqual = false;
              }
            } else {
              if (typeof element1 === "function") {
                const sameElement2 = value2.find(
                  (element2) =>
                    JSON.stringify(element1) === JSON.stringify(element2)
                );

                if (!sameElement2) {
                  areValuesEqual = false;
                }
              } else {
                const sameElement2 = value2.find(
                  (element2) => element2 === element1
                );
                if (!sameElement2) {
                  areValuesEqual = false;
                }
              }
            }
          });
        } else {
          areValuesEqual = false;
        }
      } else {
        if (!compareObject(value1, value2)) {
          areValuesEqual = false;
        }
      }
    } else {
      if (typeof value1 === "function") {
        if (JSON.stringify(value1) !== JSON.stringify(value2)) {
          areValuesEqual = false;
        } else {
          if (value1 !== value2) {
            areValuesEqual = false;
          }
        }
      }
    }
  } else {
    areValuesEqual = false;
  }

  return areValuesEqual;
}

export function showBlockingLoader() {
  const loaderElement = document.getElementById("blocker-page-loader");
  if (loaderElement) {
    loaderElement.style.zIndex = 99999;
    loaderElement.style.display = "flex";
  }
}

export function hideBlockingLoader() {
  const loaderElement = document.getElementById("blocker-page-loader");
  if (loaderElement) {
    loaderElement.style.zIndex = -10;
    loaderElement.style.display = "none";
  }
}
export const SUPPORTED_FILE_FORMATS = {
  FEEDBACK: [
    "mov",
    "avi",
    "mp4",
    "mkv",
    "webm",
    "mpg",
    "mp2",
    "mpeg",
    "mpe",
    "mpv",
    "ogg",
    "m4p",
    "m4v",
    "wmv",
    "qt",
    "flv",
    "swf",
    "avchd",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "xlsx",
    "csv",
    "pdf",
  ],
};

export const getFileExtension = (name) => {
  const lastDot = name.lastIndexOf(".");
  const extension = name.substring(lastDot + 1);
  return extension;
};

export const getFormattedDate = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

export const getMonthList = (options = { month: "long" }, locale = "en") => {
  return Array.from({ length: 12 }, (item, index) => {
    return new Date(null, index + 1, null).toLocaleDateString(locale, options);
  });
};

export const updatePagination = ({ count, pageNumber, pageSize, callback }) => {
  if (typeof count === "undefined") return;
  if (pageNumber !== 1 && count <= pageSize * (pageNumber - 1)) {
    callback(pageNumber - 1);
  }
};
