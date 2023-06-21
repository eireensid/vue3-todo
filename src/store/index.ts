import { createStore } from "vuex"
import {useLocalStorage} from "../composables/useLocalStorage";

const { getFromLocalTodos } = useLocalStorage()

const store = createStore({
  state: {
    todos: getFromLocalTodos() || []
  },
  mutations: {
    addTodo(state, name) {
      state.todos.push({key: String(state.todos.length), name})
    },
    deleteTodo(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
    editTodo(state, todo) {

    }
  }
})

export default store