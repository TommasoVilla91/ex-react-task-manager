import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const api = import.meta.env.VITE_API_URL;
    const [tasks, setTasks] = useState([]);

    const getTasks = async() => {
        try {
            const response = await fetch(`${api}/tasks`);
            const obj = await response.json();
            setTasks(obj);
        } catch(err) {
            console.error(err);
        };
    };

    useEffect(() => {
        console.log(getTasks());
    }, []);
    
    const providerValue = {
        api,
        tasks
    };

    return <GlobalContext.Provider value={providerValue}>{children}</GlobalContext.Provider>
};

function useGlobalContext() {
    return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };