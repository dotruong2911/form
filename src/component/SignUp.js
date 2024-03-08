import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { green } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const styleTextfield = { marginBottom: '10px' };
  const onsubmit = (data) => {
    fetch('http://localhost:3000/student', {
      method: 'POST',
      body: JSON.stringify({
        userName: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    setInput({
      username: '',
      email: '',
      password: '',
    });
  };

  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInput = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <Grid align="center" sx={{ marginBottom: '10px' }}>
        <Avatar sx={{ bgcolor: green[500] }}>
          <AddCircleOutlineOutlinedIcon />
        </Avatar>
        <Typography>
          <h2>Sign Up</h2>
        </Typography>
      </Grid>

      <TextField
        value={input.username}
        label="Username"
        placeholder="Username"
        variant="standard"
        fullWidth
        sx={styleTextfield}
        name="username"
        onChange={({ e }) => {
          handleInput(e.currentTarget.name, e.currentTarget.value);
        }}
        {...register('username', { required: 'true' })}
      />
      {errors.username && (
        <small style={{ fontSize: '10px' }}>không được để trống</small>
      )}
      <TextField
        value={input.email}
        label="Email"
        placeholder="Email"
        variant="standard"
        fullWidth
        sx={styleTextfield}
        name="email"
        {...register('email', { required: 'true', pattern: /^\S+@\S+\.\S+$/ })}
      />
      {errors.email?.type === 'required' && (
        <small style={{ fontSize: '10px' }}>không được để trống</small>
      )}
      {errors.email?.type === 'pattern' && (
        <small style={{ fontSize: '10px' }}>không hợp lệ</small>
      )}

      <TextField
        value={input.password}
        label="Password"
        placeholder="Password"
        variant="standard"
        fullWidth
        // type="password"
        sx={styleTextfield}
        id="password"
        name="password"
        {...register('password', {
          required: 'true',
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
        })}
      />
      {errors.password?.type === 'required' && (
        <small style={{ fontSize: '10px' }}>không được để trống</small>
      )}
      {errors.password?.type === 'pattern' && (
        <small style={{ fontSize: '10px' }}>không hợp lệ</small>
      )}

      <TextField
        label="Confirm Password"
        placeholder="Confirm Password"
        variant="standard"
        fullWidth
        // type="password"
        sx={styleTextfield}
        id="comfirmpassword"
        name="confirmpassword"
        {...register('confirmpassword', {
          required: 'true',
          validate: (value) => value === password.current,
        })}
      />
      {errors.confirmpassword?.type === 'required' && (
        <small style={{ fontSize: '10px' }}>không được để trống</small>
      )}
      {errors.confirmpassword?.type === 'validate' && (
        <small style={{ fontSize: '10px' }}>phải giống mk</small>
      )}

      <Button
        variant="contained"
        type="submit"
        fullWidth
        sx={{ marginTop: '20px' }}
      >
        Sign Up
      </Button>
    </form>
  );
}

export default SignUp;
