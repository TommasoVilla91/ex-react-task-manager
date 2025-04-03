import { useState } from "react";

function useTask() {
    const [tasks, setTasks] = useState([]);
    const api = import.meta.env.VITE_API_URL;

    const getTasks = async() => {
        try {
            const response = await fetch(`${api}/tasks`);
            const obj = await response.json();
            setTasks(obj);
        } catch(err) {
            console.error(err);
        };
    };

    const addTask = async(newTask) => {
    
    };

    const updateTask = async(id, updatedTask) => {

    };

    const removeTask = async(id) => {

    };

    return { getTasks, addTask, updateTask, removeTask, tasks }; 
};

export default useTask;