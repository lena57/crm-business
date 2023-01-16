import React, {useEffect} from 'react';
import TableOrders from "./TableOrders";
import { getOrdersInActions} from "../redux/actions";
import {connect} from "react-redux";
import CreateOrderModal from "./CreateOrderModal";
import UpdateOrderModal from "./UpdateOrderModal";
import DeleteOrderModal from "./DeleteOrderModal";

const Orders = (props) => {

  useEffect(() => {
    props.getOrders()

  }, [])

  const config = [
    {key: 'orderNumber', label: '#', render: (row) => <b>{row.orderNumber}</b>},
    {key: 'name', label: 'Name', render: (row) => <b>{row.clientName}</b>},
    {key: 'job', label: 'Service', render: (row) => <span>{row.service.job} ({row.service.employee})</span>},
    {key: 'price', label: 'Price', render: (row) => <b>${+row.service.price}</b>},
    {key: 'payments', label: 'Payments', render: (row) => <b>${+row.paid.payment}</b>},
    {key: 'debt', label: 'Debt', render: (row) => <b>${+row.paid.debt}</b>},
    {key: 'data', label: 'Create at', render: (row) => <span>{row.service.createAt}</span>},
    {
      key: 'statuses', label: 'Statuses', render: (row) => <>
        <div>In progress: <b>{row.sentToDo.status ? <span>&#10003;</span> : ''}</b></div>
        <div>Job completed: <b>{row.completed.status ? <span>&#10003;</span> : ''}</b></div>
        <div>Say to client: <b>{row.sayToClient.status ? <span>&#10003;</span> : ''}</b></div>
        <div>Client received: <b>{row.clientReceived.status ? <span>&#10003;</span> : ''}</b></div>
        <div>Paid: <b>{row.paid.status ? <span>&#10003;</span> : ''}</b></div>
      </>
    },
    {
      key: 'dates', label: 'Dates', render: (row) => <>
        <div>In progress date: <b>{row.sentToDo.date}</b></div>
        <div>Job completed date: <b>{row.completed.date}</b></div>
        <div>Say to client: <b>{row.sayToClient.date}</b></div>
        <div>Client received date: <b>{row.clientReceived.date}</b></div>
        <div>Paid date: <b>{row.paid.date}</b></div>
      </>
    },
    {
      key: 'update', label: 'Action Update', render: (row) => <UpdateOrderModal row={row}/>
    },
    {
      key: 'delete', label: 'Action Update', render: (row) => <DeleteOrderModal row={row}/>
    },
  ]

    return (
      <div>
        <h2>Orders</h2>
        <CreateOrderModal />
        <TableOrders orders={props.orders} config={config}/>
      </div>
    )
  };

  const mapStateToProps = (state) => ({
    orders: state.orders,
  })

  const mapDispatchToProps = (dispatch) => ({
    getOrders: () => dispatch(getOrdersInActions()),
  })

  export default connect(mapStateToProps, mapDispatchToProps)(Orders);
