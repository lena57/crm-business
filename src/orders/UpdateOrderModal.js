import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import {connect} from "react-redux";
import {updateOrderInActions} from "../redux/actions";
import {getDataFunction} from "../GetData";

const UpdateOrderModal = (props) => {
  const {row} = props
  //some orders have no paid status
  if (!row.paid.status) {
    row.paid.status = false
  }

  const [newPayment, setNewPayment] = useState(0)
  const [inProgress, setInProgress] = useState(row.sentToDo.status)
  const [jobCompleted, setJobCompleted] = useState(row.completed.status)
  const [sayToClient, setSayToClient] = useState(row.sayToClient.status)
  const [clientReceived, setClientReceived] = useState(row.clientReceived.status)
  const [paidStatus, setPaidStatus] = useState(row.paid.status)
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setNewPayment(0)
    setInProgress(row.sentToDo.status)
    setJobCompleted(row.completed.status)
    setSayToClient(row.sayToClient.status)
    setClientReceived(row.clientReceived.status)
    setPaidStatus(row.paid.status)
  };

  function changePaidStatus() {
    if ((+row.paid.debt - newPayment) <= 0) {
      setPaidStatus(true)
    }
    setPaidStatus(false)
  }
console.log('paidStatus', paidStatus)
  const saveButtonHandler = () => {

    const newOrder = {
      "orderNumber": props.row.orderNumber,
      "clientName": props.row.clientName,
      "service": {
        ...props.row.service
      },
      "sentToDo": {
        "date": inProgress ? getDataFunction() : '',
        "status": inProgress
      },
      "completed": {
        "date": jobCompleted ? getDataFunction() : '',
        "status": jobCompleted
      },
      "sayToClient": {
        "date": sayToClient ? getDataFunction() : '',
        "status": sayToClient
      },
      "clientReceived": {
        "date": clientReceived ? getDataFunction() : '',
        "status": clientReceived
      },
      "paid": {
        "payment": row.paid.payment + newPayment,
        "debt": +row.paid.debt - newPayment,
        "primeCost": +row.paid.primeCost,
        "status": paidStatus,
        "date": paidStatus ? getDataFunction() : '',
      }
    }
    console.log('newOrderUpdate', newOrder)

    changePaidStatus()
    props.updateOrder(row._id, newOrder)
    toggle()
  }

  return (
    <div>
      <Button outline color="primary" onClick={toggle}>Update Order</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Order</ModalHeader>
        <ModalBody>
          Client name:
          <span> <b> {row.clientName}</b></span>
          <hr/>
          Service:
          <span> <b> {row.service.job}</b></span>
          <hr/>
          Price($):
          <span> <b>{+row.service.price}</b></span>
          <hr/>
          Debt($):
          <span> <b>{+row.paid.debt}</b></span>
          <hr/>
          New Payment:
          <Input value={newPayment} type='number'
                 onChange={(e) => setNewPayment(+e.target.value)}/>
          <hr/>

          <div className="form-check">
            <Input checked={inProgress} className="form-check-input" type="checkbox" value="inProgress"
                   id="flexCheckDefault" onChange={() => setInProgress(!inProgress)}/>
            In Progress
          </div>
          <hr/>
          <div className="form-check">
            <Input checked={jobCompleted} className="form-check-input" type="checkbox" value="jobCompleted"
                   id="flexCheckDefault" onChange={() => setJobCompleted(!jobCompleted)}/>
            Job completed
          </div>
          <hr/>
          <div className="form-check">
            <Input checked={sayToClient} className="form-check-input" type="checkbox" value="sayToClient"
                   id="flexCheckDefault" onChange={() => setSayToClient(!sayToClient)}/>
            Say to client
          </div>
          <hr/>
          <div className="form-check">
            <Input checked={clientReceived} className="form-check-input" type="checkbox"
                   value="clientReceived" id="flexCheckDefault" onChange={() => setClientReceived(!clientReceived)}/>
            Client received
          </div>
          <hr/>

          {/*<div className="form-check">*/}
          {/*  <Input checked={paidStatus} className="form-check-input" type="checkbox"*/}
          {/*         value="clientReceived" id="flexCheckDefault"*/}
          {/*         onChange={() => setPaidStatus(!paidStatus)}/>*/}
          {/*  Paid*/}
          {/*</div>*/}
          {/*? <span>&#10003;</span> : null*/}
          <span>  Paid:<b>{paidStatus ? <span>&#10003;</span> : 'no'}</b></span>

        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={saveButtonHandler}>
            Save
          </Button>
          <Button color="warning" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateOrder: (id, newOrder) => dispatch(updateOrderInActions(id, newOrder))
})

export default connect(null, mapDispatchToProps)(UpdateOrderModal);
