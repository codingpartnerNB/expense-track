import React from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props)=>{
    return (<div className={styles.backdrop} onClick={props.onHideForm} />)
}

const ModalOverlay = (props) =>{
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const Modal = (props)=>{
    return(
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onHideForm={props.onHideForm} />, document.getElementById('overlay'))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlay'))}
        </React.Fragment>
    )
}

export default Modal;