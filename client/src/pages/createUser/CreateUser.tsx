import "./_createUser.scss";

import ModalFeedBack from "../../components/modalFeedback/ModalFeedback";
import { useCreateUser } from "./useCreateuser";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";

const CreateUser: React.FC<{}> = () => {
  const navigate = useNavigate();

  const {
    isOpen,
    error,
    initialValues,
    validationSchema,

    onClose,
    handleSubmit,
  } = useCreateUser({ navigate });

  return (
    <div className="createuser-container">
      <div className="createuser-container-fix">
        <div className="createuser-container-header">
          <header>Criar usuário</header>
        </div>
        <div className="createuser-container-message">
          <p>Por favor, insira suas informações!</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="createuser-container-forms">
              <div className="createuser-container-forms-input">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Primeiro nome"
                  className={
                    touched.firstName && errors.firstName ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="createuser-container-forms-error"
                />
              </div>

              <div className="createuser-container-forms-input">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Sobrenome"
                  className={
                    touched.lastName && errors.lastName ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="createuser-container-forms-error"
                />
              </div>

              <div className="createuser-container-forms-input">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={touched.email && errors.email ? "input-error" : ""}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="createuser-container-forms-error"
                />
              </div>

              <div className="createuser-container-forms-input">
                <Field
                  type="text"
                  name="userName"
                  placeholder="Nome de usuário"
                  className={
                    touched.userName && errors.userName ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="createuser-container-forms-error"
                />
              </div>

              <div className="createuser-container-forms-input">
                <Field
                  type="password"
                  name="password"
                  placeholder="Senha"
                  className={
                    touched.password && errors.password ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="createuser-container-forms-error"
                />
              </div>

              <div className="createuser-container-forms-input">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmação da senha"
                  className={
                    touched.confirmPassword && errors.confirmPassword
                      ? "input-error"
                      : ""
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="createuser-container-forms-error"
                />
              </div>

              <div className="createuser-container-button">
                <button type="button" onClick={() => navigate("/login")}>
                  <span>Voltar</span>
                </button>
                <button type="submit" disabled={isSubmitting}>
                  <span>Criar</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <ModalFeedBack isOpen={isOpen} onClose={onClose} response={error} />
    </div>
  );
};

export default CreateUser;
