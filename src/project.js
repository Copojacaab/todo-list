import { nanoid } from "nanoid";
import { TodoItem } from "./todoItem";
export class Project {
    constructor(title){
        this.title = title;

        this.todos = [];
        this.id = this.generateUniqueId();
    }

    addTodo(todoItem){
        this.todos.push(todoItem);
    }

    updateTodo(todoId, newData){
        const todoToUpdate = this.getTodo(todoId);

        if(todoToUpdate){
            // ciclo sulle chiavi di newData e aggiorno quelle del todo
            Object.keys(newData).forEach(key => {
                if(key in todoToUpdate)
                    todoToUpdate[key] = newData[key];
            });
            return true;
        }
        return false;
    }

    deleteTodo(todoId){
        const indexToRm = this.todos.findIndex((todo) => todo.id === todoId);
        
        if(indexToRm !== -1){
            const elementRemoved = this.todos.splice(indexToRm, 1);
            return elementRemoved[0];
        }  

        return null;
    }



    // =======================================
    //              GETTERS AND SETTERS
    // =======================================
    getTodo(todoId){
        const indexSearched = this.todos.findIndex((todo) => todo.id === todoId);
        return this.todos[indexSearched];
    }

    // metodo per id univoci
    generateUniqueId(){
        return nanoid();
    }

    setId(newId) {
        this.id = newId;
    }
}


// ==================================================
//                      TEST
// ==================================================
console.log('\n--- Test Project Class ---');

// 1. init
const defaultProject = new Project("Inbox");
console.log("[TEST] Progetto creato: ", defaultProject.title, "ID: ", defaultProject.id);

// 2. Todo di esempio
const todoA = new TodoItem("Compra il pane", "Pane integrale", "oggi", "media");
const todoB = new TodoItem("Chiamare il dottore" , "Fissare appuntamento", "domani", "alta")
// salvo id per i test successivi
const idA = todoA.id;
const idB = todoB.id;

// 3. test addTodo
defaultProject.addTodo(todoA);
defaultProject.addTodo(todoB);
console.log(`[TEST] Todo aggiunti. Totale todo: ${defaultProject.todos.length}`)
console.log(`[TEST] Primo todo aggiunto (title): ${defaultProject.todos[0].title}`);

// 4. test getTodo
const retrievedTodo = defaultProject.getTodo(idA);
console.log(`[TEST] Recuperato ToDo con ID ${idA}: ${retrievedTodo.title}`);
// Verifichiamo che la funzione fallisca per un ID non esistente
const nonExistent = defaultProject.getTodo('non-esistente');
console.log(`[TEST] Tentativo di recuperare ID non esistente: ${nonExistent}`); 

// 5. Test updateTodo
const updateData = {
    title: "Comprare Pane e Latte", 
    priority: "bassa"
};
defaultProject.updateTodo(idA, updateData);
console.log(`[TEST] Dopo l'aggiornamento, titolo di A: ${defaultProject.getTodo(idA).title}`);
console.log(`[TEST] Dopo l'aggiornamento, priorità di A: ${defaultProject.getTodo(idA).priority}`);
// 6. Test deleteTodo
const todoLengthBeforeDelete = defaultProject.todos.length;
const deletedItem = defaultProject.deleteTodo(idB); // Elimina B
console.log(`[TEST] Rimosso ToDo: ${deletedItem.title}`);
console.log(`[TEST] Lunghezza prima: ${todoLengthBeforeDelete}, Lunghezza dopo: ${defaultProject.todos.length}`);
// Tentativo di recuperare l'elemento eliminato (dovrebbe fallire)
console.log(`[TEST] Recupero B dopo eliminazione: ${defaultProject.getTodo(idB)}`); // Dovrebbe essere undefined