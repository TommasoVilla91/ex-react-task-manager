import { useMemo, useState } from "react";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";

function TaskList() {

    const { tasks } = useGlobalContext();
    const [sortBy, setSortBy] = useState('cratedAt');
    const [sortOrder, setSortOrder] = useState(1);

    const handleSort = (column) => {
        sortBy === column ? setSortOrder(-sortOrder) : setSortBy(column) && setSortOrder(1);
    };

    const newOrder = useMemo(() => {        
        if (sortBy === 'title') {
            return [...tasks].sort((a, b) => sortOrder * a.title.localeCompare(b.title));
        } else if (sortBy === 'status') {
            return [...tasks].sort((a, b) => {
                const statusOrder = {
                    'To do': 1,
                    'Doing': 2,
                    'Done': 3
                }
                return sortOrder * (statusOrder[a.status] - statusOrder[b.status]);
            });
        } else {
            return [...tasks].sort((a, b) => sortOrder * new Date(a.createdAt) - new Date(b.createdAt));
        };
    }, [tasks, sortBy, sortOrder]);

    return (
        <>
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