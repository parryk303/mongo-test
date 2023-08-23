export * from "./styles";

export const ROLES = {
  CUSTOMER: "customer",
  INTERNAL: "internal",
  INTERNAL_ADMIN: "internal-admin"
};

export const PROJECT_STATUS = {
  DEPLOYED: 'deployed',
  INPROGRESS: "in progress",
  PENDING: "pending"
};

export const PROJECT_STATUS_CONFIG = {
  DEPLOYED: {
    label: "Deployed",
    color: "#1D70AC"
  },
  INPROGRESS: {
    label: "In Progress",
    color: "#EAF5FE"
  },
  PENDING: {
    label: "Pending",
    color: "#E97502"
  },
}

export const THEME_VARIANT = {
  DARK: "dark",
  LIGHT: "light",
};

export const CHART_ELEM_TYPE = {
	START: 'start',
	STEP: 'step',
	CONDITION: 'condition',
	STOP: 'stop',
}

export const noop = () => {};
export const sessionExpireMsg =
  "Redirecting to login, please wait...";
export const DEFAULT_ERROR_MESSAGE =
  "Something went wrong, please contact system administrator.";
export const DEFAULT_WAIT_MESSAGE =
  'It is taking longer than expected, please wait.';
export const ACCESS_DENIED_MESSAGE =
  "You don't have permission to perform this action. Please contact system administrator";

export const PhoneRegexE164 = /^$|^\+\d{11,13}$/;

export const VALIDATIONS = {
  ALPHANUMERIC: "alphanumeric",
  MAX_LENGTH: "maxLength",
  MIN_LENGTH: "minLength",
  MAX: "max",
  MIN: "min",
  INTEGER: "integer",
  FLOAT: "float",
  NUMBER: "number",
  REQUIRED: "required",
  EMAILS: "emails",
  REGEX: "regex",
  PHONE: "phone",
};

export const RC_USER_ID = ["259437004", "37439510"];

export const PAGE_KEYS = {
  NOTIFICATIONS: "notifications",
  WHITELIST_CLIENTS: "whitelist-clients",
  USER_PERMISSION: "user_permission",
  ADMIN_USER: "admin_user",
  ACTIVITY: "activity",
  USERS: "users",
  SETTINGS: "settings",
};

export const DELIVERY_TYPE = {
	EMAIL: "emails",
	SMS: "sms_to",
	WEBHOOK: "webhook",
	GLIP: "glip_teams",
	VOICEMAIL_READ_CONDITION: "voicemail-read-condition",
	DELAY: "delay",
	REPEAT: "goto",
	STOP: "stop",
  RINGOUT: "ringout",
};

export const SUPPORTED_COUNTRIES = [
  {
    callingCode: "1",
    isoCode: "US",
    name: "United States",
    postalRegExp: /^[0-9]{5}$/,
  },
  {
    callingCode: "1",
    isoCode: "CA",
    name: "Canada",
    postalRegExp: /^[A-Z]{1}[0-9]{1}[A-Z]{1} [0-9]{1}[A-Z]{1}[0-9]{1}$/,
  },
  {
    callingCode: "33",
    isoCode: "FR",
    name: "France",
    postalRegExp: /^[0-9]{5}$/,
  },
  {
    callingCode: "44",
    isoCode: "GB",
    name: "United Kingdom",
    postalRegExp: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/,
  },
  {
    callingCode: "61",
    isoCode: "AU",
    name: "Australia",
    postalRegExp: /^[0-9]{4}$/,
  },
];

export const TOAST_TYPES = {
  INFO: "info",
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
};

export const countryList = [
  {
    label: "Afghanistan",
    code: "AF",
  },
  {
    label: "Albania",
    code: "AL",
  },
  {
    label: "Algeria",
    code: "DZ",
  },
  {
    label: "American Samoa",
    code: "AS",
  },
  {
    label: "Andorra",
    code: "AD",
  },
  {
    label: "Angola",
    code: "AO",
  },
  {
    label: "Anguilla",
    code: "AI",
  },
  {
    label: "Antarctica",
    code: "AQ",
  },
  {
    label: "Antigua and Barbuda",
    code: "AG",
  },
  {
    label: "Argentina",
    code: "AR",
  },
  {
    label: "Armenia",
    code: "AM",
  },
  {
    label: "Aruba",
    code: "AW",
  },
  {
    label: "Australia",
    code: "AU",
  },
  {
    label: "Austria",
    code: "AT",
  },
  {
    label: "Azerbajjan",
    code: "AZ",
  },
  {
    label: "Bahamas",
    code: "BS",
  },
  {
    label: "Bahrain",
    code: "BH",
  },
  {
    label: "Bangladesh",
    code: "BD",
  },
  {
    label: "Barbados",
    code: "BB",
  },
  {
    label: "Belarus",
    code: "BY",
  },
  {
    label: "Belgium",
    code: "BE",
  },
  {
    label: "Belize",
    code: "BZ",
  },
  {
    label: "Benin",
    code: "BJ",
  },
  {
    label: "Bermuda",
    code: "BM",
  },
  {
    label: "Bhutan",
    code: "BT",
  },
  {
    label: "Bolivia",
    code: "BO",
  },
  {
    label: "Bonaire",
    code: "BQ",
  },
  {
    label: "Bosnia and Herzegovina",
    code: "BA",
  },
  {
    label: "Botswana",
    code: "BW",
  },
  {
    label: "Bouvet Island",
    code: "BV",
  },
  {
    label: "Brazil",
    code: "BR",
  },
  {
    label: "British Indian Ocean Territory",
    code: "IO",
  },
  {
    label: "Brunel Darussalam",
    code: "BN",
  },
  {
    label: "Bulgaria",
    code: "BG",
  },
  {
    label: "Burkina Faso",
    code: "BF",
  },
  {
    label: "Burundi",
    code: "BI",
  },
  {
    label: "Cambodia",
    code: "KH",
  },
  {
    label: "Cameron",
    code: "CM",
  },
  {
    label: "Canada",
    code: "CA",
  },
  {
    label: "Cape Verde",
    code: "CV",
  },
  {
    label: "Cayman Islands",
    code: "KY",
  },
  {
    label: "Central African Republic",
    code: "CF",
  },
  {
    label: "Chad",
    code: "TD",
  },
  {
    label: "Chile",
    code: "CL",
  },
  {
    label: "China",
    code: "CN",
  },
  {
    label: "Christmas Island",
    code: "CX",
  },
  {
    label: "Cocos (Keeling) Islands",
    code: "CC",
  },
  {
    label: "Colombia",
    code: "CO",
  },
  {
    label: "Comoros",
    code: "KM",
  },
  {
    label: "Congo",
    code: "CG",
  },
  {
    label: "Democratic Republic of the Congo",
    code: "CD",
  },
  {
    label: "Cook Islands",
    code: "CK",
  },
  {
    label: "Costa Rica",
    code: "CR",
  },
  {
    label: "Croatia",
    code: "HR",
  },
  {
    label: "Cuba",
    code: "CU",
  },
  {
    label: "Curacao",
    code: "CW",
  },
  {
    label: "Cyprus",
    code: "CY",
  },
  {
    label: "Czech Republic",
    code: "CZ",
  },
  {
    label: "Cote d'Ivore",
    code: "CI",
  },
  {
    label: "Denmark",
    code: "DK",
  },
  {
    label: "Djibouti",
    code: "DJ",
  },
  {
    label: "Dominica",
    code: "DM",
  },
  {
    label: "Dominican Republic",
    code: "DO",
  },
  {
    label: "Ecuador",
    code: "EC",
  },
  {
    label: "Egypt",
    code: "EG",
  },
  {
    label: "El Salvador",
    code: "SV",
  },
  {
    label: "Equatorial Guinea",
    code: "GQ",
  },
  {
    label: "Entrea",
    code: "ER",
  },
  {
    label: "Estonia",
    code: "EE",
  },
  {
    label: "Ethiopia",
    code: "ET",
  },
  {
    label: "Falkland Islands (Malvinas)",
    code: "FK",
  },
  {
    label: "Faroe Islands",
    code: "FO",
  },
  {
    label: "Fiji",
    code: "FJ",
  },
  {
    label: "Finland",
    code: "FI",
  },
  {
    label: "France",
    code: "FR",
  },
  {
    label: "French Gulana",
    code: "GF",
  },
  {
    label: "French Polynesia",
    code: "PF",
  },
  {
    label: "French Southern Territories",
    code: "TF",
  },
  {
    label: "Gabon",
    code: "GA",
  },
  {
    label: "Gambia",
    code: "GM",
  },
  {
    label: "Georgia",
    code: "GE",
  },
  {
    label: "Germany",
    code: "DE",
  },
  {
    label: "Ghana",
    code: "GH",
  },
  {
    label: "Gibraltar",
    code: "GI",
  },
  {
    label: "Greece",
    code: "GR",
  },
  {
    label: "Greenland",
    code: "GL",
  },
  {
    label: "Grenada",
    code: "GD",
  },
  {
    label: "Guadeloupe",
    code: "GP",
  },
  {
    label: "Guam",
    code: "GU",
  },
  {
    label: "Guatemala",
    code: "GT",
  },
  {
    label: "Guernsey",
    code: "GG",
  },
  {
    label: "Guinea",
    code: "GN",
  },
  {
    label: "Guinea-Bissau",
    code: "GW",
  },
  {
    label: "Guyana",
    code: "GY",
  },
  {
    label: "Haiti",
    code: "HT",
  },
  {
    label: "Heard Island and McDonald Islands",
    code: "HM",
  },
  {
    label: "Holy See(Vatican City State)",
    code: "VA",
  },
  {
    label: "Honduras",
    code: "HN",
  },
  {
    label: "Hong Kong",
    code: "HK",
  },
  {
    label: "Hungary",
    code: "HU",
  },
  {
    label: "Iceland",
    code: "IS",
  },
  {
    label: "India",
    code: "IN",
  },
  {
    label: "Indonesia",
    code: "ID",
  },
  {
    label: "Islamic Republic of Iran",
    code: "IR",
  },
  {
    label: "Iraq",
    code: "IQ",
  },
  {
    label: "Ireland",
    code: "IE",
  },
  {
    label: "Isle of Man",
    code: "IM",
  },
  {
    label: "Israel",
    code: "IL",
  },
  {
    label: "Italy",
    code: "IT",
  },
  {
    label: "Jamaica",
    code: "JM",
  },
  {
    label: "Japan",
    code: "JP",
  },
  {
    label: "Jersey",
    code: "JE",
  },
  {
    label: "Jordan",
    code: "JO",
  },
  {
    label: "Kazakhstan",
    code: "KZ",
  },
  {
    label: "Kenya",
    code: "KE",
  },
  {
    label: "Kiribati",
    code: "KI",
  },
  {
    label: "Democratic People's Republic of Korea",
    code: "KP",
  },
  {
    label: "Republic of Korea",
    code: "KR",
  },
  {
    label: "Kuwait",
    code: "KW",
  },
  {
    label: "Kyrgyzstan",
    code: "KG",
  },
  {
    label: "Lao People's Democratic Republic",
    code: "LA",
  },
  {
    label: "Latvia",
    code: "LV",
  },
  {
    label: "Lebanon",
    code: "LB",
  },
  {
    label: "Lesotho",
    code: "LS",
  },
  {
    label: "Liberia",
    code: "LR",
  },
  {
    label: "Libya",
    code: "LY",
  },
  {
    label: "Liechtenstein",
    code: "LI",
  },
  {
    label: "Lithuania",
    code: "LT",
  },
  {
    label: "Luxembourg",
    code: "LU",
  },
  {
    label: "Macao",
    code: "MO",
  },
  {
    label: "The Former Yugoslav Republic of Macedonia",
    code: "MK",
  },
  {
    label: "Madagascar",
    code: "MG",
  },
  {
    label: "Malawi",
    code: "MW",
  },
  {
    label: "Malaysia",
    code: "MY",
  },
  {
    label: "Maldives",
    code: "MV",
  },
  {
    label: "Mali",
    code: "ML",
  },
  {
    label: "Malta",
    code: "MT",
  },
  {
    label: "Marshall Islands",
    code: "MH",
  },
  {
    label: "Martinique",
    code: "MQ",
  },
  {
    label: "Mauritania",
    code: "MR",
  },
  {
    label: "Mauritius",
    code: "MU",
  },
  {
    label: "Mayotte",
    code: "YT",
  },
  {
    label: "Mexico",
    code: "MX",
  },
  {
    label: "Federated States of Micronesia",
    code: "FM",
  },
  {
    label: "Republic of Moldova",
    code: "MD",
  },
  {
    label: "Monaco",
    code: "MC",
  },
  {
    label: "Mongolia",
    code: "MN",
  },
  {
    label: "Montenegro",
    code: "ME",
  },
  {
    label: "Montserrat",
    code: "MS",
  },
  {
    label: "Morocco",
    code: "MA",
  },
  {
    label: "Mozambique",
    code: "MZ",
  },
  {
    label: "Myanmar",
    code: "MM",
  },
  {
    label: "Namibia",
    code: "NA",
  },
  {
    label: "Nauru",
    code: "NR",
  },
  {
    label: "Nepal",
    code: "NP",
  },
  {
    label: "Netherlands",
    code: "NL",
  },
  {
    label: "New Caledonia",
    code: "NC",
  },
  {
    label: "New Zealand",
    code: "NZ",
  },
  {
    label: "Nicaragua",
    code: "NI",
  },
  {
    label: "Niger",
    code: "NER",
  },
  {
    label: "Nigeria",
    code: "NG",
  },
  {
    label: "Niue",
    code: "NU",
  },
  {
    label: "Norfolk Island",
    code: "NF",
  },
  {
    label: "Northern Mariana Islands",
    code: "MP",
  },
  {
    label: "Norway",
    code: "NO",
  },
  {
    label: "Oman",
    code: "OM",
  },
  {
    label: "Pakistan",
    code: "PK",
  },
  {
    label: "Palau",
    code: "PW",
  },
  {
    label: "State of Palestine",
    code: "PS",
  },
  {
    label: "Panama",
    code: "PA",
  },
  {
    label: "Papua New Guinea",
    code: "PG",
  },
  {
    label: "Paraguay",
    code: "PY",
  },
  {
    label: "Peru",
    code: "PE",
  },
  {
    label: "Philippines",
    code: "PH",
  },
  {
    label: "Pitcairn",
    code: "PN",
  },
  {
    label: "Poland",
    code: "PL",
  },
  {
    label: "Portugal",
    code: "PT",
  },
  {
    label: "Puerto Rico",
    code: "PR",
  },
  {
    label: "Qatar",
    code: "QA",
  },
  {
    label: "Romania",
    code: "RO",
  },
  {
    label: "Russian Federation",
    code: "RU",
  },
  {
    label: "Rwanda",
    code: "RW",
  },
  {
    label: "Reunion",
    code: "RE",
  },
  {
    label: "Saint Barthelemy",
    code: "BL",
  },
  {
    label: "Saint Helena",
    code: "SH",
  },
  {
    label: "Saint Kitts and Nevis",
    code: "KN",
  },
  {
    label: "Saint Lucia",
    code: "LC",
  },
  {
    label: "Saint Martin (French part)",
    code: "MF",
  },
  {
    label: "Saint Pierre and Miquelon",
    code: "PM",
  },
  {
    label: "Saint Vincent and the Grenadines",
    code: "VC",
  },
  {
    label: "Samoa",
    code: "WS",
  },
  {
    label: "San Marino",
    code: "SM",
  },
  {
    label: "Sao Tome and Principe",
    code: "ST",
  },
  {
    label: "Saudi Arabia",
    code: "SA",
  },
  {
    label: "Senegal",
    code: "SN",
  },
  {
    label: "Serbia",
    code: "RS",
  },
  {
    label: "Seychelles",
    code: "SC",
  },
  {
    label: "Singapore",
    code: "SG",
  },
  {
    label: "Sint Maarten (Dutch Part)",
    code: "SX",
  },
  {
    label: "Slovakia",
    code: "SK",
  },
  {
    label: "Slovenia",
    code: "SI",
  },
  {
    label: "Somalia",
    code: "SO",
  },
  {
    label: "South Africa",
    code: "ZA",
  },
  {
    label: "South Georgia and the South Sandwich Islands",
    code: "GS",
  },
  {
    label: "South Sudan",
    code: "SS",
  },
  {
    label: "Spain",
    code: "ES",
  },
  {
    label: "Sri Lanka",
    code: "LK",
  },
  {
    label: "Sudan",
    code: "SD",
  },
  {
    label: "Suriname",
    code: "SR",
  },
  {
    label: "Svalbard and Jan Mayen",
    code: "SJ",
  },
  {
    label: "Swaziland",
    code: "SZ",
  },
  {
    label: "Sweden",
    code: "SE",
  },
  {
    label: "Switzerland",
    code: "CH",
  },
  {
    label: "Syrian Arab Republic",
    code: "SY",
  },
  {
    label: "Taiwan",
    code: "TW",
  },
  {
    label: "Tajikistan",
    code: "TJ",
  },
  {
    label: "United Republic of Tanzania",
    code: "TZ",
  },
  {
    label: "Thailand",
    code: "TH",
  },
  {
    label: "Timor-Leste",
    code: "TL",
  },
  {
    label: "Togo",
    code: "TG",
  },
  {
    label: "Tokelau",
    code: "TK",
  },
  {
    label: "Tonga",
    code: "TO",
  },
  {
    label: "Trinidad and Tobago",
    code: "TT",
  },
  {
    label: "Tunisia",
    code: "TN",
  },
  {
    label: "Turkey",
    code: "TR",
  },
  {
    label: "Turkmenistan",
    code: "TM",
  },
  {
    label: "Turks and Caicos Islands",
    code: "TC",
  },
  {
    label: "Tuvalu",
    code: "TV",
  },
  {
    label: "Uganda",
    code: "UG",
  },
  {
    label: "Ukraine",
    code: "UA",
  },
  {
    label: "United Arab Emirates",
    code: "AE",
  },
  {
    label: "United Kingdom",
    code: "GB",
  },
  {
    label: "United States",
    code: "US",
  },
  {
    label: "United States Minor Outlying Islands",
    code: "UM",
  },
  {
    label: "Uruguay",
    code: "UY",
  },
  {
    label: "Uzbekistan",
    code: "UZ",
  },
  {
    label: "Vanuatu",
    code: "VU",
  },
  {
    label: "Venezuela",
    code: "VE",
  },
  {
    label: "Viet Nam",
    code: "VN",
  },
  {
    label: "British Virgin Islands",
    code: "VG",
  },
  {
    label: "US Virgin Islands",
    code: "VI",
  },
  {
    label: "Wallis and Futuna",
    code: "WF",
  },
  {
    label: "Western Sahara",
    code: "EH",
  },
  {
    label: "Yemen",
    code: "YE",
  },
  {
    label: "Zambia",
    code: "ZM",
  },
  {
    label: "Zimbabwe",
    code: "ZW",
  },
  {
    label: "Afghanistan",
    code: "AF",
  },
  {
    label: "Albania",
    code: "AL",
  },
  {
    label: "Algeria",
    code: "DZ",
  },
  {
    label: "American Samoa",
    code: "AS",
  },
  {
    label: "Andorra",
    code: "AD",
  },
  {
    label: "Angola",
    code: "AO",
  },
  {
    label: "Anguilla",
    code: "AI",
  },
  {
    label: "Antarctica",
    code: "AQ",
  },
  {
    label: "Antigua and Barbuda",
    code: "AG",
  },
  {
    label: "Argentina",
    code: "AR",
  },
  {
    label: "Armenia",
    code: "AM",
  },
  {
    label: "Aruba",
    code: "AW",
  },
  {
    label: "Australia",
    code: "AU",
  },
  {
    label: "Austria",
    code: "AT",
  },
  {
    label: "Azerbajjan",
    code: "AZ",
  },
  {
    label: "Bahamas",
    code: "BS",
  },
  {
    label: "Bahrain",
    code: "BH",
  },
  {
    label: "Bangladesh",
    code: "BD",
  },
  {
    label: "Barbados",
    code: "BB",
  },
  {
    label: "Belarus",
    code: "BY",
  },
  {
    label: "Belgium",
    code: "BE",
  },
  {
    label: "Belize",
    code: "BZ",
  },
  {
    label: "Benin",
    code: "BJ",
  },
  {
    label: "Bermuda",
    code: "BM",
  },
  {
    label: "Bhutan",
    code: "BT",
  },
  {
    label: "Bolivia",
    code: "BO",
  },
  {
    label: "Bonaire",
    code: "BQ",
  },
  {
    label: "Bosnia and Herzegovina",
    code: "BA",
  },
  {
    label: "Botswana",
    code: "BW",
  },
  {
    label: "Bouvet Island",
    code: "BV",
  },
  {
    label: "Brazil",
    code: "BR",
  },
  {
    label: "British Indian Ocean Territory",
    code: "IO",
  },
  {
    label: "Brunel Darussalam",
    code: "BN",
  },
  {
    label: "Bulgaria",
    code: "BG",
  },
  {
    label: "Burkina Faso",
    code: "BF",
  },
  {
    label: "Burundi",
    code: "BI",
  },
  {
    label: "Cambodia",
    code: "KH",
  },
  {
    label: "Cameron",
    code: "CM",
  },
  {
    label: "Canada",
    code: "CA",
  },
  {
    label: "Cape Verde",
    code: "CV",
  },
  {
    label: "Cayman Islands",
    code: "KY",
  },
  {
    label: "Central African Republic",
    code: "CF",
  },
  {
    label: "Chad",
    code: "TD",
  },
  {
    label: "Chile",
    code: "CL",
  },
  {
    label: "China",
    code: "CN",
  },
  {
    label: "Christmas Island",
    code: "CX",
  },
  {
    label: "Cocos (Keeling) Islands",
    code: "CC",
  },
  {
    label: "Colombia",
    code: "CO",
  },
  {
    label: "Comoros",
    code: "KM",
  },
  {
    label: "Congo",
    code: "CG",
  },
  {
    label: "Democratic Republic of the Congo",
    code: "CD",
  },
  {
    label: "Cook Islands",
    code: "CK",
  },
  {
    label: "Costa Rica",
    code: "CR",
  },
  {
    label: "Croatia",
    code: "HR",
  },
  {
    label: "Cuba",
    code: "CU",
  },
  {
    label: "Curacao",
    code: "CW",
  },
  {
    label: "Cyprus",
    code: "CY",
  },
  {
    label: "Czech Republic",
    code: "CZ",
  },
  {
    label: "Cote d'Ivore",
    code: "CI",
  },
  {
    label: "Denmark",
    code: "DK",
  },
  {
    label: "Djibouti",
    code: "DJ",
  },
  {
    label: "Dominica",
    code: "DM",
  },
  {
    label: "Dominican Republic",
    code: "DO",
  },
  {
    label: "Ecuador",
    code: "EC",
  },
  {
    label: "Egypt",
    code: "EG",
  },
  {
    label: "El Salvador",
    code: "SV",
  },
  {
    label: "Equatorial Guinea",
    code: "GQ",
  },
  {
    label: "Entrea",
    code: "ER",
  },
  {
    label: "Estonia",
    code: "EE",
  },
  {
    label: "Ethiopia",
    code: "ET",
  },
  {
    label: "Falkland Islands (Malvinas)",
    code: "FK",
  },
  {
    label: "Faroe Islands",
    code: "FO",
  },
  {
    label: "Fiji",
    code: "FJ",
  },
  {
    label: "Finland",
    code: "FI",
  },
  {
    label: "France",
    code: "FR",
  },
  {
    label: "French Gulana",
    code: "GF",
  },
  {
    label: "French Polynesia",
    code: "PF",
  },
  {
    label: "French Southern Territories",
    code: "TF",
  },
  {
    label: "Gabon",
    code: "GA",
  },
  {
    label: "Gambia",
    code: "GM",
  },
  {
    label: "Georgia",
    code: "GE",
  },
  {
    label: "Germany",
    code: "DE",
  },
  {
    label: "Ghana",
    code: "GH",
  },
  {
    label: "Gibraltar",
    code: "GI",
  },
  {
    label: "Greece",
    code: "GR",
  },
  {
    label: "Greenland",
    code: "GL",
  },
  {
    label: "Grenada",
    code: "GD",
  },
  {
    label: "Guadeloupe",
    code: "GP",
  },
  {
    label: "Guam",
    code: "GU",
  },
  {
    label: "Guatemala",
    code: "GT",
  },
  {
    label: "Guernsey",
    code: "GG",
  },
  {
    label: "Guinea",
    code: "GN",
  },
  {
    label: "Guinea-Bissau",
    code: "GW",
  },
  {
    label: "Guyana",
    code: "GY",
  },
  {
    label: "Haiti",
    code: "HT",
  },
  {
    label: "Heard Island and McDonald Islands",
    code: "HM",
  },
  {
    label: "Holy See(Vatican City State)",
    code: "VA",
  },
  {
    label: "Honduras",
    code: "HN",
  },
  {
    label: "Hong Kong",
    code: "HK",
  },
  {
    label: "Hungary",
    code: "HU",
  },
  {
    label: "Iceland",
    code: "IS",
  },
  {
    label: "India",
    code: "IN",
  },
  {
    label: "Indonesia",
    code: "ID",
  },
  {
    label: "Islamic Republic of Iran",
    code: "IR",
  },
  {
    label: "Iraq",
    code: "IQ",
  },
  {
    label: "Ireland",
    code: "IE",
  },
  {
    label: "Isle of Man",
    code: "IM",
  },
  {
    label: "Israel",
    code: "IL",
  },
  {
    label: "Italy",
    code: "IT",
  },
  {
    label: "Jamaica",
    code: "JM",
  },
  {
    label: "Japan",
    code: "JP",
  },
  {
    label: "Jersey",
    code: "JE",
  },
  {
    label: "Jordan",
    code: "JO",
  },
  {
    label: "Kazakhstan",
    code: "KZ",
  },
  {
    label: "Kenya",
    code: "KE",
  },
  {
    label: "Kiribati",
    code: "KI",
  },
  {
    label: "Democratic People's Republic of Korea",
    code: "KP",
  },
  {
    label: "Republic of Korea",
    code: "KR",
  },
  {
    label: "Kuwait",
    code: "KW",
  },
  {
    label: "Kyrgyzstan",
    code: "KG",
  },
  {
    label: "Lao People's Democratic Republic",
    code: "LA",
  },
  {
    label: "Latvia",
    code: "LV",
  },
  {
    label: "Lebanon",
    code: "LB",
  },
  {
    label: "Lesotho",
    code: "LS",
  },
  {
    label: "Liberia",
    code: "LR",
  },
  {
    label: "Libya",
    code: "LY",
  },
  {
    label: "Liechtenstein",
    code: "LI",
  },
  {
    label: "Lithuania",
    code: "LT",
  },
  {
    label: "Luxembourg",
    code: "LU",
  },
  {
    label: "Macao",
    code: "MO",
  },
  {
    label: "The Former Yugoslav Republic of Macedonia",
    code: "MK",
  },
  {
    label: "Madagascar",
    code: "MG",
  },
  {
    label: "Malawi",
    code: "MW",
  },
  {
    label: "Malaysia",
    code: "MY",
  },
  {
    label: "Maldives",
    code: "MV",
  },
  {
    label: "Mali",
    code: "ML",
  },
  {
    label: "Malta",
    code: "MT",
  },
  {
    label: "Marshall Islands",
    code: "MH",
  },
  {
    label: "Martinique",
    code: "MQ",
  },
  {
    label: "Mauritania",
    code: "MR",
  },
  {
    label: "Mauritius",
    code: "MU",
  },
  {
    label: "Mayotte",
    code: "YT",
  },
  {
    label: "Mexico",
    code: "MX",
  },
  {
    label: "Federated States of Micronesia",
    code: "FM",
  },
  {
    label: "Republic of Moldova",
    code: "MD",
  },
  {
    label: "Monaco",
    code: "MC",
  },
  {
    label: "Mongolia",
    code: "MN",
  },
  {
    label: "Montenegro",
    code: "ME",
  },
  {
    label: "Montserrat",
    code: "MS",
  },
  {
    label: "Morocco",
    code: "MA",
  },
  {
    label: "Mozambique",
    code: "MZ",
  },
  {
    label: "Myanmar",
    code: "MM",
  },
  {
    label: "Namibia",
    code: "NA",
  },
  {
    label: "Nauru",
    code: "NR",
  },
  {
    label: "Nepal",
    code: "NP",
  },
  {
    label: "Netherlands",
    code: "NL",
  },
  {
    label: "New Caledonia",
    code: "NC",
  },
  {
    label: "New Zealand",
    code: "NZ",
  },
  {
    label: "Nicaragua",
    code: "NI",
  },
  {
    label: "Niger",
    code: "NER",
  },
  {
    label: "Nigeria",
    code: "NG",
  },
  {
    label: "Niue",
    code: "NU",
  },
  {
    label: "Norfolk Island",
    code: "NF",
  },
  {
    label: "Northern Mariana Islands",
    code: "MP",
  },
  {
    label: "Norway",
    code: "NO",
  },
  {
    label: "Oman",
    code: "OM",
  },
  {
    label: "Pakistan",
    code: "PK",
  },
  {
    label: "Palau",
    code: "PW",
  },
  {
    label: "State of Palestine",
    code: "PS",
  },
  {
    label: "Panama",
    code: "PA",
  },
  {
    label: "Papua New Guinea",
    code: "PG",
  },
  {
    label: "Paraguay",
    code: "PY",
  },
  {
    label: "Peru",
    code: "PE",
  },
  {
    label: "Philippines",
    code: "PH",
  },
  {
    label: "Pitcairn",
    code: "PN",
  },
  {
    label: "Poland",
    code: "PL",
  },
  {
    label: "Portugal",
    code: "PT",
  },
  {
    label: "Puerto Rico",
    code: "PR",
  },
  {
    label: "Qatar",
    code: "QA",
  },
  {
    label: "Romania",
    code: "RO",
  },
  {
    label: "Russian Federation",
    code: "RU",
  },
  {
    label: "Rwanda",
    code: "RW",
  },
  {
    label: "Reunion",
    code: "RE",
  },
  {
    label: "Saint Barthelemy",
    code: "BL",
  },
  {
    label: "Saint Helena",
    code: "SH",
  },
  {
    label: "Saint Kitts and Nevis",
    code: "KN",
  },
  {
    label: "Saint Lucia",
    code: "LC",
  },
  {
    label: "Saint Martin (French part)",
    code: "MF",
  },
  {
    label: "Saint Pierre and Miquelon",
    code: "PM",
  },
  {
    label: "Saint Vincent and the Grenadines",
    code: "VC",
  },
  {
    label: "Samoa",
    code: "WS",
  },
  {
    label: "San Marino",
    code: "SM",
  },
  {
    label: "Sao Tome and Principe",
    code: "ST",
  },
  {
    label: "Saudi Arabia",
    code: "SA",
  },
  {
    label: "Senegal",
    code: "SN",
  },
  {
    label: "Serbia",
    code: "RS",
  },
  {
    label: "Seychelles",
    code: "SC",
  },
  {
    label: "Singapore",
    code: "SG",
  },
  {
    label: "Sint Maarten (Dutch Part)",
    code: "SX",
  },
  {
    label: "Slovakia",
    code: "SK",
  },
  {
    label: "Slovenia",
    code: "SI",
  },
  {
    label: "Somalia",
    code: "SO",
  },
  {
    label: "South Africa",
    code: "ZA",
  },
  {
    label: "South Georgia and the South Sandwich Islands",
    code: "GS",
  },
  {
    label: "South Sudan",
    code: "SS",
  },
  {
    label: "Spain",
    code: "ES",
  },
  {
    label: "Sri Lanka",
    code: "LK",
  },
  {
    label: "Sudan",
    code: "SD",
  },
  {
    label: "Suriname",
    code: "SR",
  },
  {
    label: "Svalbard and Jan Mayen",
    code: "SJ",
  },
  {
    label: "Swaziland",
    code: "SZ",
  },
  {
    label: "Sweden",
    code: "SE",
  },
  {
    label: "Switzerland",
    code: "CH",
  },
  {
    label: "Syrian Arab Republic",
    code: "SY",
  },
  {
    label: "Taiwan",
    code: "TW",
  },
  {
    label: "Tajikistan",
    code: "TJ",
  },
  {
    label: "United Republic of Tanzania",
    code: "TZ",
  },
  {
    label: "Thailand",
    code: "TH",
  },
  {
    label: "Timor-Leste",
    code: "TL",
  },
  {
    label: "Togo",
    code: "TG",
  },
  {
    label: "Tokelau",
    code: "TK",
  },
  {
    label: "Tonga",
    code: "TO",
  },
  {
    label: "Trinidad and Tobago",
    code: "TT",
  },
  {
    label: "Tunisia",
    code: "TN",
  },
  {
    label: "Turkey",
    code: "TR",
  },
  {
    label: "Turkmenistan",
    code: "TM",
  },
  {
    label: "Turks and Caicos Islands",
    code: "TC",
  },
  {
    label: "Tuvalu",
    code: "TV",
  },
  {
    label: "Uganda",
    code: "UG",
  },
  {
    label: "Ukraine",
    code: "UA",
  },
  {
    label: "United Arab Emirates",
    code: "AE",
  },
  {
    label: "United Kingdom",
    code: "GB",
  },
  {
    label: "United States",
    code: "US",
  },
  {
    label: "United States Minor Outlying Islands",
    code: "UM",
  },
  {
    label: "Uruguay",
    code: "UY",
  },
  {
    label: "Uzbekistan",
    code: "UZ",
  },
  {
    label: "Vanuatu",
    code: "VU",
  },
  {
    label: "Venezuela",
    code: "VE",
  },
  {
    label: "Viet Nam",
    code: "VN",
  },
  {
    label: "British Virgin Islands",
    code: "VG",
  },
  {
    label: "US Virgin Islands",
    code: "VI",
  },
  {
    label: "Wallis and Futuna",
    code: "WF",
  },
  {
    label: "Western Sahara",
    code: "EH",
  },
  {
    label: "Yemen",
    code: "YE",
  },
  {
    label: "Zambia",
    code: "ZM",
  },
  {
    label: "Zimbabwe",
    code: "ZW",
  },
  {
    label: "Afghanistan",
    code: "AF",
  },
  {
    label: "Albania",
    code: "AL",
  },
  {
    label: "Algeria",
    code: "DZ",
  },
  {
    label: "American Samoa",
    code: "AS",
  },
  {
    label: "Andorra",
    code: "AD",
  },
  {
    label: "Angola",
    code: "AO",
  },
  {
    label: "Anguilla",
    code: "AI",
  },
  {
    label: "Antarctica",
    code: "AQ",
  },
  {
    label: "Antigua and Barbuda",
    code: "AG",
  },
  {
    label: "Argentina",
    code: "AR",
  },
  {
    label: "Armenia",
    code: "AM",
  },
  {
    label: "Aruba",
    code: "AW",
  },
  {
    label: "Australia",
    code: "AU",
  },
  {
    label: "Austria",
    code: "AT",
  },
  {
    label: "Azerbajjan",
    code: "AZ",
  },
  {
    label: "Bahamas",
    code: "BS",
  },
  {
    label: "Bahrain",
    code: "BH",
  },
  {
    label: "Bangladesh",
    code: "BD",
  },
  {
    label: "Barbados",
    code: "BB",
  },
  {
    label: "Belarus",
    code: "BY",
  },
  {
    label: "Belgium",
    code: "BE",
  },
  {
    label: "Belize",
    code: "BZ",
  },
  {
    label: "Benin",
    code: "BJ",
  },
  {
    label: "Bermuda",
    code: "BM",
  },
  {
    label: "Bhutan",
    code: "BT",
  },
  {
    label: "Bolivia",
    code: "BO",
  },
  {
    label: "Bonaire",
    code: "BQ",
  },
  {
    label: "Bosnia and Herzegovina",
    code: "BA",
  },
  {
    label: "Botswana",
    code: "BW",
  },
  {
    label: "Bouvet Island",
    code: "BV",
  },
  {
    label: "Brazil",
    code: "BR",
  },
  {
    label: "British Indian Ocean Territory",
    code: "IO",
  },
  {
    label: "Brunel Darussalam",
    code: "BN",
  },
  {
    label: "Bulgaria",
    code: "BG",
  },
  {
    label: "Burkina Faso",
    code: "BF",
  },
  {
    label: "Burundi",
    code: "BI",
  },
  {
    label: "Cambodia",
    code: "KH",
  },
  {
    label: "Cameron",
    code: "CM",
  },
  {
    label: "Canada",
    code: "CA",
  },
  {
    label: "Cape Verde",
    code: "CV",
  },
  {
    label: "Cayman Islands",
    code: "KY",
  },
  {
    label: "Central African Republic",
    code: "CF",
  },
  {
    label: "Chad",
    code: "TD",
  },
  {
    label: "Chile",
    code: "CL",
  },
  {
    label: "China",
    code: "CN",
  },
  {
    label: "Christmas Island",
    code: "CX",
  },
  {
    label: "Cocos (Keeling) Islands",
    code: "CC",
  },
  {
    label: "Colombia",
    code: "CO",
  },
  {
    label: "Comoros",
    code: "KM",
  },
  {
    label: "Congo",
    code: "CG",
  },
  {
    label: "Democratic Republic of the Congo",
    code: "CD",
  },
  {
    label: "Cook Islands",
    code: "CK",
  },
  {
    label: "Costa Rica",
    code: "CR",
  },
  {
    label: "Croatia",
    code: "HR",
  },
  {
    label: "Cuba",
    code: "CU",
  },
  {
    label: "Curacao",
    code: "CW",
  },
  {
    label: "Cyprus",
    code: "CY",
  },
  {
    label: "Czech Republic",
    code: "CZ",
  },
  {
    label: "Cote d'Ivore",
    code: "CI",
  },
  {
    label: "Denmark",
    code: "DK",
  },
  {
    label: "Djibouti",
    code: "DJ",
  },
  {
    label: "Dominica",
    code: "DM",
  },
  {
    label: "Dominican Republic",
    code: "DO",
  },
  {
    label: "Ecuador",
    code: "EC",
  },
  {
    label: "Egypt",
    code: "EG",
  },
  {
    label: "El Salvador",
    code: "SV",
  },
  {
    label: "Equatorial Guinea",
    code: "GQ",
  },
  {
    label: "Entrea",
    code: "ER",
  },
  {
    label: "Estonia",
    code: "EE",
  },
  {
    label: "Ethiopia",
    code: "ET",
  },
  {
    label: "Falkland Islands (Malvinas)",
    code: "FK",
  },
  {
    label: "Faroe Islands",
    code: "FO",
  },
  {
    label: "Fiji",
    code: "FJ",
  },
  {
    label: "Finland",
    code: "FI",
  },
  {
    label: "France",
    code: "FR",
  },
  {
    label: "French Gulana",
    code: "GF",
  },
  {
    label: "French Polynesia",
    code: "PF",
  },
  {
    label: "French Southern Territories",
    code: "TF",
  },
  {
    label: "Gabon",
    code: "GA",
  },
  {
    label: "Gambia",
    code: "GM",
  },
  {
    label: "Georgia",
    code: "GE",
  },
  {
    label: "Germany",
    code: "DE",
  },
  {
    label: "Ghana",
    code: "GH",
  },
  {
    label: "Gibraltar",
    code: "GI",
  },
  {
    label: "Greece",
    code: "GR",
  },
  {
    label: "Greenland",
    code: "GL",
  },
  {
    label: "Grenada",
    code: "GD",
  },
  {
    label: "Guadeloupe",
    code: "GP",
  },
  {
    label: "Guam",
    code: "GU",
  },
  {
    label: "Guatemala",
    code: "GT",
  },
  {
    label: "Guernsey",
    code: "GG",
  },
  {
    label: "Guinea",
    code: "GN",
  },
  {
    label: "Guinea-Bissau",
    code: "GW",
  },
  {
    label: "Guyana",
    code: "GY",
  },
  {
    label: "Haiti",
    code: "HT",
  },
  {
    label: "Heard Island and McDonald Islands",
    code: "HM",
  },
  {
    label: "Holy See(Vatican City State)",
    code: "VA",
  },
  {
    label: "Honduras",
    code: "HN",
  },
  {
    label: "Hong Kong",
    code: "HK",
  },
  {
    label: "Hungary",
    code: "HU",
  },
  {
    label: "Iceland",
    code: "IS",
  },
  {
    label: "India",
    code: "IN",
  },
  {
    label: "Indonesia",
    code: "ID",
  },
  {
    label: "Islamic Republic of Iran",
    code: "IR",
  },
  {
    label: "Iraq",
    code: "IQ",
  },
  {
    label: "Ireland",
    code: "IE",
  },
  {
    label: "Isle of Man",
    code: "IM",
  },
  {
    label: "Israel",
    code: "IL",
  },
  {
    label: "Italy",
    code: "IT",
  },
  {
    label: "Jamaica",
    code: "JM",
  },
  {
    label: "Japan",
    code: "JP",
  },
  {
    label: "Jersey",
    code: "JE",
  },
  {
    label: "Jordan",
    code: "JO",
  },
  {
    label: "Kazakhstan",
    code: "KZ",
  },
  {
    label: "Kenya",
    code: "KE",
  },
  {
    label: "Kiribati",
    code: "KI",
  },
  {
    label: "Democratic People's Republic of Korea",
    code: "KP",
  },
  {
    label: "Republic of Korea",
    code: "KR",
  },
  {
    label: "Kuwait",
    code: "KW",
  },
  {
    label: "Kyrgyzstan",
    code: "KG",
  },
  {
    label: "Lao People's Democratic Republic",
    code: "LA",
  },
  {
    label: "Latvia",
    code: "LV",
  },
  {
    label: "Lebanon",
    code: "LB",
  },
  {
    label: "Lesotho",
    code: "LS",
  },
  {
    label: "Liberia",
    code: "LR",
  },
  {
    label: "Libya",
    code: "LY",
  },
  {
    label: "Liechtenstein",
    code: "LI",
  },
  {
    label: "Lithuania",
    code: "LT",
  },
  {
    label: "Luxembourg",
    code: "LU",
  },
  {
    label: "Macao",
    code: "MO",
  },
  {
    label: "The Former Yugoslav Republic of Macedonia",
    code: "MK",
  },
  {
    label: "Madagascar",
    code: "MG",
  },
  {
    label: "Malawi",
    code: "MW",
  },
  {
    label: "Malaysia",
    code: "MY",
  },
  {
    label: "Maldives",
    code: "MV",
  },
  {
    label: "Mali",
    code: "ML",
  },
  {
    label: "Malta",
    code: "MT",
  },
  {
    label: "Marshall Islands",
    code: "MH",
  },
  {
    label: "Martinique",
    code: "MQ",
  },
  {
    label: "Mauritania",
    code: "MR",
  },
  {
    label: "Mauritius",
    code: "MU",
  },
  {
    label: "Mayotte",
    code: "YT",
  },
  {
    label: "Mexico",
    code: "MX",
  },
  {
    label: "Federated States of Micronesia",
    code: "FM",
  },
  {
    label: "Republic of Moldova",
    code: "MD",
  },
  {
    label: "Monaco",
    code: "MC",
  },
  {
    label: "Mongolia",
    code: "MN",
  },
  {
    label: "Montenegro",
    code: "ME",
  },
  {
    label: "Montserrat",
    code: "MS",
  },
  {
    label: "Morocco",
    code: "MA",
  },
  {
    label: "Mozambique",
    code: "MZ",
  },
  {
    label: "Myanmar",
    code: "MM",
  },
  {
    label: "Namibia",
    code: "NA",
  },
  {
    label: "Nauru",
    code: "NR",
  },
  {
    label: "Nepal",
    code: "NP",
  },
  {
    label: "Netherlands",
    code: "NL",
  },
  {
    label: "New Caledonia",
    code: "NC",
  },
  {
    label: "New Zealand",
    code: "NZ",
  },
  {
    label: "Nicaragua",
    code: "NI",
  },
  {
    label: "Niger",
    code: "NER",
  },
  {
    label: "Nigeria",
    code: "NG",
  },
  {
    label: "Niue",
    code: "NU",
  },
  {
    label: "Norfolk Island",
    code: "NF",
  },
  {
    label: "Northern Mariana Islands",
    code: "MP",
  },
  {
    label: "Norway",
    code: "NO",
  },
  {
    label: "Oman",
    code: "OM",
  },
  {
    label: "Pakistan",
    code: "PK",
  },
  {
    label: "Palau",
    code: "PW",
  },
  {
    label: "State of Palestine",
    code: "PS",
  },
  {
    label: "Panama",
    code: "PA",
  },
  {
    label: "Papua New Guinea",
    code: "PG",
  },
  {
    label: "Paraguay",
    code: "PY",
  },
  {
    label: "Peru",
    code: "PE",
  },
  {
    label: "Philippines",
    code: "PH",
  },
  {
    label: "Pitcairn",
    code: "PN",
  },
  {
    label: "Poland",
    code: "PL",
  },
  {
    label: "Portugal",
    code: "PT",
  },
  {
    label: "Puerto Rico",
    code: "PR",
  },
  {
    label: "Qatar",
    code: "QA",
  },
  {
    label: "Romania",
    code: "RO",
  },
  {
    label: "Russian Federation",
    code: "RU",
  },
  {
    label: "Rwanda",
    code: "RW",
  },
  {
    label: "Reunion",
    code: "RE",
  },
  {
    label: "Saint Barthelemy",
    code: "BL",
  },
  {
    label: "Saint Helena",
    code: "SH",
  },
  {
    label: "Saint Kitts and Nevis",
    code: "KN",
  },
  {
    label: "Saint Lucia",
    code: "LC",
  },
  {
    label: "Saint Martin (French part)",
    code: "MF",
  },
  {
    label: "Saint Pierre and Miquelon",
    code: "PM",
  },
  {
    label: "Saint Vincent and the Grenadines",
    code: "VC",
  },
  {
    label: "Samoa",
    code: "WS",
  },
  {
    label: "San Marino",
    code: "SM",
  },
  {
    label: "Sao Tome and Principe",
    code: "ST",
  },
  {
    label: "Saudi Arabia",
    code: "SA",
  },
  {
    label: "Senegal",
    code: "SN",
  },
  {
    label: "Serbia",
    code: "RS",
  },
  {
    label: "Seychelles",
    code: "SC",
  },
  {
    label: "Singapore",
    code: "SG",
  },
  {
    label: "Sint Maarten (Dutch Part)",
    code: "SX",
  },
  {
    label: "Slovakia",
    code: "SK",
  },
  {
    label: "Slovenia",
    code: "SI",
  },
  {
    label: "Somalia",
    code: "SO",
  },
  {
    label: "South Africa",
    code: "ZA",
  },
  {
    label: "South Georgia and the South Sandwich Islands",
    code: "GS",
  },
  {
    label: "South Sudan",
    code: "SS",
  },
  {
    label: "Spain",
    code: "ES",
  },
  {
    label: "Sri Lanka",
    code: "LK",
  },
  {
    label: "Sudan",
    code: "SD",
  },
  {
    label: "Suriname",
    code: "SR",
  },
  {
    label: "Svalbard and Jan Mayen",
    code: "SJ",
  },
  {
    label: "Swaziland",
    code: "SZ",
  },
  {
    label: "Sweden",
    code: "SE",
  },
  {
    label: "Switzerland",
    code: "CH",
  },
  {
    label: "Syrian Arab Republic",
    code: "SY",
  },
  {
    label: "Taiwan",
    code: "TW",
  },
  {
    label: "Tajikistan",
    code: "TJ",
  },
  {
    label: "United Republic of Tanzania",
    code: "TZ",
  },
  {
    label: "Thailand",
    code: "TH",
  },
  {
    label: "Timor-Leste",
    code: "TL",
  },
  {
    label: "Togo",
    code: "TG",
  },
  {
    label: "Tokelau",
    code: "TK",
  },
  {
    label: "Tonga",
    code: "TO",
  },
  {
    label: "Trinidad and Tobago",
    code: "TT",
  },
  {
    label: "Tunisia",
    code: "TN",
  },
  {
    label: "Turkey",
    code: "TR",
  },
  {
    label: "Turkmenistan",
    code: "TM",
  },
  {
    label: "Turks and Caicos Islands",
    code: "TC",
  },
  {
    label: "Tuvalu",
    code: "TV",
  },
  {
    label: "Uganda",
    code: "UG",
  },
  {
    label: "Ukraine",
    code: "UA",
  },
  {
    label: "United Arab Emirates",
    code: "AE",
  },
  {
    label: "United Kingdom",
    code: "GB",
  },
  {
    label: "United States",
    code: "US",
  },
  {
    label: "United States Minor Outlying Islands",
    code: "UM",
  },
  {
    label: "Uruguay",
    code: "UY",
  },
  {
    label: "Uzbekistan",
    code: "UZ",
  },
  {
    label: "Vanuatu",
    code: "VU",
  },
  {
    label: "Venezuela",
    code: "VE",
  },
  {
    label: "Viet Nam",
    code: "VN",
  },
  {
    label: "British Virgin Islands",
    code: "VG",
  },
  {
    label: "US Virgin Islands",
    code: "VI",
  },
  {
    label: "Wallis and Futuna",
    code: "WF",
  },
  {
    label: "Western Sahara",
    code: "EH",
  },
  {
    label: "Yemen",
    code: "YE",
  },
  {
    label: "Zambia",
    code: "ZM",
  },
  {
    label: "Zimbabwe",
    code: "ZW",
  },
];
