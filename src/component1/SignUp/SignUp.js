import styles from './SignUp.module.scss';
import { post } from 'component/Api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [abc, setAbc] = useState(false);
  useEffect(() => {
    let url = 'http://localhost:3000/student';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [abc]);
  useEffect(() => {
    let url = 'http://localhost:3000/score';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDataScore(data);
      });
  }, []);
  const [dataScore, setDataScore] = useState([]);
  const [data, setData] = useState([]);
  let list, listScore;
  list = data.map((item) => {
    return item.username;
  });

  listScore = dataScore.map((item) => {
    return item.username;
  });

  const [formInput, setFormInput] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formError, setFormError] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  let inputError = {};

  const checkUsername = () => {
    if (!formInput.userName) {
      inputError.userName = 'không được để trống';
    }

    if (list.includes(formInput.userName)) {
      inputError.userName = 'tài khoản đã tồn tại';
    }

    if (formInput.userName && !listScore.includes(formInput.userName)) {
      inputError.userName = 'tài khoản không hợp lệ';
    }
  };

  const checkEmail = () => {
    if (formInput.email === '') {
      inputError.email = 'không được để trống';
    } else {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (regex.test(formInput.email) === false) {
        inputError.email = 'không hợp lệ';
      }
    }
  };

  const checkPassword = () => {
    if (!formInput.password) {
      inputError.password = 'không được để trống';
    } else {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
      if (regex.test(formInput.password) === false) {
        inputError.password = 'không hợp lệ';
      }
    }
  };

  const confirmPassword = () => {
    if (formInput.password !== formInput.confirmPassword) {
      inputError.confirmPassword = 'không hợp lệ';
    } else {
      setFormError({});
    }
  };
  let resetInput = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const validateFormInput = (e) => {
    e.preventDefault();
    checkUsername();
    checkEmail();
    checkPassword();
    confirmPassword();
    if (Object.keys(inputError).length > 0) {
      setFormError({ ...inputError });
      setAbc(false);
    }
    if (Object.keys(inputError).length === 0) {
      setAbc(true);
      post(formInput);
      setFormInput({ ...resetInput });
    }
    console.log(Object.keys(inputError), abc);
  };
  return (
    <div className={styles['container']}>
      <form onSubmit={validateFormInput}>
        <div className={styles['abc']}>
          <p style={{ fontSize: '0.9rem' }}>Username</p>
          <input
            className={styles['input']}
            value={formInput.userName}
            onChange={({ target }) => {
              handleInput(target.name, target.value);
            }}
            name="userName"
            type="text"
          ></input>

          <p className={styles['error']}>{formError.userName}</p>
        </div>
        <div className={styles['abc']}>
          <p style={{ fontSize: '0.9rem' }}>Email</p>
          <input
            className={styles['input']}
            value={formInput.email}
            onChange={({ target }) => {
              handleInput(target.name, target.value);
            }}
            name="email"
          ></input>

          <p className={styles['error']}>{formError.email}</p>
        </div>

        <div className={styles['abc']}>
          <p style={{ fontSize: '0.9rem' }}>Password</p>
          <input
            className={styles['input']}
            value={formInput.password}
            onChange={({ target }) => {
              handleInput(target.name, target.value);
            }}
            name="password"
          ></input>

          <p className={styles['error']}>{formError.password}</p>
        </div>

        <div className={styles['abc']}>
          <p style={{ fontSize: '0.9rem' }}>Confirm password</p>
          <input
            className={styles['input']}
            value={formInput.confirmPassword}
            onChange={({ target }) => {
              handleInput(target.name, target.value);
            }}
            name="confirmPassword"
          ></input>

          <p className={styles['error']}>{formError.confirmPassword}</p>
        </div>

        <button
          type="submit"
          value="submit"
          className={styles['btn-submit']}
          style={{}}
        >
          Sign Up
        </button>
      </form>
      <Link to="/signIn">
        <span style={{ marginLeft: '100px' }}>Sign In</span>
      </Link>
    </div>
  );
}

export default SignUp;
