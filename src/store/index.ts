import { createStore } from "vuex"
import {useLocalStorage} from "../composables/useLocalStorage"
import {initialState} from "../composables/initialState";
import {setUniqueId} from "../composables/setUniqueId";
import {Todo} from "../types/todo";

const { getFromLocalTodos } = useLocalStorage()

const todosInit = (): Todo[] => {
  return getFromLocalTodos() && getFromLocalTodos().length > 0
    ? getFromLocalTodos() : initialState
}

const store = createStore({
  state: {
    todos: todosInit()
  },
  getters: {
    getTodoByName: (state) => (value: string): Todo | undefined => {
      return state.todos.find(todo => todo.name === value)
    },
    getTodoByDone: (state): Array<string> => {
      const arr = []
      state.todos.filter(todo => {
        if (todo.done) {
          arr.push(todo.name)
        }
      })
      return arr
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
        key: setUniqueId,
        name,
        done: false,
        isEdit: false
      })
    },

    filterTodo(state, todo: Todo) {
      state.todos.map(stateTodo => {
        if (stateTodo.key === todo.key) {
          stateTodo.done = !todo.done
        }
      })
    },

    deleteTodo(state, todo: Todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },

    editTodo(state, todo: Todo) {
      state.todos.map(stateTodo => {
        if (stateTodo.key === todo.key) {
          stateTodo.name = todo.name
        }
      })
    }
  }
})

export default store