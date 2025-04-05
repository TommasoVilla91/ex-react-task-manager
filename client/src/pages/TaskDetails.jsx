import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

function TaskDetails() {

  const { id } = useParams();
  const { tasks, removeTask } = useGlobalContext();
  const navigate = useNavigate();

  const singleTask = tasks.find(task => task.id === parseInt(id));

  const handleRemoveTask = (id) => {
    removeTask(id);
    if(singleTask) {
      alert("Task eliminato con successo!");
      navigate("/");
    } else {
      alert("Task non trovato!");
    };
  };

  return (
    <div>
      <h1 className="details-page-title">Task Details</h1>
      <section>
        <div className="container details-area">
          <div className="card-details">
            <h3 className="card-title">{singleTask.title}</h3>
            <div className="card-body">
              <p>{singleTask.description}</p>
              <p><strong>Stato: </strong>{singleTask.status}</p>
              <p><strong>Creato il: </strong>{new Date(singleTask.createdAt).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            </div>
            <div>
              <button onClick={() => handleRemoveTask(singleTask.id)}>Elimina task</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskDetails;