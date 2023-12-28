<template>
  <div class="bg-gray-100 min-h-screen">
    <LayoutsSidebar />
    <LayoutsNavbar />
    
    <div class="profile-box bg-white shadow-lg rounded-md ml-80 p-10 mt-16 mr-10">
      <div class="profile-data flex ">
        <img class="profile-picture w-16 h-16 rounded-full mr-4" src="assets/man.png" />
        <div class="user-info">
          <div class="username text-lg font-semibold">Haikal Adibasta</div>
          <div class="email text-sm text-gray-500">superhaikal@gmail.com</div>
        </div>

        <div class="delete-btn mt-4 flex justify-end gap-4 ml-auto">
          <button @click="deleteProfilePicture" class="px-2 py-2 border-2 border-red-700 text-red-700 rounded-md">Delete
            Avatar</button>
          <button @click="openModal" class=" px-4 py-2 bg-red-700 text-white rounded-md">Edit Avatar</button>
        </div>
      </div>
      <hr class="garis-profil my-4">
      <div class="personal-detail">
        <div class="personal-text text-2xl font-semibold">Personal Details</div>
        <div class="data-user">
          <div class="flex gap-8 flex-col lg:flex-row">

            <div class="flex flex-col w-1/2">
              <label class=" font-medium pt-2 text-slate-700 mb-2">Name</label>
              <div class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                {{
                  profileNama }}</div>

              <label class=" font-medium pt-2 text-slate-700 mb-2">Position</label>
              <div class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                {{
                  profilePosition }}</div>

              <label class=" font-medium pt-2 text-slate-700 mb-2">Telp Number</label>
              <div class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                {{
                  profileTelp }}</div>
            </div>
            <div class="flex flex-col w-1/2">
              <label class=" font-medium pt-2 text-slate-700 mb-2">Email</label>
              <div class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                {{
                  profileEmail }}</div>

              <label class=" font-medium pt-2 text-slate-700 mb-2">Role</label>
              <div class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                {{
                  profileRole }}</div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal EditAvatar  -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white px-16 py-20 rounded-xl w-auto relative">
        <div class="flex items-center">
          <img class="w-40 h-40 border-4 border-grey-800 rounded-full mx-28" />
        </div>
        <span @click="closeModal"
          class="closeModal absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer text-2xl">&times;</span>
        <div class="w-32 h-30 mx-30 mb-20 rounded-full overflow-hidden">
          <img v-if="editedAvatar" :src="editedAvatar" alt="Profile Picture" class="w-full h-full object-cover">
        </div>
        <input type="file" @change="handleFileChange" class="file-input" accept="image/*">
        <button @click="uploadEditedAvatar" class="upload-btn bg-red-700 px-4 py-1 rounded-md text-white">Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isModalOpen: false,
      editedAvatar: null,
      profile: null,
    };
  },

  computed: {
    profileNama() {
      return this.profile?.nama || ''; // Menggunakan optional chaining untuk menangani kasus null
    },
    profileEmail() {
      return this.profile?.email || '';
    },
    profilePosition() {
      return this.profile?.position || '';
    },
    profileRole() {
      return this.profile?.role || '';
    },
    profileTelp() {
      return this.profile?.telp || '';
    },
  },

  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get('https://z8v4553q-8000.asse.devtunnels.ms/api/users', {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.token}`, // Assuming you have a Vuex store for authentication
          },
        });
        this.profile = response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
      
    },
    
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    handleFileChange(event) {
      this.editedAvatar = event.target.files[0];
    },

    uploadEditedAvatar() {
      console.log('Avatar edited and uploaded:', this.editedAvatar);
      this.closeEditModal();
    },

    async uploadEditedAvatar() {
      try {
        const formData = new FormData();
        formData.append('avatar', this.editedAvatar);

        await axios.post('/api/user/upload-avatar', formData, {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.token}`,
          },
        });

        console.log('Avatar edited and uploaded successfully');
        this.closeModal();
        // Refresh user profile data after avatar upload
        await this.fetchUserProfile();
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    },
  },

  created() {
    // Fetch user profile data when the component is created
    this.fetchUserProfile();
  },
};
</script>


<!-- <script>
export default {
  data() {
    return {
      isModalOpen: false,
      editedAvatar: null,
      profile: {
        name: "Haikal Adibasta",
        email: "superkal@gmail.com",
        position: "Manager",
        role: "Admin",
        telp: "081234567890"
      }
    };
  },

  computed: {
    profileName() {
      return this.profile.name;
    },
    profileEmail() {
      return this.profile.email;
    },
    profilePosition() {
      return this.profile.position;
    },
    profileRole() {
      return this.profile.role;
    },
    profileTelp() {
      return this.profile.telp;
    }
  },

  methods: {
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    handleFileChange(event) {
      this.editedAvatar = event.target.files[0];
    },

    uploadEditedAvatar() {
      console.log('Avatar edited and uploaded:', this.editedAvatar);
      this.closeEditModal();
    },
  },
};
</script>

<style scoped>
.detail-value .placeholder::before {
  content: "Your Placeholder Text";
  color: #A9A9A9;
}
</style> -->
