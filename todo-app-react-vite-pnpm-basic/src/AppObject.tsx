import { FormEvent, ReactNode, useState } from 'react'
import './App.css'
import { uuid } from 'short-uuid'

type Todo = {
  id: string
  text: string
  done: boolean
}

function App() 
  const [items, setItems] = useState<Record<string, Todo>>({})

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const text = formData.get('itemText')?.toString() || ''
    const newItem = { id: uuid(), text, done: false }
    setItems({ ...items, [newItem.id]: newItem })
  }

  const removeItem = (itemId: string) => {
    delete items[itemId]
    setItems({ ...items })
  }

  const markItem = (itemId: string) => {
    items[itemId].done = !items[itemId].done
    setItems({ ...items })
  }

  const visit = (fn: (x: Todo) => ReactNode) => Object.values(items).map(fn)

  return (
    <>
      <h1>Todo App :)</h1>
      <form onSubmit={addItem}>
        <label htmlFor='itemText'>Add your new Todo: </label>
        <input name='itemText' id='itemText' />
        <button type='submit'>Add!</button>
      </form>
      <ul>
        {visit(({ id, text, done }) => (
          <li>
            <input type='checkbox' id={id} checked={done} onChange={() => markItem(id)} />
            <label htmlFor={id} className={`line-through-${done}`}>
              {text}
            </label>
            <button onClick={() => removeItem(id)}>Remove item</button>
          </li>
        ))}
      </ul>
    </>
  


export default App
