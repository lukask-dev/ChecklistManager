import React, { useEffect, useState } from 'react';
import '../App.css';
import ListButton from './ListButton';

const ListOverview: React.FC = () => {
    const [listNames, setListNames] = useState<string[]>([]);
    const [newListName, setNewListName] = useState<string>('');

    // read list names
    useEffect(() => {
        const readListNames = localStorage.getItem('listNames');
        if (readListNames) {
            const parsedArray = JSON.parse(readListNames);
            if (Array.isArray(parsedArray) && parsedArray.length > 0) {
                setListNames(parsedArray);
            }
        }
    }, []);

    // save list names
    useEffect(() => {
        const value = JSON.stringify(listNames);
        if (value) {
            localStorage.setItem('listNames', value);
        }
    }, [listNames]);

    const addList = () => {
        if (newListName.trim() !== '') {
            setListNames([...listNames, newListName]);
            setNewListName('');
        }
    };

    const deleteList = (index: number) => {
        setListNames((prevTasks) => {
            const updatedTasks = prevTasks.filter((_, i) => i !== index);
            return updatedTasks;
        });
    };

    const openList = (index: number) => {
        console.log('Open!');
    };

    return (
        <div>
            {listNames.map((listName, index) => (
                <ListButton listName={listName} index={index} onOpenCallback={openList} onDeleteCallback={deleteList} key={index} />
            ))}
            <input
                type="text"
                placeholder="New list name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
            />
            <button onClick={addList}>Add</button>
        </div>
    );
}

export default ListOverview;