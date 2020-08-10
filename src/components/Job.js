import React, { useState } from 'react';
import { 
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import JoblyApi from '../JoblyApi';

function Job({ job, applied }) {
  const [btnText, setBtnText] = useState(applied ? 'Applied' : 'Apply')
  const [isDisabled, setIsDisabled] = useState(applied ? true : false)
  const [error, setError] = useState(false)

  const apply = async e => {
    e.preventDefault()
    try {
      await JoblyApi.apply(e.target.id)
      setBtnText('Applied')
      setIsDisabled(true)
    } catch (err) {
      setError(true)
    }
  }

  return (
    <>
      <Card className="mt-2">
        <CardBody>
          <h6 className="d-flex justify-content-between">{job.title}</h6>
          <div>Salary: {job.salary}</div>
          <div>Equity: {job.equity}</div>
          {error && <span className="text-danger">Can't apply for this job</span>}
          <Button 
            className="text-uppercase btn-danger float-right"
            onClick={apply}
            id={job.id}
            disabled={isDisabled}
          >
            {btnText}
          </Button>
        </CardBody>
      </Card>
  </>
  )
}

export default Job