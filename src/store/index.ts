import { createStore } from "vuex"
import {useLocalStorage} from "../composables/useLocalStorage"

const { getFromLocalTodos } = useLocalStorage()

const initialState = [
  {
    key: Math.random().toString(16).slice(2),
    name: 'Сделать тестовое задание',
    done: false,
    isEdit: false
  },
  {
    key: Math.random().toString(16).slice(2),
    name: 'Сходить на прогулку',
    done: false,
    isEdit: false
  },
  {
    key: Math.random().toString(16).slice(2),
    name: 'Искупать кота',
    done: false,
    isEdit: false
  }
]

const todosInit = () => {
  return getFromLocalTodos() && getFromLocalTodos().length > 0
    ? getFromLocalTodos() : initialState
}

const store = createStore({
  state: {
    todos: todosInit()
  },
  getters: {
    getTodoByName: (state) => (value) => {
      return state.todos.find(todo => todo.name === value)
    }
  },
  mutations: {
    initTodos(state) {
      state.todos.map(todo => {
        todo.isEdit = false
      })
    },

    addTodo(state, name) {
      state.todos.push({
        key: Math.random().toString(16).slice(2),
        name,
        done: false,
        isEdit: false
      })
    },

    filterTodo(state, todo) {
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