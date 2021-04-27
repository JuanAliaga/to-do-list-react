
export default function Task({task,deleteTask,editTask}){
    return(
    <div className="task row" onClick={()=>editTask(task.id)}>
              <div><p>{task.title}</p></div>
              <div><button className="btn-cancel" onClick={(e)=>{
                  e.stopPropagation()
                  deleteTask(task.id)}}>X</button></div>
    </div>
    )
}