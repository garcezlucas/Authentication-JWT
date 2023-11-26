import "./_login.scss";
import ModalFeedBack from "../reusables/ModalFeedBack/ModalFeedback";
import OpenEye from "../../assets/icons/open_eye.svg";
import CloseEye from "../../assets/icons/close_eye.svg";

interface LoginComponentProps {
  loginPropsData: {
    handleSubmit: (e: React.FormEvent) => void;
    userName: string;
    handleUserNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    password: string;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    navigate: (path: string) => void;
    isOpen: boolean;
    onClose: () => void;
    error: { status: number; message: string };
  };
}

function LoginComponent({ loginPropsData }: LoginComponentProps) {
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
  } = loginPropsData;

  return (
    <div className="login-component-container">
      <div className="login-component-container-fix">
        <div className="login-component-container-header">
          <header>Login</header>
        </div>
        <div className="login-component-container-message">
          <p>Please enter your login and password!</p>
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
          <div className="login-component-container-footer">
            <span onClick={() => navigate("/createuser")}>Criar usuário</span>
            <span>Forgot password?</span>
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
}

export default LoginComponent;
