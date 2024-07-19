import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { countryCodes, countryFormatter } from "../api/countryFormatter";
import FilterTag from "../buttons/FilterTag";

const CountryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
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
    const country = searchParams.get("country");
    if (country) {
      setSelectedCountry(country);
    } else {
      setSelectedCountry(null);
    }
  }, [searchParams]);

  const handleCountryClick = (code) => {
    router.push(`?country=${code.toLowerCase()}`);
    setIsOpen(false);
    setInputValue("");
  };

  const handleRemoveCountry = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("country");
    router.push(`?${params.toString()}`);
    setSelectedCountry(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredCountries = Object.keys(countryCodes).filter((code) =>
    countryFormatter(code).toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      <div ref={dropdownRef} className="country-dropdown">
        <input
          className="dropdown-button"
          type="text"
          value={inputValue}
          onClick={toggleDropdown}
          onChange={handleInputChange}
          placeholder="Country"
        />
        {isOpen && (
          <div className="dropdown-menu">
            {filteredCountries.map((code) => (
              <div
                key={code}
                className="dropdown-item"
                onClick={() => handleCountryClick(code)}
              >
                {countryFormatter(code)}
              </div>
            ))}
          </div>
        )}
        <div className="filter-tag-wrapper">
          {selectedCountry && (
            <FilterTag
              text={countryFormatter(selectedCountry)}
              onClick={handleRemoveCountry}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CountryDropdown;
