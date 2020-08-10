import React from 'react';
import { Card, CardBody, CardLink } from 'reactstrap';

const CompanyCard = ({ company }) => {

  return (
    <Card className="mt-2">
      <CardBody>
        <h6 className="d-flex justify-content-between">
          <span className="text-capitalize">{company.name}</span>
          <img 
            src={company.logo_url || 
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8zMzM3NzeqqqojIyMvLy8fHx/5+fkoKCjExMQZGRn19fWKioq0tLTe3t7IyMi9vb1KSkpSUlJ1dXUREREWFhYNDQ1DQ0OoqKiampqTk5OIiIjf39+4uLjMzMzX19cAAABnZ2daWlpqamp1ZtF1AAAChklEQVR4nO3c4VLiMBRAYWKbGkBBVlSEXVjd93/HBWTW3EqvXW2b9nK+v810ciYM9iI6GgEAAAAAAAAAAAAAAAAAcMF2qTfQtuz3KvUW2pU9uAfTidmjc+7RcOL+BA/snuLxBA+WRhNPJ3g8xefUm2lDtnTOdKIItJgYvUTfTIwl/nuTiU5xnXpTTfpwgsdTNJR45gRtJZ49wWPiTeqtNaPiBO0kVp6glcTSz0F7iZ8E7hM3qbf4PbfaS/RNMehE5U3GxinWOMFhn6I8wXwZKywkTsUJ5rej63ejnUicTFNv9kumeakw9nMSXwwGC2cUDgGFFPYfhRT2H4UUDkAQhb/EtR4/l97UtvFxhH8RF+9Dbwt9qM0JXrnYq8Ir1wIKO0UhhRSmRyGFFKZ3aYXyYdNXBHy6tL+F/uU+9qok+lex9I9Y2t/CYiuuzQtXaTjzoSyci2tjrXAwMz6FFJ5QmBCFFJ5QmBCFFJ4M5rl0LL7odJe7Sup3osL0urZuC/dDUay678NSr13TXHVd2DX7hY5CCimkkEIKKaSQwv8vzCcxZbTYzw/1l2p37bgwz2a7d7OVsu/wLJaqg9ZKLM3E0o4Lm/rNjFSaq7firl0XNvQpRqlwLJbOKaSQQgoppJBCCin8ZqH559KwvoutS39iIZZuxvFSdQzR7tr1fBiKmBJYXqqPkspdmfEppJBCCimkkEIKKTxT2NA3hrSlaQufFrEnbddy6UJL1O6adj7cNjQfandlxqeQQgoppJBCCimk8BILzf9mxi9+xPSRqPZS9a5dz4f+q2Ot/u8XlKV8ikEhhRRSSCGFFFJI4UHI0wqtF2aptV4IAAAAAAAAAAAAAAAAAECL/gIyKGcE1AtEQgAAAABJRU5ErkJggg=='} 
            height="50px" 
            alt={`${company.name} Logo`} 
          />
        </h6>
        <p>
          {company.description}
        </p>
      </CardBody>
      <CardLink className="stretched-link" href={`/companies/${company.handle}`}/>
    </Card>
  )
}

export default CompanyCard;