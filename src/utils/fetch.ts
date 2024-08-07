const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchWrapper = async (
	url: string,
	options: RequestInit = {}
): Promise<any> => {
	const response = await fetch(`${baseUrl}${url}`, {
		...options,
		cache: options.cache || "default",
		headers: {
			"Content-Type": "application/json",
			...options.headers
		},
		credentials: "include"
	});

	if (!response.ok) {
		try {
			const error = await response.json();
			throw new Error(error.message);
		} catch (e) {
			throw new Error("Response not ok", e || undefined);
		}
	}

	try {
		return await response.json();
	} catch (e) {
		return response;
	}
};
