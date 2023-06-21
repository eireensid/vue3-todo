import store from "../store";

export const useLocalStorage = () => {

  const saveToLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(store.state.todos))
  }

  const getFromLocalTodos = () => {
    return JSON.parse(localStorage.getItem('todos'))
  }

  return { saveToLocalTodos, getFromLocalTodos };
}