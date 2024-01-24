import React, { useState } from 'react';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface TypeaheadProps {
  onSelect: (user: User) => void;
}

const Typeahead: React.FC<TypeaheadProps> = ({ onSelect }) => {
  const [options, setOptions] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadOptions = async (inputValue: string) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${inputValue}`);
      const users = await response.json();
      setOptions(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (inputValue: string) => {
    loadOptions(inputValue);
  };

  const handleChange = (selectedOption: User | null) => {
    setSelectedUser(selectedOption);
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  const formatOptionLabel = (user: User, { inputValue, context }: any) => {
    if (!inputValue) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`https://placekitten.com/30/30?image=${user.id}`}  // Placeholder image URL (replace with your own)
            alt={`Avatar for ${user.name}`}
            style={{ marginRight: '10px', borderRadius: '50%', width: '30px', height: '30px' }}
          />
          <span>{`${user.name} (${user.username})`}</span>
        </div>
      );
    }

    const inputValueToLowerCase = inputValue.toLowerCase();
    const nameMatchIndex = user.name.toLowerCase().indexOf(inputValueToLowerCase);
    const usernameMatchIndex = user.username.toLowerCase().indexOf(inputValueToLowerCase);
    
    if (nameMatchIndex === -1 && usernameMatchIndex === -1) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`https://placekitten.com/30/30?image=${user.id}`}  // Placeholder image URL (replace with your own)
            alt={`Avatar for ${user.name}`}
            style={{ marginRight: '10px', borderRadius: '50%', width: '30px', height: '30px' }}
          />
          <span>{`${user.name} (${user.username})`}</span>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={`https://placekitten.com/30/30?image=${user.id}`}  // Placeholder image URL (replace with your own)
          alt={`Avatar for ${user.name}`}
          style={{ marginRight: '10px', borderRadius: '50%', width: '30px', height: '30px' }}
        />
        <span>
          {`${user.name.slice(0, nameMatchIndex)}`}
          <strong style={{ color: 'blue' }}>
            {`${user.name.slice(nameMatchIndex, nameMatchIndex + inputValue.length)}`}
          </strong>
          {`${user.name.slice(nameMatchIndex + inputValue.length)} `}
        </span>
        <span>
          {`(${user.username.slice(0, usernameMatchIndex)}`}
          <strong style={{ color: 'blue' }}>
            {`${user.username.slice(usernameMatchIndex, usernameMatchIndex + inputValue.length)}`}
          </strong>
          {`${user.username.slice(usernameMatchIndex + inputValue.length)})`}
        </span>
      </div>
    );
  };

  const DropdownIndicator = () => {
    return <FaSearch />;
  };

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <Select
        options={options}
        isClearable
        isSearchable
        onInputChange={handleInputChange}
        onChange={handleChange}
        getOptionLabel={(user) => `${user.name} (${user.username})`}
        getOptionValue={(user) => user.id.toString()}
        placeholder="Search for a user..."
        value={selectedUser}
        formatOptionLabel={formatOptionLabel}
        components={{ DropdownIndicator }}
        styles={{
          control: (provided) => ({
            ...provided,
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: 'none',
            minHeight: '38px',
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
};

export default Typeahead;
