import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";

function TaskList() {

    const { tasks } = useGlobalContext();
    const [sortBy, setSortBy] = useState('cratedAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const queryRef = useRef('');

    function debounce(func, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(value);
            }, delay);
        };
    };

    // ora uso lo stato per la ricerca e associo il valore di queryRef.current.value a searchQuery
    const handleSearch = useCallback(debounce((query) => {
        setSearchQuery(query);
    }, 300), []);

    // imposta l'ordine di ordinamento in base alla colonna
    const handleSort = (column) => {
        sortBy === column ? setSortOrder(-sortOrder) : setSortBy(column) && setSortOrder(1);
    };

    // memorizza l'ordine in base alla colonna e all'input della ricerca
    const newOrder = useMemo(() => {    
        const filteredTasks = tasks.filter(task => {
            const title = task.title.toLowerCase();
            const status = task.status.toLowerCase();
            const date = new Date(task.createdAt).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const query = queryRef.current.value.trim().toLowerCase();
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
            return [...filteredTasks].sort((a, b) => sortOrder * new Date(a.createdAt) - new Date(b.createdAt));
        };
    // alle diepndenze aggiungo anche searchQuery perchè se cambia il valore queryRef a cui è associato, viene eseguita la funzione
    }, [tasks, sortBy, sortOrder, searchQuery]);

    return (
        <>
            <section>
                <div className="container center search-area">
                    <input 
                        type="text"
                        ref={queryRef}
                        // uso handleSearch per prendere il valore inserito nella ricerca
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Cerca una task"
                    />
                </div>
            </section>
            <section className="center">
                <div className="container center">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('title')}>Nome</th>
                                <th onClick={() => handleSort('status')}>Stato</th>
                                <th onClick={() => handleSort('createdAt')}>Data</th>
                            </tr>
                        </thead>
                        {newOrder.map(task => (
                            <TaskRow
                                key={task.id}
                                t={task}
                            />
                        ))}
                        
                    </table>
                </div>
            </section>
        </>
    )
};

export default TaskList;