import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
	const storedRole = localStorage.getItem("role");

	if (!storedRole) {
		// Not logged in → redirect to login
		return <Navigate to="/" replace />;
	}

	if (role && storedRole !== role) {
		// Role mismatch → redirect to dashboard
		return <Navigate to="/dashboard" replace />;
	}

	return children;
}
