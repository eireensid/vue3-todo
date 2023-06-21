import { createStore } from "vuex"
import {useLocalStorage} from "../composables/useLocalStorage"

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
    todos: getFromLocalTodos() && getFromLocalTodos().length > 0 ? getFromLocalTodos() : initialState
  },
  mutations: {
    addTodo(state, name) {
      state.todos.push({
        key: Math.random().toString(16).slice(2),
        name,
        done: false
      })
    },

    checkTodo(state, todo) {
      state.todos.map(stateTodo => {
        if (stateTodo.key === todo.key) {
          stateTodo.done = !todo.done
        }
      })
    },

    deleteTodo(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },

    editTodo(state, todo) {
      state.todos.map(stateTodo => {
        if (stateTodo.key === todo.key) {
          stateTodo.name = todo.name
        }
      })
    }
  }
})

export default store