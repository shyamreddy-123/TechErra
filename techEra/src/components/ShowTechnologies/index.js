import {Link} from 'react-router-dom'
import './index.css'

const ShowTechnologies = props => {
  const {Tech} = props
  const {id, logoUrl, name} = Tech
  return (
    <Link to={`courses/${id}`} className="link-item">
      <li className="list-container">
        <img src={logoUrl} alt={name} className="logo" />
        <h1 className="heading">{name}</h1>
      </li>
    </Link>
  )
}
export default ShowTechnologies
