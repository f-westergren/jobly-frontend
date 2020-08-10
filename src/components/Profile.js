import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
   } from 'reactstrap';
import JoblyApi from '../JoblyApi';
import { useAuth } from "./context/auth";
import { getUserFromToken } from '../utils'; 

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({})
  const [isUpdated, setIsUpdated] = useState(false);

  const { authToken } = useAuth()

  const fields = ['first_name', 'last_name', 'email', 'photo_url', 'password']

  const username = getUserFromToken(authToken)

  useEffect(() => {
    const getUser = async () => {
        const res = await JoblyApi.getUser(username)
        const { first_name, last_name, email, photo_url } = res.user
        setIsLoading(false)
        setError(false)
        setFormData({ first_name, last_name, email, photo_url})
    }
    getUser()
  }, [username])

  if (isLoading) {
    return <p>I am loading!</p>
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await JoblyApi.update(username, formData)
      setIsUpdated(true)
      setTimeout(function(){ setIsUpdated(false) }, 3000);
    } catch (err) {
      err[0] === 'Invalid Credentials' ? setError(err[0]) : setError('Invalid or missing input')
      setTimeout(function(){ setError(false) }, 3000);
    }
  }
  
  return (
    <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label className='font-weight-bold text-capitalize' for='username'>
                Username
              </Label>
              <p className='form-control-plaintext' id='username'>
                {username}
              </p>
            </FormGroup>
            
              {fields.map(i => 
                <FormGroup key={i}>
                  <Label className="font-weight-bold text-capitalize" for={i}>
                  {(i.indexOf('_') !== -1) ? i.replace('_', ' ') : i}
                  </Label>
                  <Input 
                    className='form-control' 
                    type={(i === 'password' || i === 'email' ) ? i : 'text'} 
                    name={i} 
                    id={i}
                    onChange={handleChange}
                    value={formData[i] || ''}
                    minLength={(i === 'password' || i === 'email') ? 5 : 1}                   
                  />
                </FormGroup>
                )}
            {error && <span className="text-danger">{error}</span>}
            {isUpdated && <span>User updated.</span>}
            <Button className="btn-block mt-4" color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Profile;