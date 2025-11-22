import { Project } from "./project";

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
        // ...logica per caricare localstorage
        if(projects.length === 0){
            const defaultProject = new Project("Inbox")
            projects.push(defaultProject);
            console.log("Progetto di default creato")
        }
    };

    // metodo per aggiungere un todo in un progetto specifico
    const addTodoToProject = (projectId, todoItem) => {
        const project = getProject(projectId);
        // se il progetto esiste aggiungo il todo
        if(project){
            project.addTodo(todoItem);
            // ...localstorage (chiamare funzione di salvataggio)
            return true;
        }
        return false;
    }; 

    const getAllProjects = () => {
        return projects;
    }

    // ...addProject, deleteProject, getAllProjects

    return {
        initialize, 
        addTodoToProject, 
        getAllProjects,
    };
})();

export default todoManager;