import React from 'react';
import {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import TableClients from "./TableClients";
import UpdateClientModal from "./UpdateClientModal";
import CreateClientModal from "./CreateClientModal";
import DeleteClientModal from "./DeleteClientModal";
import {
  addClientInActions,
  deleteClientInActions,
  getClientsInActions,
  updateClientInActions
} from "../redux/actions";
import {connect} from "react-redux";

const Clients = (props) => {
  console.log('clients', props.clients)

  useEffect(() => {
    props.getClients()
  }, [])

  const config = [
    //{key: 'id', label: 'Job', render: (row) => <span>{row._id}</span>},
    {key: 'name', label: 'Name', render: (row) => <span>{row.name}</span>},
    {key: 'address', label: 'Address', render: (row) => <span>{row.address}</span>},
    {key: 'phone', label: 'Phone', render: (row) => <span>{row.phoneNumber}</span>},
    {
      key: 'update', label: 'Action Update', render: (row) =>
        <UpdateClientModal row={row} updateClient={props.updateClient}/>
    },
    {
      key: 'delete', label: 'Action Delete', render: (row) =>
        <DeleteClientModal row={row} deleteClient={props.deleteClient}/>
    },
  ]

  return (
    <div>
      <h2>Clients</h2>
      <CreateClientModal addClient={props.addClient}/>
      <TableClients clients={props.clients} config={config}/>
    </div>
  )
};

const mapStateToProps = (state) => ({
  clients: state.clients

})

const mapDispatchToProps = (dispatch) => ({
  getClients: () => dispatch(getClientsInActions()),
  addClient: (newClient) => dispatch(addClientInActions(newClient)),
  updateClient: (id, newClient) => dispatch(updateClientInActions(id, newClient)),
  deleteClient: (id) => dispatch(deleteClientInActions(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(Clients);
