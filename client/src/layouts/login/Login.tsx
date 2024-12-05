import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Login from "../../views/login/Login";
import CreateUser from "../../views/createUser/CreateUser";
import RecoveryPassword from "../../views/recoveryPassword/RecoveryPassword";
import "./_login.scss";

const LoginLayout = () => {
  const { path } = useParams();

  const [renderPath, setRenderPath] = useState<JSX.Element>(<Login />);

  useEffect(() => {
    const newPath = renderRoute(path);
    setRenderPath(newPath);
  }, [path]);

  const renderRoute = (path: string | undefined) => {
    switch (path) {
      case "login":
        return <Login />;
      case "createuser":
        return <CreateUser />;
      case "recoverypassword":
        return <RecoveryPassword />;
      default:
        return <Login />;
    }
  };
  
  return <div className="login-layout-container">{renderPath}</div>;
};

export default LoginLayout;
