export default {
	async fetch(request: Request, ctx: ExecutionContext): Promise<Response> {
		let url = (new URL(request.url)).searchParams.get('url');
		if (url == null) {
			return new Response(null);
		} else {
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

			return new Response(response.body, {
				headers: responseHeaders,
			});;
		}
	},
};
