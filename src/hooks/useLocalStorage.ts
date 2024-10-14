'use client';
import secureLocalStorage from 'react-secure-storage';

function useLocalStorage() {
    const storage = secureLocalStorage;

    function setItem<T>(key: string, value: T){
        storage.setItem(key, value as number | string | object | boolean);
    }

    function getItem(key: string): string |number | object| boolean | null{
        return storage.getItem(key);
    }

    function clear(){
        storage.clear();
    }

    return {
        getItem,
        setItem,
        clear
    };
}

export default useLocalStorage;