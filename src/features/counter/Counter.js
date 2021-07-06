import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  fetchMovie,
  increment,
  // incrementAsync,
  userAsync,
  selectCount,
  selectMovie,
  selectStatus,
  selectUsers,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);
  const movies = useSelector(selectMovie);
  const users = useSelector(selectUsers);
  // console.log(users);
  // console.log(movies);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');


  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />

        {
          /**
           * 
            <button
              className={styles.asyncButton}
              onClick={() => dispatch(incrementAsync())}
            >
              Add Async
            </button>
           * 
           */
        }

        <button
          onClick={() => dispatch(fetchMovie())}
        >fetch MOVIE</button>
        {status}

        <button
          onClick={() => dispatch(userAsync('yo'))}
        >fecth user
        </button>


        {
          users?.map((user) => {
            return (
              <p key={user.id}>{user.name}</p>
            )
          })
        }

        <p> {movies.name}</p>
        <p> {movies.gender}</p>


      </div>
    </div>
  );
}
