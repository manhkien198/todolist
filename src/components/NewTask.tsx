import { ChangeEvent, useEffect, useState } from 'react';
import { PRIORITY, PriorityProps, TaskProps } from '../constants';
import { dateInPast } from '../utils';

export interface NewTaskProps {
  create?: boolean;
  defaultValue?: TaskProps;
  setListToDo: Function;
  listToDo: TaskProps[];
}

export default function NewTask({
  create,
  defaultValue,
  setListToDo,
  listToDo,
}: NewTaskProps) {
  const localTime = new Date(
    new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
  );

  const [value, setValue] = useState<TaskProps>({
    title: '',
    desc: '',
    date: `${localTime.getFullYear()}-${
      localTime.getMonth().toString().length === 1
        ? `0${localTime.getMonth() + 1}`
        : localTime.getMonth()
    }-${localTime.getDate()}`,
    priority: 'normal',
  });
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!value.title) {
      setErrorTitle(true);
      return;
    } else {
      setErrorTitle(false);
    }

    if (
      dateInPast(
        value.date,
        new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
      )
    ) {
      setErrorDate(true);
      return;
    }
    if (create) {
      setListToDo([...listToDo, value]);
      localStorage.setItem('list', JSON.stringify([...listToDo, value]));
      setValue({
        title: '',
        desc: '',
        date: `${localTime.getFullYear()}-${
          localTime.getMonth().toString().length === 1
            ? `0${localTime.getMonth() + 1}`
            : localTime.getMonth()
        }-${localTime.getDate()}`,
        priority: 'normal',
      });
    } else {
      const updateItem = listToDo?.findIndex(
        (item: TaskProps) => item.title === value.title
      );
      listToDo?.splice(updateItem as number, 1, value);
      localStorage.setItem('list', JSON.stringify(listToDo));
    }
  };
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      {create ? <h2 className='title'>New task</h2> : ''}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Add new tasks ...'
          className='input-box'
          value={value.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue({ ...value, title: e.target.value })
          }
        />
        {errorTitle && <p className='error'>This field is required</p>}
        <label htmlFor='desc'>Description</label>
        <textarea
          rows={5}
          id='desc'
          name='desc'
          value={value.desc}
          className='desc'
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setValue({ ...value, desc: e.target.value })
          }
        />
        <div className='options'>
          <label htmlFor='date' className='flex-1'>
            Due Date:
            <input
              type='date'
              id='date'
              name='date'
              value={value.date}
              className='input-box'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue({ ...value, date: e.target.value })
              }
            />
          </label>
          <label htmlFor='priority' className='flex-1'>
            Priority:
            <select
              name='priority'
              id='priority'
              value={value.priority}
              className='input-box'
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setValue({ ...value, priority: e.target.value })
              }
            >
              {PRIORITY.map((item: PriorityProps) => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        {errorDate && <p className='error'>Due Date is not a valid</p>}

        <button type='submit' className='btn-submit'>
          {create ? 'Add' : 'Update'}
        </button>
      </form>
    </div>
  );
}
