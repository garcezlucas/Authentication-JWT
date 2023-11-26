import { useNavigate } from "react-router-dom";
import LoginComponent from "../../components/login/Login";
import { useState } from "react";
import { LoginDataService } from "../../services/Login.service";

interface CustomError {
  status: number;
  message: string;
  data?: any;
}

function LoginPage() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClose = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await LoginDataService.signin(userName, password);

      if (response.status === 200) {
        navigate("/");
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

  const loginPropsData = {
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
  };

  return <LoginComponent loginPropsData={loginPropsData} />;
}

export default LoginPage;
