import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { qualFilter, qualCodes } from "../api/sortQualTag";
import FilterTag from "../buttons/FilterTag";

const QualDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedSort, setSelectedSort] = useState(null);
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
    const sort = searchParams.get("qualifier");
    if (sort) {
      setSelectedSort(decodeURIComponent(sort));
    } else {
      setSelectedSort(null);
    }
  }, [searchParams]);

  const handleSortClick = (code) => {
    const params = new URLSearchParams(window.location.search);
    params.set("qualifier", encodeURIComponent(code));
    router.push(`?${params.toString()}`);
    setIsOpen(false);
    setInputValue("");
  };

  const handleRemoveSort = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("qualifier");
    router.push(`?${params.toString()}`);
    setSelectedSort(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredSort = Object.keys(qualCodes).filter((code) => {
    const formatted = qualFilter(code);
    if (!formatted) {
      console.error(`qualFilter returned undefined for code: ${code}`);
    }
    return (
      formatted && formatted.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  return (
    <>
      <div ref={dropdownRef} className="sort-dropdown">
        <input
          className="dropdown-button"
          type="text"
          value={inputValue}
          onClick={toggleDropdown}
          onChange={handleInputChange}
          placeholder="Qualifier"
        />
        {isOpen && (
          <div className="dropdown-menu">
            {filteredSort.map((code) => (
              <div
                key={code}
                className="dropdown-item-events"
                onClick={() => handleSortClick(code)}
              >
                {qualFilter(code)}
              </div>
            ))}
          </div>
        )}
        <div className="filter-tag-wrapper">
          {selectedSort && (
            <FilterTag
              text={qualFilter(selectedSort)}
              onClick={handleRemoveSort}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default QualDropdown;
