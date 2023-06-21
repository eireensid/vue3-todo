import { createStore } from "vuex"

const store = createStore({
  state: {
    todos: []
  },
  mutations: {
    addTodo(state, name) {
      state.todos.push({key: state.todos.length - 1, name})
    },
    deleteTodo(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
    editTodo(state, todo) {

    }
  }
})

export default store