import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos") 
    if(todoString){
      let todos = JSON.parse(todoString) 
      setTodos(todos)
    }
  },[])

  const saveToLS = () => { 
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  } 

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo('')
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar/>
      <div className=" md:container md:w-3/4 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-full">
      <h1 className='font-bold text-center text-xl'>My ToDo's - Task  Manager</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-xl px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-yellow-200 hover:bg-violet-800 disabled:bg-violet-400 p-1 py-1 text-sm font-bold text-white rounded-md mx-1'>Add</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
          <h1 className='text-lg font-bold'>Your Todos</h1>
          <div className="todos">
            {todos.length === 0 && <div className="text-center">No Tasks right now</div>}
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-3/4 my-3 justify-between">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" /> {}
              <div className={item.isCompleted?"line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-yellow-300 hover:bg-violet-800 p-1 py-1 text-lg font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-500 hover:bg-violet-800 p-1 py-1 text-lg font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
            })}
          </div>
        </div>
    </>
  )
}
export default App