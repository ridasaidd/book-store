import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

const mockData = [
  {
    id: 0,
    dossnr: '00-00 00 00',
    ward: 1,
    room: '0:0',
    book: 'MockBook',
    copy: '00-00',
    dateOut: '2022-01-01',
    dateIn: '2022-01-07',
    status: 'Mock status'
  },
  {
    id: 1,
    dossnr: '00-00 00 00',
    ward: 1,
    room: '0:0',
    book: 'MockBook',
    copy: '00-00',
    dateOut: '2022-01-01',
    dateIn: '2022-01-07',
    status: 'Mock status'
  },
  {
    id: 2,
    dossnr: '00-00 00 00',
    ward: 1,
    room: '0:0',
    book: 'MockBook',
    copy: '00-00',
    dateOut: '2022-01-01',
    dateIn: '2022-01-07',
    status: 'Mock status'
  },
  {
    id: 3,
    dossnr: '00-00 00 00',
    ward: 1,
    room: '0:0',
    book: 'MockBook',
    copy: '00-00',
    dateOut: '2022-01-01',
    dateIn: '2022-01-07',
    status: 'Mock status'
  },
]

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>DOSSNR</TableCell>
            <TableCell>AVD</TableCell>
            <TableCell>RUM</TableCell>
            <TableCell>BOK</TableCell>
            <TableCell>EXEMPLAR</TableCell>
            <TableCell>DATUM UT</TableCell>
            <TableCell>DATUM IN</TableCell>
            <TableCell>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.dossnr}</TableCell>
              <TableCell>{row.ward}</TableCell>
              <TableCell>{row.room}</TableCell>
              <TableCell>{row.book}</TableCell>
              <TableCell>{row.copy}</TableCell>
              <TableCell>{row.dateOut}</TableCell>
              <TableCell>{row.dateIn}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}