import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ShowTechnologies from '../ShowTechnologies'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    TechSoftList: [],
  }

  componentDidMount() {
    this.getTechDetails()
  }

  getTechDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/te/courses`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        TechSoftList: formattedData,
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

  renderSuccessView = () => {
    const {TechSoftList} = this.state
    return (
      <div className="main-container">
        <h1 className="courses-text">Courses</h1>
        <ul className="tech-list-container">
          {TechSoftList.map(eachTech => (
            <ShowTechnologies Tech={eachTech} key={eachTech.id} />
          ))}
        </ul>
      </div>
    )
  }

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
        onClick={this.getTechDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSwitchStatementViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderSwitchStatementViews()}
      </>
    )
  }
}
export default Home
