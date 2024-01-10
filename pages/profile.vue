<template>
  <div class="flex bg-[#EDF2F7] bg-cover min-h-screen">
    <LayoutsSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <LayoutsNavbar />

      <div class="profile-box bg-white shadow-lg rounded-md mx-12 p-10 mt-16 mr-10">
        <div class="profile-data flex">
          <img class="profile-picture w-16 h-16 rounded-full mr-4" src= {{user.profile}} />
          <div class="user-info">
            <div class="username text-xl font-semibold">{{ user.nama }}</div>
            <div class="email text-sm text-gray-500">{{ user.email }}</div>
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

              <div class="flex flex-col w-full">
                <label class="font-medium pt-2 text-slate-700 mb-2">Name</label>
                <div class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                  {{ user.nama }}</div>

                <label class="font-medium pt-2 text-slate-700 mb-2">Position</label>
                <div class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                  {{ user.jabatan }}</div>

                <label class="font-medium pt-2 text-slate-700 mb-2">Telp Number</label>
                <div class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                  {{ user.phone }}</div>
              </div>
              <div class="flex flex-col w-full">
                <label class="font-medium pt-2 text-slate-700 mb-2">Email</label>
                <div class="flex border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                  {{ user.email }}</div>

                <label class="font-medium pt-2 text-slate-700 mb-2">Role</label>
                <div class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                  {{ user.hak_akses }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal EditAvatar  -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white px-10 py-10 rounded-xl w-auto relative">
        <div class="flex items-center ">
          <!-- <img class="w-40 h-40 border-4 border-grey-800 rounded-full mx-28" /> -->
        </div>
        <span @click="closeModal"
          class="closeModal absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer text-2xl">&times;</span>
        <div class="w-40 h-40 border-4 border-grey-800 rounded-full mx-28">
          <img v-if="editedAvatar" :src="editedAvatar" class="w-full h-full object-cover rounded-full">
        </div>
        <div class="pilih-file pt-4 flex justify-center">
          <label for="fileInput"
            class="bg-green-500 text-white text-center font-semibold p-2 w-40 rounded-md cursor-pointer">
            Pilih foto
          </label>
          <input id="fileInput" type="file" @change="handleFileChange" style="display: none;">
        </div>
        <div class="flex justify-center m-2">
          <button @click="uploadEditedAvatar"
            class="upload-btn bg-red-700 w-40 py-2 rounded-md text-center text-white">Upload</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        nama: "",
        email: "",
        jabatan: "",
        hak_akses: "",
        phone: "",
      },
      user: {},
      isModalOpen: false,
      editedAvatar: null,
    };
  },

  computed: {
  },

  methods: {

    async uploadEditedAvatar() {
      try {
        const formData = new FormData();
        formData.append('avatar', this.editedAvatar);

        await axios.put('https://z8v4553q-8000.asse.devtunnels.ms/api/user/login/', formData, {
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

    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Proses file, misalnya dapat digunakan untuk menampilkan gambar sebelum di-upload
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedAvatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    uploadEditedAvatar() {
      console.log('Avatar edited and uploaded:', this.editedAvatar);
      this.closeModal();
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






<!-- <div class="file-input-container">
          <button id="fileInput" type="file" @change="handleFileChange" class="file-input-btn" accept="image/*">
            Pilih File
            <input id="fileInput" type="file" @change="handleFileChange" class="file-input" accept="image/*">
          </button>
        </div> -->


<!-- // created() {
  //   // Fetch user profile data when the component is created
  //   // this.fetchUserProfile();
  // }, -->