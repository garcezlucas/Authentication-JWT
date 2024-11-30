import { useState } from "react";
import {
  PasswordValidationResult,
  validatePassword,
} from "../../utils/ValidatePassword";
import { useNavigate } from "react-router-dom";
import { LoginDataService } from "../../services/Login.service";

interface CustomError {
  status: number;
  message: string;
  data?: any;
}

export function useCreateUser() {
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
          navigate("/");
        }, 5000);
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

  return {
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
  };
}
