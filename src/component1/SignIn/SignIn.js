import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useState, useEffect } from 'react';

function SignIn() {
  useEffect(() => {
    fetch('http://localhost:3000/score')
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/student')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const [data, setData] = useState([]);

  const listUsername = data.map((item) => {
    return item.username;
  });

  const listEmail = data.map((item) => {
    return item.email;
  });

  const listPassword = data.map((item) => {
    return item.password;
  });

  const [formInput, setFormInput] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState({
    username: '',
    email: '',
    password: '',
  });

  const inputError = {};

  const checkUsername = () => {
    if (!formInput.username) {
      inputError.username = 'điền tài khoản';
    }

    if (formInput.username && !listUsername.includes(formInput.username)) {
      inputError.username = 'tài khoản chưa đăng ký';
    }
  };

  const checkEmail = () => {
    if (!formInput.email) {
      inputError.email = 'điền email';
    }

    if (formInput.email && !listEmail.includes(formInput.email)) {
      inputError.email = 'sai email';
    }
  };

  const checkPassword = () => {
    if (!formInput.password) {
      inputError.password = 'điền password';
    }

    if (formInput.password && !listPassword.includes(formInput.password)) {
      inputError.password = 'sai password';
    } else {
      setFormError({ inputError });
    }
  };

  const handleInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const resetInput = {
    username: '',
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    checkUsername();
    checkEmail();
    checkPassword();
    if (Object.keys(inputError).length > 0) {
      setFormError({
        ...inputError,
      });
    }
    let ids;
    if (Object.keys(inputError).length === 0) {
      ids = user.find((item) => {
        return item.username === formInput.username;
      });

      // setFormInput({
      //   ...resetInput,
      // });
      navigate(`/${ids.id}`);

      // if(formInput.username && formInput.username === 'doxuantruong') {
      //   navigate('/admin')
      // }
    }
    console.log(ids);
  };
  return (
    <form style={{ width: '250px' }} onSubmit={onSubmit}>
      <div className={styles['input']}>
        <TextField
          value={formInput.username}
          style={{ marginBottom: '30px' }}
          label="username"
          placeholder="username"
          variant="standard"
          fullWidth
          name="username"
          onChange={({ target }) => {
            handleInput(target.name, target.value);
          }}
        />
        <div className={styles['error']}>{formError.username}</div>
      </div>
      <div className={styles['input']}>
        <TextField
          style={{ marginBottom: '30px' }}
          label="email"
          placeholder="email"
          variant="standard"
          fullWidth
          color="secondary"
          name="email"
          value={formInput.email}
          onChange={({ target }) => {
            handleInput(target.name, target.value);
          }}
        />
        <div className={styles['error']}>{formError.email}</div>
      </div>
      <div className={styles['input']}>
        <TextField
          style={{ marginBottom: '30px' }}
          label="password"
          placeholder="password"
          variant="standard"
          fullWidth
          name="password"
          value={formInput.password}
          onChange={({ target }) => {
            handleInput(target.name, target.value);
          }}
        />
        <div className={styles['error']}>{formError.password}</div>
      </div>
      <Button
        variant="contained"
        fullWidth
        type="submit"
        style={{ margin: '10px 0 20px 0' }}
      >
        Sign In
      </Button>
      <Link to="/">
        <span style={{ marginLeft: '95px' }}>Sign Up</span>
      </Link>
    </form>
  );
}

export default SignIn;
