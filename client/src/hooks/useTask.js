import { useCallback, useState } from "react";

function useTask() {
    const [tasks, setTasks] = useState([]);
    const api = import.meta.env.VITE_API_URL;

    // GET TASKS
    const getTasks = useCallback(async() => {
        try {
            const response = await fetch(`${api}/tasks`);
            const obj = await response.json();
            setTasks(obj);
        } catch(err) {
            console.error(err);
        };
    }, [api]);

    // ADD TASK
    const addTask = useCallback(async(newTask) => {
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
    }, [api, tasks]); 

    // UPDATE TASK
    const updateTask = async(id, updatedTask) => {

    };

    // REMOVE TASK
    const removeTask = async(id) => {

    };

    return { getTasks, addTask, updateTask, removeTask, tasks }; 
};

export default useTask;