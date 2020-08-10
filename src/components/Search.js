import React, { useState } from 'react';
import { 
  Form,
  Input,
  Button
} from 'reactstrap';
import '../Search.css';

function Search({ search }) {
  const [query, setQuery] = useState('')

  const handleChange = e => {
    setQuery(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    search(query)
  }

  return (
    <div>
      <Form className="form-inline rounded-left" onSubmit={handleSubmit}>
      <Input 
        className="form-control rounded-left form-control-lg flex-grow-1" 
        type="search" 
        name="search" 
        id="search" 
        placeholder="Enter search term.."
        bsSize="lg"
        onChange={handleChange}
        value={query}
      />
      <Button className="btn btn-lg rounded-0" color="primary">Submit</Button>
      </Form>
    </div>
  )
}

export default Search