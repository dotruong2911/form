import Paper from '@mui/material/Paper';
import BasicTabs from 'component/Tab';
import styles from './App.module.scss';

function App() {
  return (
    <Paper
      elevation={15}
      sx={{
        padding: '10px',
        width: '300px',
        margin: '40px auto',
      }}
    >
      <BasicTabs />
    </Paper>
  );
}

export default App;
