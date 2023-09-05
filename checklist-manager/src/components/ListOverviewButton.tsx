import React, { FC } from 'react';

interface ListButtonProps {
    listName: string;
    index: number;
    onOpenCallback: (index: number) => void;
    onDeleteCallback: (index: number) => void;
}

const ListOverviewButton: FC<ListButtonProps> = ({ listName, index, onOpenCallback, onDeleteCallback }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ width: '80%' }} onClick={() => onOpenCallback(index)}>{listName}</button>
            <button style={{ width: '20%' }} onClick={() => onDeleteCallback(index)}>x</button>
        </div>
    );
}

export default ListOverviewButton;