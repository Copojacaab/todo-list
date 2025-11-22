# todo-list

## todo-item

Elemento singolo:

- Propieta': title, description, dueDate, priority, 
- Metodi:

## project

Contenitore todo-item.

Proprieta': title, todos(arr che contiene gli oggetti todo)
Metodi: addTodo(todoItem): aggiunge un todo all'arr di obj
deleteTodo(todoId): rimuove un todo dal'arr todos

## todoManager

Classe che gestisce la collezione di tutti i projects.
Steps:

1. inizializza una struttura dati (arr o obj) per contenere tutti i progetti
2. all'avvio, se la lista e' vuota, allora creazione di un progetto di default

Metodi:

- addProject(newProject)
- deleteProject(projectId)
- getProject(projectId)
...
