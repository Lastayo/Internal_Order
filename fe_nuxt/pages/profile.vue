<template>
  <div class="bg-gray-100 min-h-screen">
    <LayoutsSidebar />
    <LayoutsNavbar />
    <div class="profile-box bg-white shadow-lg rounded-md ml-80 mr-20 p-10 mt-16">
      <div class="profile-data flex items-center">
        <img class="profile-picture w-16 h-16 rounded-full mr-4" src="assets/man.png"/>
        <div class="user-info pr-96">
          <div class="username text-lg font-semibold">Haikal Adibasta</div>
          <div class="email text-sm text-gray-500">superhaikal@gmail.com</div>
        </div>
        <div class="delete-btn mt-4 pl-48">
          <button @click="deleteProfilePicture" class="px-2 py-2 border-2 border-red-700 text-red-700 rounded-md">Delete
            Avatar</button>
          <button @click="openModal" class="mx-2 px-4 py-2 bg-red-700 text-white rounded-md">Edit Avatar</button>
        </div>
      </div>
      <hr class="garis-profil my-4">
      <div class="personal-detail">
        <div class="personal-text text-2xl font-semibold">Personal Details</div>
        <div class="data-user">
          <div class="flex">
            <label class="NamaUser mr-auto">
              <span class="text-sm font-medium text-slate-700">Nama</span>
              <div
                class="placeholder-container mt-1 pl-3 pr-96 py-2 bg-gray-100 border shadow-sm w-auto rounded-md sm:text-sm text-slate-500">
                {{ profileName }}
              </div>
            </label>
            <label class="EmailUser">
              <span class="text-sm font-medium text-slate-700">Email</span>
              <div
                class="placeholder-container mt-1 pl-3 pr-96 py-2 bg-gray-100 border shadow-sm w-auto rounded-md sm:text-sm text-slate-500">
                {{ profileEmail }}
              </div>
            </label>
          </div>

          <div class="flex mt-3">
            <label class="PositionUser mr-auto">
              <span class="text-sm font-medium text-slate-700">Position</span>
              <div
                class="placeholder-container mt-1 pl-3 pr-96 py-2 bg-gray-100 border shadow-sm w-auto rounded-md sm:text-sm text-slate-500">
                {{ profilePosition }}
              </div>
            </label>
            <label class="RoleUser mr-auto">
              <span class="text-sm font-medium text-slate-700">Role</span>
              <div class="mt-1 pl-3 pr-96 py-2 bg-gray-100 border shadow-sm w-auto rounded-md sm:text-sm text-slate-500">
                {{ profileRole }}
              </div>
            </label>
          </div>
          <div class="mt-3">
            <label class="TelpUser mr-auto">
              <span class="text-sm font-medium text-slate-700">Telp Number</span>
              <div
                class="telp-placeholder mt-1 pl-3 pr-96 py-2 bg-gray-100 border shadow-sm w-3/6 rounded-md sm:text-sm text-slate-500">
                {{ profileTelp }}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal EditAvatar -->
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
export default {
  data() {
    return {
      isModalOpen: false,
      editedAvatar: null,
      // Assuming you have a profile object with a 'name' property
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
    // Computed property to get the profile name
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
    // Your other methods...

    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    handleFileChange(event) {
      // Handle file change and store the selected file
      this.editedAvatar = event.target.files[0];
    },

    uploadEditedAvatar() {
      // Implement the logic to upload the edited avatar
      // Use this.editedAvatar for the selected file
      console.log('Avatar edited and uploaded:', this.editedAvatar);
      this.closeEditModal();
    },
  },
};
</script>

<style scoped>
/* Your existing styles... */

.detail-value .placeholder::before {
  content: "Your Placeholder Text";
  color: #A9A9A9;
  /* Placeholder text color */
}
</style>
