import { useState } from "react";

function useStorage(itemKey, initialValue) {
    const [state, setState] = useState(() => {
        const prevState = localStorage.getItem(itemKey);
        return prevState ? JSON.parse(prevState) : JSON.stringify(initialValue);
    });

    const changeState = (newValue) => {
        setState(newValue);
        localStorage.setItem(itemKey, JSON.stringify(newValue));
    };

    return [state, changeState];
};

export default useStorage;