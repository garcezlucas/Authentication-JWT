import "./_createUser.scss";
import { useState } from "react";
import {
  PasswordValidationResult,
  validatePassword,
} from "../../utils/ValidatePassword";
import { useNavigate } from "react-router-dom";
import { LoginDataService } from "../../services/Login.service";
import ModalFeedBack from "../reusables/ModalFeedBack/ModalFeedback";
import OpenEye from "../../assets/icons/open_eye.svg";
import CloseEye from "../../assets/icons/close_eye.svg";

interface CustomError {
  status: number;
  message: string;
  data?: any;
}

function CreateUserComponent() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<PasswordValidationResult>({
    status: true,
    message: [],
  });
  const [error, setError] = useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setValidPassword({
      status: true,
      message: [],
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setValidPassword({
      status: true,
      message: [],
    });
  };

  const onClose = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validationResult = validatePassword(password, userName);

      if (!validationResult.status) {
        setValidPassword(validationResult);
        return;
      }

      const response = await LoginDataService.createUser(
        firstName,
        lastName,
        userName,
        password
      );

      if (response.status === 201) {
        const error: CustomError = {
          status: response.status || 0,
          message: "Usuario criado com sucesso",
          data: response || undefined,
        };
        setError(error);
        setIsOpen(true);
        setTimeout(() => {
          navigate('/')
        }, 5000)
      } else if ("message" in response && response.status !== 200) {
        const error: CustomError = {
          status: response.status || 0,
          message: response.message || "An error occurred",
          data: response || undefined,
        };
        setError(error);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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

export default CreateUserComponent;
