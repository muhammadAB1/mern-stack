import { useState, useEffect } from 'react'

function App() {
  const api = 'https://mern-stack-gray.vercel.app'

  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState('')
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = () => {
    fetch(api + '/todos')
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error('error', err))
  }

  const completeTodo = async id => {
    const data = await fetch(api + '/todo/complete/' + id)
    .then(res => res.json())
    setTodos(todos => todos.map(todo => {
      if(todo._id === data._id){
        todo.complete = data.complete;
      }
      return todo;
    }));
  }
  
  const deleteTodo = async id => {
    try{
    const data = await fetch(api + '/todo/delete/' + id, {method: 'DELETE'})
    .then(res => res.json())
    setTodos(todos => todos.filter(todo => todo._id !== id))
    } catch (e){
      console.error(e)
    }
  }

  const addTodo = async () =>{
    const data = await fetch(api + '/todo/new', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json());
    setTodos([...todos, data])
    setPopupActive(false)
    setNewTodo('')
  }

  return (
    <div className="App">
      <h1>Welcome Muhammad</h1>
      <h3>Muhammad's Todo List</h3>


      <div className = 'todos'>
        {todos.map(todo => (
          <div className={'todo ' + (todo.complete ? 'completed' : '')} 
          key={todo._id}
          onClick={() => {completeTodo(todo._id)}}>
            <div className = 'checkbox'></div>
            <div className = 'text'>{todo.text}</div>
            <div className = 'delete' onClick={() => deleteTodo(todo._id)}>X</div>
          </div>
        ))}
      </div>
      <div className='addpopup' onClick={() => setPopupActive(true)}>+</div>
      {popupActive ? (
        <div className='popup'>
          <div className='closepopup' onClick={() => setPopupActive(false)}>x</div>
          <div className='content'>
            <h3>Add Task</h3>
            <input
            type='text'
            className='add-todo-input' onChange={e => setNewTodo(e.target.value)}
            autoFocus
            />
            <div className='button' onClick={addTodo} tabIndex={'0'}>Create Task</div>
          </div>
        </div>
      ): ''}
    </div>
  );
}

export default App;
