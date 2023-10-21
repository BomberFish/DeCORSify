export default {
	async fetch(request: Request, /*env: Env,*/ ctx: ExecutionContext): Promise<Response> {
		let url = (new URL(request.url)).searchParams.get('url');
		if (url == null) {
			console.log("no url param")
			return new Response(null);
		} else {
			console.log("proxying" + url)
			var request: Request = new Request(url)
			// set origin header just in case
			request.headers.append('Origin', new URL(url).origin)
			const response: Response = await fetch(request);

			// essentially disable cors
			const responseHeaders: Headers = new Headers();
			responseHeaders.append('Access-Control-Allow-Origin', '*');
			responseHeaders.append('Access-Control-Allow-Methods', '*');
			responseHeaders.append('Access-Control-Allow-Headers', '*');
			responseHeaders.append('Access-Control-Allow-Credentials', 'true');

			var modifiedResponse: Response = new Response(response.body, {
				headers: responseHeaders,
			});
			return modifiedResponse;
		}
	},
};
