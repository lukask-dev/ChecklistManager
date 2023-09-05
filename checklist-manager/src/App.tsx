import './App.css';
import ListOverview from './components/ListOverview';

function App() {

  return (
    <div className="App">
      <div className='AppContent'>
        <header>
          <h1>Checklist Manager</h1>
        </header>
        <main>
          <ListOverview />
        </main>
      </div>
    </div>
  );
}

export default App;
