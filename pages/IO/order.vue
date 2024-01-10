Haikal

<template>
    <div class="flex bg-[#EDF2F7] bg-cover min-h-screen">
        <!-- Sidebar -->
        <LayoutsSidebar />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Navbar -->
            <LayoutsNavbar />

            <div class="IOform flex-1 bg-white px-8 pt-6 overflow-hidden flex flex-col m-10 mx-12 rounded-2xl shadow-md">


                <!-- Langkah 1: Requester dan High Level Design -->
                <div v-if="currentStep == 1" class="">
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
                                    <option value="ON_GOING">On Going</option>
                                    <option value="FINISH">Finish</option>
                                    <option value="DROPPED">Dropped</option>
                                </select>
                            </div>


                            <div class="flex flex-col w-full relative">
                                <label class="block text-md font-medium text-slate-700 mb-1">
                                    Low Level Design
                                </label>
                                <div
                                    class="flex w-auto items-center justify-between border text-gray-400 shadow-sm placeholder-slate-400 border-slate-300 pl-3 py-2 rounded-md sm:text-sm mb-2">
                                    <span>
                                        Upload File Here
                                    </span>
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
                                    <span>
                                        Upload File Here
                                    </span>
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

                        <div class="flex justify-end">
                            <button @click="submit_order(); nextStep(); generateTimelines()"
                                class="ml-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Langkah 2: Application dan Low Level Design -->
                <div v-if="currentStep == 2" class="px-6">
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
                                    <!-- {{ timeline }} -->
                                    <td class="py-4 px-6 border-b text-center">{{ timeline.week }}</td>
                                    <td class="py-2 px-6 border-b text-center">{{ timeline.activity }}</td>
                                    <td class="py-2 px-6 border-b text-center">
                                        <button class="mr-2" @click="openEditModal(timeline)">
                                            <!-- Edit Icon -->
                                            <i class="fas fa-edit"></i>
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
                                        <button @click="addActivity" type="submit"
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
                            <button @click="nextPageTimeline" :disabled="currentPageTimeline === totalPagesTimelines"
                                class="font-semibold text-sm text-gray-400 rounded-md">
                                Next
                            </button>
                        </div>

                        <div class="mb-5 flex flex-col sm:flex-row sm:justify-between">
                            <button @click="prevStep"
                                class="w-full sm:w-auto px-10 ml-0 sm:ml-5 mb-2 sm:mb-0 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Back
                            </button>
                            <button @click="submit_timeline(); nextStep()"
                                class="w-full sm:w-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Langkah 3: Start Date dan Business Requirement Document -->
                <div v-if="currentStep == 3" class="px-6">

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
                                <tr v-for="(mainpower, index ) in paginatedMainpower" :key="index">
                                    <td class="py-4 px-6 border-b text-center">{{ index += 1 }}</td>
                                    <td class="py-4 pl-24 pr-4 border-b text-center">
                                        <select v-model="mainpower.role"
                                            class="w-40 py-1 rounded bg-transparent text-center">
                                            <option value="PM/Scrum Master">PM/Scrum Master</option>
                                            <option value="Senior Business Analyst">Senior Business Analyst</option>
                                            <option value="Product Owner">Product Owner</option>
                                            <option value="UI UX designer">UI UX designer</option>
                                            <option value="Senior Programmer Backend">Senior Programmer Backend</option>
                                            <option value="Senior Programmer FrontEnd">Senior Programmer FrontEnd</option>
                                            <option value="Mobile Developer">Mobile Developer</option>
                                            <option value="Design Grafis">Design Grafis</option>
                                            <option value="FullStack Developer">FullStack Developer</option>
                                            <option value="DBA">DBA</option>
                                            <option value="DevOps">DevOps</option>
                                            <option value="Business Analyst">Business Analyst</option>
                                            <option value="Junior Programmer Backend">Junior Programmer Backend</option>
                                            <option value="Junior Programmer FrontEnd">Junior Programmer FrontEnd</option>
                                            <option value="Technical Writer">Technical Writer</option>
                                            <option value="Tester">Tester</option>
                                        </select>
                                    </td>
                                    <td class="py-2 pl-16 border-b text-center">
                                        <input v-model="mainpower.man_days_rate" type="number" step="0.01"
                                            class="w-40 py-1 rounded bg-transparent text-center" placeholder="0">
                                    </td>
                                    <td class="py-2 pl-4 border-b text-center">
                                        <input v-model="mainpower.man_power" type="number"
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

                    <div class="mt-4">
                        <button @click="addNewColumn" class="px-4 py-2 bg-[#C53030] text-white rounded-md">
                            Add New Column
                        </button>
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
                            <button @click="submit_mainpower"
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

<script setup>
definePageMeta({
    middleware: 'auth'
})
</script>

<script>
import { faRupiahSign } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from "~/store/auth";
import { mapWritableState } from "pinia";
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
                // { role: "PM/Scrum Master", },
                // { role: "Senior Business Analyst", },
                // { role: "Product Owner", },
                // { role: "UI UX designer", },
                // { role: "Senior Programmer Backend", },
                // { role: "Senior Programmer FrontEnd", },
                // { role: "Mobile Developer", },
                // { role: "Design Grafis", },
                // { role: "FullStack Developer", },
                // { role: "DBA", },
                // { role: "DevOps", },
                // { role: "Business Analyst", },
                // { role: "Junior Programmer Backend", },
                // { role: "Junior Programmer FrontEnd", },
                // { role: "Technical Writer", },
                // { role: "Tester", },
            ],
            itemsPerPage: 5,
            currentPage: 1,
            mainpowerNoCounter: 1,


            axiosInstance: axios.create({
                baseURL: 'https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal',
            }),

            currentPageTimeline: 1,
            totalPagesTimeline: 0,
            pageNumbersTimeline: [],
        };
    },



    computed: {
        ...mapWritableState(useAuth, ['user_data']),
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

        pageNumbersTimeline() {
            const pages = [];
            const maxVisiblePages = 10;

            if (this.totalPages <= maxVisiblePages) {
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i);
                }
            }
            return pages;
        },

        pageNumbersMainpower() {
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

        addActivity() {
            // Dapatkan data aktivitas dari modal
            const newActivity = this.timelineEditData.activity;

            // Pastikan bahwa newActivity tidak kosong
            if (newActivity.trim() !== "") {
                // Tambahkan data ke timeline untuk minggu yang sesuai
                const timelineIndex = this.timelineEditData.timelineIndex;

                if (timelineIndex !== null && timelineIndex !== undefined) {
                    this.timelines[timelineIndex].activity = newActivity;
                }

                // Tutup modal
                this.isEditModalOpen = false;

                // Bersihkan data modal
                this.timelineEditData = {
                    timelineIndex: null,
                    activity: "",
                };
            } else {
                // Tampilkan pesan kesalahan jika newActivity kosong
                alert("Activity cannot be empty!");
            }
        },

        submit_order() {
            const formData = new FormData();
            formData.append('requester', this.postData.requester);
            formData.append('application_name', this.postData.application_name);
            formData.append('start_date', this.selectedStartDate);  // Pastikan ini sesuai dengan format yang diharapkan oleh Django
            formData.append('end_date', this.selectedEndDate);      // Pastikan ini sesuai dengan format yang diharapkan oleh Django
            formData.append('status', this.postData.status);
            formData.append('brd', this.postData.brd);
            formData.append('hld', this.postData.hld);
            formData.append('lld', this.postData.lld);
            formData.append('id_user', this.user_data.id_user);

            console.log('Mengirimkan data:', formData);

            let token = localStorage.getItem('token');

            console.log(token);

            this.axiosInstance
                .post('https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then((res) => {
                    console.log('POST berhasil:', res);
                    localStorage.setItem('id_project', res.data.projects.id_project);
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

        submit_timeline() {
            let token = localStorage.getItem('token');

            console.log(token);
            console.log(this.timelines);

            const id_project = localStorage.getItem('id_project');

            const ArrayData = this.timelines.map(timeline => ({
                activity: timeline.activity,
                weeks: timeline.week,
                id_user: this.user_data.id_user,
                id_project: id_project,

            }));

            console.log('Mengirimkan data:', ArrayData);

            this.axiosInstance
                .post('https://z8v4553q-8000.asse.devtunnels.ms/api/timeline/', ArrayData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then((res) => {
                    console.log('POST berhasil:', res.data);
                })
                .catch((err) => {
                    console.error('POST error:', err);

                    if (err.response) {
                        console.error('Respons Server:', err.response.data);
                        console.error('Status Code:', err.response.status);
                        console.error('Headers:', err.response.headers);
                    }
                });
        },

        addNewColumn() {
            const newColumn = { role: "", days: 0, man_days_rate: 0, man_power: 0 };
            this.mainpowers.push(newColumn);
        },

        submit_mainpower() {
            let token = localStorage.getItem('token');
            console.log(token);

            console.log(this.mainpowers);

            const id_project = localStorage.getItem('id_project');

            const ArrayData = this.mainpowers.map(mainpower => ({
                // role: mainpower.role.toUpperCase(),  // Pastikan penulisan yang benar
                role: mainpower.role,
                days: mainpower.days,
                man_days_rate: mainpower.man_days_rate,
                man_power: mainpower.man_power,
                id_user: this.user_data.id_user,
                id_project: id_project,
            }));

            console.log('Mengirimkan data:', ArrayData);

            this.axiosInstance
                .post('https://z8v4553q-8000.asse.devtunnels.ms/api/detailmainpower/', ArrayData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then((res) => {
                    console.log('POST berhasil:', res.data);
                })
                .catch((err) => {
                    console.error('POST error:', err);

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

        nextPageMainpower() {
            if (this.currentPageMainpower < this.totalPagesMainpowers) {
                this.currentPageMainpower++;
            }
        },

        prevPageMainpower() {
            if (this.currentPageMainpower > 1) {
                this.currentPageMainpower--;
            }
        },

        goToPageMainpower(pageNumber) {
            this.currentPageMainpower = pageNumber;
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
            const timelineIndex = this.timelines.findIndex(t => t.week === timeline.week);
            this.timelineEditData = {
                timelineIndex: timelineIndex,
                activity: timeline.activity,
                week: timeline.week, // Add this line to store the week value
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
            const timelineIndex = this.timelineEditData.timelineIndex;

            if (timelineIndex !== null && timelineIndex !== undefined) {
                this.timelines[timelineIndex].activity = this.timelineEditData.activity;
                this.timelines[timelineIndex].week = this.timelineEditData.week; // Update the week value
            }

            this.isEditModalOpen = false;
            this.timelineEditData = {
                timelineIndex: null,
                activity: "",
                week: null,
            };
        },

        calculateTotalManRate(mainpower) {
            const manDaysRate = parseFloat(mainpower.man_days_rate);
            const manPower = parseFloat(mainpower.man_power);
            const days = parseFloat(mainpower.days);

            if (isNaN(manDaysRate) || isNaN(manPower) || isNaN(days)) {
                return 0;
            }

            return manDaysRate * manPower * days;
        },
    },

    mounted() {

        let token = localStorage.getItem('token');

        console.log(token);

        // this.axiosInstance
        //     .get('https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal/login/', {
        //         headers: {
        //             "Authorization": `Bearer ${token}`
        //         },
        //     })
        //     .then((res) => {
        //         this.user = res.data;
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);

        //         // Tangani kesalahan terkait token di sini
        //         if (err.response && err.response.data && err.response.data.detail === "Given token not valid for any token type") {
        //             // Masalah token, mungkin lakukan penyegaran atau arahkan ke halaman login
        //             console.log("Masalah token. Lakukan penyegaran atau arahkan ke halaman login.");
        //         }
        //     });
    }
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
</style>












<!-- // submit_timeline() {
    // const dataArray = [
    //     { key: 'activity', value: (this.postData.activity) },
    //     { key: 'weeks', value: (this.postData.weeks) },
    //     { key: 'user', value: (this.postData.user) },
    // ];

    // let requestData = {};

    // dataArray.forEach(item => {
    //     requestData[item.key] = item.value;
    // });

    // console.log('Mengirimkan data:', requestData);

    // this.axiosInstance
    //     .post('https://z8v4553q-8000.asse.devtunnels.ms/api/timeline/', requestData, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     .then((res) => {
    //         console.log('POST berhasil:', res.data);
    //     })
    //     .catch((err) => {
    //         console.error('POST error:', err);

    //         if (err.response) {
    //             console.error('Respons Server:', err.response.data);
    //             console.error('Status Code:', err.response.status);
    //             console.error('Headers:', err.response.headers);
    //         }
    //     });
    // }

    // const payload = this.timelines.map(timeline => ({
    //     weeks: timeline.weeks,
    //     activity: timeline.activity,
    //     id_user: this.postData.user,
    //     id_project: this.postData.project, // Ubah sesuai dengan kebutuhan, atau ambil dari sumber data yang benar
    // }));

    // const timelineData = {
    //     timelines: payload,
    // }; -->



    <!-- // let token = localStorage.getItem('token')

        // console.log(token)

        // axios.get('https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal/login/', {
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     },
        // }
        // ).then((res) => {
        //     this.user = res.data
        //     console.log(res)
        // })
        //     .catch((err) => {
        //         console.log(err)
        //     }) -->