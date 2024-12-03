import { LoginDataService } from "../../services/Login.service";
import * as Yup from "yup";
import { useState } from "react";

interface CustomError {
  status: number;
  message: string;
  data?: any;
}

interface FormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface useCreateUserProps {
  navigate: (path: string) => void;
}

export function useCreateUser({ navigate }: useCreateUserProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<CustomError>({
    status: 0,
    message: "",
  });

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Primeiro nome é obrigatório"),
    lastName: Yup.string().required("Sobrenome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    userName: Yup.string().required("Nome de usuário é obrigatório"),
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
      const response = await LoginDataService.createUser(
        values.firstName,
        values.lastName,
        values.userName,
        values.password
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
    isOpen,
    error,
    initialValues,
    validationSchema,

    onClose,
    handleSubmit,
  };
}
