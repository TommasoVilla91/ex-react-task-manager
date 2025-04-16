import { useMemo, useState, useCallback } from "react";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";

function TaskList() {

    const { tasks, removeMultipleTasks } = useGlobalContext();
    const [sortBy, setSortBy] = useState('cratedAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTasks, setSelectedTasks] = useState([]);

    function debounce(func, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(value);
            }, delay);
        };
    };

    // associo il valore immesso nell'input allo stato della ricerca
    const handleSearch = useCallback(
        debounce(setSearchQuery, 500)
    // array vuoto perchè venga eseguita solo una volta
    , []);

    // imposta l'ordine di ordinamento in base alla colonna
    const handleSort = (column) => {
        sortBy === column ? setSortOrder(-sortOrder) : setSortBy(column) && setSortOrder(1);
    };

    const sortIcon = sortOrder === 1 ? '▼' : '▲';

    // memorizza l'ordine in base alla colonna e all'input della ricerca
    const newOrder = useMemo(() => {    
        const filteredTasks = tasks.filter(task => {
            const title = task.title.toLowerCase();
            const status = task.status.toLowerCase();
            const date = new Date(task.createdAt).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const query = searchQuery.toLowerCase();
            if(query) {
                return title.includes(query) || status.includes(query) || date.includes(query);
            } else {
                return task;
            };
        });

        if (sortBy === 'title') {
            return [...filteredTasks].sort((a, b) => sortOrder * a.title.localeCompare(b.title));
        } else if (sortBy === 'status') {
            return [...filteredTasks].sort((a, b) => {
                const statusOrder = {
                    'To do': 1,
                    'Doing': 2,
                    'Done': 3
                };
                return sortOrder * (statusOrder[a.status] - statusOrder[b.status]);
            });
        } else {
            return [...filteredTasks].sort((a, b) => sortOrder * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
        };
    }, [tasks, sortBy, sortOrder, searchQuery]);

    const handleToggleSelection = (taskId) => {
        // se l'array delle task selez include l'id della task che ho selezionato
        if(selectedTasks.includes(taskId)) {
            // imposto un array che non abbia id uguali
            setSelectedTasks(prev => prev.filter(id => id !== taskId));
        } else {
            // sennò imposto l'array precedente con l'aggiunta del nuovo id
            setSelectedTasks(prev => [...prev, taskId]);
        };
    };

    const handleDeleteSelected = async() => {
        try{
            await removeMultipleTasks(selectedTasks);
            setSelectedTasks([]);
            alert("Task eliminate con successo!");
        } catch(err) {
            console.error(err);
            alert(err.message);
        };
    };

    return (
        <>
            <section>
                <div className="container center search-area">
                    <input 
                        type="text"
                        // uso handleSearch per prendere il valore inserito nella ricerca
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Cerca una task"
                    />
                    {selectedTasks.length > 0 && (
                        <button className="confirm-delete" onClick={handleDeleteSelected}>Elimina selezionati</button>
                    )}
                </div>
            </section>

            <section className="center">
                <div className="container center">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th onClick={() => handleSort('title')}>
                                    Nome {sortBy === 'title' && sortIcon}
                                </th>
                                <th onClick={() => handleSort('status')}>
                                    Stato {sortBy === 'status' && sortIcon}
                                </th>
                                <th onClick={() => handleSort('createdAt')}>
                                    Data {sortBy === 'createdAt' && sortIcon}
                                </th>
                            </tr>
                        </thead>
                        {newOrder.map(task => (
                            <TaskRow
                                key={task.id}
                                t={task}
                                checked={selectedTasks.includes(task.id)}
                                onToggle={handleToggleSelection}
                            />
                        ))}                        
                    </table>
                </div>
            </section>
        </>
    )
};

export default TaskList;