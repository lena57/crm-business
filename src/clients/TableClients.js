import React from 'react';

const TableClients = (props) => {
  const {clients, config} = props;

  return (
      <div>
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            {config.map((el) =>
              <th key={el.key}>
                {el.label}
              </th>)}
          </tr>
          </thead>


          <tbody>
          {clients.map((row) => <tr key={row._id}>
            {config.map((el) =>
              <td key={el.key}>
                {el.render(row)}
              </td>)}
          </tr>)}
          </tbody>
        </table>

      </div>
  );
};

export default TableClients;
