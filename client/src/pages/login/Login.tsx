import "./_login.scss";
import ModalFeedBack from "../../components/modalFeedback/ModalFeedback";
import OpenEye from "../../assets/icons/open_eye.svg";
import CloseEye from "../../assets/icons/close_eye.svg";
import { useLogin } from "./useLogin";

const Login: React.FC = () => {
  const {
    handleSubmit,
    userName,
    handleUserNameChange,
    password,
    showPassword,
    setShowPassword,
    handlePasswordChange,
    navigate,
    isOpen,
    onClose,
    error,
  } = useLogin();

  return (
    <div className="login-component-container">
      <div className="login-component-container-fix">
        <div className="login-component-container-header">
          <header>Login</header>
        </div>
        <div className="login-component-container-message">
          <p>Por favor, insira seu userName e senha!</p>
        </div>
        <form
          className="login-component-container-forms"
          onSubmit={handleSubmit}
        >
          <div className="login-component-container-forms-userName">
            <input
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="login-component-container-forms-password">
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
          <div className="login-component-container-footer">
            <span onClick={() => navigate("/createuser")}>Criar usuário</span>
            <span onClick={() => navigate("/recoverypassword")}>Esqueceu a senha?</span>
          </div>
          <div className="login-component-container-button">
            <button type="submit">
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
      <ModalFeedBack isOpen={isOpen} onClose={onClose} response={error} />
    </div>
  );
};

export default Login;
