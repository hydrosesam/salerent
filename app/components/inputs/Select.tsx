import React, { useState } from "react";

interface SelectProps {
  id: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ id, options, value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(true);
  };

  const handleOptionSelect = (selectedValue: string) => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      setSelectedItem(selectedOption.label);
      setSearchTerm("");
      setIsDropdownOpen(false);
      onChange(selectedValue);
    }
  };

  return (
    <div className="flex flex-col relative">
      <input
        type="text"
        placeholder="Search..."
        value={selectedItem || searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
        className="border-[2px] p-3 pt-5 pb-5 relative appearance-none text-gray-500"
      />
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {filteredOptions.map((item) => (
            <div
              key={item.value}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionSelect(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
