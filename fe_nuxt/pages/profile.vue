<template>
  <div class="bg-gray-100 min-h-screen">
    <LayoutsSidebar />
    <LayoutsNavbar />
    <div class="profile-box bg-white shadow-lg rounded-md ml-80 mr-20 p-10 mt-16">
      <div class="profile-data flex items-center">
        <img class="profile-picture w-16 h-16 rounded-full mr-4" src="assets/man.png" alt="Profile Picture" />
        <div class="user-info pr-96">
          <div class="username text-lg font-semibold">Haikal Adibasta</div>
          <div class="email text-sm text-gray-500">superhaikal@gmail.com</div>
        </div>
        <div class="delete-btn mt-4 pl-48">
          <button @click="deleteProfilePicture" class="px-4 py-2 bg-red-500 text-white rounded-md">Delete Avatar</button>
        </div>
        <div class="edit-btn mt-4 pl-2">
          <button @click="editProfilePicture" class="px-4 py-2 bg-blue-500 text-white rounded-md">Edit Avatar</button>
        </div>
      </div>


      <hr class="garis-profil my-4">
      <div class="personal-detail">
        <div class="personal-text text-2xl font-semibold">Personal Details</div>
        <div class="personal-info mt-4 space-y-4">
          <div class="detail-item flex">
            <div class="detail-label font-semibold">Name</div>
            <div class="detail-value placeholder flex-1">Haikal Adibasta</div>
          </div>
          <div class="detail-item flex">
            <div class="detail-label font-semibold">Email</div>
            <div class="detail-value placeholder flex-1">superhaikal@gmail.com</div>
          </div>
          <div class="detail-item flex">
            <div class="detail-label font-semibold">Position</div>
            <div class="detail-value placeholder flex-1">Vice President</div>
          </div>
          <div class="detail-item flex">
            <div class="detail-label font-semibold">Role</div>
            <div class="detail-value placeholder flex-1">Admin</div>
          </div>
          <div class="detail-item flex">
            <div class="detail-label font-semibold">Telp Number</div>
            <div class="detail-value placeholder flex-1">085707141728</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteProfilePicture() {
      // Logika untuk menghapus foto profil
      console.log('Foto profil dihapus');
    },
    editProfilePicture() {
      // Logika untuk mengedit foto profil
      console.log('Foto profil diedit');
    },
  },
};
</script>

<style scoped>
/* Styling specific to this component can be added here */
</style>
