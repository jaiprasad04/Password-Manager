import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isActive: true,
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  isDeletePassword = id => {
    const {passwordsList} = this.state
    const deletePassword = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({passwordsList: deletePassword})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialContainerBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPassword = {
      id: v4(),
      websiteName: websiteInput,
      userName: usernameInput,
      password: passwordInput,
      initialClassName: initialContainerBackgroundClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      searchInput: '',
    }))
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      searchInput,
      isActive,
    } = this.state
    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-create-container">
          <form className="form-container" onSubmit={this.onAddPassword}>
            <h1 className="content-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <div className="password-manager-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-img"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img2"
            />
          </div>
        </div>
        <div className="password-stored-container">
          <div className="password-content">
            <div className="content-header">
              <h1 className="content-heading">Your Passwords</h1>
              <p className="password-count">{passwordsList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search"
              />
              <input
                type="search"
                placeholder="Search"
                className="input-search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <div>
            <hr className="horizontal-line" />
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              Show Passwords
            </label>
          </div>
          {searchResults.length < 1 ? (
            <div className="no-passwords-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords"
              />
              <p className="content-heading">No Passwords</p>
            </div>
          ) : (
            <ul className="password-list-container">
              {searchResults.map(eachPassword => (
                <PasswordItem
                  id={eachPassword.id}
                  key={eachPassword.id}
                  isActive={isActive}
                  passwordDetails={eachPassword}
                  isDeletePassword={this.isDeletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
