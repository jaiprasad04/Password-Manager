import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isDeletePassword, isActive} = props
  const {id, websiteName, userName, password, initialClassName} =
    passwordDetails
  const initial = websiteName ? websiteName[0].toUpperCase() : ''

  const onClickDelete = () => {
    isDeletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="details">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <p className="website-name">{websiteName}</p>
          <p className="user-name">{userName}</p>
          {isActive ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          ) : (
            <p className="password">{password}</p>
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onClickDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
