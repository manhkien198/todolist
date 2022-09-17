import { useState } from 'react';
import { TaskProps } from '../constants';
import NewTask from './NewTask';

export interface Props {
  title: string;
  defaultValue: TaskProps;
  listToDo: TaskProps[];
  listCheck: string[];
  setListCheck: Function;
  setListToDo: Function;
}

export default function Task({
  title,
  defaultValue,
  listToDo,
  setListToDo,
  listCheck,
  setListCheck,
}: Props) {
  const [show, setShow] = useState(false);
  const handleRemoveTask = () => {
    const found = listToDo.filter(
      (item: TaskProps) => item.title !== defaultValue.title
    );
    setListToDo(found);
    localStorage.setItem('list', JSON.stringify(found));
  };
  const handleChangeCheckbox = () => {
    if (!listCheck.includes(defaultValue.title)) {
      setListCheck([...listCheck, defaultValue.title]);
    } else {
      setListCheck(listCheck.filter((item) => item !== defaultValue.title));
    }
  };
  return (
    <div>
      <div className='task-info'>
        <input
          type='checkbox'
          name={title.toLowerCase()}
          checked={listCheck.includes(defaultValue.title)}
          onChange={handleChangeCheckbox}
        />
        <h4>{title}</h4>
        <div className='btn-group'>
          <button className='btn btn-detail' onClick={() => setShow(!show)}>
            Detail
          </button>
          <button className='btn btn-danger' onClick={handleRemoveTask}>
            Remove
          </button>
        </div>
      </div>
      {show && (
        <NewTask
          defaultValue={defaultValue}
          listToDo={listToDo}
          setListToDo={setListToDo}
        />
      )}
    </div>
  );
}
