import todoManager from "./todoManager";
import { TodoItem } from "./todoItem";
import storageManager from "./storageManager";


// inizializzazione allo start
todoManager.initialize();

// prendo l'id del progetto Inbox
 const inboxId = todoManager.getAllProjects()[0].id;

// creo nuovo todo
const newTodo = new TodoItem(
    "Pulire la tastiera", 
    "Togliere lo schifo in mezzo ai tasti", 
    "2026-01-01", 
    "bassa"
);

// aggiungo todo al progetto inbox
// todoManager.addTodoToProject(inboxId, newTodo);

console.log("Contenuto finale della sessione 1: ", todoManager.getAllProjects());

// SESSIONE 2
const project = todoManager.getAllProjects()[0];
const todoToToggle = project.todos[0];

// esiste solamente se funziona l'hydration
if(todoToToggle){
    console.log("--------- TEST HYDRATION --------------");
    console.log(`[TEST] Titolo caricato: ${todoToToggle.title}`);
    console.log("Stato prima del toggle: ", todoToToggle.isComplete);

    todoToToggle.toggleComplete();

    console.log("Stato dopo del toggle: ", todoToToggle.isComplete);
    // salvo il nuovo stato'
    storageManager.saveData(todoManager.getAllProjects());
} else {
    console.log("Nessun TODO trovato per il test di Hydration");
}