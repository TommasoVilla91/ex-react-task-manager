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
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        };
        try {
            const response = await fetch(`${api}/tasks`, options);
            const obj = await response.json();
            console.log(obj);
            if (obj.success === true) {
                setTasks([...tasks, obj.task]);
            } else {
                throw new Error("Qualcosa è andato storto!");
            }
        } catch(err) {
            console.error(err);
        };
    };

    const updateTask = async(id, updatedTask) => {

    };

    const removeTask = async(id) => {

    };

    return { getTasks, addTask, updateTask, removeTask, tasks }; 
};

export default useTask;