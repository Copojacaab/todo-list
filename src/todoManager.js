import { Project } from "./project";
import  storageManager  from "./storageManager";
import { TodoItem } from "./todoItem";
// IIFE per esecuzione senza inizializzazione e variabili interne protette
const todoManager = (() => {
    // lista di tutti i progetti
    let projects = [];

    // metodo per trovare un oggetto tramite id
    const getProject = (projectId) => {
        return projects.find(project => project.id === projectId);
    };

    // metodo per initi (chiamato all'avvio)
    const initialize = () => {
        // prendo i dati dal localstorage
        const projectsJson = storageManager.loadData();
        
        if(projectsJson){
            // dati esistenti
            projects = projectsJson.map(hydrateProject);
            console.log("Dati caricati e riconosciuti da localStorage");
        }

        if(projects.length === 0){
            const defaultProject = new Project("Inbox")
            projects.push(defaultProject);
            console.log("Progetto di default creato");

            storageManager.saveData(projects);
        }
    };

    // metodo per aggiungere un todo in un progetto specifico
    const addTodoToProject = (projectId, todoItem) => {
        const project = getProject(projectId);
        // se il progetto esiste aggiungo il todo
        if(project){
            project.addTodo(todoItem);
            storageManager.saveData(projects);
            return true;
        }
        return false;
    }; 

    const getAllProjects = () => {
        return projects;
    }

    // ===============================
    //              HELPER
    // ===============================

    // helper per ricostruire un singolo Project
    const hydrateProject = (projectsJson) => {
        // creo la nuova istanza del progetto
        const newProject = new Project(projectsJson.title);
        // sovrascrivo l'id (progetto gia esistente, solo da ricaricare)
        newProject.setId(projectsJson.id);

        // faccio l'hydratation dei Todo
        newProject.todos = projectsJson.todos.map(hydrateTodo);

        return newProject;
    };

    const hydrateTodo = (todoJson) => {
        // creo nuova istanza (senza id, gia presente)
        const newTodo = new TodoItem(
            todoJson.title, 
            todoJson.description,
            todoJson.dueDate,
            todoJson.priority
        );
        // sovrascrivo id e stato del nuovo todo
        newTodo.setId(todoJson.id);
        newTodo.isComplete = todoJson.isComplete;

        return newTodo;
    }
    return {
        initialize, 
        addTodoToProject, 
        getAllProjects,
    };
})();

export default todoManager;