import { useState } from 'react';

export const useAccordion = () => {
  const [expandedBanks, setExpandedBanks] = useState({});

  const toggleBank = (bankIndex) => {
    setExpandedBanks(prev => ({
      ...prev,
      [bankIndex]: !prev[bankIndex]
    }));
  };

  const isExpanded = (bankIndex) => {
    return expandedBanks[bankIndex] || false;
  };

  return {
    expandedBanks,
    toggleBank,
    isExpanded
  };
};