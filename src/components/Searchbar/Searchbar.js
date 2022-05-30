import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';

import {
  SearchbarStyled,
  SearchForm,
  Button,
  Input,
  Label,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() !== '') {
      onSubmit(query);
      setQuery('');
    }
  };

  const handleInput = e => {
    setQuery(e.target.value);
  };

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={handleSubmit}>
        <Button type="submit">
          <BsSearch />
          <Label>Search</Label>
        </Button>

        <Input
          onChange={handleInput}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyled>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
