<template>
    <div class="flex bg-[#EDF2F7] bg-cover min-h-screen">
      <!-- Sidebar -->
      <LayoutsSidebar />
  
      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Navbar -->
        <LayoutsNavbar />
  
        <!-- User Box -->
        <div class="flex-1 bg-white px-8 pt-8 overflow-hidden flex flex-col m-10 ml-80 rounded-2xl shadow-md">
          <div class="mb-4 flex flex-col px-8 pt-4">
            <div class="text-4xl  font-bold mb-4">User List</div>
            <div class="text-4xl  font-bold mb-4">wkwwkwkwk</div>

            <div class="flex pt-6">
              <input
                type="text"
                placeholder="Search user"
                class="px-3 py-1 border pr-16 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                class="ml-auto px-4 py-2 bg-red-500 text-white rounded-md"
              >
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
                  <td class="py-4 px-4 border-b">{{ user.id }}</td>
                  <td class="py-2 px-4 border-b">{{ user.name }}</td>
                  <td class="py-2 px-4 border-b">{{ user.telpNumber }}</td>
                  <td class="py-2 px-4 border-b">{{ user.email }}</td>
                  <td class="py-2 px-4 border-b">{{ user.role }}</td>
                  <td class="py-2 px-4 border-b">
                    <button class="mr-2">
                      <!-- Delete Icon -->
                      <i class="fas fa-trash-can"></i>
                    </button>
                    <button class="mr-2">
                      <!-- Edit Icon -->
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="mr">
                      <!-- Lock Icon -->
                      <i class="fas fa-key"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <!-- Tombol Next, Previous, dan Nomor Halaman -->
            <div class="flex justify-between mt-4">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 bg-gray-300 text-gray-600 rounded-md"
              >
                Previous
              </button>
              <div class="flex items-center space-x-2">
                <button
                  v-for="pageNumber in pageNumbers"
                  :key="pageNumber"
                  @click="goToPage(pageNumber)"
                  class="px-4 py-2 bg-gray-300 text-gray-600 rounded-md"
                >
                  {{ pageNumber }}
                </button>
              </div>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-gray-300 text-gray-600 rounded-md"
              >
                Next
              </button>
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
          // Placeholder data, replace with your actual user data
          { id: 1, name: "Haikal Adibasta", telpNumber: "123456789", email: "superhaikal@example.com", role: "Admin" },
          // Add more user data as needed
        ],
        itemsPerPage: 5, // Number of items per page
        currentPage: 1, // Current page number
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.users.length / this.itemsPerPage);
      },
      paginatedUsers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.users.slice(start, end);
      },
      pageNumbers() {
        const pages = [];
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
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
    },
  };
  </script>
  
  <style scoped>
  @import '@fortawesome/fontawesome-free/css/all.css';
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  </style>