<template>
    <div class="flex bg-[#EDF2F7] bg-cover min-h-screen">
        <!-- Sidebar -->
        <LayoutsSidebar />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Navbar -->
            <LayoutsNavbar />

            <!-- Main Content -->
            <div class="IOform flex-1 bg-white px-8 pt-6 overflow-hidden flex flex-col m-10 ml-80 rounded-2xl shadow-md">
                <!-- Step 1 -->
                <div v-if="currentStep === 1" class="">
                    <div class="mb-4 flex flex-col px-6 pt-4">
                        <div class="text-4xl font-bold mb-4">Repository</div>
                    </div>
                    <div class="px-6 overflow-x-auto ">
                        <table class="min-w-full bg-white border-collapse rounded-md">
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b bg-gray-100">No</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">App Name</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">EndDate</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">Requester</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">Status</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(project, index) in projects" :key="project.id_project">
                                    <td class="py-4 px-4 border-b text-center">{{ index + 1 }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ project.application_name }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ project.end_date }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ project.requester }}</td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <span :class="getStatusClass(project.status)">{{ project.status }}</span>
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <button v-if="project.status !== ''" class="info mr-2" @click="goToStep2(project)">
                                            <i class="text-gray-400 fas fa-info-circle hover:text-gray-700 text-lg"></i>
                                        </button>
                                        <button v-if="project.status !== 'DROPPED'" class="edit mr-2"
                                            @click="goToStep3(project)">
                                            <i class="text-gray-400 fas fa-edit hover:text-gray-700 text-lg"></i>
                                        </button>
                                        <button v-if="project.status !== ''" class="mr-2"
                                            @click="confirmDelete(project.id_project)">
                                            <i class="text-gray-400 fas fa-print hover:text-gray-700 text-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>




                    </div>
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
                            class="py-8 text-black-600 rounded-md">
                            Next
                        </button>
                    </div>

                </div>

                <!-- Modal for Delete Confirmation -->
                <div v-if="showDeleteConfirmationModal"
                    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div class="bg-white px-4 py-4 rounded-xl w-auto">
                        <div class="flex justify-end">
                            <button @click="cancelDelete"
                                class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="bg-white px-8 rounded-lg w-auto">
                            <div class="flex flex-col items-center mb-4">
                                <!-- Trash Icon -->
                                <div
                                    class=" text-[#C53030] text-4xl rounded-full bg-white px-6 py-3 border-[#C53030] border-4 mb-4">
                                    <i class="fas fa-trash-can"></i>
                                </div>
                                <p class="text-xl font-medium text-gray-600 text-center">Are you sure to delete this
                                    employee
                                    <br>from
                                    the employee
                                    list?
                                </p>
                            </div>
                            <div class="flex justify-center">
                                <button @click="deleteProject" class="px-8 py-2 my-2 bg-[#C53030] text-white rounded-md">
                                    Delete
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


                <!-- Step 2 -->
                <div v-if="currentStep === 2">
                    <div class="flex justify-end">
                        <button @click="closeDetailBoxAndGoToRepository"
                            class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                            <i class="fas fa-times"></i>
                        </button>

                    </div>
                    <div class="mb-4 flex flex-col px-6">
                        <div class="text-4xl font-bold mb-2">Detail Application</div>
                        <div class="flex mb-2 font-bold text-lg">Internal Order App : <div class="text-gray-500">{{
                            selectedIoProject.application_name }}</div>
                        </div>
                        <div class="mb-2">Status: <span :class="getStatusClass(selectedIoProject.status)">{{
                            selectedIoProject.status }}</span></div>
                    </div>

                    <!-- Your tabs (Internal, Timeline, Timeplan, Activity) here -->
                    <div class=" flex justify-start space-x-4 px-6">
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'internal' }"
                            @click="activeTab = 'internal'">Internal Order Form</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'timeline' }"
                            @click="activeTab = 'timeline'">Detail Timeline</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'detail' }"
                            @click="activeTab = 'detail'">Detail Man Power</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'activity' }"
                            @click="activeTab = 'activity'">Activity Log</div>
                    </div>

                    <!-- INFO Internal tab -->
                    <div v-if="activeTab === 'internal'" class="px-6">

                        <div>
                            <!-- Placeholder for Requester, Start Date, and End Date -->
                            <div class="flex flex-col mt-4 space-y-2 mb-4">
                                <label class=" text-md font-medium text-slate-700">Requester</label>
                                <div class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                    {{
                                        selectedIoProject.requester }}</div>

                                <div class="flex gap-8 flex-col lg:flex-row">
                                    <div class="flex flex-col w-full">
                                        <label class=" font-medium pt-2 text-slate-700 mb-2">Start Date</label>
                                        <div
                                            class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                                            {{
                                                selectedIoProject.start_date }}</div>

                                        <label class=" text-md font-medium pt-2 text-slate-700 mb-2">Low Level
                                            Design</label>
                                        <div class="relative border border-gray-300 bg-gray-100 p-2 rounded text-gray-600">
                                            {{ selectedIoProject.lld }}
                                            <i v-if="selectedIoProject.lld"
                                                class="fas fa-eye text-gray-500 absolute right-3 top-3"></i>
                                        </div>

                                        <label class=" text-md font-medium pt-2 text-slate-700 mb-2">High Level
                                            Design</label>
                                        <div class="relative border border-gray-300 bg-gray-100 p-2 rounded text-gray-600">
                                            {{ selectedIoProject.hld }}
                                            <i v-if="selectedIoProject.hld"
                                                class="fas fa-eye text-gray-500 absolute right-3 top-3 "></i>
                                        </div>


                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label class=" text-md font-medium pt-2 text-slate-700 mb-2">End Date</label>
                                        <div
                                            class="border border-gray-300 p-2 bg-gray-100 rounded placeholder-text text-gray-600">
                                            {{
                                                selectedIoProject.end_date }}</div>

                                        <label class=" text-md font-medium pt-2 text-slate-700 mb-2">Bussines Requirement
                                            Document</label>
                                        <div class="relative border border-gray-300  bg-gray-100 p-2 rounded text-gray-600">
                                            {{ selectedIoProject.brd }}
                                            <i v-if="selectedIoProject.brd"
                                                class="fas fa-eye text-gray-500 absolute right-3 top-3 pl-3"></i>
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>


                    <!-- INFO tab timeline -->
                    <div v-if="activeTab === 'timeline'" class="px-6">
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border-collapse rounded-md">
                                <thead>
                                    <tr>
                                        <th class="py-2 px-6 border-b bg-gray-100">Week</th>
                                        <th class="py-2 px-20 border-b bg-gray-100">Activity</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="timeline in projects" :key="project.id_project">
                                        <td class="py-4 px-4 border-b text-center">{{ timeline.weeks }}</td>
                                        <td class="py-2 px-4 border-b text-center">{{ timeline.activity }}</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div class="mb-6">
                            <div class="flex justify-center items-center mt-4 space-x-4">
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class=" font-semibold text-sm text-gray-400 rounded-md">
                                    Prev
                                </button>
                                <div class="flex items-center  space-x-2">
                                    <button v-for="pageNumber in pageNumbers" :key="pageNumber"
                                        @click="goToPage(pageNumber)" :class="{
                                            'bg-[#C53030] text-white rounded-lg py-2 px-3 text-xs': pageNumber === currentPage,
                                            'text-sm text-gray-400 border-2 rounded-lg py-2 px-3': pageNumber !== currentPage,
                                        }">
                                        {{ pageNumber }}
                                    </button>
                                </div>
                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class=" font-semibold text-sm text-gray-400 rounded-md">
                                    Next
                                </button>
                            </div>


                        </div>
                    </div>



                    <!-- INFO tab detail -->
                    <div v-if="activeTab === 'detail'" class="mt-4 mb-4 px-6">
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border-collapse rounded-md">
                                <thead>
                                    <tr>

                                        <th class="py-2 pl-20 border-b bg-gray-100">Role</th>
                                        <th class="py-2 pl-14 border-b bg-gray-100">Man Days Rate</th>
                                        <th class="py-2 pl-4 border-b bg-gray-100">Man Power</th>
                                        <th class="py-2 pl-4 border-b bg-gray-100">Days</th>
                                        <th class="py-2 pl-4 border-b bg-full pr-2 bg-gray-100">Total Man Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="mainpower in paginatedMainpower" :key="mainpower.role">

                                        <td class="py-4 pl-24 pr-4 border-b text-center">{{ mainpower.role }}</td>
                                        <td class="py-2 pl-16 border-b text-center">{{ mainpower.mandaysrate }}</td>
                                        <td class="py-2 pl-4 border-b text-center">
                                            <input v-model="mainpower.manpower" type="number"
                                                class="w-16 py-1 rounded bg-transparent text-center" placeholder="0">
                                        </td>
                                        <td class="py-2 pl-8 border-b text-center">
                                            <input v-model="mainpower.days" type="number"
                                                class="w-16 py-1 rounded bg-transparent text-center" placeholder="0">
                                        </td>
                                        <td class="py-2 px-4 border-b text-center">{{ calculateTotalManRate(mainpower) }}
                                        </td>
                                        <!-- <td class="py-2 px-4 border-b text-center">{{ timeline.action }}</td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="">
                            <div class="flex justify-center items-center mt-4 space-x-4">
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class=" font-semibold text-sm text-gray-400 rounded-md">
                                    Prev
                                </button>
                                <div class="flex items-center  space-x-2">
                                    <button v-for="pageNumber in pageNumbers" :key="pageNumber"
                                        @click="goToPage(pageNumber)" :class="{
                                            'bg-[#C53030] text-white rounded-lg py-2 px-3 text-xs': pageNumber === currentPage,
                                            'text-sm text-gray-400 border-2 rounded-lg py-2 px-3': pageNumber !== currentPage,
                                        }">
                                        {{ pageNumber }}
                                    </button>
                                </div>
                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class=" font-semibold text-sm text-gray-400 rounded-md">
                                    Next
                                </button>
                            </div>


                        </div>
                    </div>

                    <!-- INFO tab activity log -->
                    <div v-if="activeTab === 'activity'" class="mt-4 mb-4 px-6">
                        <div v-for="(log, index) in activityLogs" :key="index" class="flex items-center mb-4">
                            <img :src="log.user.profilePicture" alt="Profile Picture" class="w-10 h-10 rounded-full mr-4">
                            <div>
                                <div>
                                    <strong>{{ log.user.name }}</strong> changed Internal Order App status from
                                    <span class="text-gray-500">{{ log.statusChange.from }}</span> to
                                    <span class="text-green-500">{{ log.statusChange.to }}</span>
                                </div>
                                <div class="text-gray-500">{{ log.timestamp }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- ... (Content for other tabs remains the same) ... -->
                </div>

                <!-- EDIT step 3 -->
                <div v-if="currentStep === 3">
                    <div class="flex justify-end">
                        <button @click="closeDetailBoxAndGoToRepository"
                            class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                            <i class="fas fa-times"></i>
                        </button>

                    </div>

                    <div class="mb-4 flex flex-col px-4">
                        <div class="text-4xl font-bold mb-2">Detail Application</div>
                        <div class=" text-lg font-bold">Internal Order App {{ editingIoProject.application_name }}</div>
                    </div>

                    <!-- Your tabs (Internal, Timeline, Timeplan, Activity) here -->
                    <div class="mt-4 flex justify-start space-x-4 px-6 mb-2">
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'internal' }"
                            @click="activeTab = 'internal'">Internal Order Form</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'timeline' }"
                            @click="activeTab = 'timeline'">Detail Timeline</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'detail' }"
                            @click="activeTab = 'detail'">Detail Man Power</div>

                    </div>

                    <!-- EDIT tab internal -->
                    <div v-if="activeTab === 'internal'" class="mb-4">
                        <!-- Form for editing -->
                        <form @submit.prevent="saveChanges">
                            <div class="flex flex-col px-6 pb-2">
                                <label class="text-md font-medium pt-2 text-slate-700 mb-2">App Name</label>
                                <input v-model="editingIoProject.application_name"
                                    class="text-gray-500 border bg-gray-100 border-gray-300 p-2 rounded mb-2" />

                                <label class="text-md font-medium pt-2 text-slate-700 mb-2">Requester</label>
                                <input v-model="editingIoProject.requester"
                                    class="text-gray-500 border border-gray-300 bg-gray-100 p-2 rounded mb-2" />

                                <div class="flex space-x-8">
                                    <div class="flex flex-col w-full">
                                        <label class="text-md font-medium pt-2 text-slate-700 mb-2">Start Date</label>
                                        <input v-model="editingIoProject.start_date" type="date"
                                            class="text-gray-500 border border-gray-300 bg-gray-100 p-2 rounded" />
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <label class="text-md font-medium pt-2 text-slate-700 mb-2">End Date</label>
                                        <input v-model="editingIoProject.end_date" type="date"
                                            class="text-gray-500 border border-gray-300 bg-gray-100 p-2 rounded mb-2" />
                                    </div>
                                </div>

                                <div class="flex space-x-8">
                                    <div class="flex flex-col w-full relative">
                                        <label class="text-md font-medium pt-2 text-slate-700 mb-2">Low Level Design</label>
                                        <div
                                            class="flex items-center justify-between text-gray-500 border border-gray-300 bg-gray-100 p-2 rounded mb-2">
                                            <span>{{ editingIoProject.lld }}</span>
                                            <span @click="openUploadModal('LowLevelDesign')" class="cursor-pointer">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="flex flex-col w-full relative">
                                        <label class="text-md font-medium pt-2 text-slate-700 mb-2">Business Requirement
                                            Document</label>
                                        <input v-model="editingIoProject.brd"
                                            class="text-gray-500 border bg-gray-100 border-gray-300 p-2 rounded mb-2" />
                                    </div>
                                </div>

                                <div class="flex flex-col pr-4 w-full relative">
                                    <label class="text-md font-medium pt-2 text-slate-700 mb-2">High Level Design</label>
                                    <div
                                        class="flex items-center justify-between text-gray-500 border border-gray-300 bg-gray-100 p-2 rounded mb-2 w-full">
                                        <span>{{ editingIoProject.hld }}</span>
                                        <i class="fas fa-upload" @click="openUploadModal"></i>
                                    </div>
                                </div>

                                <div class="flex justify-end mt-4">
                                    <button type="submit" class="bg-[#C53030] text-white rounded p-2 hover:bg-red-700">Save
                                        Changes</button>
                                </div>
                            </div>
                        </form>
                    </div>



                    <!-- Modal untuk upload -->
                    <div v-if="uploadModal.isOpen"
                        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div class="bg-white px-4 py-4 rounded-xl w-auto">
                            <div class="flex justify-end">
                                <button @click="closeUploadModal"
                                    class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="bg-white px-4 rounded-lg w-auto">
                                <!-- Konten modal upload di sini -->
                                <div>
                                    <h2 class="text-xl font-semibold mb-4">Add Document</h2>

                                    <!-- Input untuk file -->
                                    <div class="mb-4">
                                        <label for="fileInput" class="block text-sm font-medium text-gray-700">Choose
                                            File</label>
                                        <input type="file" id="fileInput" @change="inputgambar"
                                            class="mt-1 p-1 border rounded-md w-full">
                                    </div>


                                    <!-- Tombol untuk menyimpan -->
                                    <button @click="saveDocument"
                                        class="px-4 py-2 bg-[#C53030] text-white rounded-md">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- modal edit internal -->

                    <!-- EDIT tab timeline -->
                    <div v-if="activeTab === 'timeline'" class="mt-4 mb-4 px-6">
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border-collapse rounded-md">
                                <thead>
                                    <tr>
                                        <th class="py-2 px-4 border-b bg-gray-100">Week</th>
                                        <th class="py-2 px-20 border-b bg-gray-100">Activity</th>
                                        <th class="py-2 px-4 border-b bg-gray-100">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="timeline in paginatedTimelines" :key="timeline.week">
                                        <td class="py-4 px-4 border-b text-center">{{ timeline.week }}</td>
                                        <td class="py-2 px-4 border-b text-center">{{ timeline.activity }}</td>
                                        <!-- <td class="py-2 px-4 border-b text-center">{{ timeline.action }}</td> -->
                                        <td class="py-2 px-4 border-b text-center">
                                            <button class="mr-2">
                                                <!-- Edit Icon -->
                                                <i class="fas fa-edit"
                                                    @click="openEditModal(timeline.week, timeline.activity)"></i>
                                            </button>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="">
                                <div class="flex justify-center items-center mt-4 space-x-4">
                                    <button @click="prevPage" :disabled="currentPage === 1"
                                        class=" font-semibold text-sm text-gray-400 rounded-md">
                                        Prev
                                    </button>
                                    <div class="flex items-center  space-x-2">
                                        <button v-for="pageNumber in pageNumbers" :key="pageNumber"
                                            @click="goToPage(pageNumber)" :class="{
                                                'bg-[#C53030] text-white rounded-lg py-2 px-3 text-xs': pageNumber === currentPage,
                                                'text-sm text-gray-400 border-2 rounded-lg py-2 px-3': pageNumber !== currentPage,
                                            }">
                                            {{ pageNumber }}
                                        </button>
                                    </div>
                                    <button @click="nextPage" :disabled="currentPage === totalPages"
                                        class=" font-semibold text-sm text-gray-400 rounded-md">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal for editing timeline -->
                    <div v-if="isEditModalOpen"
                        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div class="bg-white p-8 rounded-md w-96">
                            <h2 class="text-lg font-bold mb-4">Edit Timeline</h2>
                            <label class="block mb-2">Week</label>
                            <input v-model="timelineEditData.timelineWeek" type="text"
                                class="w-full border rounded-md p-2 mb-4">

                            <label class="block mb-2">Activity</label>
                            <input v-model="timelineEditData.activity" type="text"
                                class="w-full border rounded-md p-2 mb-4">

                            <div class="flex justify-end">
                                <button @click="closeEditModal" class="text-gray-600 mr-4">Cancel</button>
                                <button @click="saveTimelineEdits"
                                    class="bg-[#C53030] text-white rounded p-2 hover:bg-red-700">Save</button>

                            </div>
                        </div>
                    </div>

                    <!-- EDIT tab detail -->
                    <div v-if="activeTab === 'detail'" class="mt-4 mb-4">
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border-collapse rounded-md">
                                <thead>
                                    <tr>

                                        <th class="py-2 pl-20 border-b bg-gray-100">Role</th>
                                        <th class="py-2 pl-14 border-b bg-gray-100">Man Days Rate</th>
                                        <th class="py-2 pl-4 border-b bg-gray-100">Man Power</th>
                                        <th class="py-2 pl-4 border-b bg-gray-100">Days</th>
                                        <th class="py-2 pl-4 border-b bg-full pr-2 bg-gray-100">Total Man Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="mainpower in paginatedMainpower" :key="mainpower.role">

                                        <td class="py-4 pl-24 pr-4 border-b text-center">{{ mainpower.role }}</td>
                                        <td class="py-2 pl-16 border-b text-center">{{ mainpower.mandaysrate }}</td>
                                        <td class="py-2 pl-4 border-b text-center">
                                            <input v-model="mainpower.manpower" type="number"
                                                class="w-16 py-1 rounded bg-transparent text-center" placeholder="0">
                                        </td>
                                        <td class="py-2 pl-8 border-b text-center">
                                            <input v-model="mainpower.days" type="number"
                                                class="w-16 py-1 rounded bg-transparent text-center" placeholder="0">
                                        </td>
                                        <td class="py-2 px-4 border-b text-center">{{ calculateTotalManRate(mainpower) }}
                                        </td>
                                        <!-- <td class="py-2 px-4 border-b text-center">{{ timeline.action }}</td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    http: {
        baseURL: 'https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal/',
        // Sesuaikan dengan URL backend Anda
    },
    data() {
        return {
            gambaran: null,

            originalIoProject: {},
            editingIoProject: {
                id_project: null,
                application_name: '',
                requester: '',
                start_date: '',
                end_date: '',
                lld: null,
                brd: '',
                hld: null,
            },

            projects: [],

            uploadModal: {
                isOpen: false,
            },
            showDeleteConfirmationModal: false,
            deletingProjectId: null,


            isEditModalOpen: false,
            timelineEditData: {
                timelineWeek: null,
                activity: "",
            },

            newTimeline: {
                timelineWeek: "",
                activity: "",
            },
            timelineWeekCounter: 1,

            activityLogs: [
                {
                    user: { name: "Nahiyah Zahra", profilePicture: "url_to_profile_picture" },
                    statusChange: { from: "On going", to: "Finish" },
                    timestamp: this.getCurrentTime(),
                },
                // Data log lainnya...
            ],

            mainpowers: [
                { no: 1, role: "PM/Scrum Masteer", mandaysrate: 20000 },
                { no: 2, role: "Senior Business Analyst", mandaysrate: 20000 },
                { no: 3, role: "Produk Owner", mandaysrate: 20000 },
                { no: 4, role: "UI UX Designer", mandaysrate: 20000 },
                { no: 5, role: "Design Grafis", mandaysrate: 20000 },
                { no: 3, role: "Produk Owner", mandaysrate: 20000 },
                { no: 4, role: "UI UX Designer", mandaysrate: 20000 },
                { no: 5, role: "Design Grafis", mandaysrate: 20000 },
            ],
            itemsPerPage: 5,
            currentPage: 1,
            mainpowerNoCounter: 1,

            currentStep: 1,

            timelines: [
                { week: 1, activity: "makan" },
                { week: 2, activity: "mandi" },
                { week: 3, activity: "tidur" },
                { week: 4, activity: "ngoding" },
                { week: 5, activity: "main" },
                { week: 4, activity: "ngoding" },
                { week: 5, activity: "main" },
            ],


            ioProjects: [],

            itemsPerPage: 5,
            currentPage: 1,
            selectedIoProject: null,
            activeTab: "internal",

        };
    },
    computed: {

        paginatedTimelines() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const filteredTimelines = this.timelines.slice(start, end);
            return filteredTimelines;
        },

        isSidebarClickable() {
            return !this.selectedIoProject && !this.editingIoProject;
        },
        totalPages() {
            return Math.ceil(this.ioProjects.length / this.itemsPerPage);
        },
        paginatedIoProjects() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const filteredIoProjects = this.ioProjects.slice(start, end);
            return filteredIoProjects;
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

        async saveDocument() {
      try {
        const formData = new FormData();
        formData.append('file', this.gambaran);

        // Menggunakan axios untuk mengirim file ke backend
        await axios.post('http://localhost:3000/upload', formData);

        // Setelah berhasil diunggah, Anda dapat menambahkan logika lainnya
        console.log('File berhasil diunggah dan disimpan di database');

        // Tutup modal upload
        this.closeUploadModal();
      } catch (error) {
        console.error('Error saving document:', error);
        // Handle errors
      }
    },

    inputgambar(file) {
      console.log(file);
      this.gambaran = file;
    },
        updateIoProject() {
            if (this.editingIoProject && this.editingIoProject.id_project) {
                const formData = new FormData();

                // Periksa dan tambahkan ke formData hanya jika ada perubahan pada data
                if (this.editingIoProject.start_date !== this.originalIoProject.start_date) {
                    formData.append('start_date', this.editingIoProject.start_date);
                }

                if (this.editingIoProject.end_date !== this.originalIoProject.end_date) {
                    formData.append('end_date', this.editingIoProject.end_date);
                }

                if (this.editingIoProject.hld[0] && this.editingIoProject.hld[0] !== this.originalIoProject.hld) {
                    formData.append('hld', this.editingIoProject.hld[0]);
                }

                if (this.editingIoProject.lld[0] && this.editingIoProject.lld[0] !== this.originalIoProject.lld) {
                    formData.append('lld', this.editingIoProject.lld[0]);
                }

                if (this.editingIoProject.brd !== this.originalIoProject.brd) {
                    formData.append('brd', this.editingIoProject.brd);
                }

                axios
                    .put(
                        'https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal/${this.editingIoProject.id_project}/', formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    )
                    .then((response) => {
                        console.log('Perubahan berhasil disimpan:', response.data);
                        // Update data pada frontend
                        const updatedIndex = this.ioProjects.findIndex(
                            (project) => project.id_project === this.editingIoProject.id_project
                        );
                        if (updatedIndex !== -1) {
                            this.$set(this.ioProjects, updatedIndex, response.data);
                        }
                        this.isEditModalOpen = false;
                    })
                    .catch((error) => {
                        console.error('Error saving changes:', error);
                        if (error.response) {
                            console.error('Server merespons dengan:', error.response.data);
                        }
                        // Tangani kesalahan dan berikan umpan balik kepada pengguna
                    });
            }
        },
        getIoProjectById(id_project) {
            axios
                .get(`${this.http.baseURL}${id_project}/`)
                .then((response) => {
                    this.originalIoProject = response.data;
                    // Set juga editingIoProject agar awalnya sama dengan originalIoProject
                    this.editingIoProject = { ...response.data };
                })
                .catch((error) => {
                    console.error('Error fetching project data:', error);
                    // Handle errors
                });
        },
        saveChanges() {
            // Pastikan editingIoProject tidak null dan memiliki properti yang diperlukan sebelum memanggil updateIoProject
            if (this.editingIoProject && this.editingIoProject.id_project) {
                // Logika penyimpanan perubahan ke server
                this.updateIoProject();

                // Setelah disimpan, reset editing state
                this.editingIoProject = {
                    id_project: null,
                    application_name: '',
                    requester: '',
                    start_date: '',
                    end_date: '',
                    lld: [],
                    brd: '',
                    hld: [],
                };
            }
        },






        openUploadModal() {
      this.uploadModal.isOpen = true;
    },
    closeUploadModal() {
      this.uploadModal.isOpen = false;
    },

        confirmDelete(projectId) {
            // Set deletingProjectId
            this.deletingProjectId = projectId;
            // Show the delete confirmation modal
            this.showDeleteConfirmationModal = true;
        },

        deleteProject() {
            if (this.deletingProjectId) {
                axios
                    .delete(`https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal/${this.deletingProjectId}`)
                    .then(() => {
                        // Hapus proyek dari array setelah berhasil dihapus dari server
                        const indexToDelete = this.ioProjects.findIndex(project => project.id === this.deletingProjectId);

                        if (indexToDelete !== -1) {
                            this.ioProjects.splice(indexToDelete, 1);
                        }

                        // Setelah penghapusan, tutup modal konfirmasi
                        this.showDeleteConfirmationModal = false;
                    })
                    .catch((err) => console.error(err));
            }
        },

        cancelDelete() {
            // If user cancels, simply close the modal
            this.showDeleteConfirmationModal = false;
        },

        openEditModal(week, activity) {
            this.timelineEditData = { timelineWeek: week, activity: activity };
            this.isEditModalOpen = true;
        },

        closeEditModal() {
            this.isEditModalOpen = false;
        },

        saveTimelineEdits() {

            // Lakukan logika penyimpanan (seperti mengirim permintaan ke server) di sini
            // Setelah disimpan, perbarui timeline dengan data yang diedit
            const editedTimelineIndex = this.timelines.findIndex(timeline =>
                timeline.week === this.timelineEditData.timelineWeek
            );

            if (editedTimelineIndex !== -1) {
                this.$set(this.timelines, editedTimelineIndex, {
                    week: this.timelineEditData.timelineWeek,
                    activity: this.timelineEditData.activity,
                });
            }

            this.isEditModalOpen = false;
        },

        getCurrentTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            return timeString;
        },

        addStatusChangeLog(newStatus) {
            // Tambahkan log baru
            this.activityLogs.unshift({
                user: { name: "Nahiyah Zahra", profilePicture: "url_to_profile_picture" },
                statusChange: { from: this.selectedIoProject.status, to: newStatus },
                timestamp: this.getCurrentTime(),
            });

            // Perbarui status internal order
            this.selectedIoProject.status = newStatus;
        },

        goToStep2(ioProject) {
            // Set currentStep to 2 and show details for the clicked project
            this.currentStep = 2;
            this.showDetailBox(ioProject);
        },
        goToStep3(ioProject) {
            // Set currentStep to 3 and edit the clicked project
            this.currentStep = 3;
            this.editIoProject(ioProject);
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
        getStatusClass(status) {
            return {
                'bg-green-100 rounded-sm px-2 text-green-700 text-sm': status === 'FINISH',
                'bg-red-100 rounded-sm px-2 text-red-700 text-sm': status === 'ON GOING',
                'bg-gray-200 rounded-sm px-2 text-gray-700 text-sm': status === 'DROPPED',
            };
        },
        showDetailBox(ioProject) {
            this.selectedIoProject = ioProject;
            this.editingIoProject = null; // Reset editing state when showing details
        },
        editIoProject(ioProject) {
            // Copy the object to avoid modifying the original
            this.editingIoProject = { ...ioProject };
            this.selectedIoProject = null; // Reset detail view when editing
        },
        cancelEdit() {
            this.editingIoProject = null;
        },


        closeDetailBoxAndGoToRepository() {
            // Reset currentStep to 1 (Repository page)
            this.currentStep = 1;

            // Clear selected and editing projects
            this.selectedIoProject = null;
            this.editingIoProject = null;
        },
        toggleDetailBox(ioProject) {
            // Toggle between showing and hiding the detail box
            if (this.selectedIoProject === ioProject) {
                // If the same project is clicked again, close the detail box
                this.selectedIoProject = null;
            } else {
                // If a different project is clicked, show the detail box
                this.selectedIoProject = ioProject;
                this.editingIoProject = null; // Reset editing state when showing details
            }
        },
    },

    mounted() {
        axios
            .get('https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal/')
            .then((res) => {
                // Pastikan respon sesuai dengan struktur data yang diharapkan
                this.projects = res.data.projects; // Ganti dengan properti yang sesuai dari respon API

                // Set default selected project to the first project in the list
                if (this.projects.length > 0) {
                    this.selectedIoProject = this.projects[0];
                }
            })
            .catch((err) => console.error(err));

        axios
            .get('https://example.com/second-url')
            .then((response) => {
                // Lakukan sesuatu dengan data dari URL kedua
                console.log('Data dari URL kedua:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching data from second URL:', error);
            });
    }


};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Styling untuk tab */
.flex.space-x-2>div {
    border: 1px solid #CBD5E0;
    padding: 8px;
    background-color: #F7FAFC;
    cursor: pointer;
    transition: background-color 0.3s;
}

.flex.space-x-2>div:hover {
    background-color: #E2E8F0;
}

.tab-active {
    background-color: #EDF2F7;
    border-color: #A0AEC0;
}
</style>

boss