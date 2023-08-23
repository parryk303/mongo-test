import { useCallback, useEffect, useRef, useState } from "react";
import SnippetView from "./view";
import { debounce } from "@client/utils";
import style from "./style";
import Box from "@mui/material/Box";
const defaultState = {
  hasValue: false
}
const SnippetField = ({
  classes: passedClasses = {},
  label = "Type or select the pre-built snippets to the right.",
  onChange = () => {},
  options = [],
  value = "",
}) => {
  const [state, setState] = useState(defaultState);
  const wrapperRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const getSnippetHTML = (option) => {
    return `<span style="background:#6258de; border-radius: 28px; color: white; height: 20; min-width: 50; padding:2px 8px; margin-left:4px; width: max-content" contenteditable="false">${option.label}</span>`;
  };

  const addSnippet = (option) => {
    if (!isFocused) {
      return;
    }

    insertSnippet(getSnippetHTML(option));
    onChange(getValue());
  };

  const insertSnippet = (html) => {
    wrapperRef.current && wrapperRef.current.focus();
    let sel, range;
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(),
        node;
      while ((node = el.firstChild)) {
        frag.appendChild(node);
      }
      var firstNode = frag.firstChild;
      range.insertNode(frag);
      range.setStartAfter(firstNode);
      range.setEndAfter(firstNode);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };
  const handleFocus = (value) => {
    setIsFocused(value);
  };

  const getValue = () => {
    if (!wrapperRef.current) {
      return "";
    }

    const innerHTML = wrapperRef.current.innerHTML;
    let value = innerHTML.replace(/<div>/g, "\n");
    value = value.replace(/<br[ ]?\/?>/g, "");
    value = value.replace(/<\/div>/g, "");
    options.forEach((option) => {
      const optionRegExp = new RegExp(getSnippetHTML(option), "g");
      value = value.replace(optionRegExp, option.value);
      const fallbackRegExp = new RegExp(
        (getSnippetHTML(option) || "").replace(/&nbsp;/g, ""),
        "g"
      );
      value = value.replace(fallbackRegExp, option.value);
    });

    value = value.replace(/&nbsp;/g, " ");
    return value.trim();
  };

  const updateValueHTML = () => {
    if (wrapperRef.current) {
      let innerHTML = value;
      options.forEach((option) => {
        const optionRegExp = new RegExp(option.value, "g");
        innerHTML = innerHTML.replace(optionRegExp, getSnippetHTML(option));
      });

      innerHTML = innerHTML.split("\n");
      let finalHTML = "";
      innerHTML.length > 0 &&
        value !== "" &&
        innerHTML.forEach((line) => {
          finalHTML += `<div>${line}</div>`;
        });

      wrapperRef.current.innerHTML = finalHTML;
    }
    // eslint-disable-next-line
  };

  const debouncedOnchange = useCallback(
    debounce(() => {
      onChange(getValue());
    }, 100),
    [onChange]
  );

  useEffect(() => {
    if (value && !state.hasValue) {
      setState(prevState => {
        updateValueHTML();
        return {
          ...prevState,
          hasValue: true,
        }
      })
    }
    // if (value && !hasValue) {
    //   hasValue = true;
    //   updateValueHTML()
    // }
    // return () => {
    //   hasValue = false;
    // }
    // updateValueHTML()
    // eslint-disable-next-line
  }, [value]);
  return (
    <>
      <SnippetView
        handleFocus={handleFocus}
        label={label}
        wrapperRef={wrapperRef}
        options={options}
        addSnippet={addSnippet}
        isFocused={isFocused}
        passedClasses={passedClasses}
        debouncedOnchange={debouncedOnchange}
      />
    </>
  );
};

export default SnippetField;
