import { useState } from "react";
import { LoginDataService } from "../../services/Login.service";

interface CustomError {
  status: number;
  message: string;
  data?: any;
}

interface useRecoveryPasswordProps {
  navigate: (path: string) => void;
}

export function useRecoveryPassword({ navigate }: useRecoveryPasswordProps) {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onClose = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await LoginDataService.recoveryPassword(email);

      if (response.status === 201) {
        const error: CustomError = {
          status: response.status || 0,
          message: "Usuario criado com sucesso",
          data: response || undefined,
        };
        setError(error);
        setIsOpen(true);
        setTimeout(() => {
          navigate("/login");
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
    email,
    isOpen,
    onClose,
    error,

    handleEmailChange,
    handleSubmit,
  };
}
