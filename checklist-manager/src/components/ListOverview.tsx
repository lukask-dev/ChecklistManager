import React, { FC } from 'react';
import '../App.css';
import ListOverviewButton from './ListOverviewButton';
import ItemAdder from './ItemAdder';
import { generateLocalStorageKeyForList as getLocalStorageKeyForList } from '../utils/utils';

interface ListOverviewProps {
    listNames: string[];
    setListNames: React.Dispatch<React.SetStateAction<string[]>>;
    setParamInNavigation: (paramName: string, paramValue: string) => void;
}

const ListOverview: FC<ListOverviewProps> = ({ listNames, setListNames, setParamInNavigation }) => {

    const addList = (newListName: string) => {
        setListNames([...listNames, newListName]);
    };

    const deleteList = (index: number) => {
        setListNames((prevList) => {
            const updatedList = prevList.filter((_, i) => i !== index);
            return updatedList;
        });
        localStorage.removeItem(getLocalStorageKeyForList(index));
    };

    const openList = (index: number) => {
        setParamInNavigation('list', index.toString());
    };

    const clearLocalStorage = () => {
        if (window.confirm('Delete all lists?')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div>            
            {listNames.map((listName, index) => (
                <ListOverviewButton listName={listName} index={index} onOpenCallback={openList} onDeleteCallback={deleteList} key={index} />
            ))}
            <ItemAdder placeholderText='New List Name' onAddItemCallback={addList} />
            <button className='ClearLocalStorageButton' onClick={clearLocalStorage}>Delete All</button>
        </div>
    );
}

export default ListOverview;