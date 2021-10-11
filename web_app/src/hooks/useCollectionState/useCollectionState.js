import { useState } from "react";

/**
 * a wrapper around useState which allows CRUD operations on the collection
 * 
 * @param key the name of the key used as id 
 */
export const useCollectionState = (key='id', default_=[]) => {
    const [items, setItems] = useState(default_);

    console.log(">>>", items);
    const addItem = (item) => setItems(
        [...items, item]
    );
    const removeItem = (id) => setItems(
        items.filter(item => item[key] !== id)
    );
    const patchItem = (id, newItem) => setItems(
        items.map(item => item[key] === id? newItem: item)
    );
    
    return [items, setItems, {
        add: addItem,
        remove: removeItem, 
        patch: patchItem
    }]
  }