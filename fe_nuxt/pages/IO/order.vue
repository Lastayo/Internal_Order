fikri

<template>
    <div class="flex bg-[#EDF2F7] bg-cover min-h-screen">
        <!-- Sidebar -->
        <LayoutsSidebar />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Navbar -->
            <LayoutsNavbar />

            <div class="IOform flex-1 bg-white px-8 pt-6 overflow-hidden flex flex-col m-10 ml-80 rounded-2xl shadow-md">


                <!-- Langkah 1: Requester dan High Level Design -->
                <div v-if="currentStep === 1" class="">
                    <!-- ... input fields untuk langkah 1 ... -->
                    <div class="mb-4 flex flex-col px-6 pt-4">
                        <div class="text-4xl font-bold mb-4">Internal Order Form</div>

                        <div class="flex gap-8 flex-col lg:flex-row">
                            <div class="flex flex-col w-full relative">
                                <label class="block text-md font-medium text-slate-700">
                                    Requester
                                </label>
                                <input type="text" name="requester" v-model="postData.requester"
                                    class="mt-1 w-auto px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"
                                    placeholder="Input Requester Name" />

                                <label class="block text-md font-medium text-slate-700">
                                    Application
                                </label>
                                <input type="text" name="application_name" v-model="postData.application_name"
                                    class="mt-1 w-auto pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"
                                    placeholder="Input Application Name" />

                                <label class="block text-md font-medium text-slate-700">
                                    Start Date
                                </label>
                                <input type="date" name="start-date" v-model="selectedStartDate"
                                    @input="handleStartDateChange"
                                    class="mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"
                                    placeholder="Select Start Date" />

                                <label class="block text-md font-medium pt-2 text-slate-700">
                                    End Date
                                </label>
                                <input type="date" name="end-date" v-model="selectedEndDate" @input="handleEndDateChange"
                                    class="mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"
                                    placeholder="Select End Date" />

                                <label class="block text-md font-medium pt-2 text-slate-700">
                                    Status
                                </label>
                                <select name="status" v-model="postData.status"
                                    class="w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm">
                                    <option value="" disabled selected>Select Status</option>
                                    <option value="on_going">On Going</option>
                                    <option value="finish">Finish</option>
                                    <option value="dropped">Dropped</option>
                                </select>
                            </div>


                            <div class="flex flex-col w-full relative">
                                <label class="block text-md font-medium text-slate-700 mb-1">
                                    Low Level Design
                                </label>
                                <div
                                    class="flex w-auto items-center justify-between border text-gray-400 shadow-sm placeholder-slate-400 border-slate-300 pl-3 py-2 rounded-md sm:text-sm mb-2">
                                    <label class="cursor-pointer ltr">
                                        <span class="text-gray-500 pe-2 fas fa-upload"></span>
                                        <input type="file" @change="handleLowLevelDesignChange" style="display: none;">
                                    </label>
                                </div>

                                <label class="block text-md font-medium text-slate-700 mb-1">
                                    High Level Design
                                </label>
                                <div
                                    class="flex w-auto items-center justify-between border text-gray-400 shadow-sm placeholder-slate-400 border-slate-300 pl-3 py-2 rounded-md sm:text-sm mb-2">
                                    <label class="cursor-pointer ltr">
                                        <span class="text-gray-500 pe-2 fas fa-upload"></span>
                                        <input type="file" @change="handleHighLevelDesignChange" style="display: none;">
                                    </label>
                                </div>

                                <label class="block text-md font-medium text-slate-700">
                                    Business Requirement Document
                                </label>
                                <input type="text" name="brd" v-model="this.postData.brd"
                                    class="mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"
                                    placeholder="Insert your link here" />

                            </div>
                        </div>

                        <button @click="nextStep(); generateTimelines()"
                            class="ml-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                            Next
                        </button>
                    </div>
                </div>

                <!-- Langkah 2: Application dan Low Level Design -->
                <div v-if="currentStep === 2" class="px-6">
                    <div class="mb-4 flex flex-col pt-4">
                        <div class="text-4xl font-bold mb-4">Detail Timeline</div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border-collapse rounded-md">
                            <thead>
                                <tr>
                                    <th class="py-2 px-6 border-b bg-gray-100">Week</th>
                                    <th class="py-2 px-20 border-b bg-gray-100">Activity</th>
                                    <th class="py-2 px-6 border-b bg-gray-100">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="timeline in paginatedTimelines" :key="timeline.week">
                                    <td class="py-4 px-6 border-b text-center">{{ timeline.week }}</td>
                                    <td class="py-2 px-6 border-b text-center">{{ timeline.activity }}</td>
                                    <td class="py-2 px-6 border-b text-center">
                                        <button class="mr-2">
                                            <!-- Edit Icon -->
                                            <i class="fas fa-edit" @click="openEditModal(timeline)"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div v-if="isEditModalOpen"
                        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div class="bg-white sm:w-full md:w-2/3 lg:w-full xl:w-1/3 px-6 py-4 rounded-xl">
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
                                        <input v-model="timelineEditData.activity" type="text" id="activity" name="activity"
                                            class="text-sm mt-1 p-2 border-2 rounded-md w-full"
                                            placeholder="Requirement Gathering" required />
                                    </div>

                                    <div class="flex justify-center">
                                        <button @click="closePasswordModal" type="submit"
                                            class="px-6 py-2 bg-[#C53030] text-white rounded-md my-4 w-full sm:w-auto">
                                            Add Activity
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="">
                        <div class="flex justify-center items-center mt-4 space-x-4">
                            <button @click="prevPageTimeline" :disabled="currentPageTimeline === 1"
                                class="font-semibold text-sm text-gray-400 rounded-md">
                                Prev
                            </button>
                            <div class="flex items-center space-x-2">
                                <button v-for="pageNumber in pageNumbersTimeline" :key="pageNumber"
                                    @click="goToPageTimeline(pageNumber)" :class="{
                                        'bg-[#C53030] text-white rounded-lg py-2 px-3 text-xs': pageNumber === currentPageTimeline,
                                        'text-sm text-gray-400 border-2 rounded-lg py-2 px-3': pageNumber !== currentPageTimeline,
                                    }">
                                    {{ pageNumber }}
                                </button>
                            </div>
                            <button @click="nextPageTimeline" :disabled="currentPageTimeline === totalPagesTimeline"
                                class="font-semibold text-sm text-gray-400 rounded-md">
                                Next
                            </button>
                        </div>

                        <div class="mb-5 flex flex-col sm:flex-row sm:justify-between">
                            <button @click="prevStep"
                                class="w-full sm:w-auto px-10 ml-0 sm:ml-5 mb-2 sm:mb-0 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Back
                            </button>
                            <button @click="nextStep"
                                class="w-full sm:w-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Langkah 3: Start Date dan Business Requirement Document -->
                <div v-if="currentStep === 3" class="px-6">

                    <div class="mb-4 flex flex-col pt-4">
                        <div class="text-4xl font-bold mb-4">Detail Main Power</div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border-collapse rounded-md">
                            <thead>
                                <tr>
                                    <th class="py-2 px-6 border-b bg-gray-100">No</th>
                                    <th class="py-2 pl-20 border-b bg-gray-100">Role</th>
                                    <th class="py-2 pl-14 border-b bg-gray-100">Man Days Rate</th>
                                    <th class="py-2 pl-4 border-b bg-gray-100">Man Power</th>
                                    <th class="py-2 pl-4 border-b bg-gray-100">Days</th>
                                    <th class="py-2 pl-4 border-b bg-full pr-2 bg-gray-100">Total Man Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="mainpower in paginatedMainpower" :key="mainpower.role">
                                    <td class="py-4 px-6 border-b text-center">{{ mainpower.no }}</td>
                                    <td class="py-4 pl-24 pr-4 border-b text-center">{{ mainpower.role }}</td>
                                    <td class="py-2 pl-16 border-b text-center">
                                        <input v-model="mainpower.mandaysrate" type="number" step="0.01"
                                            class="w-40 py-1 rounded bg-transparent text-center" placeholder="0">
                                    </td>
                                    <td class="py-2 pl-4 border-b text-center">
                                        <input v-model="mainpower.manpower" type="number"
                                            class="w-16 py-1 rounded bg-transparent text-center" placeholder="0">
                                    </td>
                                    <td class="py-2 pl-8 border-b text-center">
                                        <input v-model="mainpower.days" type="number"
                                            class="w-16 py-1 rounded bg-transparent text-center" placeholder="0">
                                    </td>
                                    <td class="py-2 px-6 border-b text-center">{{ calculateTotalManRate(mainpower) }}</td>
                                    <!-- <td class="py-2 px-6 border-b text-center">{{ timeline.action }}</td> -->
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
                                <button v-for="   pageNumber    in    pageNumbers   " :key="pageNumber"
                                    @click="goToPage(pageNumber)" :class="{
                                        'bg-[#C53030] text-white rounded-lg py-2 px-3 text-xs': pageNumber === currentPage,
                                        'text-sm text-gray-400 border-2 rounded-lg py-2 px-3': pageNumber !== currentPage,
                                    }
                                        ">
                                    {{ pageNumber }}
                                </button>
                            </div>
                            <button @click="nextPage" :disabled="currentPage === totalPagesMainpowers"
                                class=" font-semibold text-sm text-gray-400 rounded-md">
                                Next
                            </button>
                        </div>

                        <div class="mb-5 flex flex-col sm:flex-row sm:justify-between">
                            <button @click="prevStep"
                                class="w-full sm:w-auto px-10 ml-0 sm:ml-5 mb-2 sm:mb-0 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Back
                            </button>
                            <button @click="submit"
                                class="w-full sm:w-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Submit
                            </button>
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
    data() {
        return {
            postData: {
                requester: "",
                application_name: "",
                status: "",
                brd: "",
                hld: null,
                lld: null,
            },

            isAddDocumentModalOpen: false,
            selectedStartDate: null,
            selectedEndDate: null,

            currentStep: 1,

            itemsPerPage: 5,
            currentPage: 1,
            isEditModalOpen: false,
            timelineEditData: {
                timelineWeek: null,
                activity: "",
            },

            mainpowers: [
                { no: 1, role: "PM/Scrum Masteer", },
                { no: 2, role: "Senior Business Analyst", },
                { no: 3, role: "Produk Owner", },
                { no: 4, role: "UI UX Designer", },
                { no: 5, role: "Design Grafis", },
                { no: 6, role: "Produk Owner", },
                { no: 7, role: "UI UX Designer", },
                { no: 8, role: "Design Grafis", },
            ],
            itemsPerPage: 5,
            currentPage: 1,
            mainpowerNoCounter: 1,

            axiosInstance: axios.create({
                baseURL: 'https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal',
            }),

            currentPageTimeline: 1,
            pageNumbersTimeline: [],
        };
    },



    computed: {
        totalPagesTimelines() {
            return Math.ceil(this.timelines.length / this.itemsPerPage);
        },
        paginatedTimelines() {
            const start = (this.currentPageTimeline - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const filteredTimelines = this.timelines.slice(start, end);
            return filteredTimelines;
        },

        totalPagesMainpowers() {
            return Math.ceil(this.mainpowers.length / this.itemsPerPage);
        },
        paginatedMainpower() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const filteredMainpowers = this.mainpowers.slice(start, end);
            return filteredMainpowers;
        },

        pageNumbers() {
            const pages = [];
            const maxVisiblePages = 10;

            if (this.totalPages <= maxVisiblePages) {
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i);
                }
            }
            return pages;
        },


    },

    methods: {

        handleHighLevelDesignChange(event) {
            const file = event.target.files[0];
            this.postData.hld = file; // Menggunakan hld sesuai properti yang digunakan
        },

        handleLowLevelDesignChange(event) {
            const file = event.target.files[0];
            this.postData.lld = file; // Menggunakan lld sesuai properti yang digunakan
        },

        submit() {
            const formData = new FormData();
            formData.append('requester', this.postData.requester);
            formData.append('application_name', this.postData.application_name);
            formData.append('start_date', this.selectedStartDate);  // Pastikan ini sesuai dengan format yang diharapkan oleh Django
            formData.append('end_date', this.selectedEndDate);      // Pastikan ini sesuai dengan format yang diharapkan oleh Django
            formData.append('status', this.postData.status);
            formData.append('brd', this.postData.brd);
            formData.append('hld', this.postData.hld);
            formData.append('lld', this.postData.lld);

            console.log('Mengirimkan data:', formData);

            this.axiosInstance
                .post('https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    console.log('POST berhasil:', res.data);
                    // Atur respons sesuai kebutuhan
                })
                .catch((err) => {
                    console.error('POST error:', err);

                    // Log detail respons server
                    if (err.response) {
                        console.error('Respons Server:', err.response.data);
                        console.error('Status Code:', err.response.status);
                        console.error('Headers:', err.response.headers);
                    }
                });
        },

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

        nextPageTimeline() {
            if (this.currentPageTimeline < this.totalPagesTimelines) {
                this.currentPageTimeline++;
            }
        },

        prevPageTimeline() {
            if (this.currentPageTimeline > 1) {
                this.currentPageTimeline--;
            }
        },

        goToPageTimeline(pageNumber) {
            this.currentPageTimeline = pageNumber;
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

        generateTimelines() {
            // Hapus data timelines sebelumnya
            this.timelines = [];

            // Pastikan selectedStartDate dan selectedEndDate tidak null
            if (this.selectedStartDate && this.selectedEndDate) {
                const startDate = new Date(this.selectedStartDate);
                const endDate = new Date(this.selectedEndDate);

                // Hitung jumlah minggu dari startDate ke endDate
                const diffInWeeks = Math.ceil((endDate - startDate) / (7 * 24 * 60 * 60 * 1000));

                // Generate timelines
                for (let i = 1; i <= diffInWeeks; i++) {
                    this.timelines.push({
                        week: i,
                        activity: "", // Atur ke nilai default atau kosong sesuai kebutuhan
                    });
                }
                // Update currentPage to the last page
                this.currentPage = this.totalPages;
            }
        },

        generateMainpowerNo() {
            this.mainpower.mainpowerNo = 'EMP' + this.mainpowerNoCounter;
            this.mainpowerNoCounter++;
        },

        openEditModal(timeline) {
            this.timelineEditData = {
                // timelineWeek: timeline.week,
                activity: timeline.activity,
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
            const timelineIndex = this.timelines.findIndex(timeline => timeline.week === this.timelineEditData.timelineWeek);

            if (timelineIndex !== -1) {
                this.timelines[timelineIndex].activity = this.timelineEditData.activity;
            }

            this.isEditModalOpen = false;
            this.timelineEditData = {
                timelineWeek: null,
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




<!-- // pageNumbers() {
    //     const maxVisiblePages = 10;
    //     const pages = [];
    //     if (this.totalPages <= maxVisiblePages) {
    //         for (let i = 1; i <= this.totalPages; i++) {
    //             pages.push(i);
    //         }
    //     } else {
    //         pages.push(1);
    //         const startPage = Math.max(2, this.currentPage - 2);
    //         const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);
    //         if (startPage > 2) {
    //             pages.push('...');
    //         }
    //         for (let i = startPage; i <= endPage; i++) {
    //             pages.push(i);
    //         }
    //         if (endPage < this.totalPages - 1) {
    //             pages.push('...');
    //         }
    //         pages.push(this.totalPages);
    //     }
    //     return pages;
    // }, -->


    hhhh