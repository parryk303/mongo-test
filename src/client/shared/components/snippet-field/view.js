import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import style from "./style";
import Autocomplete from "@mui/material/Autocomplete";
import { globalStyles, noop } from "@client/shared/constants";
const SnippetView = ({
  handleFocus = () => {},
  label = "Type or select the pre-built snippets to the right.",
  wrapperRef = null,
  options = [],
  addSnippet = noop,
  isFocused = false,
  passedClasses = {},
  debouncedOnchange = noop,
}) => {
  return (
    <>
      <Box
        sx={{
          ...style.wrapper,
          ...passedClasses.wrapper,
          display: "flex",
          borderColor: "gray",
        }}
        onBlur={() => {
          handleFocus(false);
        }}
        onFocus={() => {
          handleFocus(true);
        }}
      >
        <span
          style={
            isFocused
              ? {
                  ...style.label,
                  borderColor: "gray",
                  ...globalStyles.background.color.primary.main,
                  background: "white",
                }
              : { ...style.label, borderColor: "gray", background: "white" }
          }
        >
          {label}
        </span>
        <Box
          sx={{ ...style.input, ...passedClasses.input }}
          contentEditable
          onKeyUp={() => {
            debouncedOnchange();
          }}
          ref={wrapperRef}
        ></Box>
        <Box
          sx={{
            ...style.snippetsWrapper,
            ...passedClasses.snippetsWrapper,
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          {options.map((option, optionIndex) => {
            return (
              <Chip
                sx={{
                  ...passedClasses.option,
                  ...style.chip,
                  marginBottom: 1,
                }}
                deleteIcon={
                  <span style={style.chipIconWrapper}>
                    <img
                      alt=""
                      style={style.chipIcon}
                      src="/assets/plus-grey-dark.svg"
                    />
                  </span>
                }
                key={optionIndex}
                label={option.label}
                size="small"
                onClick={() => addSnippet(option)}
                onDelete={() => addSnippet(option)}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default SnippetView;
