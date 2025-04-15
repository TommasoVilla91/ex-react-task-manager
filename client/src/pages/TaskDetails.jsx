import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

function TaskDetails() {

  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useGlobalContext();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const singleTask = tasks.find(task => task.id === parseInt(id));

  const handleRemoveTask = async (id) => {
    try {
      await removeTask(id);
      if(singleTask) {
        alert("Task eliminato con successo!");
        setShow(false);
        navigate("/");
      }
    } catch(error) {
      console.error(error);
      alert("Task non trovato!");
    };
  };

  const handleUpdateTask = async (task) => {
    try {
      await updateTask(task.id, task);
      if(singleTask) {
        alert("Task aggiornato con successo!");
        setShow(false);
      } 
    } catch(error) {
      console.error(error);
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
            <div className="card-footer">
              <button className="delete" onClick={() => setShow(true)}>Elimina task</button>
              <button className="modify" onClick={() => setShowEdit(true)}>Modifica task</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Modal 
          title="Conferma eliminazione"
          constent="Sei sicuro di voler eliminare questa task?"
          show={show}
          onClose={() => {setShow(false)}}
          onConfirm={() => {handleRemoveTask(singleTask.id)}}
          confirmText="Conferma"
        />

        <EditTaskModal 
          showEdit={showEdit}
          onClose={() => {setShowEdit(false)}}
          task={singleTask}
          onSave={(task) => {handleUpdateTask(task)}}
        />
      </section>
    </div>
  );
};

export default TaskDetails;