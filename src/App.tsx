import { useEffect, useState } from 'react';
import './App.css';
import ListTasks from './components/ListTasks';
import NewTask from './components/NewTask';
import { TaskProps } from './constants';

function App() {
  const [listToDo, setListToDo] = useState<TaskProps[]>([]);
  useEffect(() => {
    if (localStorage.getItem('list')) {
      setListToDo(JSON.parse(localStorage.getItem('list') || ''));
    }
  }, []);

  return (
    <div className='App'>
      <div className='wrapper new-task'>
        <NewTask create setListToDo={setListToDo} listToDo={listToDo} />
      </div>
      <ListTasks listToDo={listToDo} setListToDo={setListToDo} />
    </div>
  );
}

export default App;
