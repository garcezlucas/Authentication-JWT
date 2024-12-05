import { useState } from "react";
import { AuthDataService } from "../../services/Auth.service";
import { CustomError } from "../../interfaces/CustomError";

interface useLoginProps {
  navigate: (path: string) => void;
}

export function useLogin({ navigate }: useLoginProps) {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      const response = await AuthDataService.signin(userName, password);

      if (response.status === 200) {
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('refresh', response.data.refresh_token);
        navigate("/system/dashboard");
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
}
