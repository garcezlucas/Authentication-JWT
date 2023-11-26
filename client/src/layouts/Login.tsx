import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateUserComponent from "../components/createUser/CreateUser";
import LoginPage from "../pages/login/Login";

function LoginLayout() {
  const { path } = useParams();

  const [renderPath, setRenderPath] = useState<JSX.Element>(<LoginPage />);

  useEffect(() => {
    const newPath = renderRoute(path);
    setRenderPath(newPath);
  }, [path]);

  const renderRoute = (path: string | undefined) => {
    switch (path) {
      case "login":
        return <LoginPage />;
      case "createuser":
        return <CreateUserComponent />;
      default:
        return <LoginPage />;
    }
  };
  return <div>{renderPath}</div>;
}

export default LoginLayout;
