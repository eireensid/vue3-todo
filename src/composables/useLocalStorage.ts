import store from "../store";
import {Todo} from "../types/todo";

export const useLocalStorage = () => {

  const saveToLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(store.state.todos))
  }

  const getFromLocalTodos = (): Todo[] => {
    return JSON.parse(localStorage.getItem('todos'))
  }

  return { saveToLocalTodos, getFromLocalTodos };
}