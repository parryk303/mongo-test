import { VALIDATIONS, PhoneRegexE164 } from "@client/shared/constants";

const alphanumericRegExp = /[^A-Za-z0-9]+/g;
// TODO: Optimize this to better handle return statement.
export default (value, validationType, validationValue, type = "string") => {
  let errorMessage = null;
  switch (validationType) {
    case VALIDATIONS.ALPHANUMERIC:
      if (alphanumericRegExp.test(value)) {
        errorMessage = "Must be letters or numbers only";
      }
      alphanumericRegExp.lastIndex = 0;
      break;
    case VALIDATIONS.MIN:
      if (value && !(parseFloat(value) >= parseFloat(validationValue))) {
        errorMessage = `Min value: ${validationValue}`;
      }
      break;
    case VALIDATIONS.MAX:
      if (value && !(parseFloat(value) <= parseFloat(validationValue))) {
        errorMessage = `Max value: ${validationValue}`;
      }
      break;
    case VALIDATIONS.MAX_LENGTH:
      if (
        value &&
        !(
          value.toString && value.toString().length <= parseInt(validationValue)
        )
      ) {
        errorMessage = `Max: ${validationValue} ${
          type === "number" ? "digits" : "char(s)."
        }`;
      }
      break;
    case VALIDATIONS.MIN_LENGTH:
      if (
        value &&
        !(
          value.toString && value.toString().length >= parseInt(validationValue)
        )
      ) {
        errorMessage = `Min: ${validationValue} ${
          type === "number" ? "digits" : "char(s)."
        }`;
      }
      break;
    case VALIDATIONS.INTEGER:
      if (
        value &&
        isNaN(parseInt(value))
        // (isNaN(parseInt(value)) ||
        // parseInt(value).toString().length !== value.length)
      ) {
        errorMessage = "Must be an integer";
      }

      if (parseInt(value) < 10) {
        if (
          typeof value === "string" &&
          parseInt(value).toString().length !== value.length
        ) {
          if (`0${parseInt(value)}` !== value) {
            errorMessage = "Must be an integer";
          }
        }
      }
      break;
    case VALIDATIONS.FLOAT:
      if (isNaN(parseFloat(value))) {
        errorMessage = "Must be a decimal number";
      }
      break;
    case VALIDATIONS.NUMBER:
      if (isNaN(parseFloat(value))) {
        errorMessage = "Must be a valid number";
      }
      break;
    case VALIDATIONS.REQUIRED:
      if (
        ((typeof value === "string" && value.trim().length === 0) ||
          value === null) &&
        validationValue
      ) {
        errorMessage = "Required";
      }
      break;
    case VALIDATIONS.EMAILS:
      value = value.trim().replace(/[\s;,]+/g, ",");
      const emails = value.split(",");
      const regex =
        /^(([^<>()[\]\\.,\s@"]+(\.[^<>()[\]\\.,\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      for (let i = 0; i < emails.length; i++) {
        if (value.length > 0 && !regex.test(emails[i])) {
          errorMessage = "Please enter valid email address";
        }
      }
      break;

    case VALIDATIONS.PHONE:
      if (value !== null && value !== undefined && value.length > 1) {
        const maxCountryCodeLength =
          Math.max(
            validationValue.map((country) => parseInt(country.callingCode))
          ).toString().length + 1;

        let country = null;

        if (value.length <= maxCountryCodeLength) {
          country = validationValue.find((supportedCountry) =>
            supportedCountry.callingCode.indexOf("+") !== -1
              ? value.indexOf(supportedCountry.callingCode) === 0
              : value.indexOf(`+${supportedCountry.callingCode}`) === 0
          );
        }

        if (value.length > maxCountryCodeLength) {
          const selectedCountryCode = value.slice(0, maxCountryCodeLength);
          country = validationValue.find((supportedCountry) =>
            supportedCountry.callingCode.indexOf("+") !== -1
              ? selectedCountryCode.indexOf(supportedCountry.callingCode) === 0
              : selectedCountryCode.indexOf(
                  `+${supportedCountry.callingCode}`
                ) === 0
          );
        }

        let phoneValue = value.replace(/[;]/g, ",");
        phoneValue = phoneValue.replace(/[:]/g, ",");
        phoneValue = phoneValue.replace(/[,]/g, "");

        if (!(country && PhoneRegexE164.test(phoneValue))) {
          errorMessage = "Invalid value";
        }
      } else if (value === null || value === undefined || value.length === 1) {
        errorMessage = "Invalid value";
      }
      break;
    case VALIDATIONS.REGEX:
      if (!(typeof value === "string" && validationValue.test(value))) {
        errorMessage = "Invalid value";
      }
      break;
    default:
  }
  if (errorMessage) {
    return {
      isValid: false,
      errorMessage,
    };
  }
  return {
    isValid: true,
    errorMessage: null,
  };
};
