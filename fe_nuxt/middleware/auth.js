export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth();
    await useAuth().getUser();
  
    if (!auth.isAuth_data) {
      return navigateTo("/auth/login");
    }
  
    if (to.path === "/auth/login" && auth.isAuth_data) {
      return navigateTo("");
    }
  });