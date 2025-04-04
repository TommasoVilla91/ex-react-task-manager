import { createContext, useContext, useState, useEffect } from "react";
import useTask from "../hooks/useTask";

const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const { getTasks, addTask, updateTask, removeTask, tasks } = useTask();

    useEffect(() => {
        getTasks();
    }, []);

    const providerValue = {
        tasks,
        addTask,
        updateTask,
        removeTask,
        getTasks
    };

    return <GlobalContext.Provider value={providerValue}>{children}</GlobalContext.Provider>
};

function useGlobalContext() {
    return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };