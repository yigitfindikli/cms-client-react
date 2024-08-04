import RegisterForm from "@/components/RegisterForm";
import { getCurrentUser } from "@/services/AuthService";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Register = async () => {
	const headersList = headers();
	const cookies = headersList.get("cookie") || "";
	const user = await getCurrentUser({ cookie: cookies });

	if (user) {
		redirect("/");
	}

	return <RegisterForm />;
};

export default Register;
