import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userID: '', pin: '', errMsg: ''}

  onUserLogin = async event => {
    event.preventDefault()

    const {userID, pin} = this.state

    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: userID, pin}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})

      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  onInputUserID = event => {
    this.setState({userID: event.target.value})
  }

  onInputPin = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {userID, pin, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="user-login-container">
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <div className="form-container">
            <h1 className="login-heading">Welcome Back!</h1>
            <form onSubmit={this.onUserLogin}>
              <div className="input-container">
                <label className="label" htmlFor="user-id">
                  User ID
                </label>
                <input
                  className="input"
                  id="user-id"
                  type="text"
                  value={userID}
                  placeholder="Enter User ID"
                  onChange={this.onInputUserID}
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="pin">
                  PIN
                </label>
                <input
                  className="input"
                  id="pin"
                  type="password"
                  value={pin}
                  placeholder="Enter PIN"
                  onChange={this.onInputPin}
                />
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
            </form>
            <div className="err-container">
              {errMsg !== '' && <p className="login-err">{errMsg}</p>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
