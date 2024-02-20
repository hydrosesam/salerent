import React, { useState } from "react";
import Select from "react-select";

interface SelectProps {
  id: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}

const Select1: React.FC<SelectProps> = ({ id, options, value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const handleChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  return (
    <div className="flex flex-col relative">
      <Select
        placeholder="Search..."
        value={selectedOption} // Set the selected value
        options={options} // Set the options
        onChange={handleChange} // Handle selection change
      />
    </div>
  );
};

export default Select1;
