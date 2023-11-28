<template>
  <div class="flex bg-[#EDF2F7] bg-cover min-h-screen">
    <!-- Sidebar -->
    <LayoutsSidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Navbar -->
      <LayoutsNavbar />

      <!-- User Box -->
      <div class="flex-1 bg-white px-8 pt-6 overflow-hidden flex flex-col m-10 ml-80 rounded-2xl shadow-md">
        <div class="mb-4 flex flex-col px-8 pt-4">
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
        <div class="overflow-x-auto px-8">
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
              <tr v-for="user in paginatedUsers" :key="user.id">
                <td class="py-4 px-4 border-b text-center">{{ user.id }}</td>
                <td class="py-2 px-4 border-b text-center">{{ user.name }}</td>
                <td class="py-2 px-4 border-b text-center">{{ user.telpNumber }}</td>
                <td class="py-2 px-4 border-b text-center">{{ user.email }}</td>
                <td class="py-2 px-4 border-b text-center">{{ user.role }}</td>
                <td class="py-2 px-4 border-b text-center">
                  <button class="mr-2" @click="confirmDelete(user.id)">
                    <!-- Delete Icon -->
                    <i class="fas fa-trash-can"></i>
                  </button>
                  <button class="mr-2">
                    <!-- Edit Icon -->
                    <i class="fas fa-edit" @click="openRoleModal(user.id, user.role)"></i>
                  </button>
                  <button class="mr-2" @click="openPasswordModal(user.id)">
                    <!-- Lock Icon -->
                    <i class="fas fa-key"></i>
                  </button>


                </td>
              </tr>
            </tbody>
          </table>

          <!-- Tombol Next, Previous, dan Nomor Halaman -->
          <div class="flex justify-center items-center mt-4 space-x-4">
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


    <!-- Modal UpdateRole -->
    <div v-if="isRoleModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-4 rounded-xl">
        <div class="flex justify-end">
          <button @click="closeRoleModal" class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="bg-white px-6 rounded-lg w-full">
          <form @submit.prevent="updateUserRole">
            <div class="mb-4">
              <label class="block text-md font-medium text-gray-600">Role</label>
              <div class="flex items-center space-x-2">
                <input v-model="userRoleData.role" type="radio" id="admin" name="role" value="admin"
                  class="border-gray-300" />
                <label for="admin" class="text-sm text-gray-600">Admin</label>
                <input v-model="userRoleData.role" type="radio" id="user" name="role" value="user"
                  class="rounded-full border-gray-300" />
                <label for="user" class="text-sm text-gray-600">User</label>
              </div>
            </div>
            <div class="flex justify-center">
              <button type="submit" class="px-4 py-2 bg-[#C53030] text-white rounded-md mb-4 w-full sm:w-auto">
                Update Role
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
              <label for="employeeId" class="block text-md font-medium text-gray-600">
                Employee ID
              </label>
              <input v-model="newUser.employeeId" type="text" id="employeeId" name="employeeId"
                class="mt-1 p-2 border-2 rounded-md w-full sm:w-96 text-sm" placeholder="Input Employee ID" required />
            </div>
            <div class="mb-2">
              <label for="name" class="block text-md font-medium text-gray-600">
                Name
              </label>
              <input v-model="newUser.name" type="text" id="name" name="name"
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
              <label for="password" class="block text-md font-medium text-gray-600">
                Password
              </label>
              <input v-model="newUser.password" type="password" id="password" name="password"
                class="mt-1 p-2 border-2 rounded-md w-full text-sm" placeholder="Input Password" required />
            </div>
            <div class="mb-4">
              <label class="block text-md font-medium text-gray-600">Role</label>
              <div class="flex items-center space-x-2">
                <input v-model="newUser.role" type="radio" id="admin" name="role" value="admin" class="border-gray-300" />
                <label for="admin" class="text-sm text-gray-600">Admin</label>
                <input v-model="newUser.role" type="radio" id="user" name="role" value="user"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 2, name: "Haikal Adibasta", telpNumber: "123456789", email: "superhaikal@example.com", role: "Admin" },
        { id: 3, name: "Atsal fais", telpNumber: "123456789", email: "superhaikal@example.com", role: "Admin" },
        { id: 4, name: "Jendra Wardhana", telpNumber: "123456789", email: "superhaikal@example.com", role: "Admin" },
        { id: 5, name: "Depi Fitriani", telpNumber: "123456789", email: "superhaikal@example.com", role: "Admin" },
        { id: 6, name: "Nahiyah Zahrah", telpNumber: "123456789", email: "superhaikal@example.com", role: "Admin" },
        { id: 7, name: "Debian bukan linux", telpNumber: "123456789", email: "superhaikal@example.com", role: "Admin" },
      ],
      itemsPerPage: 5,
      currentPage: 1,
      isModalOpen: false,
      isDeleteModalOpen: false,
      isPasswordModalOpen: false,
      isRoleModalOpen: false,
      userIdToDelete: null,

      isPasswordModalOpen: false,
      passwordData: {
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
      this.isDeleteModalOpen = false;
      this.isPasswordModalOpen = false;
      this.isRoleModalOpen = false;
    },

    closeModal() {
      this.isModalOpen = false;
      this.newUser = {
        employeeId: "",
        name: "",
        email: "",
        password: "",
        role: "",
      };
    },

    addUser() {
      this.users.push({ ...this.newUser, id: this.users.length + 1 });
      this.closeModal();
    },
    confirmDelete(userId) {
      this.userIdToDelete = userId;
      this.isDeleteModalOpen = true;
    },

    cancelDelete() {
      this.isDeleteModalOpen = false;
      this.userIdToDelete = null;
    },

    deleteUser() {
      // Lakukan penghapusan user sesuai userIdToDelete
      const indexToDelete = this.users.findIndex(user => user.id === this.userIdToDelete);
      if (indexToDelete !== -1) {
        this.users.splice(indexToDelete, 1);
      }

      // Tutup modal konfirmasi penghapusan
      this.isDeleteModalOpen = false;
      this.userIdToDelete = null;
    },
    openPasswordModal() {
      this.isPasswordModalOpen = true;
      this.isModalOpen = false;
      this.isDeleteModalOpen = false;
      this.isRoleModalOpen = false;
    },

    closePasswordModal() {
      this.isPasswordModalOpen = false;
      this.passwordData = {
        oldPassword: '',
        newPassword: '',
      };
    },


    openRoleModal(userId, currentRole) {
      this.userRoleData = {
        userId: userId,
        role: currentRole,
      };
      this.isRoleModalOpen = true;
      this.isModalOpen = false;
      this.isDeleteModalOpen = false;
      this.isPasswordModalOpen = false;
    },

    closeRoleModal() {
      this.isRoleModalOpen = false;
      this.userRoleData = {
        userId: null,
        role: "",
      };
    },

    updateUserRole() {
      // Lakukan pembaruan peran pengguna sesuai userRoleData
      const userIndex = this.users.findIndex(user => user.id === this.userRoleData.userId);
      if (userIndex !== -1) {
        this.users[userIndex].role = this.userRoleData.role;
      }

      // Tutup modal pembaruan peran
      this.isRoleModalOpen = false;
      this.userRoleData = {
        userId: null,
        role: "",
      };
    },

  },
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
</style>