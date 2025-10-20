import { Route, Navigate } from "react-router-dom";
export const PrivateRoute = ({ auth, element, path }) => {
  return (
    <>
      {auth ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate to="/login" state={{ from: path }} replace />
      )}
    </>
  );
};
