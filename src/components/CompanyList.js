import React, { useState, useEffect } from 'react';
import JoblyApi from '../JoblyApi';
import { Spinner } from 'reactstrap';
import CompanyCard from './CompanyCard';
import Search from './Search';

const CompanyList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([])
  const [isError, setIsError] = useState(false)

  const getCompanies = async () => {
    try {
      const companyList = await JoblyApi.getCompanies();
      setCompanies(companyList);
      setIsLoading(false);
    } catch (err) {
      setIsError(true)
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  const search = async (query) => {
    const result = await JoblyApi.findCompany({'search': query})
    setCompanies(result.companies)
  }

  return (
    <>
      <Search search={search} />
      {companies.map(company => (
        <CompanyCard company={company} key={company.handle}/>
      ))}
      {isError && <p>Can't load companies.</p>}
    </>
  )
}

export default CompanyList;