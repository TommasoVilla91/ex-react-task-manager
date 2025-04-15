import { useState } from "react";

function useTask() {
    const [tasks, setTasks] = useState([]);
    const api = import.meta.env.VITE_API_URL;

    // GET TASKS
    const getTasks = async() => {
        try {
            const response = await fetch(`${api}/tasks`);
            const obj = await response.json();
            setTasks(obj);
        } catch(err) {
            console.error(err);
        };
    };

    // ADD TASK
    const addTask = async(newTask) => {
        const existingTask = tasks.some(task => task.title === newTask.title);
        if(existingTask) {
            throw new Error("Esiste già una task con questo titolo!");
        };

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

    // UPDATE TASK
    const updateTask = async(id, updatedTask) => {
        const sameTitle = tasks.find(task => task.title === updatedTask.title);
        if(sameTitle && sameTitle.id !== updatedTask.id) {
            throw new Error("Esiste già una task con questo titolo!");
        };

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
    };

    // REMOVE TASK
    const removeTask = async(id) => {
        const options = {
            method: "DELETE"
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
    };

    // REMOVE MULTIPLE TASKS
    const removeMultipleTasks = async(ids) => {
        console.log(ids);
        
        const deleteRequests = ids.map(id => {
            fetch(`${api}/tasks/${id}`, { method: "DELETE" })
            .then(res => res.json())
        });

        const results = await Promise.allSettled(deleteRequests);

        console.log(results);

        const fullfilledDeletions = [];
        const rejectedDeletions = [];

        results.forEach((result, i) => {
            const taskId = ids[i];
            if(result.status === "fulfilled" && result.value.success) {
                fullfilledDeletions.push(taskId);
            } else {
                rejectedDeletions.push(taskId);
            };
        });

        if(fullfilledDeletions.length > 0) {
            setTasks(prev => prev.filter(task => !fullfilledDeletions.includes(task.id)));
        };

        if(rejectedDeletions.length > 0) {
            throw new Error(`Errore durante l'eliminazione delle task ${rejectedDeletions.join(", ")}!`);
        };
    };

    return { getTasks, addTask, updateTask, removeTask, removeMultipleTasks, tasks }; 
};

export default useTask;