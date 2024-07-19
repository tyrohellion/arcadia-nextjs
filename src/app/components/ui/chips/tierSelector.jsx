import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { tierFilterFormatter, tierCodes } from "../api/TierFilterMap";
import FilterTag from "../buttons/FilterTag";

const TierDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedTier, setSelectedTier] = useState(null);
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
    const tier = searchParams.get("tier");
    if (tier) {
      setSelectedTier(tier);
    } else {
      setSelectedTier(null);
    }
  }, [searchParams]);

  const handleTierClick = (code) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tier", code);
    router.push(`?${params.toString()}`);
    setIsOpen(false);
    setInputValue("");
  };

  const handleRemoveTier = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("tier");
    router.push(`?${params.toString()}`);
    setSelectedTier(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredTiers = Object.keys(tierCodes).filter((code) => {
    const formatted = tierFilterFormatter(code);
    if (!formatted) {
      console.error(`tierFilterFormatter returned undefined for code: ${code}`);
    }
    return (
      formatted && formatted.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  return (
    <>
      <div ref={dropdownRef} className="tier-dropdown">
        <input
          className="dropdown-button"
          type="text"
          value={inputValue}
          onClick={toggleDropdown}
          onChange={handleInputChange}
          placeholder="Tier"
        />
        {isOpen && (
          <div className="dropdown-menu">
            {filteredTiers.map((code) => (
              <div
                key={code}
                className="dropdown-item-events"
                onClick={() => handleTierClick(code)}
              >
                {tierFilterFormatter(code)}
              </div>
            ))}
          </div>
        )}
        <div className="filter-tag-wrapper">
          {selectedTier && (
            <FilterTag
              text={tierFilterFormatter(selectedTier)}
              onClick={handleRemoveTier}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TierDropdown;
