import { useState } from "react";

function useTask() {
    const [tasks, setTasks] = useState([]);
    const api = import.meta.env.VITE_API_URL;

    // GET TASKS
    const getTasks = async () => {
        try {
            const response = await fetch(`${api}/tasks`);
            const obj = await response.json();
            setTasks(obj);

        } catch (err) {
            console.error(err);
        };
    };

    // ADD TASK
    const addTask = async (newTask) => {
        const existingTask = tasks.some(task => task.title === newTask.title);
        if (existingTask) {
            throw new Error("Esiste già una task con questo titolo!");
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        };
        const response = await fetch(`${api}/tasks`, options);
        const obj = await response.json();
        console.log(obj);
        if (obj.success === true) {
            setTasks(prev => [...prev, obj.task]);
        } else {
            throw new Error("Qualcosa è andato storto!");
        };
    };

    // UPDATE TASK
    const updateTask = async (id, updatedTask) => {
        const sameTitle = tasks.find(task => task.title === updatedTask.title);
        if (sameTitle && sameTitle.id !== updatedTask.id) {
            throw new Error("Esiste già una task con questo titolo!");
        };

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        };
        const res = await fetch(`${api}/tasks/${id}`, options);
        const obj = await res.json();
        if (obj.success === true) {
            // dall'array precedente controllo che la vecchia task abbia lo stesso id di quella nuova
            // se si, ritorno quella nuova sennò lascio la vecchia
            setTasks(prev => prev.map(oldTask => oldTask.id === obj.task.id ? obj.task : oldTask));
        } else {
            throw new Error("Qualcosa è andato storto!");
        };
    };

    // REMOVE TASK
    const removeTask = async (id) => {
        const options = {
            method: "DELETE"
        };
        const res = await fetch(`${api}/tasks/${id}`, options);
        const obj = await res.json();
        if (obj.success === true) {
            // dall'array precedente prendo tutti gli elementi con id diverso da quello in questione
            setTasks(prev => prev.filter(task => task.id !== id));
        } else {
            throw new Error("Qualcosa è andato storto!");
        };
    };

    // REMOVE MULTIPLE TASKS
    const removeMultipleTasks = async (ids) => {
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
            if (result.status === "fulfilled" && result.value.success) {
                fullfilledDeletions.push(taskId);
            } else {
                rejectedDeletions.push(taskId);
            };
        });

        if (fullfilledDeletions.length > 0) {
            setTasks(prev => prev.filter(task => !fullfilledDeletions.includes(task.id)));
        };

        if (rejectedDeletions.length > 0) {
            throw new Error(`Errore durante l'eliminazione delle task ${rejectedDeletions.join(", ")}!`);
        };
    };

    return { getTasks, addTask, updateTask, removeTask, removeMultipleTasks, tasks };
};

export default useTask;