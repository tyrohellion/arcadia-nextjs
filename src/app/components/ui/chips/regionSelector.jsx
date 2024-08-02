"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { regionFilterFormatter, regionCodes } from "../api/regionMap";
import FilterTag from "../buttons/FilterTag";

const RegionDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
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
    const region = searchParams.get("region");
    if (region) {
      setSelectedRegion(region);
    } else {
      setSelectedRegion(null);
    }
  }, [searchParams]);

  const handleRegionClick = (code) => {
    const params = new URLSearchParams(window.location.search);
    params.set("region", code);
    router.push(`?${params.toString()}`);
    setIsOpen(false);
    setInputValue("");
  };

  const handleRemoveRegion = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("region");
    router.push(`?${params.toString()}`);
    setSelectedRegion(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredRegions = Object.keys(regionCodes).filter((code) => {
    const formatted = regionFilterFormatter(code);
    if (!formatted) {
      console.error(
        `regionFilterFormatter returned undefined for code: ${code}`
      );
    }
    return (
      formatted && formatted.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  return (
    <div ref={dropdownRef} className="region-dropdown">
      <input
        className="dropdown-button"
        type="text"
        value={inputValue}
        onClick={toggleDropdown}
        onChange={handleInputChange}
        placeholder="Region"
      />
      {isOpen && (
        <div className="dropdown-menu">
          {filteredRegions.map((code) => (
            <div
              key={code}
              className="dropdown-item-events"
              onClick={() => handleRegionClick(code)}
            >
              {regionFilterFormatter(code)}
            </div>
          ))}
        </div>
      )}
      <div className="filter-tag-wrapper">
        {selectedRegion && (
          <FilterTag
            text={regionFilterFormatter(selectedRegion)}
            onClick={handleRemoveRegion}
          />
        )}
      </div>
    </div>
  );
};

export default RegionDropdown;
