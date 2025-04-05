import React from 'react';
import ReactDOM from 'react-dom';

function Modal({title, content, show, onClose, onConfirm, confirmText}) {

    return show && ReactDOM.createPortal (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{content}</p>
                <div className="modal-bnts">
                    <button className="confirm-delete" onClick={onConfirm}>{confirmText}</button>
                    <button className="close" onClick={onClose}>Chiudi</button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default React.memo(Modal);