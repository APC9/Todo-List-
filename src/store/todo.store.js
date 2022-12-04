import { Todo } from "../todos/models/todo.model";

export const Filter ={
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state ={
    todos:[
        new Todo('Piedra del Alma'),
        new Todo('Piedra del Infinito'),
        new Todo('Piedra del Tiempo'),
        new Todo('Piedra del Poder'),
        new Todo('Piedra del Zapato'),
    ], 
    filter: Filter.All,
}

const initStore = ()=>{
    loadStore();
    console.log('initStore 🍑');
}



const loadStore = ()=>{
    if(!localStorage.getItem('state')) return;
    const {todos = [], filter = Filter.All}= JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateLocalStorage = ()=>{
    localStorage.setItem('state', JSON.stringify(state));
}


const getTodos = (filter = Filter.All)=>{

    switch(filter){
        case Filter.All:
            return [...state.todos];

        case Filter.Completed:
            return state.todos.filter(todo => todo.done);
        
        case Filter.Pending:
            return state.todos.filter(todo => !todo.done);

        default: 
            throw new Error(`Option ${filter} is not valid.`);
    }
}


/**
 * 
 * @param {String} descripcion 
 */

const addTodo =(descripcion)=>{
    if( !descripcion ) throw new Error('Descripcion is required');
    state.todos.push(new Todo(descripcion));
    saveStateLocalStorage();
}


const toggleTodo =( todoId)=>{
    state.todos = state.todos.map(todo=>{
        if(todo.id === todoId) todo.done = !todo.done;
        return todo;
    })
    saveStateLocalStorage();
}


const deleteTodo =( todoId)=>{
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateLocalStorage();
}


const deleteComplete =()=>{
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateLocalStorage();
}


/**
 * 
 * @param {Filter} newFilter 
 */
const setFilter = (newFilter = Filter.All) =>{
    state.filter = newFilter;
    saveStateLocalStorage();
}


const getCurrentFilter =()=>{
    return state.filter;
}





export default {
    addTodo,
    deleteComplete,
    deleteTodo,
    getCurrentFilter,  
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}