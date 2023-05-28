import { FormEvent, useState } from 'react'
import './App.css'
import { uuid } from 'short-uuid'

type Todo = {
  id: string
  text: string
  done: boolean
}

function App() {
  const [items, setItems] = useState<Todo[]>([])

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const text = formData.get('itemText')?.toString()
    text && setItems([...items, { id: uuid(), text, done: false }])
  }

  const removeItem = (itemId: string) => {
    setItems(items.filter(({ id }) => id !== itemId))
  }

  const markItem = (itemId: string) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, done: !item.done } : item)))
  }

  return (
    <>
      <h1>Todo App :)</h1>
      <form onSubmit={addItem}>
        <label htmlFor='itemText'>Add your new Todo: </label>
        <input name='itemText' id='itemText' />
        <button type='submit'>Add!</button>
      </form>
      <ul>
        {items.map(({ id, text, done }) => (
          <li key={id}>
            <input type='checkbox' id={id} checked={done} onChange={() => markItem(id)} />
            <label htmlFor={id} className={`line-through-${done}`}>
              {text}
            </label>
            <button onClick={() => removeItem(id)}>Remove item</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
