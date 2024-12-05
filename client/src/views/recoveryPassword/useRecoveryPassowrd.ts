import { useState } from "react";
import * as Yup from "yup";
import { UserDataService } from "../../services/User.service";
import { CustomError } from "../../interfaces/CustomError";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
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
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido")
      .required("Email é obrigatório"),
      password: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "As senhas precisam ser iguais")
        .required("Confirmação de senha é obrigatória"),
  });

  const onClose = () => setIsOpen(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      const data = {
        email: values.email,
        password: values.password
      }
      const response = await UserDataService.recoveryPassword(data);

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
