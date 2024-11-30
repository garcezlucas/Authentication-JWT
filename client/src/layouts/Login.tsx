import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Login from "../pages/login/Login";
import CreateUser from "../pages/createUser/CreateUser";
import RecoveryPassword from "../pages/recoveryPassword/RecoveryPassword";

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
  return <div>{renderPath}</div>;
};

export default LoginLayout;
