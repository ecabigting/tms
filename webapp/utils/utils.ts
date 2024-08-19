export const apiUrl = process.env.API_URL;

export const requestPostBuilder = async (endPoint: string, reqBody: any, accessToken: string): Promise<any> => {
	try {
		const resp = await fetch(`${apiUrl}${endPoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(reqBody),
		});
		if (resp.ok) {
			const result = await resp.json();
			console.log("Response from external API:", result);
			return result;
		} else {
			const error = await resp.json();
			console.error("Error making request to external API:", error);
		}
	} catch (error) {
		console.error("this is the error Error:", { error });
	}
};

export const requestPutBuilder = async (endPoint: string, reqBody: any, accessToken: string): Promise<any> => {
	try {
		const resp = await fetch(`${apiUrl}${endPoint}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(reqBody),
		});

		if (resp.ok) {
			const result = await resp.json();
			console.log("Response from external API:", result);
			return result;
		} else {
			const error = await resp.json();
			console.error("Error making request to external API:", error);
		}
	} catch (error) {
		console.error("this is the error Error:", { error });
	}
};

export const requestGetBuilder = async (endPoint: string, accessToken: string): Promise<any> => {
	try {
		console.log(`${apiUrl}${endPoint}`);
		const resp = await fetch(`${apiUrl}${endPoint}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (resp.ok) {
			const result = await resp.json();
			return result;
		} else {
			const error = await resp.json();
			console.error("Error making request to external API:", error);
		}
	} catch (error) {
		console.error("this is the error Error:", { error });
	}
};

export const requestDeleteBuilder = async (endPoint: string, accessToken: string): Promise<any> => {
	try {
		console.log(`${apiUrl}${endPoint}`);
		const resp = await fetch(`${apiUrl}${endPoint}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (resp.ok) {
			const result = await resp.json();
			console.log("Response from external API:", result);
			return result;
		} else {
			const error = await resp.json();
			console.error("Error making request to external API:", error);
		}
	} catch (error) {
		console.error("this is the error Error:", { error });
	}
};
