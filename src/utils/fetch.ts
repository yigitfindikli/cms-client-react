const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchWrapper = async (
	url: string,
	options: RequestInit = {}
): Promise<any> => {
	try {
		const response = await fetch(`${baseUrl}${url}`, {
			...options,
			cache: options.cache || "no-store",
			headers: {
				"Content-Type": "application/json",
				...options.headers
			},
			credentials: "include"
		});

		if (!response.ok) {
			if (response.status === 403) {
				throw new Error("Unauthorized");
			}

			try {
				const error = await response.json();
				throw new Error(error.message);
			} catch (e) {
				console.log(response.status);
				throw new Error("Response not ok", e || undefined);
			}
		}

		try {
			return await response.json();
		} catch (e) {
			return e;
		}
	} catch (e) {
		console.warn(e);
	}
};
