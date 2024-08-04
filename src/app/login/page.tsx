import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { getCurrentUser } from "@/services/AuthService";
import { headers } from "next/headers";

const LoginPage = async () => {
	const headersList = headers();
	const cookies = headersList.get("cookie") || "";
	const user = await getCurrentUser({ cookie: cookies });

	if (user) {
		redirect("/");
	}

	return <LoginForm />;
};

export default LoginPage;
