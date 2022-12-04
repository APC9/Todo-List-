import html from './app.html?raw';
import todoStore, { Filter } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

const ElementIds = {
    clearCompleted:'.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    pendingCount: '#pending-count'
}


/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) =>{

    const displayTodos =()=>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = ()=>{
        renderPending(ElementIds.pendingCount);
    }

    //funcion auto invocada
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML

    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const clearCompleted= document.querySelector(ElementIds.clearCompleted);
    const selects = document.querySelectorAll('.filtro'); 
    

    //listeners

    newDescriptionInput.addEventListener('keyup',(event)=>{
        if(event.keyCode !== 13 )return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value='';
    })

    todoListUL.addEventListener('click',(event)=>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));

        displayTodos();
    })

    todoListUL.addEventListener('click',(event)=>{
        if(event.target.className === 'destroy'){
            const element = event.target.closest('[data-id]');
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    })

    

    clearCompleted.addEventListener('click', ()=>{
        todoStore.deleteComplete();
        displayTodos();
    })

    selects.forEach((select) =>{  //Recorro todos los elementos con la clase filtro
        select.addEventListener('click',(element)=>{ //Escucho el evento click en cada elemento

            selects.forEach(el => el.classList.remove('selected'))// Recorro nuevamente cada elemento
            // y remuevo la clase selected (en otros casas la clase Active); 

            element.target.classList.add('selected');// luego agrego la clase selected

            switch (element.target.innerText) {
                case 'Todos':
                    todoStore.setFilter(Filter.All)
                    break;

                case 'Pendientes':
                    todoStore.setFilter(Filter.Pending)
                    break;

                case 'Completados':
                    todoStore.setFilter(Filter.Completed)
                    break;
            }

            displayTodos();
        })        
    })
}

