import { Avatar, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import green from '@mui/material/colors/green';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

function SignIn() {
  const styleTextfield = { marginBottom: '10px' };
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Grid align="center">
        <Avatar sx={{ bgcolor: green[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>
          <h2>Sign in</h2>
        </Typography>
      </Grid>
      <TextField
        label="Username"
        placeholder="Enter your username"
        required
        fullWidth
        variant="standard"
        sx={styleTextfield}
        name="usename"
        {...register('usename')}
      ></TextField>
      <TextField
        label="Password"
        placeholder="Enter your password"
        required
        fullWidth
        variant="standard"
        type="password"
        name="password"
        {...register('password')}
        sx={styleTextfield}
      ></TextField>
      <FormGroup style={{ display: 'initial' }}>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
          sx={styleTextfield}
        />
      </FormGroup>

      <Button variant="text" fullWidth variant="contained" sx={styleTextfield}>
        Sign in
      </Button>
    </>
  );
}

export default SignIn;
