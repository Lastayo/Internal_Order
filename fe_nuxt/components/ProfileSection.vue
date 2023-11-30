<template>
  <div>
    <div @click="togglePopup" class="profile-section fixed top-2 right-9 p-2 bg-[#ffffff] rounded-full">
      <img class="profile-picture w-12 h-12 rounded-full" src="assets/haikal-profile.jpg" alt="Profile Picture" />
      <div v-if="showPopup" class="popup mt-0 mr-4 bg-white border border-gray-300 shadow-md rounded w-56">
        <div class="p-4 flex items-center">
          <img class="profile-picture w-10 h-10 rounded-full mr-3" src="assets/haikal-profile.jpg"
            alt="Profile Picture" />
          <div class="flex flex-col justify-center">
            <h1 class="text-md font-bold text-center">Haikal Adibasta</h1>
            <h3 class="text-xs text-gray-500 text-center">superhaikal@gmail.com</h3>
          </div>
        </div>
        <hr class="my-2 border-gray-300 w-auto">
        <div @click="navigateTo('/profile')" class="cursor-pointer profile-section p-2 flex">
          <p ><i class="fas fa-user fa-md px-2 pl-6"></i>Profile</p>
          <hr class=" border-gray-300 w-auto">
        </div>
        <hr class=" border-gray-300 w-auto">
        <div @click="navigateTo('/login')" class="cursor-pointer profile-section p-3 flex">
          <p ><i class="fas fa-power-off fa-md px-2 pl-5"></i>Sign Out</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
};
</script>

<style scoped>

@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');


.popup {
  border-radius: 10px;
  position: absolute;
  top: 90%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.popup-content {
  padding: 8px;
  border-radius: 4px;
}

.popup-content p {
  margin: 0;
  padding: 8px;
  cursor: pointer;
}

.popup-content p:hover {
  background-color: #f1f1f1;
}
</style>
