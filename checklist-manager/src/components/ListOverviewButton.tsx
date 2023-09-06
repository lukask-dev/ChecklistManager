import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

interface ListButtonProps {
    listName: string;
    index: number;
    onOpenCallback: (index: number) => void;
    onDeleteCallback: (index: number) => void;
}

const ListOverviewButton: FC<ListButtonProps> = ({ listName, index, onOpenCallback, onDeleteCallback }) => {
    return (
        <div className='ListItemRow'>
            <button className='ListItemClickable' onClick={() => onOpenCallback(index)}>
                <span className='ListItemContent'>
                    <FontAwesomeIcon icon={icon({ name: 'list-ul' })} size='xl' />{' '}
                    {listName}
                </span>
            </button>
            <button className='ListItemDeleteButton' onClick={() => onDeleteCallback(index)}>
                <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
            </button>
        </div>
    );
}

export default ListOverviewButton;