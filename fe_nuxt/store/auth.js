import { defineStore } from "pinia";
// const nuxtApp = useNuxtApp()

export const useAuth = defineStore("auth", {
  state: () => ({
    user_data: null,
    isAuth_data: false,
    isLoading_data: false,
  }),

  actions: {
    errorHandler(error) {
      let message;
      if (error == "User Not Found") {
        message = "Email Is Wrong";
      } else {
        message = error;
      }
      toast.error(message, {
        dismissible: true,
        position: "bottom",
        duration: 2000,
        queue: true,
      });
    },
    sucecssHandler(message) {
      toast.success(message, {
        dismissible: true,
        position: "bottom",
        duration: 2000,
        queue: true,
      });
    },
    login(credentials) {
      return new Promise(async (resolve, reject) => {
        useAjax("https://z8v4553q-8000.asse.devtunnels.ms/api/login/", {
          method: "POST",
          body: credentials,
        })
          .then((response) => {
            console.log(response);
            if (response.status._value === "success") {
              this.isAuth_data = true;
              useCookie("token").value = response.data._value.token;
              return navigateTo("/");
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getUser() {
      return new Promise(async (resolve, reject) => {
        useAjax("https://z8v4553q-8000.asse.devtunnels.ms/api/user/login/", {
          method: "GET",
        })
          .then((response) => {
            if (response.status._value === "success") {
              this.isAuth_data = true;
              this.user_data = response.data.value.user;
            } else {
              this.isAuth_data = false;
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout() {
      return new Promise(async (resolve) => {
        useCookie("counter").value = "";
        useCookie("token").value = "";
        this.isAuth_data = false;
        this.user_data = {};
        this.token_data = "";

        resolve();
      });
    },
    setLoading(isLoading) {
      this.isLoading_data = isLoading;
    },
  },
});