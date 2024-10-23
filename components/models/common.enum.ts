export const ApiRoutes = {
    AUTH: "/api/Account/Login",
    GET_ALL_CATEGORY: "/api/Category",
    GET_CAETGORY_BY_SUBCATEGORY: (categoryId: number) => `/api/Category/SubCategory/${categoryId}`,
}