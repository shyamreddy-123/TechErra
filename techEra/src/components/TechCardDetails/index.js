import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Headers from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechCardDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    TechDetails: [],
  }

  componentDidMount() {
    this.getTechDetails()
  }

  getTechDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        description: data.course_details.description,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      this.setState({
        TechDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Oops! Somethings Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getTechDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {TechDetails} = this.state
    return (
      <div className="main-container">
        <div className="card-container">
          <img
            src={TechDetails.imageUrl}
            alt={TechDetails.name}
            className="tech-image"
          />
          <div className="text-container">
            <h1 className="name-heading">{TechDetails.name}</h1>
            <p className="description">{TechDetails.description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderConditionalViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Headers />
        {this.renderConditionalViews()}
      </>
    )
  }
}
export default TechCardDetails
