import React,{useState} from 'react'


export const TodoForm = ({addTodo}) => {
    const[value, setValue] = useState("")

    function handleSubmit(e) {
        e.preventDefault();

        addTodo(value)
        
        setValue("")
    }

  return (
    <form className='TodoForm' >
        <input type="text" className='todo-input' placeholder="What's the task today?" value={value} onChange={(e) => setValue(e.target.value)} />
        <button type='submit' className='todo-btn' onClick={handleSubmit}  >Add Task</button>
    </form>
  )
}
