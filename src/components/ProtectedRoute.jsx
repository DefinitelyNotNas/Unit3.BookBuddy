import { Navigate, Outlet } from "react-router-dom";

import React from "react";

function ProtectedRoute() {
	const token = localStorage.getItem("token");
	return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
