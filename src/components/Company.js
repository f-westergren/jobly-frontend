import React, {useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Job from './Job';
import JoblyApi from '../JoblyApi';
import { useAuth } from "./context/auth";
import { getUserFromToken } from '../utils'; 

function Company() {
  const { handle } = useParams()
  const [company, setCompany] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [appliedList, setAppliedList] = useState([])
  const [fetched, setFetched] = useState(false)
  
  const { authToken } = useAuth()
  const username = getUserFromToken(authToken)

  useEffect(() => {
    async function getCompany(id) {
      const c = await JoblyApi.getCompany(id)
      setCompany(c)
      setIsLoading(false)
    }
    getCompany(handle)
  }, [handle])



  useEffect(() => {
    const getAppliedList = async () => {
      const res = await JoblyApi.getUser(username)
      setAppliedList(res.user.jobs.map(j => j.id))
      setFetched(true)
    }
    getAppliedList()
  }, [username])

  if (isLoading || !fetched) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (!company) return <Redirect to='/companies' />
  
  return (
    <>
      <h5 className="text-capitalize">{company.name}</h5>
      <p>"{company.description}"</p>
      {company.jobs.map(j => (
        <Job job={j} key={j.id} applied={appliedList.includes(j.id)}/>
      ))}
    </>
  )
}

export default Company;