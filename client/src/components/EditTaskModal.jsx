import React, { useRef, useState } from "react";
import Modal from "./Modal";

function EditTaskModal({showEdit, onClose, task, onSave}) {

    const formRef = useRef();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newData = {...task, title, description, status};
        onSave(newData);
        onClose();
    };

    return (
        <Modal
            show={showEdit}
            title="Modifica Task"
            confirmText="Salva"
            onConfirm={() => formRef.current.requestSubmit()}
            onClose={onClose}
            content={
                <form ref={formRef} onSubmit={handleSubmit}>
                    <label className="title">
                        <h4>Nome</h4>
                        <input 
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label className="description">
                        <h4>Descrizione</h4>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </label>

                    <label className="status">
                        <h4>Stato</h4>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </form>
            } />
    );
};

export default React.memo(EditTaskModal);