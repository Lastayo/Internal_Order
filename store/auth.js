import { defineStore } from "pinia";
import axios from 'axios';
// const nuxtApp = useNuxtApp()

export const useAuth = defineStore("auth", {
  state: () => ({
    user_data: null,
    isAuth_data: false,
  }),

  actions: {
    async getUser() {
        const token = localStorage.getItem('token')
        await axios.get("https://z8v4553q-8000.asse.devtunnels.ms/api/user/login/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
          .then((response) => {
            if(response.status == 200){
                this.isAuth_data = true,
                this.user_data = response.data
            } else {
                this.user_data = null,
                this.isAuth_data = false
            }
          })
          .catch((error) => {
            console.log(error)
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