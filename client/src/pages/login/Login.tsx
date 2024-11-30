import "./_login.scss";
import ModalFeedBack from "../../components/modalFeedback/ModalFeedback";
import OpenEye from "../../assets/icons/open_eye.svg";
import CloseEye from "../../assets/icons/close_eye.svg";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    userName,
    handleUserNameChange,
    password,
    showPassword,
    setShowPassword,
    handlePasswordChange,
    isOpen,
    onClose,
    error,
  } = useLogin({ navigate });

  return (
    <div className="login-container">
      <div className="login-container-fix">
        <div className="login-container-header">
          <header>Login</header>
        </div>
        <div className="login-container-message">
          <p>Por favor, insira seu userName e senha!</p>
        </div>
        <form
          className="login-container-forms"
          onSubmit={handleSubmit}
        >
          <div className="login-container-forms-userName">
            <input
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="login-container-forms-password">
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
          <div className="login-container-footer">
            <span onClick={() => navigate("/createuser")}>Criar usuário</span>
            <span onClick={() => navigate("/recoverypassword")}>
              Esqueceu a senha?
            </span>
          </div>
          <div className="login-container-button">
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
