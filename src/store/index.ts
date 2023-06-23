import { createStore } from 'vuex'
import { useLocalStorage } from '../composables/useLocalStorage'
import { initialState } from '../composables/initialState'
import { Todo } from '../types/todo'
import { v4 as uuidv4 } from 'uuid'

const { getFromLocalTodos } = useLocalStorage()

const todosInit = (): Todo[] => {
	return getFromLocalTodos() && getFromLocalTodos().length > 0 ? getFromLocalTodos() : initialState
}

const store = createStore({
	state: {
		todos: todosInit()
	},
	getters: {
		getTodosByNameLength:
			(state) =>
			(value: string): number => {
				return state.todos.filter((todo: Todo) => todo.name === value).length
			},
		getTodoByDone: (state): Array<string> => {
			const arr: Array<string> = []
			state.todos.filter((todo: Todo) => {
				if (todo.done) {
					arr.push(todo.name)
				}
			})
			return arr
		}
	},
	mutations: {
		initTodos(state) {
			state.todos.map((todo: Todo) => {
				todo.isEdit = false
			})
		},

		addTodo(state, name: string) {
			state.todos.push({
				key: uuidv4(),
				name,
				done: false,
				isEdit: false
			})
		},

		filterTodo(state, todo: Todo) {
			state.todos.map((stateTodo: Todo) => {
				if (stateTodo.key === todo.key) {
					stateTodo.done = !todo.done
				}
			})
		},

		deleteTodo(state, todo: Todo) {
			state.todos.splice(state.todos.indexOf(todo), 1)
		},

		editTodo(state, todo: Todo) {
			state.todos.map((stateTodo: Todo) => {
				if (stateTodo.key === todo.key) {
					stateTodo.name = todo.name
				}
			})
		}
	}
})

export default store
