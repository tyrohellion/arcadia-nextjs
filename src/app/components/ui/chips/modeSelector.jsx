import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { modeFilterFormatter, modeCodes } from "../api/ModeFilterMap";
import FilterTag from "../buttons/FilterTag";

const ModeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedMode, setSelectedMode] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode) {
      setSelectedMode(mode);
    } else {
      setSelectedMode(null);
    }
  }, [searchParams]);

  const handleModeClick = (code) => {
    const params = new URLSearchParams(window.location.search);
    params.set("mode", code);
    router.push(`?${params.toString()}`);
    setIsOpen(false);
    setInputValue("");
  };

  const handleRemoveMode = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("mode");
    router.push(`?${params.toString()}`);
    setSelectedMode(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredModes = Object.keys(modeCodes).filter((code) => {
    const formatted = modeFilterFormatter(code);
    if (!formatted) {
      console.error(`modeFilterFormatter returned undefined for code: ${code}`);
    }
    return (
      formatted && formatted.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  return (
    <>
      <div ref={dropdownRef} className="mode-dropdown">
        <input
          className="dropdown-button"
          type="text"
          value={inputValue}
          onClick={toggleDropdown}
          onChange={handleInputChange}
          placeholder="Mode"
        />
        {isOpen && (
          <div className="dropdown-menu">
            {filteredModes.map((code) => (
              <div
                key={code}
                className="dropdown-item-events"
                onClick={() => handleModeClick(code)}
              >
                {modeFilterFormatter(code)}
              </div>
            ))}
          </div>
        )}
        <div className="filter-tag-wrapper">
          {selectedMode && (
            <FilterTag
              text={modeFilterFormatter(selectedMode)}
              onClick={handleRemoveMode}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ModeDropdown;
