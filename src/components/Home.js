import React from 'react';
import { Button, Container } from 'reactstrap';
import { useAuth } from './context/auth'

const Home = () => {
  const { authToken } = useAuth()
  return (
    <Container className="text-center">
      <h1>Jobly</h1>
      <p className="lead">All the jobs in one, convenient place.</p>
      {authToken ? 
        <h2>Welcome back!</h2>
        :
        <Button className="font-weight-bold" color="primary" href="/login">Log in</Button>
      }
    </Container>
  )
}

export default Home;