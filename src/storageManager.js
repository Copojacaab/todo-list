// etichetta univoca per l'interno blocco di dati dell'app
const STORAGE_KEY = 'todoAppData';

const storageManager = (() => {
    
    // carica i dati dal localStorage
    const loadData = () => {
        const storedData = localStorage.getItem(STORAGE_KEY); //storageData contiene todos (yahooo)

        if(storedData){
            return JSON.parse(storedData);
        }
        return null;
    };

    // salta i dati sul localStorage
    const saveData = (projectsArray) => {
        try {
            const dataString = JSON.stringify(projectsArray);
            localStorage.setItem(STORAGE_KEY, dataString);
            console.log("Dati salvati in localStorage");
        } catch(error){
            console.log("Errore nel salvataggio dei dati nel localStorage: ", error);
        }
    };

    return {
        loadData, 
        saveData
    }
})();

export default storageManager;
