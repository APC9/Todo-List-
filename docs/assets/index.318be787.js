(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const C=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="\xBFQu\xE9 necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left \u2193 -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url \u2193 -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let y;const L=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(L)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function E(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const P=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:P};function k(e,t,i){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const d=e.random||(e.rng||S)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return E(d)}class m{constructor(t){this.id=k(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[new m("Piedra del Alma"),new m("Piedra del Infinito"),new m("Piedra del Tiempo"),new m("Piedra del Poder"),new m("Piedra del Zapato")],filter:c.All},A=()=>{T(),console.log("initStore \u{1F351}")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},I=(e=c.All)=>{switch(e){case c.All:return[...l.todos];case c.Completed:return l.todos.filter(t=>t.done);case c.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},U=e=>{if(!e)throw new Error("Descripcion is required");l.todos.push(new m(e)),f()},x=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},q=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},M=()=>{l.todos=l.todos.filter(e=>!e.done),f()},D=(e=c.All)=>{l.filter=e,f()},O=()=>l.filter,a={addTodo:U,deleteComplete:M,deleteTodo:q,getCurrentFilter:O,getTodos:I,initStore:A,loadStore:T,setFilter:D,toggleTodo:x};let w;const F=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error(`Element ${e} not found`);w.innerHTML=a.getTodos(c.Pending).length},N=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:i,id:d}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${t?"checked":""}>
            <label>${i}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),t&&n.classList.add("completed"),n};let h;const H=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(i=>{h.append(N(i))})},g={clearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",pendingCount:"#pending-count"},V=e=>{const t=()=>{const s=a.getTodos(a.getCurrentFilter());H(g.TodoList,s),i()},i=()=>{F(g.pendingCount)};(()=>{const s=document.createElement("div");s.innerHTML=C,document.querySelector(e).append(s),t()})();const d=document.querySelector(g.NewTodoInput),o=document.querySelector(g.TodoList),n=document.querySelector(g.clearCompleted),u=document.querySelectorAll(".filtro");d.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(a.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const p=s.target.closest("[data-id]");a.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",s=>{if(s.target.className==="destroy"){const p=s.target.closest("[data-id]");a.deleteTodo(p.getAttribute("data-id")),t()}}),n.addEventListener("click",()=>{a.deleteComplete(),t()}),u.forEach(s=>{s.addEventListener("click",p=>{switch(u.forEach(v=>v.classList.remove("selected")),p.target.classList.add("selected"),p.target.innerText){case"Todos":a.setFilter(c.All);break;case"Pendientes":a.setFilter(c.Pending);break;case"Completados":a.setFilter(c.Completed);break}t()})})};a.initStore();V("#app");
