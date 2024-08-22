
import PropTypes from 'prop-types';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),

];

export default function Tables({ title, href, dateTime }) {
  return (
    <>
      <table>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Button</th>
        </tr>
        {rows.map((val, key) => {
          return (
            <tr key={key}>
              <td>{title}</td>
              <td>{dateTime}</td>
              <td>
                <button>
                  <a href={href} target='_blank'>Download</a>
                </button>
              </td>
            </tr>
          )
        })}
      </table>
    </>
  );
}
Tables.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  // time: PropTypes.string.isRequired, 
};
