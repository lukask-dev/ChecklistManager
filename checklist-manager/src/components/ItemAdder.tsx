import React, { FC, useState } from 'react';

interface ItemAdderProps {
    placeholderText: string;
}

const ItemAdder: FC<ItemAdderProps> = ({ placeholderText }) => {

    const [newItemName, setNewItemName] = useState<string>('');

    const addItem = () => {
        if (newItemName.trim() !== '') {
            
            setNewItemName('');
        }
    };


    return (
        <div>
            <input
                type="text"
                placeholder={placeholderText}
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)} />
            <button onClick={addItem}>Add</button>
        </div>
    );
}

export default ItemAdder;