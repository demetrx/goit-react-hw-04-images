import { useState } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Searchbar onSubmit={setQuery} />
      <ImageGallery query={query} />
    </>
  );
};
