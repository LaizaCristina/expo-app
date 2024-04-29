import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    //buscar itens salvos
    const getItem = async (key) => {
        try{
            const passwords = await AsyncStorage.getItem(key);
            return JSON.parse(passwords) | [];

        }catch(error){
            console.log("Erro ao buscar", error)
            return [];
        }

    }

    //salvar item no storage
    // async store so salva string, mas quero salvar um array utilizo JSON.stringify(passwords)
    const saveItem = async (key, value) => {
        try{
            let passwords = await getItem(key); // pegando o item que ja existe na lista
            
            if (!passwords || !Array.isArray(passwords)) {
                passwords = [];
            }
    
            
            passwords.push(value);               // adicionando o novo item na lista
            await AsyncStorage.setItem(key, JSON.stringify(passwords));

        }catch(error){
            console.log("Erro ao salvar", error)
        }

    }

    //remover algo do storage
    const removeItem = async (key, item) => {
        try{
            let passwords = await getItem(key);         // busco itens do banco
            let myPasswords = passwords.filter( (password) => {
                return(password !== item)
            })  //acessando a lista, posso filtrar algo e devolver com uma condição

            await AsyncStorage.setItem(key, JSON.stringify(myPasswords))
            return myPasswords;

        }catch(error){
            console.log("Erro ao remover", error)
        }

    }

    return {
        getItem,
        saveItem,
        removeItem,
    }
}

export default useStorage;