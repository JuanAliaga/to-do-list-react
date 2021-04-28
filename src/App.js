import { useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid'
import './App.css';
import Task from './components/Task';

function App() {
  const [title,setTitle] = useState('');
  const [tasks,setTasks] = useState([])
  const [isEditing,setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  const addTask =()=>{
      const createTask={
      id: uuid(),
      title: title,
      }
      if(title){
        const tasksCopy = [...tasks];
        tasksCopy.unshift(createTask);
        setTasks(tasksCopy);
        localStorage.removeItem('@tasks');
        localStorage.setItem("@tasks",JSON.stringify(tasksCopy));
        setTitle("");
      }
  }


 function saveUpdatedTask(){
   const newTasks = tasks.filter((task)=> task.id !== editingId);
   newTasks.unshift({id:editingId,title:title});
   setIsEditing(false);  
   setTasks(newTasks);
   localStorage.removeItem('@tasks');
   localStorage.setItem("@tasks",JSON.stringify(newTasks));    
   setTitle("");
   setEditingId("");
 }
 

 function updateTask(){
  const localTasks = localStorage.getItem('@tasks');
  if(!!localTasks){
    setTasks(JSON.parse(localTasks));
  }
  }
  
 function editTask(id){
   
   const taskEdit = tasks.filter((task)=> task.id === id)[0];
   setTitle(taskEdit.title);
   console.log(title)
   setEditingId(taskEdit.id);
   setIsEditing(true);
 }

 useEffect(()=>{
  updateTask();
 },[])

 function deleteTask(id) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    localStorage.removeItem('@tasks');
    localStorage.setItem("@tasks",JSON.stringify(filteredTasks));    
    setTasks(filteredTasks);
  }

  return (
    <div className="app">
      <div>
        <h3>TO DO LIST</h3>
      </div>
      <div className="input-container">
        <input type="text" placeholder="Adicione uma tarefa" value={title} onChange={event =>setTitle(event.target.value)}></input>
        <button className="btn-add" onClick={isEditing ? saveUpdatedTask : addTask}>{isEditing ? "ATUALIZAR" : "ADICIONAR"} </button>
      </div>
      <div className="tasks-container">
        {tasks.map((task)=>(
            <Task task={task} deleteTask={deleteTask} editTask={editTask} key={task.id}/>
            
          
        ))}
        

      </div>
      
      
    </div>
  );
}

export default App;
