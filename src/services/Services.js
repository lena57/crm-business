import React from 'react';
import {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import TableServices from "./TableServices";
import CreateJobModal from "./CreateJobModal";
import DeleteJobModal from "./DeleteJobModal";
import UpdateJobModal from "./UpdateJobModal";
import {addJobInActions, deleteJobInActions, getJobsInActions, updateJobInActions} from "../redux/actions";
import {connect} from "react-redux";

const Services = (props) => {
  console.log('services', props.services)

  useEffect(() => {
    props.getJobs()
  }, [])

  const config = [
    //{key: 'id', label: 'Job', render: (row) => <span>{row._id}</span>},
    {key: 'job', label: 'Job', render: (row) => <span>{row.job}</span>},
    {key: 'price', label: 'Price', render: (row) => <span>${row.price}</span>},
    {key: 'primeCost', label: 'Prime Cost', render: (row) => <span>${row.primeCost}</span>},
    {key: 'employee', label: 'Employee', render: (row) => <span>{row.employee}</span>},
    {
      key: 'update', label: 'Action Update', render: (row) => <UpdateJobModal row={row}
                                                                      updateJob={props.updateJob}/>
    },
    {
      key: 'delete', label: 'Action Delete', render: (row) => <DeleteJobModal row={row}
                                                                   deleteJob={props.deleteJob}/>
    },
  ]

  return (
    <div>
      <div  style={{display: "inline"}}>
        <h2>Services</h2>
        <CreateJobModal addJob={props.addJob}/>
      </div>
      <TableServices services={props.services} config={config}/>
    </div>
  )
};

const mapStateToProps = (state) => ({
  services: state.services
})

const mapDispatchToProps= (dispatch) => ({
  getJobs: () => dispatch(getJobsInActions()),
  addJob: (newJob) => dispatch(addJobInActions(newJob)),
  updateJob: (id, newJob) => dispatch(updateJobInActions(id, newJob)),
  deleteJob: (id) => dispatch(deleteJobInActions(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Services);
