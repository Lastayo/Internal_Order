
<template>
  <section>
    <div class="h-screen w-screen flex items-center justify-center bg-cover"
      :style="{ 'background-image': 'url(/assets/gray-bg.jpg)' }">
      <div
        class="mx-auto text-left align-bottom transition-all transform bg-white rounded sm:align-middle sm:max-w-md sm:w-full">
        <div class="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-1 rounded-xl">
          <div class="w-full px-8 py-5">
            <div>
              <div class="order-first hidden w-full lg:block">
                <img class="object-cover h-full bg-cover rounded-l-lg" width="90" src="assets/Telkomsigma-baru.svg"
                  alt="" />
              </div>
              <div class="mt-3 sm:mt-5">
                <div class="inline-flext flex items-center justify-center w-full">
                  <h3 class="text-lg font-bold text-black leading-6 lg:text-3xl text-center">Welcome
                    Back!</h3>
                </div>

              </div>
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mt-6 space-y-2">
                <div>
                  <h3>Email</h3>
                  <label for="email" class="sr-only">Email</label>
                  <input type="text" name="email" id="email"
                    class="block w-full px-3 py-1 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray rounded bg-with-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    placeholder="Input your email" v-model="email" />
                </div>
                <div>
                  <h3>Password</h3>
                  <label for="password" class="sr-only">Password</label>
                  <div class="relative">
                    <input :type="showPassword ? 'text' : 'password'" name="password" id="password"
                      class="block w-full px-3 py-1 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray rounded bg-with-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      placeholder="Masukkan kata sandi Anda" v-model="password" />
                    <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      @click="togglePasswordVisibility">
                      <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                    </button>
                  </div>
                </div>

                <div class="flex flex-col mt-4 lg:space-y-2 py-9">
                  <button type="submit" name="login"
                    class="flex items-center text-base justify-center mx-24 py-1 font-medium text-center text-white transition duration-500 ease-in-out transform bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = () => {
      const loginData = {
        email: email.value,
        password: password.value,
      };

      axios.post('https://z8v4553q-8000.asse.devtunnels.ms/api/login/', loginData)
        .then((response) => {
          console.log('Login successful:', response.data);
          localStorage.setItem('token', response.data.token)
          // Navigasi ke halaman dashboard setelah login berhasil
          router.push('/dashboard');
        })
        .catch((error) => {
          if (error.response) {
            // Objek error.response ada, kita dapat membaca propertinya
            console.error('Login failed. Server response:', error.response);
            console.error('Error message:', error.response.data);
          } else {
            // Objek error.response tidak ada, mungkin masalah koneksi atau server mati
            console.error('Login failed. Unable to connect to the server.');
          }
        });
    };

    return {
      email,
      password,
      showPassword,
      togglePasswordVisibility,
      handleLogin,
    };
  },
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
</style>
