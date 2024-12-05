import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../../views/dashboard/Dashboard";
import "./_system.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SystemLayout = () => {
  const { path } = useParams();
  const queryClient = new QueryClient();

  const [renderPath, setRenderPath] = useState<JSX.Element>(<Dashboard />);

  useEffect(() => {
    const newPath = renderRoute(path);
    setRenderPath(newPath);
  }, [path]);

  const renderRoute = (path: string | undefined) => {
    switch (path) {
      case "dashboard":
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="system-layout-container">
      <QueryClientProvider client={queryClient}>
        {renderPath}
      </QueryClientProvider>
    </div>
  );
};

export default SystemLayout;
