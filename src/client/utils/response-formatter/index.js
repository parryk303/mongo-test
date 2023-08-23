import { sessionExpireMsg, DEFAULT_ERROR_MESSAGE } from "@client/shared/constants";
import config from "@client/config";
import { getRCRedirectUri } from "@client/utils";

const { rc_client_Id, rc_authorize_uri, apiBaseUrl } = config;
let alreadyRedirected = false;

const redirectToLogin = () => {
  if (alreadyRedirected) return;
  alreadyRedirected = true;

  if (typeof window !== "undefined") {
    window.location.replace(
      getRCRedirectUri(
        rc_authorize_uri,
        rc_client_Id,
        apiBaseUrl,
        window.location.href
      )
    );
  }
};

const responseFormatter = async (
  api,
  isServer = false,
  defaultMessage = DEFAULT_ERROR_MESSAGE
) => {
  try {
    const { data: response, status, ...request } = await api;

    if (status === 202 && response.error) {
      throw response;
    }

    if (
      request.request.responseType === "blob" ||
      request.headers["content-type"] === "application/zip"
    ) {
      return {
        data: response,
        message: response.message,
        status,
        error: null,
      };
    }

    return {
      data: response && response.data,
      message: response.message,
      status,
      error: null,
    };
  } catch (err) {
    let accessDeniedError = "";
    if (!err.response) {
      console.log(
        "IS NETWORK ERROR",
        err.message && err.message.toLowerCase().indexOf("network error") === -1
      );

      return {
        data: null,
        status: null,
        error:
          err.message &&
          err.message.toLowerCase().indexOf("network error") === -1
            ? err.message || err.error || defaultMessage
            : [{ message: "" }],
      };
    }

    const { status = null, data: response = {} } =
      (err.response && err.response) || {};

    if (status === 401) {
      accessDeniedError = sessionExpireMsg;
      redirectToLogin();
    }

    return {
      data: null,
      status,
      error: accessDeniedError || response.error || defaultMessage,
    };
  }
};

export default responseFormatter;
