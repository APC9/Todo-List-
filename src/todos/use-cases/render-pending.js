import todoStore, { Filter } from "../../store/todo.store";


let element;

export const renderPending = (elementid)=>{
    if(!element) element = document.querySelector(elementid);

    if(!element) throw new Error(`Element ${elementid} not found`);

    element.innerHTML = todoStore.getTodos(Filter.Pending).length;
}