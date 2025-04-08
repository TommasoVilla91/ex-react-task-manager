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
    const updateTask = useCallback(async(id, updatedTask) => {
        const options ={
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        };
        try {
            const res = await fetch(`${api}/tasks/${id}`, options);
            const obj = await res.json();
            if(obj.success === true) {
                setTasks(tasks.map(task => task.id === id ? {...task, ...updatedTask} : task));
            } else {
                throw new Error("Qualcosa è andato storto!");
            }
        } catch(err) {
            console.error(err);
        }
    }, [api, tasks]);

    // REMOVE TASK
    const removeTask = useCallback(async(id) => {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        try{
            const res = await fetch(`${api}/tasks/${id}`, options);
            const obj = await res.json();
            if (obj.success === true) {
                setTasks(tasks.filter(task => task.id !== id));
            } else {
                throw new Error("Qualcosa è andato storto!");
            }
        } catch(err) {
            console.error(err);
        };
    }, [api, setTasks]);

    return { getTasks, addTask, updateTask, removeTask, tasks }; 
};

export default useTask;