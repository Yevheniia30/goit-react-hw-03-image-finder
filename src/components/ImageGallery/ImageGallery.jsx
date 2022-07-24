import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ data, onClickToOpenModal }) => {
  // console.log('data', data);
  return (
    <ul className={s.ImageGallery}>
      {data.map(item => (
        <ImageGalleryItem
          key={item.id}
          item={item}
          onClickToOpenModal={onClickToOpenModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onClickToOpenModal: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
