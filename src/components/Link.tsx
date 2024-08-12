import { buttonStyles } from "@/styles/components/buttonStyles";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, FC, useMemo } from "react";

interface ButtonLinkProps
	extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
		LinkProps {
	label?: string;
	className?: string;
	href: string;
	children?: React.ReactNode;
	text?: boolean;
	outlined?: boolean;
	severity?: "primary" | "secondary" | "success" | "danger" | "warning";
}

const ButtonLink: FC<ButtonLinkProps> = ({
	label,
	children,
	severity = "primary",
	text = true,
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
		<Link className={mergedClassName} {...props}>
			{label || children}
		</Link>
	);
};

export default ButtonLink;
