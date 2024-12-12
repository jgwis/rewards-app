import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchTypeahead = ({
  data,
  onSearchSelect,
  placeholder,
  defaultValue,
}) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue || '');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredOptions([]);
      return;
    }

    const matches = data.filter(
      (item) =>
        item.customerName.toLowerCase().includes(value.toLowerCase()) ||
        String(item.customerId).includes(value),
    );
    setFilteredOptions(matches);
  };

  const handleOptionSelect = (option) => {
    setSearchTerm(option.customerName);
    onSearchSelect(option);
    setFilteredOptions([]); // Clear dropdown after selection
  };

  return (
    <div className="search-typeahead">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || 'Search...'}
        value={searchTerm}
        onChange={handleInputChange}
      />
      {filteredOptions.length > 0 && (
        <ul className="dropdown-menu dropdown-list show">
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option)}>
              <span className="dropdown-item">
                {option.customerName} ({option.customerId})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchTypeahead.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
};

export default SearchTypeahead;
