import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [title,setTitle] = useState('');
  const [tasks,setTasks] = useState([])
  const [tasksSaved,setTasksSaved] = useState([])

  const addTask =()=>{
      const createTask={
      id: Math.random().toString(10).substring(7),
      title: title,
      }
      if(title){
        const tasksCopy = [...tasks];
        tasksCopy.push(createTask);
        console.log(tasksCopy)
        setTasks(tasksCopy);
        setTitle("");
      }
      saveTasks(tasks);
      console.log(tasks)
  }

    const saveTasks =(tasks)=>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTask();
 }

 const updateTask=()=>{
  setTasksSaved(JSON.parse(localStorage.getItem('tasks')));
 }

 useEffect(()=>{
   updateTask();
 },[tasks])

 function deleteTask(id) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    localStorage.removeItem('tasks');
    setTasks(filteredTasks);
    saveTasks(tasks);
  }

  return (
    <div className="app">
      <div>
        <h3>TO DO LIST</h3>
      </div>
      <div className="input-container">
        <input type="text" placeholder="Adicione uma tarefa" value={title} onChange={event =>setTitle(event.target.value)}></input>
        <button className="btn-add"onClick={addTask}>ADICIONAR</button>
      </div>
      <div className="tasks-container">
        {tasksSaved.map((task)=>(
            <div className="task row" key={task.id}>
              <div><p>{task.title}</p></div>
              <div><button className="btn-cancel" onClick={()=>deleteTask(task.id)}>X</button></div>
            
          </div>
        ))}
        

      </div>
      
      
    </div>
  );
}

export default App;
