import React, { useState, useEffect } from 'react';
import JoblyApi from '../JoblyApi';
import Search from './Search';
import Job from './Job';
import { useAuth } from "./context/auth";
import { getUserFromToken } from '../utils'; 

const JobList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([])
  const [isError, setIsError] = useState(false)
  const [appliedList, setAppliedList] = useState([])
  const [fetched, setFetched] = useState(false)

  const { authToken } = useAuth()
  const username = getUserFromToken(authToken)

  const getJobs = async () => {
    try {
      const jobList = await JoblyApi.getJobs();
      setJobs(jobList);
      setIsLoading(false);
    } catch (err) {
      setIsError(true)
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    const getAppliedList = async () => {
      const res = await JoblyApi.getUser(username)
      setAppliedList(res.user.jobs.map(j => j.id))
      setFetched(true)
    }
    getAppliedList()
  }, [username])

  if (isLoading || !fetched) {
    return <p>I am loading!</p>
  }

  const search = async (query) => {
    const result = await JoblyApi.findJob({'search': query})
    setJobs(result.jobs)
  }

  return (
    <>
    <Search search={search} />
      {jobs.map(job => (
        <Job job={job} key={job.id} applied={appliedList.includes(job.id)}/>
      ))}
    {isError && <p>Can't load jobs.</p>}
    </>
  )
}

export default JobList;