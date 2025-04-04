import { useMemo, useRef, useState } from "react";

function AddTask() {
    const [title, setTitle] = useState('');
    const descriptionRef = useRef();
    const statusRef = useRef("To do");

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

    const titleValidation = useMemo(() => {
        const charValid = title.split('').some((char) => symbols.includes(char));
        return charValid;
    }, [title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !descriptionRef || !statusRef) {
            alert("Compila tutti i campi!");         
        } else {
            const task = {
                titolo: `${title}`,
                descrizione: `${descriptionRef.current.value}`,
                stato: `${statusRef.current.value}`
            };
            console.log(task);
        };
    };

    return (
        <div>
            <section className="add-task">
                <h2>Aggiungi una task</h2>
                <form onSubmit={handleSubmit}>

                    <label className="title">
                        <h4>Titolo</h4>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Titolo"
                        />
                        <p style={{color: "red"}}>
                            {titleValidation && "Il titolo non può contere caratteri speciali o simboli"}
                        </p>
                    </label>

                    <label className="description">
                        <h4>Descrizione</h4>
                        <textarea 
                            ref={descriptionRef}
                            placeholder="Descrizione">
                        </textarea>
                    </label>

                    <label className="status">
                        <h4>Stato</h4>
                        <select ref={statusRef}>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>

                    <div>
                        <button type="Submit">Salva</button>
                    </div>

                </form>
            </section>
        </div>
    )
};

export default AddTask;