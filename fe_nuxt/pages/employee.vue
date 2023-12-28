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
                    <div class="text-4xl font-bold mb-4">Employee List</div>

                    <div class="flex pt-4">
                        <input type="text" placeholder="Search employee"
                            class="px-3 py-1 border pr-16 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        <button @click="openModal" class="ml-auto px-4 py-2 bg-[#C53030] text-white rounded-md">
                            Add Employee
                        </button>
                    </div>
                </div>

                <!-- User Table -->
                <div class="overflow-x-auto px-8">
                    <table class="min-w-full bg-white border-collapse rounded-md">
                        <thead>
                            <tr>
                                <th class="py-2 px-4 border-b bg-gray-100">ID</th>
                                <th class="py-2 px-4 border-b bg-gray-100">Nama</th>
                                <th class="py-2 px-4 border-b bg-gray-100">Position</th>
                                <th class="py-2 px-4 border-b bg-gray-100">Telp Number</th>
                                <th class="py-2 px-4 border-b bg-gray-100">Email</th>
                                <th class="py-2 px-4 border-b bg-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="employee in paginatedEmployees" :key="employee.id">
                                <td class="py-4 px-4 border-b text-center">{{ employee.id }}</td>
                                <td class="py-2 px-4 border-b text-center">{{ employee.name }}</td>
                                <td class="py-2 px-4 border-b text-center">{{ employee.position }}</td>
                                <td class="py-2 px-4 border-b text-center">{{ employee.telpNumber }}</td>
                                <td class="py-2 px-4 border-b text-center">{{ employee.email }}</td>
                                <td class="py-2 px-4 border-b text-center">
                                    <button class="mr-2" @click="confirmDelete(employee.id)">
                                        <!-- Delete Icon -->
                                        <i class="fas fa-trash-can"></i>
                                    </button>
                                    <button class="mr-2">
                                        <!-- Edit Icon -->
                                        <i class="fas fa-edit" @click="openEditModal(employee.id, employee.position)"></i>
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
                            <button v-for="pageNumber in pageNumbers" :key="pageNumber" @click="goToPage(pageNumber)"
                                :class="{
                                    'bg-[#C53030] text-white rounded-lg py-2 px-4 text-md': pageNumber === currentPage,
                                    'text-sm text-black-600 border-2 rounded-lg py-2 px-4': pageNumber !== currentPage,
                                }">
                                {{ pageNumber }}
                            </button>
                        </div>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="py-2 text-black-600 rounded-md">
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
                        <div
                            class=" text-[#C53030] text-4xl rounded-full bg-white px-4 py-3 border-[#C53030] border-4 mb-4">
                            <i class="fas fa-trash-can"></i>
                        </div>
                        <p class="text-xl font-medium text-gray-600 text-center">Are you sure to delete this employee <br>from
                            the employee
                            list?</p>
                    </div>
                    <div class="flex justify-center">
                        <button @click="deleteEmployee" class="px-8 py-2 my-2 bg-[#C53030] text-white rounded-md">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Modal Edit -->
        <div v-if="isEditModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div class="bg-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-4 rounded-xl">
                <div class="flex justify-end">
                    <button @click="closeEditModal" class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="bg-white px-6 rounded-lg w-full">
                    <form @submit.prevent="updateEmployee">
                        <div class="mb-2">
                            <label for="name" class="block text-md font-medium text-gray-600">
                                Name
                            </label>
                            <input v-model="newEmployee.name" type="text" id="name" name="name"
                                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Employee Name"
                                required />
                        </div>
                        <div class="mb-2">
                            <label for="position" class="block text-md font-medium text-gray-600">
                                Position
                            </label>
                            <input v-model="newEmployee.position" type="text" id="position" name="position"
                                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Position"
                                required />
                        </div>
                        <div class="mb-2">
                            <label for="email" class="block text-md font-medium text-gray-600">
                                Email
                            </label>
                            <input v-model="newEmployee.email" type="email" id="email" name="email"
                                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Employee Email"
                                required />
                        </div>
                        <div class="mb-2">
                            <label for="telpNumber" class="block text-md font-medium text-gray-600">
                                Telp Number
                            </label>
                            <input v-model="newEmployee.password" type="text" id="telp_number" name="telp_number"
                                class="mt-1 p-2 border-2 rounded-md w-full text-sm" placeholder="Input Telp Number"
                                required />
                        </div>
                
                        <div class="flex justify-center">
                            <button type="submit" class="px-4 py-2 bg-[#C53030] text-white rounded-md mb-4 w-full sm:w-auto">
                                Add Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>



        <!-- Modal Addemployee -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div class="bg-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-4 rounded-xl">
                <div class="flex justify-end">
                    <button @click="closeModal" class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="bg-white px-6 rounded-lg w-full">
                    <form @submit.prevent="addEmployee">
                        <div class="mb-2">
                            <label for="name" class="block text-md font-medium text-gray-600">
                                Name
                            </label>
                            <input v-model="newEmployee.name" type="text" id="name" name="name"
                                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Employee Name"
                                required />
                        </div>
                        <div class="mb-2">
                            <label for="position" class="block text-md font-medium text-gray-600">
                                Position
                            </label>
                            <input v-model="newEmployee.position" type="text" id="position" name="position"
                                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Position"
                                required />
                        </div>
                        <div class="mb-2">
                            <label for="email" class="block text-md font-medium text-gray-600">
                                Email
                            </label>
                            <input v-model="newEmployee.email" type="email" id="email" name="email"
                                class="text-sm mt-1 p-2 border-2 rounded-md w-full" placeholder="Input Employee Email"
                                required />
                        </div>
                        <div class="mb-2">
                            <label for="telpNumber" class="block text-md font-medium text-gray-600">
                                Telp Number
                            </label>
                            <input v-model="newEmployee.telpNumber" type="text" id="telp_number" name="telp_number"
                                class="mt-1 p-2 border-2 rounded-md w-full text-sm" placeholder="Input Telp Number"
                                required />
                        </div>

                        <div class="flex justify-center">
                            <button @click="closePasswordModal" type="submit"
                                class="px-4 py-2 bg-[#C53030] text-white rounded-md mb-4 w-full sm:w-auto">
                                Add Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            



        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            employees: [
                // { id: 2, name: "Haikal Adibasta", telpNumber: "123456789", email: "superhaikal@example.com", position: "Manager" },
                // { id: 3, name: "Atsal fais", telpNumber: "123456789", email: "superhaikal@example.com", position: "GM" },
                // { id: 4, name: "Jendra Wardhana", telpNumber: "123456789", email: "superhaikal@example.com", position: "VP" },
                // { id: 5, name: "Depi Fitriani", telpNumber: "123456789", email: "superhaikal@example.com", position: "PM" },
                // { id: 6, name: "Nahiyah Zahrah", telpNumber: "123456789", email: "superhaikal@example.com", position: "BA" },
                // { id: 7, name: "Debian bukan linux", telpNumber: "123456789", email: "superhaikal@example.com", position: "BA" },
            ],
            itemsPerPage: 5,
            currentPage: 1,
            isModalOpen: false,
            isDeleteModalOpen: false,
            isEditModalOpen: false,
            employeeIdToDelete: null,

            isEditModalOpen: false,
            employeeEditData: {
                employeeId: null,
                name: "",
                email: "",
                position: "",
                telpNumber: "",
            },

            newEmployee: {
                employeeId: "",
                name: "",
                email: "",
                position: "",
                telpNumber:"" ,
            },
            employeeIdCounter: 1,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.employees.length / this.itemsPerPage);
        },
        paginatedEmployees() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const filteredEmployees = this.employees.slice(start, end);
            return filteredEmployees;
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
        this.isEditModalOpen = false;
    },

    closeModal() {
        this.isModalOpen = false;
        this.newEmployee = {
            employeeId: "",
            name: "",
            email: "",
            password: "",
            position: "",
        };
    },

    addEmployee() {
        this.employees.push({ ...this.newEmployee, id: this.employees.length + 1 });
        this.closeModal();
    },

    generateEmployeeId() {
        this.newEmployee.employeeId = 'EMP' + this.employeeIdCounter;
        this.employeeIdCounter++;
    },

    confirmDelete(employeeId) {
        this.employeeIdToDelete = employeeId;
        this.isDeleteModalOpen = true;
    },

    cancelDelete() {
        this.isDeleteModalOpen = false;
        this.employeeIdToDelete = null;
    },

    deleteEmployee() {
        // Perform deletion of employee based on employeeIdToDelete
        const indexToDelete = this.employees.findIndex(employee => employee.id === this.employeeIdToDelete);
        if (indexToDelete !== -1) {
            this.employees.splice(indexToDelete, 1);
        }

        // Close delete confirmation modal
        this.isDeleteModalOpen = false;
        this.employeeIdToDelete = null;
    },
    
    openEditModal(employeeId, currentid, currentname, currentposition, currenttelpNumber) {
      this.employeeEditData = {
        employeeId: employeeId,
        id: currentid,
        name: currentname,
        position: currentposition,
        telpNumber: currenttelpNumber,

      };
      this.isEditModalOpen = true;
      this.isModalOpen = false;
      this.isDeleteModalOpen = false;
    },

    closeEditModal() {
      this.isEditModalOpen = false;
      this.employeeEditData = {
        employeeId: null,
        position: "",
      };
    },

    updateEmployee() {
      // Lakukan pembaruan peran pengguna sesuai userRoleData
      const employeeIndex = this.employees.findIndex(employee => employee.id === this.employeeEditData.employeeId);
      if (employeeIndex !== -1) {
        this.employees[employeeIndex].edit = this.employeeEditData.edit;
      }

      // Tutup modal pembaruan peran
      this.isEditModalOpen = false;
      this.employeeEditData = {
        employeeId: null,
        position: "",
      };
    },

   
},
};
</script>
  
<style scoped>

@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

</style>