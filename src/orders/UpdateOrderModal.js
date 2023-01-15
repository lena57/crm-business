import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import {connect} from "react-redux";
import {updateOrderInActions} from "../redux/actions";
import {getDataFunction} from "../GetData";

const UpdateOrderModal = (props) => {
  console.log('propsFromUpdateOrder', props)
  const {row} = props
  if(!row.paid.status){
    row.paid.status = false
  }

  const [newPayment, setNewPayment] = useState(0)
  const [inProgress, setInProgress] = useState(row.sentToDo.status)
  const [jobCompleted, setJobCompleted] = useState(row.completed.status)
  const [sayToClient, setSayToClient] = useState(row.sayToClient.status)
  const [clientReceived, setClientReceived] = useState(row.clientReceived.status)
  const [paidStatus, setPaidStatus] = useState(row.paid.status)

  console.log('paidStatus', paidStatus)

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

  const saveButtonHandler = () => {
    if(row.paid.debt<=0) {
      setPaidStatus(!paidStatus)
    }
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
        "payment": props.row.paid.payment + newPayment,
        "debt": props.row.paid.debt - newPayment,
        "primeCost": props.row.paid.primeCost,
        "status": paidStatus,
        "date": paidStatus ? getDataFunction() : '',
      }
    }
    console.log('newOrderUpdate', newOrder)
    props.updateOrder(props.row._id, newOrder)
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
          <span> <b>{row.service.price}</b></span>
          <hr/>
          New Payment:
          <Input value={newPayment} type='number'
                 onChange={(e) => setNewPayment(+e.target.value)}></Input>
          <hr/>

          <div className="form-check">
            <input checked={inProgress} className="form-check-input" type="checkbox" value="inProgress"
                   id="flexCheckDefault" onChange={() => setInProgress(!inProgress)}/>
            In Progress
          </div>
          <hr/>
          <div className="form-check">
            <input checked={jobCompleted} className="form-check-input" type="checkbox" value="jobCompleted"
                   id="flexCheckDefault" onChange={() => setJobCompleted(!jobCompleted)}/>
            Job completed
          </div>
          <hr/>
          <div className="form-check">
            <input checked={sayToClient} className="form-check-input" type="checkbox" value="sayToClient"
                   id="flexCheckDefault" onChange={() => setSayToClient(!sayToClient)}/>
            Say to client
          </div>
          <hr/>
          <div className="form-check">
            <input checked={clientReceived} className="form-check-input" type="checkbox"
                   value="clientReceived" id="flexCheckDefault" onChange={() => setClientReceived(!clientReceived)}/>
            Client received
          </div>
          <hr/>

          Paid:
          <span> <b>{paidStatus ? <span>&#10003;</span> : null}</b></span>

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
