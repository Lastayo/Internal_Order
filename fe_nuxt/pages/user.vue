<template>
  <div class="flex bg-[#EDF2F7] bg-cover min-h-screen"> 
    <!-- Sidebar -->
    <LayoutsSidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Navbar -->
      <LayoutsNavbar />

      <!-- User Box -->
      <div class="flex-1 bg-white mx-12 my-10 px-8 pt-6 overflow-hidden flex flex-col rounded-2xl shadow-md">
        <div class="mb-4 flex flex-col px-6 pt-4">
          <div class="text-4xl font-bold mb-4">User List</div>
          <div class="flex pt-4">
            <input type="text" placeholder="Search user"
              class="px-3 py-1 border pr-16 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            <button @click="openModal" class="ml-auto px-4 py-2 bg-[#C53030] text-white rounded-md">
              Add User
            </button>
          </div>
        </div>

        <!-- User Table -->
        <div class="overflow-x-auto px-6">
          <table class="min-w-full bg-white border-collapse rounded-md">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b bg-gray-100">No</th>
                <th class="py-2 px-4 border-b bg-gray-100">Nama</th>
                <th class="py-2 px-4 border-b bg-gray-100">Telp Number</th>
                <th class="py-2 px-4 border-b bg-gray-100">Email</th>
                <th class="py-2 px-4 border-b bg-gray-100">Role</th>
                <th class="py-2 px-4 border-b bg-gray-100">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in usersData" :key="user.id_user">
                <td class="py-4 px-4 border-b text-center">{{ user.id_user }}</td>
                <td class="py-2 px-4 border-b text-center">{{ user.nama }}</td>
                <td class="py-2 px-4 border-b text-center">{{ user.phone }}</td>
                <td class="py-2 px-4 border-b text-center">{{ user.email }}</td>
                <td class="py-2 px-4 border-b text-center">{{ user.hak_akses }}</td>
                <td class="py-2 px-4 border-b text-center">
                  <button class="mr-2" @click="confirmDelete(user.id_user)">
                    <!-- Delete Icon -->
                    <i class="fas fa-trash-can"></i>
                  </button>
                  <button class="mr-2">
                    <!-- Edit Icon -->
                    <i class="fas fa-edit" @click="openRoleModal(user.id_user, user.role)"></i>
                  </button>
                  <button class="mr-2" @click="openPasswordModal(user.id_user)">
                    <!-- Lock Icon -->
                    <i class="fas fa-key"></i>
                  </button>



                </td>
              </tr>
            </tbody>
          </table>

          <!-- Tombol Next, Previous, dan Nomor Halaman -->

        </div>
        <div class="flex justify-center items-center mt-4 space-x-4 pb-4">
          <button @click="prevPage" :disabled="currentPage === 1" class="py-2 text-gray-600 rounded-md">
            Prev
          </button>
          <div class="flex items-center space-x-2">
            <button v-for="pageNumber in pageNumbers" :key="pageNumber" @click="goToPage(pageNumber)" :class="{
              'bg-[#C53030] text-white rounded-lg py-2 px-4 text-md': pageNumber === currentPage,
              'text-sm text-black-600 border-2 rounded-lg py-2 px-4': pageNumber !== currentPage,
            }">
              {{ pageNumber }}
            </button>
          </div>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="py-2 text-black-600 rounded-md">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Delete -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white px-4 py-4 rounded-xl w-auto">
        <div class="flex justify-end">
          <button @click="cancelDelete" class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="bg-white px-8 rounded-lg w-auto">
          <div class="flex flex-col items-center mb-4">
            <!-- Trash Icon -->
            <div class=" text-[#C53030] text-4xl rounded-full bg-white px-4 py-3 border-[#C53030] border-4 mb-4">
              <i class="fas fa-trash-can"></i>
            </div>
            <p class="text-xl font-medium text-gray-600 text-center">Are you sure to delete this user <br>from the user
              list?</p>
          </div>
          <div class="flex justify-center">
            <button @click="deleteUser" class="px-8 py-2 my-2 bg-[#C53030] text-white rounded-md">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal Edit User -->
    <div v-if="isRoleModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-4 rounded-xl">
        <div class="flex justify-end">
          <button @click="closeRoleModal" class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="bg-white px-6 rounded-lg w-full">
          <form @submit.prevent="editUser">
            <div class="mb-2">
              <label for="name" class="block text-md font-medium text-gray-600">
                Name
              </label>
              <input v-model="userRoleData.nama" type="text" id="nama" name="name"
                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Name User" required />
            </div>
            <!-- Tambahkan bagian formulir untuk setiap properti pengguna yang perlu diedit -->
            <div class="mb-2">
              <label for="email" class="block text-md font-medium text-gray-600">
                Email
              </label>
              <input v-model="userRoleData.email" type="email" id="email" name="email"
                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Email User" required />
            </div>
            <div class="mb-2">
              <label for="jabatan" class="block text-md font-medium text-gray-600">
                Position
              </label>
              <input v-model="userRoleData.jabatan" type="text" id="jabatan" name="position"
                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input User Position" required />
            </div>
            <div class="mb-2">
              <label for="phone" class="block text-md font-medium text-gray-600">
                Phone
              </label>
              <input v-model="userRoleData.phone" type="text" id="phone" name="phone"
                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input User Phone" required />
            </div>
            <div class="mb-4">
              <label class="block text-md font-medium text-gray-600">Role</label>
              <div class="flex items-center space-x-2">
                <input v-model="userRoleData.hak_akses" type="radio" id="admin" name="role" value="admin"
                  class="border-gray-300" />
                <label for="admin" class="text-sm text-gray-600">Admin</label>
                <input v-model="userRoleData.hak_akses" type="radio" id="user" name="role" value="user"
                  class="rounded-full border-gray-300" />
                <label for="user" class="text-sm text-gray-600">User</label>
              </div>
            </div>
            <div class="flex justify-center">
              <button type="submit" class="px-4 py-2 bg-[#C53030] text-white rounded-md mb-4 w-full sm:w-auto">
                Update User
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>



    <!-- Modal AddUser -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-4 rounded-xl">
        <div class="flex justify-end">
          <button @click="closeModal" class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="bg-white px-6 rounded-lg w-full">
          <form @submit.prevent="addUser">

            <div class="mb-2">
              <label for="name" class="block text-md font-medium text-gray-600">
                Name
              </label>
              <input v-model="newUser.nama" type="text" id="nama" name="name"
                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Name User" required />
            </div>
            <div class="mb-2">
              <label for="email" class="block text-md font-medium text-gray-600">
                Email
              </label>
              <input v-model="newUser.email" type="email" id="email" name="email"
                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Email User" required />
            </div>
            <div class="mb-2">
              <label for="jabatan" class="block text-md font-medium text-gray-600">
                Position
              </label>
              <input v-model="newUser.jabatan" type="text" id="jabatan" name="position"
                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input User Position" required />
            </div>

            <div class="mb-2">
              <label for="phone" class="block text-md font-medium text-gray-600">
                Phone
              </label>
              <input v-model="newUser.phone" type="text" id="phone" name="phone"
                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input User Phone" required />
            </div>
            <div class="mb-2">
              <label for="password" class="block text-md font-medium text-gray-600">
                Password
              </label>
              <input v-model="newUser.password" type="password" id="password" name="password"
                class="mt-1 p-2 border-2 rounded-md w-full text-sm" placeholder="Input Password" required />
            </div>
            <div class="mb-4">
              <label class="block text-md font-medium text-gray-600">Role</label>
              <div class="flex items-center space-x-2">
                <input v-model="newUser.hak_akses" type="radio" id="admin" name="role" value="admin"
                  class="border-gray-300" />
                <label for="admin" class="text-sm text-gray-600">Admin</label>
                <input v-model="newUser.hak_akses" type="radio" id="user" name="role" value="user"
                  class="rounded-full border-gray-300" />
                <label for="user" class="text-sm text-gray-600">User</label>
              </div>
            </div>
            <div class="flex justify-center">
              <button type="submit" class="px-4 py-2 bg-[#C53030] text-white rounded-md mb-4 w-full sm:w-auto">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Update Password -->
      <div v-if="isPasswordModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-4 rounded-xl">
          <div class="flex justify-end">
            <button @click="closePasswordModal" class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="bg-white px-6 rounded-lg w-full">
            <form @submit.prevent="updatePassword">
              <div class="mb-2">
                <label for="oldPassword" class="block text-md font-medium text-gray-600">
                  Old Password
                </label>
                <input v-model="passwordData.oldPassword" type="password" id="oldPassword" name="oldPassword"
                  class="mt-1 p-2 border-2 rounded-md w-full text-sm" placeholder="Enter Old Password" required />
              </div>
              <div class="mb-2">
                <label for="newPassword" class="block text-md font-medium text-gray-600">
                  New Password
                </label>
                <input v-model="passwordData.newPassword" type="password" id="newPassword" name="newPassword"
                  class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Enter New Password" required />
              </div>
              <div class="flex justify-center">
                <button type="submit" class="px-4 py-2 bg-[#C53030] text-white rounded-md mb-4 w-full sm:w-auto">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>



    </div>


   <!-- Modal Update Password -->
   <div v-if="isPasswordModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
  <div class="bg-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-4 rounded-xl">
    <div class="flex justify-end">
      <button @click="closePasswordModal" class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="bg-white px-6 rounded-lg w-full">
      <form @submit.prevent="updatePassword">
        <div class="mb-2">
          <label for="oldPassword" class="block text-md font-medium text-gray-600">
            Old Password
          </label>
          <div class="relative">
            <input v-model="passwordData.oldPassword" type="password" id="oldPassword" name="oldPassword"
              class="mt-1 p-2 border-2 rounded-md w-full text-sm" :placeholder="'Password Lama: ' + passwordData.oldPassword" :readonly="true" />
            <span @click="toggleOldPasswordVisibility" class="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer">
              <i v-if="showOldPassword" class="fas fa-eye-slash"></i>
              <i v-else class="fas fa-eye"></i>
            </span>
          </div>
        </div>
        <div class="mb-2">
          <label for="newPassword" class="block text-md font-medium text-gray-600">
            New Password
          </label>
          <input v-model="passwordData.newPassword" type="password" id="newPassword" name="newPassword"
            class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Masukkan Password Baru" required />
        </div>
        <div class="flex justify-center">
          <button type="submit" class="px-4 py-2 bg-[#C53030] text-white rounded-md mb-4 w-full sm:w-auto">
            Perbarui Password
          </button>
        </div>
      </form>
    </div>
  </div>
</div>



  </div>
</template>

<script>
import axios from 'axios';

export default {
  http: {
    baseURL: 'https://z8v4553q-8000.asse.devtunnels.ms/api/users/', // Sesuaikan dengan URL backend Anda
  },
  data() {
    return {

      passwordUser: null,

      showOldPassword: false,

      users: [
        { id: 2, name: "Haikal Adibasta", telpNumber: "123456789", email: "superhaikal@example.com", role: "Admin", passwordData: [{ oldPassword: "hallo", newPassword: "hai" }] },

      ],
      usersData: [],
      itemsPerPage: 5,
      currentPage: 1,
      isModalOpen: false,
      isDeleteModalOpen: false,

      isRoleModalOpen: false,
      userIdToDelete: null,

      isPasswordModalOpen: false,
    passwordData: {
      userId: null,
      oldPassword: '',
      newPassword: '',
    },

      isRoleModalOpen: false,
      userRoleData: {
        userId: null,
        role: "",
      },

      newUser: {
        employeeId: "",
        name: "",
        email: "",
        password: "",
        role: "",
        // Tambahkan properti baru
        position: "",
        phone: "",
      },
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.itemsPerPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const filteredUsers = this.users.slice(start, end);
      return filteredUsers;
    },
    pageNumbers() {
      const maxVisiblePages = 10;
      const pages = [];
      if (this.totalPages <= maxVisiblePages) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        const startPage = Math.max(2, this.currentPage - 2);
        const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);
        if (startPage > 2) {
          pages.push('...');
        }
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        if (endPage < this.totalPages - 1) {
          pages.push('...');
        }
        pages.push(this.totalPages);
      }
      return pages;
    },
  },
  methods: {

    toggleOldPasswordVisibility() {
      this.showOldPassword = !this.showOldPassword;
      const oldPasswordInput = document.getElementById('oldPassword');
      if (oldPasswordInput) {
        oldPasswordInput.type = this.showOldPassword ? 'text' : 'password';
      }
    },

    openPasswordModal(userId) {
    // Cari data pengguna berdasarkan userId
    const user = this.usersData.find(user => user.id_user === userId);

    // Setel nilai passwordData.oldPassword dengan password lama dari data pengguna
    this.passwordData.oldPassword = user.password;

    // Buka modal
    this.isPasswordModalOpen = true;
  },

  closePasswordModal() {
    this.isPasswordModalOpen = false;
    this.passwordData = {
      userId: null,
      oldPassword: '',
      newPassword: '',
    };
  },

  updatePassword() {
    // Make an API call to update the password
    axios
      .patch(`https://z8v4553q-8000.asse.devtunnels.ms/api/users/${this.passwordData.userId}/password/`, {
        oldPassword: this.passwordData.oldPassword,
        newPassword: this.passwordData.newPassword,
      })
      .then(response => {
        // Handle successful response (e.g., show success message)
        console.log('Password updated successfully:', response.data);
        // Close the password modal
        this.closePasswordModal();
      })
      .catch(error => {
        // Handle errors (e.g., show error message)
        console.error('Failed to update password:', error);
      });
  },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    openModal() {
      this.isModalOpen = true;
      // Reset modal state
      this.isDeleteModalOpen = false;
      this.isPasswordModalOpen = false;
      this.isRoleModalOpen = false;
    },
    closeModal() {
      this.isModalOpen = false;
      // Reset modal state
      this.isDeleteModalOpen = false;
      this.isPasswordModalOpen = false;
      this.isRoleModalOpen = false;
      // Reset form data jika diperlukan
      this.newUser = {
        employeeId: "",
        nama: "",
        email: "",
        password: "",
        role: "",
      };
    },

    addUser() {
      // Perbarui metode untuk menyertakan data position dan phone
      axios
        .post('https://z8v4553q-8000.asse.devtunnels.ms/api/users/', {

          nama: this.newUser.nama,
          email: this.newUser.email,
          password: this.newUser.password,
          hak_akses: this.newUser.hak_akses,
          jabatan: this.newUser.jabatan, // Tambahkan properti position
          phone: this.newUser.phone, // Tambahkan properti phone
        })
        .then(response => {
          // Dapatkan ID yang baru ditetapkan oleh server dan tambahkan ke array lokal
          const newUserWithId = { ...this.newUser, id_user: response.data.id_user };
          this.usersData.push(newUserWithId);

          this.closeModal();
        })
        .catch(error => {
          console.error('Gagal menambahkan user:', error);
          // Tambahkan penanganan kesalahan sesuai kebutuhan
          this.closeModal();
        });
    },
    confirmDelete(userId) {
      axios.delete('https://z8v4553q-8000.asse.devtunnels.ms/api/users/' + userId).then((res) => console.log(res))
      this.userIdToDelete = userId
      console.log(userId)
      this.isDeleteModalOpen = true;
    },

    cancelDelete() {
      this.isDeleteModalOpen = false;
      this.userIdToDelete = null;
    },

    deleteUser() {
      axios
        .delete(`https://z8v4553q-8000.asse.devtunnels.ms/api/users/${this.userIdToDelete}/`)
        .then(() => {
          const indexToDelete = this.usersData.findIndex(user => user.id_user === this.userIdToDelete);
          if (indexToDelete !== -1) {
            this.usersData.splice(indexToDelete, 1);
          }

          this.isDeleteModalOpen = false;
          this.userIdToDelete = null;
        })
        .catch(error => {
          console.error('Gagal menghapus user:', error);
          // Tambahkan penanganan kesalahan sesuai kebutuhan
          this.isDeleteModalOpen = false;
          this.userIdToDelete = null;
        });
    },

    openRoleModal(userId, currentRole) {
      // Cari data pengguna berdasarkan userId
      const userToEdit = this.usersData.find(user => user.id_user === userId);

      // Setel nilai userRoleData dengan data pengguna sebelumnya
      this.userRoleData = {
        userId: userId,
        nama: userToEdit.nama,
        email: userToEdit.email,
        jabatan: userToEdit.jabatan,
        phone: userToEdit.phone,
        hak_akses: userToEdit.hak_akses,
      };

      // Buka modal
      this.isRoleModalOpen = true;
    },


    closeRoleModal() {
      this.isRoleModalOpen = false;
      this.userRoleData = {
        userId: null,
        role: "",
      };
    },

    editUser() {
      axios
        .patch(`https://z8v4553q-8000.asse.devtunnels.ms/api/users/${this.userRoleData.userId}/`, {
          nama: this.userRoleData.nama,
          email: this.userRoleData.email,
          jabatan: this.userRoleData.jabatan,
          phone: this.userRoleData.phone,
          hak_akses: this.userRoleData.hak_akses, // Tambahkan pembaruan untuk hak_akses
          // Jangan menyertakan password
        })
        .then(response => {
          const userIndex = this.usersData.findIndex(user => user.id_user === this.userRoleData.userId);
          if (userIndex !== -1) {
            // Update data pengguna dalam data lokal
            this.usersData[userIndex].nama = this.userRoleData.nama;
            this.usersData[userIndex].email = this.userRoleData.email;
            this.usersData[userIndex].jabatan = this.userRoleData.jabatan;
            this.usersData[userIndex].phone = this.userRoleData.phone;
            this.usersData[userIndex].hak_akses = this.userRoleData.hak_akses; // Update hak_akses
          }

          this.isRoleModalOpen = false;
          this.userRoleData = {
            userId: null,
            nama: "",
            email: "",
            jabatan: "",
            phone: "",
            hak_akses: "",
          };
        })
        .catch(error => {
          console.error('Gagal mengedit pengguna:', error);
        });
    },




  },
  mounted() {
    axios
    .get('https://z8v4553q-8000.asse.devtunnels.ms/api/users/')
    .then((res) => {
      // Sort usersData by id_user in ascending order
      this.usersData = res.data.sort((a, b) => a.id_user - b.id_user);
    })
    .catch((err) => console.log(err));
  }
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
</style>