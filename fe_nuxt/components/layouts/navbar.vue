<template>
  <div>
    <nav class="h-20 bg-cover" :style="{ 'background-image': 'url(/assets/nav-img.jpg)' }">
      <div class="sticky top-0 z-50">
        <div  class="profile-section border-black rounded-full flex justify-end py-4 pr-10">
          <img @click="togglePopup" class="profile-picture w-10 h-10 rounded-full" src="user.profile_picture" alt="Profile Picture" />
          <div v-if="showPopup"
            class="popup mt-0 mr-4 bg-white border border-gray-300 shadow-md rounded-xl w-56 absolute right-6 top-14">
            <div class="p-4 flex items-center">
              <img class="profile-picture w-10 h-10 rounded-full mr-3" src="user.profile_picture"
                alt="Profile Picture" />
              <div class="flex flex-col justify-end">
                <h1 class="text-md font-bold text-left">{{ user.nama }}</h1>
                <h3 class="text-xs text-gray-500 text-left">{{ user.email }}</h3>
              </div>
            </div>

            <hr class=" border-gray-300 w-auto">
            <div @click="navigateTo('/profile')" class="cursor-pointer profile-section p-3 flex text-gray-500">
              <p class="pl-3"><i class="fas fa-user fa-md px-2 pr-4"></i>Profile</p>
              <hr class=" border-gray-300 w-auto">
            </div>
            <hr class=" border-gray-300 w-auto">
            <div @click="navigateTo('/login')" class="cursor-pointer profile-section p-3 flex text-gray-500">
              <p class="pl-2"><i class="fas fa-power-off fa-md px-2 pr-4"></i>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </nav>

  </div>
</template>
  
<script>
import axios from 'axios';


export default {
  data() {
    return {
      showPopup: false,
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    navigateTo(route) {
      console.log(`Navigating to ${route}`);
      this.$router.push(route);
      this.showPopup = false;
    },
    signOut() {
      console.log("Signing out");
      this.$router.push(route);
      this.showPopup = false;
    },
  },


  mounted() {
    let token = localStorage.getItem('token')

    console.log(token)

    axios.get('https://z8v4553q-8000.asse.devtunnels.ms/api/user/login/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    ).then((res) => {
      this.user = res.data
    })
      .catch((err) => {
        console.log(err)
      })
  }
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
</style>