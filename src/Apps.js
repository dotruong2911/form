import styles from './App.module.scss';
import SignUp from 'component1/SignUp/SignUp';
import SignIn from 'component1/SignIn/SignIn';
import { Routes, Route } from 'react-router-dom';
import Test from 'component1/Score/Test';
import { useEffect, useState } from 'react';

function Apps() {
  useEffect(() => {
    fetch('http://localhost:3000/score')
      .then((res) => res.json())
      .then((data) => setId(data));
  }, []);

  const [id, setId] = useState([]);

  const listId = id.map((item) => {
    return item.id;
  });
  return (
    <div className={styles['container']}>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        {listId.map((item) => {
          return (
            <Route
              key={item}
              path={'/' + item}
              element={<Test id={item} />}
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default Apps;
