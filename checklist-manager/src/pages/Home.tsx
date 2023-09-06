import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ListOverview from '../components/ListOverview';
import TodoListView from '../components/TodoListView';
const Home = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    var listIndex = readIndexParam();

    const [listNames, setListNames] = useState<string[]>([]);

    const localStorageKeyForListNames = 'listNames';

    // read list names
    useEffect(() => {
        const readListNames = localStorage.getItem(localStorageKeyForListNames);
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
            localStorage.setItem(localStorageKeyForListNames, value);
        }
    }, [listNames]);

    function readIndexParam(): number {
        if (searchParams.has('list')) {
            const pageParam = searchParams.get('list');
            const number = parseInt(pageParam || '');
            if (Number.isInteger(number) && number >= 0) {
                return number;
            }
        }
        return -1;
    }

    const setParamInNavigation = (paramName: string, paramValue: string) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(paramName, paramValue);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    }

    return (
        <div className="App">

            <header>
                <Link to="/ChecklistManager" className='AppTitle'>
                    <h1>Checklist Manager</h1>
                </Link>
            </header>

            <main>
                <div className='AppContent'>
                    {listIndex === -1 ? (
                        <ListOverview listNames={listNames} setListNames={setListNames} setParamInNavigation={setParamInNavigation} />
                    ) : (
                        <TodoListView listIndex={listIndex} listName={listNames[listIndex]} />
                    )}
                </div>
            </main>

        </div>
    );
};

export default Home;