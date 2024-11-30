import { useNavigate } from "react-router-dom";
import ModalFeedBack from "../../components/modalFeedback/ModalFeedback";
import "./_recoveryPassword.scss";
import { useRecoveryPassword } from "./useRecoveryPassowrd";

const RecoveryPassword = () => {
  const navigate = useNavigate();

  const {
    email,
    isOpen,
    onClose,
    error,

    handleEmailChange,
    handleSubmit,
  } = useRecoveryPassword({ navigate });

  return (
    <div className="recoveryPassword-container">
      <div className="recoveryPassword-container-fix">
        <div className="recoveryPassword-container-header">
          <header>Recuperaçao de senha</header>
        </div>
        <div className="recoveryPassword-container-message">
          <p>Por favor, insira seu email!</p>
        </div>
        <form
          className="recoveryPassword-container-forms"
          onSubmit={handleSubmit}
        >
          <div className="recoveryPassword-container-forms-input">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="recoveryPassword-container-button">
            <button type="button" onClick={() => navigate("/login")}>
              <span>Voltar</span>
            </button>
            <button type="submit">
              <span>Enviar</span>
            </button>
          </div>
        </form>
      </div>
      <ModalFeedBack isOpen={isOpen} onClose={onClose} response={error} />
    </div>
  );
};

export default RecoveryPassword;
