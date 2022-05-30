import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onHide, img, alt }) => {
  const handleKeydown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onHide();
      }
    },
    [onHide]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={img} alt={alt} />
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};
