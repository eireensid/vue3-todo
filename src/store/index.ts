import { createStore } from "vuex"
import {useLocalStorage} from "../composables/useLocalStorage";

const { getFromLocalTodos } = useLocalStorage()

const initialState = [
  {
    key: '0',
    name: 'Сделать тестовое задание',
    done: false
  },
  {
    key: '1',
    name: 'Сходить на прогулку',
    done: false
  },
  {
    key: '2',
    name: 'Искупать кота',
    done: false
  }
]

const store = createStore({
  state: {
    todos: getFromLocalTodos() || initialState
  },
  mutations: {
    addTodo(state, name) {
      state.todos.push({key: String(state.todos.length), name, done: false})
    },
    deleteTodo(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
    editTodo(state, todo) {

    }
  }
})

export default store