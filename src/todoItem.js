import { nanoid } from "nanoid";

class TodoItem {

    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        
        this.isComplete = false
        this.id = this.generateUniqueId();
    }

    // cambia lo stato di completamento
    toggleComplete(){
        this.isComplete = !this.isComplete;
    }

    // generazione id univoco per todo items
    generateUniqueId(){
        return nanoid();
    }

}

// ====================================================
//                  TEST
// ===================================================
console.log('--- Test TodoItem --------');
// 1. creazione
const myTodo = new TodoItem(
    "Configurare webpack", 
    "Installare le dipendenze e creare il file webpack.config.js",
    "2025-11-23", 
    "Alta"
);

console.log("[TEST] oggetto creato ", myTodo);
console.log("[TEST] stato iniziale 'isComplete' ", myTodo.isComplete);
console.log("[TEST] id univoco ", myTodo.id);

// 2. test dei metodi
myTodo.toggleComplete();
console.log("[TEST] dopo il toggle dello stato ", myTodo.isComplete);

export { TodoItem };

