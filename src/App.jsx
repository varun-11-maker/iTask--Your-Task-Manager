import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item=>{
      return item.id!==id
    }));
    setTodos(newTodos)
  }
  const handleDelete = (e,id) => {
    let newTodos = todos.filter((item=>{
      return item.id!==id
    }));
    setTodos(newTodos)
  }
  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(),todo, isCompleted: false }])
    setTodo("")
  }
  const handleChange = (e) => {
    // setTodos([...todos, {todo, isCompleted: false}])
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white font-bold rounded-md mx-6'>Add</button>
        </div>
        {/* <div className="bg-violet-100"> */}
          <h2 className="text-lg font-bold">Your todos</h2>
          <div className="todos">
            {todos.length===0&&<div className='m-5'>No Todos to display</div>}
            {todos.map(item => {
              return <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
                <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted?"line-through":"npm install uuid"}>{item.todo}</div>
                </div>
                <div className="buttons">
                  <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white font-bold rounded-md mx-1'>Edit</button>
                  <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white font-bold rounded-md mx-1'>Delete</button>
                </div>
              </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
