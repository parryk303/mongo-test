import React, { useCallback, useEffect, memo, useState } from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Dropdown } from '@client/shared/components';
import { globalStyles, noop, SUPPORTED_COUNTRIES } from '@client/shared/constants';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import { areEqual } from '@client/utils';
import style from './style';
import CircularProgress from "@mui/material/CircularProgress";

const defaultCountryIso = 'US';
const defaultState = {
  isListOpen: false,
  options: [],
  selectedCountry: SUPPORTED_COUNTRIES.find(
    country => country.isoCode === defaultCountryIso
  ),
};

const getMappedOptions = options => {
  const mappedOptions = [
    ...SUPPORTED_COUNTRIES,
    ...options.filter(
      option =>
        SUPPORTED_COUNTRIES.findIndex(
          supportedCountry => supportedCountry.isoCode === option.isoCode
        ) === -1
    ),
  ].map(option => ({
    label: `${option.name} (${option.isoCode}) +${option.callingCode}`,
    option,
  }));

  return mappedOptions;
};


const PhoneNumberInput = ({
  classes: passedClasses = {},
  label = 'Enter Phone Number',
  placeholder = 'Select country code and enter #',
  options = [],
  onChange = noop,
  validations = {},
  listPlacement = 'bottom',
  value = '',
  onFocus = noop,
  onBlur = noop,
  disabled = false,
  error = ' ',
  isLoading = false,
}) => {
  const [state, setState] = useState({
    ...defaultState,
    options: getMappedOptions(options),
  });

  const updateCountrySelection = useCallback(
    (value = '') => {
      if (!value) {
        const defaultCountry = SUPPORTED_COUNTRIES.find(
          country => country.isoCode === defaultCountryIso
        );
        setState(prevState => ({
          ...prevState,
          selectedCountry: defaultCountry,
          // error: validateElement(defaultCountry.callingCode),
        }));

        onChange(`+${defaultCountry.callingCode}`, 'Invalid phone number');
        return;
      }

      const maxCountryCodeLength =
        Math.max(
          state.options.map(country => parseInt(country.option.callingCode))
        ).toString().length + 1;
      if (value.length > 1) {
        let country = null;
        if (value.length <= maxCountryCodeLength) {
          country = state.options.find(supportedCountry =>
            // supportedCountry.option.callingCode === value ||
            // `+${supportedCountry.option.callingCode}` === value
            supportedCountry.option.callingCode.indexOf('+') !== -1
              ? value.indexOf(supportedCountry.option.callingCode) === 0
              : value.indexOf(`+${supportedCountry.option.callingCode}`) === 0
          );
        }

        if (value.length > maxCountryCodeLength) {
          const selectedCountryCode = value.slice(0, maxCountryCodeLength);
          country = state.options.find(supportedCountry =>
            // supportedCountry.option.callingCode === selectedCountryCode ||
            // `+${supportedCountry.option.callingCode}` === selectedCountryCode
            supportedCountry.option.callingCode.indexOf('+') !== -1
              ? selectedCountryCode.indexOf(
                  supportedCountry.option.callingCode
                ) === 0
              : selectedCountryCode.indexOf(
                  `+${supportedCountry.option.callingCode}`
                ) === 0
          );
        }

        if (country) {
          setState(prevState => ({
            ...prevState,
            selectedCountry: country && country.option,
          }));
        }
      }
    },
    [state.options, onChange]
  );

  useEffect(() => {
    if (options.length > 0) {
      setState(prevState => ({
        ...prevState,
        options: getMappedOptions(options),
      }));
    }
  }, [options]);

  useEffect(() => {
    updateCountrySelection(value || '');
  }, [value, updateCountrySelection]);

  const handleCountrySelection = selectedOption => {
    setState(prevState => ({
      ...prevState,
      isListOpen: false,
      selectedCountry: selectedOption.option,
    }));

    onChange(`+${selectedOption.option.callingCode}`, 'Invalid phone number');
  };

  const handleInputChange = (event, error) => {
    const { value } = event.currentTarget;
    updateCountrySelection(value);
    if (value === '+1911' || value === '+1611') {
      onChange(value, null);
    } else {
      onChange(value, error);
    }
  };

  const handleMenuClose = () => {
    setState(prevState => ({
      ...prevState,
      isListOpen: false,
    }));
  };

  let inputClasses = {};
  if (Object.keys(passedClasses).length > 0) {
    inputClasses = { ...passedClasses };
    delete inputClasses.wrapper;
    delete inputClasses.list;
  }

  return (
    <ClickAwayListener onClickAway={handleMenuClose}>
      <Box sx={{ ...globalStyles.display.flex }}>
        <TextField
          size='small'
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          sx={{
            ...inputClasses
          }}
          fullWidth
          placeholder={placeholder}
          label={label}
          value={value}
          error={!!(error || '').trim()}
          helperText={error}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Box
                  sx={{
                    pr: 1,
                    ...style.dropdownWrapper
                  }}
                >
                  <Dropdown
                    classes={passedClasses}
                    transformOrigin={{ horizontal: "left", vertical: "top" }}
                    anchorOrigin={{ horizontal: "left", vertical: "top" }}
                    customToggle={(
                      <Box
                        sx={{
                          ...globalStyles.display.flex,
                          ...globalStyles.flex.justify.between,
                          ...globalStyles.flex.align.center,
                        }}
                      >
                        <Typography variant='body2'>{state.selectedCountry.isoCode}</Typography>
                        <KeyboardArrowDownIcon fontSize='small' sx={{ ...globalStyles.cursor.pointer }} />
                      </Box>
                    )}
                    options={state.options}
                    onChange={handleCountrySelection}
                  />
                </Box>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                {isLoading
                  ? <CircularProgress size={16} />
                  : <></>
                }
              </InputAdornment>
            )
          }}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default memo(PhoneNumberInput, (prevProps, nextProps) => {
  return (
    areEqual(prevProps.classes, nextProps.classes) &&
    prevProps.label === nextProps.label &&
    prevProps.placeholder === nextProps.placeholder &&
    areEqual(prevProps.options, nextProps.options) &&
    prevProps.value === nextProps.value &&
    areEqual(prevProps.validations, nextProps.validations)
  );
});
