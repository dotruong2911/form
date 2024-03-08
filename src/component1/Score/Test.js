import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Test.module.scss';

export default function Test({ id }) {
  useEffect(() => {
    fetch(`http://localhost:3000/score/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  const [data, setData] = useState([]);

  function createData(name, toan, ly, hoa) {
    return { name, toan, ly, hoa };
  }

  const rows = [createData(data.username, data.toan, data.ly, data.hoa)];

  const navigate = useNavigate();

  const logOut = () => {
    navigate('/');
  };
  return (
    <div className={styles['container']}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Toán</TableCell>
              <TableCell align="right">Lý</TableCell>
              <TableCell align="right">Hóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.toan}</TableCell>
                <TableCell align="right">{row.ly}</TableCell>
                <TableCell align="right">{row.hoa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={logOut}>
        Log Out
      </Button>
    </div>
  );
}
