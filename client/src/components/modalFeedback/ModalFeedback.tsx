import "./_modalFeedback.scss";
import Error from "../../assets/icons/robot-error.svg";
import Success from "../../assets/icons/robot-success.svg";

interface ModalFeedBackProps {
  isOpen: boolean;
  onClose: () => void;
  response: { status: number; message: string };
}

function ModalFeedBack({ isOpen, onClose, response }: ModalFeedBackProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-feedback-container">
      <div className="modal-feedback-container-fix">
        <div className="modal-feedback-container-header">
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-feedback-container-body">
          {200 < response?.status && response?.status < 299 ? (
            <img src={Success} alt="success" />
          ) : (
            <img src={Error} alt="error" />
          )}
          <header>
            {response?.status} - {response?.message}
          </header>
        </div>
        <div className="modal-feedback-container-footer">
          {200 < response?.status && response?.status < 299 ? (
            <button onClick={onClose}>
              <span>Entendi</span>
            </button>
          ) : (
            <button onClick={onClose}>
              <span>Try again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalFeedBack;
