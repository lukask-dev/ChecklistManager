import React, { FC, useState } from 'react';

interface ItemAdderProps {
    placeholderText: string;
    onAddItemCallback: (newItem: string) => void;
}

const ItemAdder: FC<ItemAdderProps> = ({ placeholderText, onAddItemCallback }) => {

    const [newItemName, setNewItemName] = useState<string>('');

    const addItem = () => {
        if (newItemName.trim() !== '') {
            onAddItemCallback(newItemName);
            setNewItemName('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          addItem();
        }
      };

    return (
        <div className='ItemAdder'>
            <input
                className='ItemAdderLeftSide'
                type="text"
                placeholder={placeholderText}
                value={newItemName}
                onKeyDown={handleKeyPress}
                onChange={(e) => setNewItemName(e.target.value)} />
            <button
                className='ItemAdderRightSide'
                onClick={addItem}>
                Add
            </button>
        </div>
    );
}

export default ItemAdder;