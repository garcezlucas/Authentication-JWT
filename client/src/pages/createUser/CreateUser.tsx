import "./_createUser.scss";

import ModalFeedBack from "../../components/modalFeedback/ModalFeedback";
import OpenEye from "../../assets/icons/open_eye.svg";
import CloseEye from "../../assets/icons/close_eye.svg";
import { useCreateUser } from "./useCreateuser";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    userName,
    email,
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
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    onClose,
    handleSubmit,
  } = useCreateUser({ navigate });

  return (
    <div className="createuser-container">
      <div className="createuser-container-fix">
        <div className="createuser-container-header">
          <header>Criar usuário</header>
        </div>
        <div className="createuser-container-message">
          <p>Por favor, insira suas informações!</p>
        </div>
        <form
          className="createuser-container-forms"
          onSubmit={handleSubmit}
        >
          <div className="createuser-container-forms-input">
            <input
              type="text"
              placeholder="Primeiro nome"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="createuser-container-forms-input">
            <input
              type="text"
              placeholder="Sobrenome"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="createuser-container-forms-input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="createuser-container-forms-input">
            <input
              type="text"
              placeholder="userName"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="createuser-container-forms-password">
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Senha"
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
          <div className="createuser-container-forms-password">
            <input
              type={`${showConfirmPassword ? "text" : "password"}`}
              placeholder="Confirmação da senha"
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
            <div className="createuser-container-forms-error">
              <p>As senhas precisam ser iguais!</p>
            </div>
          )}
          {!validPassword.status && (
            <div className="createuser-container-forms-error">
              {validPassword.message.map((message) => {
                return <p>{message}</p>;
              })}
            </div>
          )}
          <div className="createuser-container-button">
            <button type="button" onClick={() => navigate("/login")}>
              <span>Voltar</span>
            </button>
            <button type="submit">
              <span>Criar</span>
            </button>
          </div>
        </form>
      </div>
      <ModalFeedBack isOpen={isOpen} onClose={onClose} response={error} />
    </div>
  );
}

export default CreateUser;
