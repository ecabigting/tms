import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, adminRoutes, apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

export default auth(async (req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const cUser = req.auth;
	// console.log("-- middleware hit --");
	// console.log({ isLoggedIn });
	// console.log({ isPublicRoute });
	// console.log({ cUser });
	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL("/", nextUrl));
	}

	return;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
