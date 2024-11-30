import "./_createUser.scss";

import ModalFeedBack from "../../components/modalFeedback/ModalFeedback";
import OpenEye from "../../assets/icons/open_eye.svg";
import CloseEye from "../../assets/icons/close_eye.svg";
import { useCreateUser } from "./useCreateuser";

function CreateUser() {
  const {
    firstName,
    lastName,
    userName,
    password,
    showPassword,
    setShowPassword,
    confirmPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    validPassword,
    isOpen,
    error,

    handleFirstNameChange,
    handleLastNameChange,
    handleUserNameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    onClose,
    handleSubmit,
  } = useCreateUser();
  return (
    <div className="createuser-component-container">
      <div className="createuser-component-container-fix">
        <div className="createuser-component-container-header">
          <header>Create user</header>
        </div>
        <div className="createuser-component-container-message">
          <p>Please enter your informations!</p>
        </div>
        <form
          className="createuser-component-container-forms"
          onSubmit={handleSubmit}
        >
          <div className="createuser-component-container-forms-firstName">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="createuser-component-container-forms-lastName">
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="createuser-component-container-forms-userName">
            <input
              type="text"
              placeholder="userName"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="createuser-component-container-forms-password">
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {showPassword ? (
              <img
                src={OpenEye}
                alt="open-eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <img
                src={CloseEye}
                alt="close-eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div className="createuser-component-container-forms-password">
            <input
              type={`${showConfirmPassword ? "text" : "password"}`}
              placeholder="Confirme password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {showConfirmPassword ? (
              <img
                src={OpenEye}
                alt="open-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <img
                src={CloseEye}
                alt="close-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          {confirmPassword.length > 0 && password !== confirmPassword && (
            <div className="createuser-component-container-forms-error">
              <p>The passwords must be the same!</p>
            </div>
          )}
          {!validPassword.status && (
            <div className="createuser-component-container-forms-error">
              {validPassword.message.map((message) => {
                return <p>{message}</p>;
              })}
            </div>
          )}
          <div className="createuser-component-container-button">
            <button type="submit">
              <span>Create</span>
            </button>
          </div>
        </form>
      </div>
      <ModalFeedBack isOpen={isOpen} onClose={onClose} response={error} />
    </div>
  );
}

export default CreateUser;
