import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export const ImageGalleryItem = ({ item, onClickToOpenModal }) => {
  // console.log('item', item);
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => onClickToOpenModal(item.id)}
    >
      <img
        className={s.ImageGalleryItem_image}
        src={item?.webformatURL}
        alt={item?.tags}
        data-modal={item?.largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
