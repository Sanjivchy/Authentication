
/**
 * Routes for public pages. These routes are not protected
 * by auth middleware and can be accessed without auth token
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"

]

export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset',
    '/auth/new-password',
]


/**
 * Prefix for api authentication 
 */
export const apiAuthPrefix = '/api/auth'

/**
 * Default login redirect after auth
 */
export const DEFAULT_LOGIN_REDIRECT = '/setting'