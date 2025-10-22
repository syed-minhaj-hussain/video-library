import { Navigate, Outlet } from "react-router-dom";
export const PrivateRoute = ({ auth, element, path }) => {
  return (
    <>
      {auth ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: path }} replace />
      )}
    </>
  );
};
