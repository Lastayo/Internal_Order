
<template>
    <div class="bg-[#EDF2F7] bg-cover min-h-screen">
        <LayoutsSidebar />
        <LayoutsNavbar />

        <div class="IOform flex-1 bg-white px-8 pt-6 overflow-hidden flex flex-col m-10 ml-80 rounded-2xl shadow-md">


            <!-- Langkah 1: Requester dan High Level Design -->
            <div v-if="currentStep === 1" class="pt-6 flex">
                <!-- ... input fields untuk langkah 1 ... -->
                <div class="mb-4 flex flex-col px-8 pt-4">
                    <div class="text-4xl font-bold mb-4">Project Charter Form</div>

                    <div class="pt-6 flex">
                        <div class="mr-10">
                            <span class="block text-md font-medium text-slate-700">
                                Project Name
                            </span>
                            <input type="text" name="project_name"
                                class="mt-1 w-auto pl-3 pr-80 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                placeholder="Input Project Name" />
                        </div>
                        <div class="">
                            <span class="block text-md font-medium text-slate-700">
                                BU Delivery
                            </span>
                            <input type="text" name="bu_delivery"
                                class="mt-1 w-[513px] pl-3 pr-60 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                placeholder="Input BU Delivery" />
                        </div>
                    </div>
                    <div class="flex ">
                        <div class="mr-10">
                            <span class="block text-md font-medium pt-2 text-slate-700">
                                IWO
                            </span>
                            <input type="text" name="iwo"
                                class="mt-1 w-auto pl-3 pr-80 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                placeholder="Input Application Name" />
                        </div>
                        <div class="pt-2">
                            <span class="block text-md font-medium text-slate-700">
                                BU Relate
                            </span>
                            <input type="text" name="bu_related"
                                class="mt-1 w-[513px] pl-3 pr-60 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                placeholder="Input BU Related" />
                        </div>
                    </div>
                    <div class="flex">
                        <div class="mr-10">
                            <span class="block text-md font-medium pt-2 text-slate-700">
                                Project Manager
                            </span>
                            <input type="text" name="project_manager"
                                class="mt-1 w-[490px] px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                placeholder="Input Project Manager" />
                        </div>
                        <div class="mr-10">
                            <span class="block text-md font-medium pt-2 text-slate-700">
                                Project Descriptions
                            </span>
                            <textarea name="descriptions"
                                class="mt-1 w-[513px] px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"/>
                        </div>
                    </div>
                    <div>
                        <span class="block text-md font-medium text-slate-700">
                           Customer
                        </span>
                        <input type="text" name="customer"
                            class="mt-1 w-[490px] px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                            placeholder="Input Customer" />
                    </div>
                    <div>
                        <span class="block text-md font-medium pt-2 text-slate-700">
                           End Customer
                        </span>
                        <input type="text" name="end_customer"
                            class="mt-1 w-[490px] px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                            placeholder="Input End Customer" />
                    </div>

                    <button @click="nextStep" class="ml-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                        Next
                    </button>
                </div>
            </div>
            <!-- Langkah 2: Application dan Low Level Design -->
            <div v-if="currentStep === 2" class="">
                <!-- ... input fields untuk langkah 2 ... -->
                <div class="mb-4 flex flex-col px-8 pt-4">
                    <div class="text-4xl font-bold mb-4">Detail Timeline</div>
                </div>

                <div>
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
                                        <i class="fas fa-edit" @click="openEditModal(timeline.week, timeline.activity)"></i>
                                    </button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="isEditModalOpen"
                    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div class="bg-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-4 rounded-xl">
                        <div class="flex justify-end">
                            <button @click="closeEditModal"
                                class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="bg-white px-6 rounded-lg w-full">
                            <form @submit.prevent="updateTimeline">
                                <div class="mb-2">
                                    <label for="activity" class="block text-md font-medium text-gray-600">
                                        Activity
                                    </label>
                                    <input v-model="newActivity" type="text" id="activity" name="activity"
                                        class="text-sm mt-1 p-2 border-2 rounded-md w-full"
                                        placeholder="Requirement Gathering" required />
                                </div>

                                <div class="flex justify-center">
                                    <button @click="closePasswordModal" type="submit"
                                        class="px-4 py-2 bg-[#C53030] text-white rounded-md my-4 w-full sm:w-auto">
                                        Add Activity
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="">
                    <div class="flex justify-center items-center mt-4 space-x-4">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class=" font-semibold text-sm text-gray-400 rounded-md">
                            Prev
                        </button>
                        <div class="flex items-center  space-x-2">
                            <button v-for="pageNumber in pageNumbers" :key="pageNumber" @click="goToPage(pageNumber)"
                                :class="{
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

                    <button @click="prevStep"
                        class="px-10 ml-5 mx-[830px] mb-5 h-10 text-sm bg-[#C53030] text-white rounded-md">
                        Back
                    </button>
                    <button @click="nextStep" class="ml-4 px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                        Next
                    </button>
                </div>
            </div>

            <!-- Langkah 3: Start Date dan Business Requirement Document -->
            <div v-if="currentStep === 3">

                <div class="mb-4 flex flex-col px-8 pt-4">
                    <div class="text-4xl font-bold mb-4">Detail Main Power</div>
                </div>

                <div>
                    <table class="min-w-full bg-white border-collapse rounded-md">
                        <thead>
                            <tr>
                                <th class="py-2 px-4 border-b bg-gray-100">No</th>
                                <th class="py-2 pl-20 border-b bg-gray-100">Role</th>
                                <th class="py-2 pl-14 border-b bg-gray-100">Man Days Rate</th>
                                <th class="py-2 pl-4 border-b bg-gray-100">Man Power</th>
                                <th class="py-2 pl-4 border-b bg-gray-100">Days</th>
                                <th class="py-2 pl-4 border-b bg-full pr-2 bg-gray-100">Total Man Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="mainpower in paginatedMainpower" :key="mainpower.role">
                                <td class="py-4 px-4 border-b text-center">{{ mainpower.no }}</td>
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
                                <td class="py-2 px-4 border-b text-center">{{ calculateTotalManRate(mainpower) }}</td>
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
                            <button v-for="pageNumber in pageNumbers" :key="pageNumber" @click="goToPage(pageNumber)"
                                :class="{
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

                    <button @click="prevStep"
                        class="px-10 ml-5 mx-[830px] mb-5 h-10 text-sm bg-[#C53030] text-white rounded-md">
                        Back
                    </button>
                    <button @click="submit" class="ml-4 px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                        Submit
                    </button>
                </div>
            </div>

        </div>



    </div>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 1,

            timelines: [
                { week: 1, activity: "makan" },
                { week: 2, activity: "mandi" },
                { week: 3, activity: "tidur" },
                { week: 4, activity: "ngoding" },
                { week: 5, activity: "main" },
            ],
            itemsPerPage: 5,
            currentPage: 1,
            isEditModalOpen: false,

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

            mainpowers: [
                { no: 1, role: "PM/Scrum Masteer", mandaysrate: 20000 },
                { no: 2, role: "Senior Business Analyst", mandaysrate: 20000 },
                { no: 3, role: "Produk Owner", mandaysrate: 20000 },
                { no: 4, role: "UI UX Designer", mandaysrate: 20000 },
                { no: 5, role: "Design Grafis", mandaysrate: 20000 },
            ],
            itemsPerPage: 5,
            currentPage: 1,
            mainpowerNoCounter: 1,
        };


    },

    computed: {
        totalPages() {
            return Math.ceil(this.timelines.length / this.itemsPerPage);
        },
        paginatedTimelines() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const filteredTimelines = this.timelines.slice(start, end);
            return filteredTimelines;
        },

        totalPages() {
            return Math.ceil(this.mainpowers.length / this.itemsPerPage);
        },
        paginatedMainpower() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const filteredMainpowers = this.mainpowers.slice(start, end);
            return filteredMainpowers;
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
        nextStep() {
            if (this.currentStep < 4) {
                this.currentStep += 1;
            } else {
                // Lakukan logika akhir pengiriman formulir atau navigasi di sini
                console.log('Formulir terkirim!');
            }
        },
        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep -= 1;
            }
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
            this.isEditModalOpen = false;
        },

        generateTimelineWeek() {
            this.newTimeline.timelineWeek = 'EMP' + this.timelineWeekCounter;
            this.timelineWeekCounter++;
        },

        generateMainpowerNo() {
            this.newMainpower.mainpowerNo = 'EMP' + this.mainpowerNoCounte;
            this.mainpowerNoCounter++;
        },

        openEditModal(activity, currentactivity) {
            this.timelineEditData = {
                activity: currentactivity,

            };
            this.isEditModalOpen = true;
        },

        closeEditModal() {
            this.isEditModalOpen = false;
            this.timelineEditData = {
                activity: "",
            };
        },

        updateTimeline() {
            // Lakukan pembaruan peran pengguna sesuai userRoleData
            const timelineIndex = this.timelines.findIndex(timeline => timeline.activity === this.timelineEditData.timelineActivity);
            if (timelineIndex !== -1) {
                this.employees[timelineIndex].edit = this.timelineEditData.edit;
            }

            // Tutup modal pembaruan peran
            this.isEditModalOpen = false;
            this.timelineEditData = {
                activity: "",
            };
        },

        calculateTotalManRate(mainpower) {
            const manDaysRate = parseFloat(mainpower.mandaysrate);
            const manPower = parseFloat(mainpower.manpower);
            const days = parseFloat(mainpower.days);

            if (isNaN(manDaysRate) || isNaN(manPower) || isNaN(days)) {
                return 0;
            }

            return manDaysRate * manPower * days;
        },

    },
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
</style>
  
  