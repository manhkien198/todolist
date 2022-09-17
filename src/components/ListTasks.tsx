import { ChangeEvent, useEffect, useState } from 'react';
import { TaskProps } from '../constants';
import Task from './Task';

export interface ListTasksProps {
  listToDo: TaskProps[];
  setListToDo: Function;
}

export default function ListTasks({ listToDo, setListToDo }: ListTasksProps) {
  const [filteredTask, setFilteredTask] = useState<TaskProps[]>([]);
  const [listCheck, setListCheck] = useState<string[]>([]);
  useEffect(() => {
    setFilteredTask([...listToDo]);
  }, [listToDo]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredTask(
      listToDo.filter((item) => item.title.includes(e.target.value))
    );
  };
  const handleRemoveMulti = () => {
    if (!listCheck?.length) return;
    const removedList = listToDo.filter(
      (item) => !listCheck.includes(item.title)
    );
    setListToDo(removedList);
    localStorage.setItem('list', JSON.stringify(removedList));
  };
  return (
    <div className='wrapper'>
      <div>
        <h2 className='title'>To do list</h2>
        <input
          type='text'
          placeholder='Search ...'
          className='input-box'
          onChange={handleSearch}
        />
      </div>
      <div>
        {filteredTask
          ?.sort(
            (a: TaskProps, b: TaskProps) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((task: TaskProps) => (
            <Task
              key={`${task.title}${Date.now()}`}
              title={task.title}
              defaultValue={task}
              listToDo={listToDo}
              listCheck={listCheck}
              setListCheck={setListCheck}
              setListToDo={setListToDo}
            />
          ))}
      </div>
      <div className='bulk-action'>
        <button className='btn btn-primary'>Done</button>
        <button className='btn btn-danger' onClick={handleRemoveMulti}>
          Remove
        </button>
      </div>
    </div>
  );
}
