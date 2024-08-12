import { buttonStyles } from "@/styles/components/buttonStyles";
import { ButtonHTMLAttributes, FC, ReactNode, useMemo } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	children?: ReactNode;
	className?: string;
	text?: boolean;
	outlined?: boolean;
	severity?: "primary" | "secondary" | "success" | "danger";
}

const Button: FC<ButtonProps> = ({
	label,
	children,
	severity = "primary",
	text = false,
	outlined = false,
	className,
	...props
}) => {
	const mergedClassName = useMemo(
		() =>
			buttonStyles({
				severity,
				text,
				outlined,
				className
			}),
		[severity, text, outlined, className]
	);

	return (
		<button className={mergedClassName} {...props}>
			{label || children}
		</button>
	);
};

export default Button;
