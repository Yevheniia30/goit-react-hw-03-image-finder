import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');
const body = document.querySelector('body');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
    // if (this.props.image) {
    body.style.overflow = 'hidden';
    // }
    // if (!isOpen) body.style.overflow = 'auto';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClose);
    body.style.overflow = 'auto';
  }

  handleClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
      return;
    }
    if (e.code === 'Escape') {
      this.props.onClose();
      // return;
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleClose}>
        <div className={s.Modal}>
          {this.props.children}
          {/* <img src={this.props.image} alt={this.props.altImage} /> */}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  // image: PropTypes.string.isRequired,
  // altImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
