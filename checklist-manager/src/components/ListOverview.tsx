import React, { FC, useState } from 'react';
import '../App.css';
import ListOverviewButton from './ListOverviewButton';

interface ListOverviewProps {
    listNames: string[];
    setListNames: React.Dispatch<React.SetStateAction<string[]>>;
    setParamInNavigation: (paramName: string, paramValue: string) => void;
}

const ListOverview: FC<ListOverviewProps> = ({ listNames, setListNames, setParamInNavigation }) => {

    const [newListName, setNewListName] = useState<string>('');

    const addList = () => {
        if (newListName.trim() !== '') {
            setListNames([...listNames, newListName]);
            setNewListName('');
        }
    };

    const deleteList = (index: number) => {
        setListNames((prevList) => {
            const updatedList = prevList.filter((_, i) => i !== index);
            return updatedList;
        });
    };

    const openList = (index: number) => {
        setParamInNavigation('list', index.toString());
    };

    return (
        <div>
            {listNames.map((listName, index) => (
                <ListOverviewButton listName={listName} index={index} onOpenCallback={openList} onDeleteCallback={deleteList} key={index} />
            ))}
            <input
                type="text"
                placeholder="New list name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)} />
            <button onClick={addList}>Add</button>
        </div>
    );
}

export default ListOverview;