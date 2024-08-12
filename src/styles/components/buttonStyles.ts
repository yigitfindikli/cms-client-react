import { mergeClassNames, mergeClassObjects } from "@/utils/utils";

export const buttonStyles = (props: {
	severity: string;
	text: boolean;
	outlined: boolean;
	className: string | undefined;
}) => {
	const { severity, text, outlined, className } = props;

	const buttonTextOrOutlined = text || outlined;

	const coreClasses = `${
		!text ? "px-4 py-2" : ""
	} font-semibold inline-block leading-6 focus:outline-none focus:ring-2 rounded transition duration-200`;

	const severityClassName = !buttonTextOrOutlined
		? mergeClassObjects({
				"bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300":
					severity === "primary",
				"bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300":
					severity === "secondary",
				"bg-green-500 text-white hover:bg-green-600 focus:ring-green-300":
					severity === "success",
				"bg-red-500 text-white hover:bg-red-600 focus:ring-red-300":
					severity === "danger"
		  })
		: "";

	const textSeverityClassName = buttonTextOrOutlined
		? mergeClassObjects({
				"bg-transparent text-blue-500": severity === "primary",
				"bg-transparent text-gray-500": severity === "secondary",
				"bg-transparent text-green-500": severity === "success",
				"bg-transparent text-red-500": severity === "danger"
		  })
		: "";

	const outlinedClassName = outlined
		? mergeClassObjects({
				"border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white focus:ring-blue-300":
					severity === "primary",
				"border border-gray-500 text-gray-500 hover:bg-gray-400 hover:text-white focus:ring-gray-300":
					severity === "secondary",
				"border border-green-500 text-green-500 hover:bg-green-400 hover:text-white focus:ring-green-300":
					severity === "success",
				"border border-red-500 text-red-500 hover:bg-red-400 hover:text-white focus:ring-red-300":
					severity === "danger"
		  })
		: "";

	return mergeClassNames(
		coreClasses,
		severityClassName,
		textSeverityClassName,
		outlinedClassName,
		className
	);
};
