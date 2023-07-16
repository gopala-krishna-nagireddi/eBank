import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onLogoutUser = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="logo-logout-btn-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button className="logout-btn" type="button" onClick={onLogoutUser}>
          Logout
        </button>
      </div>
      <div className="digital-card-container">
        <h1 className="card-heading">Your Flexibility, Our Excellence</h1>
        <img
          className="digital-card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
