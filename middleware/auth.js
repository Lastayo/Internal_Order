import { useAuth } from "~/store/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();  
  // const token = localStorage.getItem("token");
  // if (token) {
  //   await useAuth().getUser();
  // }
  await useAuth().getUser();
  if (!auth.isAuth_data) {
    return navigateTo('/login')
  }
});
