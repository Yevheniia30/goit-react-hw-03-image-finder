// import axios from 'axios';
import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';

import { getImagesReq } from 'services/api';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchQuery: '',
    error: null,
    page: 1,
    isModalImage: '',
    isAltModalImage: '',
    total: 0,
  };

  // componentDidMount() {
  // this.getImages();
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page < this.state.page
    ) {
      // console.log('new searrch', prevState, this.state);
      this.getImages();
    }
  }

  getImages = async () => {
    const { searchQuery, page } = this.state;
    this.setState({
      isLoading: true,
    });
    try {
      const data = await getImagesReq({ searchQuery, page });

      // console.log('response', data.hits);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        // page: prevState.page + 1,
        total: data.totalHits,
      }));

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  onSubmit = query => {
    // console.log('query', query);
    if (query === this.state.searchQuery) {
      return;
    }
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  onLoadClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    // this.getImages();
  };

  onOpenModal = id => {
    const currentImage = this.state.images.find(item => item.id === id);
    // console.log('currentImage', currentImage);
    this.setState({
      isModalImage: currentImage.largeImageURL,
      isAltModalImage: currentImage.tags,
      // isModalImage: e.target.dataset.modal,
    });
  };

  onCloseModal = () => {
    this.setState({
      isModalImage: '',
      isAltModalImage: '',
    });
  };

  render() {
    // console.log('images', this.state.images);
    const { images, isLoading, error, isModalImage, isAltModalImage, total } =
      this.state;
    const { onSubmit, onOpenModal, onLoadClick, onCloseModal } = this;
    // console.log('searchquery', this.state.searchQuery);
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={onSubmit} />
        {error ? (
          <h2>Oops something went wrong...try again</h2>
        ) : (
          <ImageGallery data={images} onClickToOpenModal={onOpenModal} />
        )}
        {images.length && !isLoading && images.length < total ? (
          <Button onClick={onLoadClick} />
        ) : null}
        {isLoading && <Loader />}
        {isModalImage && (
          <Modal
            // image={isModalImage}
            // altImage={isAltModalImage}
            onClose={onCloseModal}
          >
            <img src={isModalImage} alt={isAltModalImage} />
          </Modal>
        )}
      </div>
    );
  }
}
