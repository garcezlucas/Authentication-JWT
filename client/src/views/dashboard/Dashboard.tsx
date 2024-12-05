import { useEffect, useState } from "react";
import ModalFeedBack from "../../components/modalFeedback/ModalFeedback";
import { useDashboard } from "./useDashboard";
import "./_dashboard.scss";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userData, isUserLoading, userError } = useDashboard();

  const getToken = () => localStorage.getItem("token");
  const getRefresh = () => localStorage.getItem("refresh");

  const handleClose = () => {
    setIsOpen(false);
  };

  const errorResponse = userError
    ? {
        status: 500,
        message: userError.message || "An unexpected error occurred",
      }
    : null;

  useEffect(() => {
    if (userError) {
      setIsOpen(true);
    }
  }, [userError]);

  if (isUserLoading)
    return <div className="dashboard-container-loading">Loading...</div>;

  const renderUserInfo = () => {
    if (!userData) return null;

    if ("data" in userData) {
      const user = userData.data;

      return (
        <div className="dashboard-container-user-paragraph">
          <p>
            <span>Usuário:</span> {user.firstName + user.lastName}
          </p>
          <p>
            <span>UserName:</span> {user.userName}
          </p>
          <p>
            <span>Email:</span> {user.email}
          </p>
          <p>
            <span>Ativo:</span> {user.isActive ? "Ativo" : "Inativo"}
          </p>
        </div>
      );
    }

    if ("message" in userData) {
      return <p>Error: {userData.message}</p>;
    }

    return null;
  };

  return (
    <div>
      {isOpen && errorResponse && (
        <ModalFeedBack
          isOpen={isOpen}
          onClose={handleClose}
          response={errorResponse}
        />
      )}
      {!isOpen && (
        <div className="dashboard-container">
          <div className="dashboard-container-fix">
            <div className="dashboard-container-user">{renderUserInfo()}</div>

            <div className="dashboard-container-token">
              <p>
                <span>Access_token:</span> {getToken()}
              </p>
              <p>
                <span>Refresh:</span> {getRefresh()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
