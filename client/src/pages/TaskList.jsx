import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";

function TaskList() {

    const { tasks } = useGlobalContext();

    return (
        <>
            <section className="center">
                <div className="container center">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Stato</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        {tasks.map(task => (
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