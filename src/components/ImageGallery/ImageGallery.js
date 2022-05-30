import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';
import Modal from 'components/UI/Modal/Modal';

import pixabayAPI from '../../services/pixabay-api';
import { ImageGalleryStyled } from './ImageGallery.styled';

const ImageGallery = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImg, setLargeImg] = useState(null);
  const [items, setItems] = useState([]);

  const searchQuery = useRef('');

  useEffect(() => {
    if (query === '') {
      return;
    }

    setPage(1);
    setItems([]);
    searchQuery.current = query;
    setLoading(true);
  }, [query]);

  useEffect(() => {
    if (searchQuery.current === '' || !loading) {
      return;
    }

    pixabayAPI
      .fetchImages(searchQuery.current, page)
      .then(data => setItems(prevItems => [...prevItems, ...data.hits]))
      .finally(() => {
        setLoading(false);
      });
  }, [page, loading]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
  };

  const handleImgClick = img => {
    setLargeImg(img);
  };

  const handleModalClose = () => {
    setLargeImg(null);
  };

  return (
    <div>
      <ImageGalleryStyled id="gallery">
        {items.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            onClick={handleImgClick}
            key={id}
            small={webformatURL}
            large={largeImageURL}
            alt={query}
          />
        ))}
      </ImageGalleryStyled>

      {loading && <Loader />}

      {items.length > 0 && !loading && (
        <Button onClick={handleLoadMore} label="Load more" />
      )}

      {largeImg && (
        <Modal img={largeImg} alt={query} onHide={handleModalClose} />
      )}
    </div>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string,
};
