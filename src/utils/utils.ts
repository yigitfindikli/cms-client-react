export const mergeClassNames = (
	...classNames: (string | undefined)[]
): string => {
	return classNames.filter(Boolean).join(" ");
};

export const mergeClassObjects = (
	...classes: (Record<string, boolean> | undefined)[]
): string => {
	return classes
		.filter(Boolean)
		.map((obj) =>
			Object.entries(obj!)
				.filter(([, value]) => value)
				.map(([key]) => key)
				.join(" ")
		)
		.join(" ");
};
