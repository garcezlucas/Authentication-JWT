import { useState } from "react";
import { LoginDataService } from "../../services/Login.service";
import * as Yup from "yup";

interface CustomError {
  status: number;
  message: string;
  data?: any;
}

interface FormValues {
  email: string;
}

interface useRecoveryPasswordProps {
  navigate: (path: string) => void;
}

export function useRecoveryPassword({ navigate }: useRecoveryPasswordProps) {
  const [error, setError] = useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialValues: FormValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido")
      .required("Email é obrigatório"),
  });

  const onClose = () => setIsOpen(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await LoginDataService.recoveryPassword(values.email);

      if (response.status === 201) {
        const error: CustomError = {
          status: response.status || 0,
          message: "Usuário criado com sucesso",
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
    isOpen,
    onClose,
    error,
    initialValues,
    validationSchema,

    handleSubmit,
  };
}
