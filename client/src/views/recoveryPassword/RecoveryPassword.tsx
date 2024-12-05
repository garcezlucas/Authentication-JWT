import "./_recoveryPassword.scss";
import { useNavigate } from "react-router-dom";
import ModalFeedBack from "../../components/modalFeedback/ModalFeedback";
import { useRecoveryPassword } from "./useRecoveryPassowrd";
import { Formik, Field, Form, ErrorMessage } from "formik";

const RecoveryPassword = () => {
  const navigate = useNavigate();

  const {
    isOpen,
    onClose,
    error,
    initialValues,
    validationSchema,

    handleSubmit,
  } = useRecoveryPassword({ navigate });

  return (
    <div className="recoveryPassword-container">
      <div className="recoveryPassword-container-fix">
        <div className="recoveryPassword-container-header">
          <header>Recuperaçao de senha</header>
        </div>
        <div className="recoveryPassword-container-message">
          <p>Por favor, insira seu email!</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="recoveryPassword-container-forms">
              <div className="recoveryPassword-container-forms-input">
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className={touched.email && errors.email ? "input-error" : ""}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="recoveryPassword-container-forms-error"
                />
              </div>
              <div className="recoveryPassword-container-forms-input">
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
                  className="recoveryPassword-container-forms-error"
                />
              </div>

              <div className="recoveryPassword-container-forms-input">
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
                  className="recoveryPassword-container-forms-error"
                />
              </div>

              <div className="recoveryPassword-container-button">
                <button type="button" onClick={() => navigate("/login")}>
                  <span>Voltar</span>
                </button>
                <button type="submit" disabled={isSubmitting}>
                  <span>Enviar</span>
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

export default RecoveryPassword;
