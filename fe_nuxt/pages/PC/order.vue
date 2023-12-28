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
                <div v-if="currentStep === 1" class="pt-4 relative">
                    <!-- ... input fields untuk langkah 1 ... -->
                    <div class="mb-4 flex flex-col px-6">
                        <div class="text-4xl font-bold mb-4">Project Charter Form</div>
                    </div>
                    <div class="px-6 pt-4">
                        <div class="flex gap-8 flex-col lg:flex-row">
                            <div class="flex flex-col w-full relative">
                                <label class="block text-md font-medium text-slate-700">
                                    Project Name
                                </label>
                                <input type="text" name="project_name"
                                    class="mt-1 w-auto pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                    placeholder="Input Project Name" />

                                <label class="block text-md font-medium pt-2 text-slate-700">
                                    IWO
                                </label>
                                <input type="text" name="iwo"
                                    class="mt-1 w-full pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                    placeholder="Input Application Name" />

                                <label class="block text-md font-medium pt-2 text-slate-700">
                                    Project Manager
                                </label>
                                <input type="text" name="project_manager"
                                    class="mt-1 w-full pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"
                                    placeholder="Input Project Manager" />

                                <label class="block text-md font-medium pt-2 text-slate-700">
                                    Customer
                                </label>
                                <input type="text" name="customer"
                                    class="mt-1 w-full pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                    placeholder="Input Customer" />

                                <label class="block text-md font-medium pt-2 text-slate-700">
                                    End Customer
                                </label>
                                <input type="text" name="end_customer"
                                    class="mt-1 w-full pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                    placeholder="Input End Customer" />

                            </div>
                            <div class="flex flex-col w-full relative">
                                <label class="block text-md font-medium text-slate-700 mb-1">
                                    BU Delivery
                                </label>
                                <input type="text" name="bu_delivery"
                                    class="w-auto pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"
                                    placeholder="Input BU Delivery" />

                                <label class="block text-md font-medium text-slate-700 mt-2">
                                    BU Relate
                                </label>
                                <input type="text" name="bu_related"
                                    class="mt-1 w-full pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"
                                    placeholder="Input BU Related" />

                                <label class="block text-md font-medium pt-2 text-slate-700">
                                    Project Descriptions
                                </label>
                                <textarea name="descriptions"
                                    class="mb-8 mt-1 w-full pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm" />


                            </div>
                        </div>


                        <div class="flex justify-end"><button @click="nextStep"
                                class="my-5 px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Next
                            </button>
                        </div>

                    </div>
                </div>

                <!-- Langkah 2 High Level-->
                <div v-if="currentStep === 2" class="">
                    <!-- ... input fields untuk langkah 2 ... -->
                    <div class="mb-4 flex flex-col px-6 pt-4">
                        <div class="text-4xl font-bold mb-4">Project Charter Form</div>

                        <div class="pt-4">
                            <div class="flex gap-8 flex-col lg:flex-row">
                                <div class="flex flex-col w-full relative">
                                    <label class=" text-md font-medium pt-2 text-slate-700 mb-1">
                                        High Level Requirment
                                    </label>
                                    <label>
                                        <p class="text-xs text-red-500 mb-2">*This file must contain workflow, Menu, And
                                            activity
                                        </p>
                                    </label>
                                    <div
                                        class="flex items-center justify-between border text-gray-400 shadow-sm placeholder-slate-400 border-slate-300 pl-3 py-2 rounded-md sm:text-sm mb-2">
                                        <span>
                                            Upload File Here

                                        </span>
                                        <span class="cursor-pointer px-3">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                    </div>

                                    <label class="block text-md font-medium text-slate-700 mb-1">
                                        Assumptions <span class=" text-xs text-gray-500">(required)</span>
                                    </label>
                                    <textarea name="descriptions"
                                        class="mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm" />

                                    <label class="block text-md font-medium text-slate-700">
                                        Constraints <span class=" text-xs text-gray-500">(required)</span>
                                    </label>
                                    <textarea name="assumptions"
                                        class="mt-2 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm" />
                                </div>

                                <div class="flex flex-col w-full relative">
                                    <div class="">
                                        <label class="block text-md font-medium pt-3 text-slate-700">
                                            Risk <span class=" text-xs text-gray-500">(required)</span>
                                        </label>
                                        <textarea name="descriptions"
                                            class="mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm" />

                                        <label class="block text-md font-medium text-slate-700 mb-1">
                                            Key Stakeholders
                                        </label>
                                        <input type="text" name="requester"
                                            class="mt-1 w-full pl-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                            placeholder="Input Key Stakeholders" />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex ">
                        <div class="flex justify-start">
                            <button @click="prevStep"
                                class="w-full sm:w-auto px-10 ml-0 sm:ml-5 mb-2 sm:mb-0 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Back
                            </button>
                        </div>
                        <div class="flex justify-end ml-auto">
                            <button @click="nextStep"
                                class="w-full sm:w-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Langkah 3: Start Date dan Business Requirement Document -->
                <div v-if="currentStep === 3">

                    <div class="mb-4 flex flex-col px-6 pt-4">
                        <div class="text-4xl font-bold mb-4">Project Charter Form</div>
                    </div>

                    <div>
                        <div class="mb-4 flex flex-col px-6 pt-4">
                            <div class="text-md font-medium mb-2">Deliverables & Success Criteria <span
                                    class=" text-xs text-gray-500">(required)</span></div>

                            <!-- Inputan untuk Deliverables & Success Criteria -->
                            <div v-for="(deliverable, index) in paginatedDeliverables" :key="index"
                                class="flex items-center mb-2">
                                <input v-model="deliverable.value" type="text"
                                    class="flex-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm mr-2"
                                    placeholder="Input Deliverables & Success Criteria" />

                                <!-- Tombol Delete -->
                                <button @click="deleteDeliverable(index)"
                                    class="px-7 py-2 bg-white border border-[#C53030] text-[#C53030] rounded-md">
                                    Delete
                                </button>
                            </div>

                            <!-- Tombol Add More hanya muncul pada inputan terakhir -->
                            <div class="flex justify-end">
                                <button @click="addMore" class="px-6 py-2 bg-[#C53030] text-white rounded-md">
                                    Add More
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="">
                        <!-- Tombol Paging -->
                        <div class="flex justify-center items-center mt-4 space-x-4">
                            <button @click="prevPage" :disabled="currentPageDeliverables === 1"
                                class="font-semibold text-sm text-gray-400 rounded-md">
                                Prev
                            </button>
                            <div class="flex items-center space-x-2">
                                <button v-for="pageNumber in pageNumbersDeliverables" :key="pageNumber"
                                    @click="goToPageDeliverables(pageNumber)" :class="{
                                        'bg-[#C53030] text-white rounded-lg py-2 px-3 text-xs': pageNumber === currentPageDeliverables,
                                        'text-sm text-gray-400 border-2 rounded-lg py-2 px-3': pageNumber !== currentPageDeliverables,
                                    }">
                                    {{ pageNumber }}
                                </button>
                            </div>
                            <button @click="nextPageDeliverables"
                                :disabled="currentPageDeliverables === totalPagesDeliverables"
                                class="font-semibold text-sm text-gray-400 rounded-md">
                                Next
                            </button>
                        </div>

                        <div class="flex justify-between items-end mt-4 px-6 mb-4">
                            <button @click="prevStep" class="px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Back
                            </button>
                            <button @click="nextStep" class="ml-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Next
                            </button>
                        </div>

                    </div>
                </div>

                <!-- langkah 4 -->
                <div v-if="currentStep === 4">
                    <div class="mb-4 flex flex-col px-6 pt-4">
                        <div class="text-4xl font-bold mb-4">Project Charter Form</div>
                    </div>

                    <div class="px-6 pt-4">
                        <div class="text-md font-medium mb-2">Milestones <span
                                class="text-xs text-gray-500">(required)</span>
                        </div>
                    </div>

                    <!-- Tabel Milestones -->
                    <table class="min-w-full bg-white border-collapse rounded-md px-6">
                        <thead>
                            <tr>
                                <th class="py-2 px-6 border-b bg-gray-100 text-center">No</th>
                                <th class="py-2 px-6 border-b bg-gray-100 text-center">Date</th>
                                <th class="py-2 px-6 border-b bg-gray-100 text-center">Milestone</th>
                                <th class="py-2 px-6 border-b bg-gray-100 text-center">Description</th>
                                <th class="py-2 px-6 border-b bg-gray-100 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(milestone, index) in paginatedMilestones" :key="index">
                                <td class="py-1 px-6 text-center placeholder-slate-400 ">{{ (currentPageMilestones - 1) *
                                    milestonesPerPage + index + 1 }}</td>
                                <td class="py-1 px-6">
                                    <input v-model="milestone.date" type="text"
                                        class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm"
                                        placeholder="Input Date" />
                                </td>
                                <td class="py-1 px-6">
                                    <input v-model="milestone.milestone" type="text"
                                        class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm"
                                        placeholder="Input Milestone" />
                                </td>
                                <td class="py-1 px-6">
                                    <input v-model="milestone.description" type="text"
                                        class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm"
                                        placeholder="Input Description" />
                                </td>
                                <td class="py-1 px-6">
                                    <button @click="deleteMilestone(index)"
                                        class="text-center px-6 py-2 bg-white border border-[#C53030] text-[#C53030] rounded-md">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Tombol Add More hanya muncul pada inputan terakhir -->
                    <div class="flex justify-end px-16">
                        <button @click="addMoreMilestone" class="px-6 py-2 bg-[#C53030] text-white rounded-md">
                            Add More
                        </button>
                    </div>

                    <!-- Tombol Paging -->
                    <div class="flex justify-center items-center mt-4 space-x-4">
                        <button @click="prevPage" :disabled="currentPageMilestones === 1"
                            class="font-semibold text-sm text-gray-400 rounded-md">
                            Prev
                        </button>
                        <div class="flex items-center space-x-2">
                            <button v-for="pageNumber in pageNumbersMilestones" :key="pageNumber"
                                @click="goToPageMilestones(pageNumber)" :class="{
                                    'bg-[#C53030] text-white rounded-lg py-2 px-3 text-xs': pageNumber === currentPageMilestones,
                                    'text-sm text-gray-400 border-2 rounded-lg py-2 px-3': pageNumber !== currentPageMilestones,
                                }">
                                {{ pageNumber }}
                            </button>
                        </div>
                        <button @click="nextPageMilestones" :disabled="currentPageMilestones === totalPagesMilestones"
                            class="font-semibold text-sm text-gray-400 rounded-md">
                            Next
                        </button>
                    </div>
                    <div class="flex justify-between items-end mt-4 px-6 mb-4">
                        <button @click="prevStep" class="px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                            Back
                        </button>
                        <button @click="nextStep" class="ml-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                            Next
                        </button>
                    </div>
                </div>

                <!-- langkah 5 -->
                <div v-if="currentStep === 5">
                    <div class="mb-1 flex flex-col px-6 pt-4">
                        <div class="text-4xl font-bold mb-2">Project Charter Form</div>
                        <div class="text-xl font-bold text-gray-400 mb-4">
                            Structure Organization, Roles, And Responsibilities Team Member
                        </div>
                    </div>
                    <div class="px-6 ">
                        <div class="flex space-x-8">
                            <div class="flex flex-col w-full relative">
                                <label class="block text-md font-medium text-slate-700 mb-1">
                                    Structure Organization And Role
                                </label>
                                <div
                                    class="flex items-center justify-between border text-gray-400 shadow-sm placeholder-slate-400 border-slate-300 pl-3 py-2 rounded-md sm:text-sm mb-2">
                                    <label class="">
                                        Upload File Here
                                    </label>
                                    <span @click="openAddDocModal('')" class="cursor-pointer">
                                        <i class="text-gray-500 px-3 fas fa-upload"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="flex flex-col w-full relative">

                            </div>
                        </div>

                        <label class=" text-md font-medium pt-2 text-slate-700 mb-2">
                            Member Responsibilities
                        </label>

                        <table class="min-w-full bg-white border-collapse rounded-md px-6">
                            <thead>
                                <tr>
                                    <th class="py-2 px-6 border-b bg-gray-100 text-center">No</th>
                                    <th class="py-2 px-6 border-b bg-gray-100 text-center">Name</th>
                                    <th class="py-2 px-6 border-b bg-gray-100 text-center">Role</th>
                                    <th class="py-2 px-6 border-b bg-gray-100 text-center">Description</th>
                                    <th class="py-2 px-6 border-b bg-gray-100 text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(memberResponsiple, index) in paginatedMembersResponsiple" :key="index">
                                    <td class="py-1 px-6 text-center placeholder-slate-400 ">
                                        {{ (currentPageMembersResponsiple - 1) * membersResponsiplePerPage + index + 1 }}
                                    </td>
                                    <td class="py-1 px-6">
                                        <input v-model="memberResponsiple.date" type="text"
                                            class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm"
                                            placeholder="Input Date" />
                                    </td>
                                    <td class="py-1 px-6">
                                        <input v-model="memberResponsiple.member" type="text"
                                            class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm"
                                            placeholder="Input Member" />
                                    </td>
                                    <td class="py-1 px-6">
                                        <input v-model="memberResponsiple.description" type="text"
                                            class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm"
                                            placeholder="Input Description" />
                                    </td>
                                    <td class="py-1 px-6">
                                        <button @click="deleteMemberResponsiple(index)"
                                            class="text-center px-6 py-2 bg-white border border-[#C53030] text-[#C53030] rounded-md">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-end px-16">
                            <button @click="addMoreMemberResponsiple" class="px-6 py-2 bg-[#C53030] text-white rounded-md">
                                Add More
                            </button>
                        </div>

                        <!-- Tombol Paging -->
                        <div class="flex justify-center items-center mt-4 space-x-4">
                            <button @click="prevPageMembersResponsiple" :disabled="currentPageMembersResponsiple === 1"
                                class="font-semibold text-sm text-gray-400 rounded-md">
                                Prev
                            </button>
                            <div class="flex items-center space-x-2">
                                <button v-for="pageNumber in pageNumbersMembersResponsiple" :key="pageNumber"
                                    @click="goToPageMembersResponsiple(pageNumber)" :class="{
                                        'bg-[#C53030] text-white rounded-lg py-2 px-3 text-xs': pageNumber === currentPageMembersResponsiple,
                                        'text-sm text-gray-400 border-2 rounded-lg py-2 px-3': pageNumber !== currentPageMembersResponsiple,
                                    }">
                                    {{ pageNumber }}
                                </button>
                            </div>
                            <button @click="nextPageMembersResponsiple"
                                :disabled="currentPageMembersResponsiple === totalPagesMembersResponsiple"
                                class="font-semibold text-sm text-gray-400 rounded-md">
                                Next
                            </button>
                        </div>



                    </div>



                    <div class="flex justify-between items-end mt-4 px-6 mb-4">
                        <button @click="prevStep" class="px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                            Back
                        </button>
                        <button @click="nextStep" class="ml-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                            Next
                        </button>
                    </div>

                </div>

                <!-- tahap 6 -->
                <div v-if="currentStep === 6">
                    <div class="mb-1 flex flex-col px-6 pt-4">
                        <div class="text-4xl font-bold mb-2">Project Charter Form</div>

                        <!-- Formulir di Kolom Kiri dan Gambar di Kolom Kanan -->
                        <div class="flex flex-col lg:flex-row space-x-4">
                            <div class="flex flex-col lg:w-full">
                                <div class="">
                                    <label class="block text-md font-medium pt-6 text-slate-700">
                                        Project Manager’s Responsibility <span
                                            class=" text-xs text-gray-500">(required)</span>
                                    </label>
                                    <textarea name="descriptions"
                                        class="mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm" />
                                </div>
                                <div class="">
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        Project Value
                                    </label>
                                    <div class="flex items-center">
                                        <div class="relative w-full">
                                            <span class="absolute inset-y-0 left-0 flex items-center pl-2 text-black">
                                                Rp.
                                            </span>
                                            <input type="boolean" name="project-value" pattern="[0-9]*"
                                                class="mt-1 pl-10 pr-3 py-2 w-full bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm"
                                                placeholder="0" />
                                        </div>
                                    </div>

                                </div>

                                <div class="">
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        Start Date
                                    </label>
                                    <input type="date" name="start-date"
                                        class="mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                        placeholder="Select Start Date" />
                                </div>
                                <div class="">
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        End Date
                                    </label>
                                    <input type="date" name="end-date"
                                        class="mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm "
                                        placeholder="Select End Date" />
                                </div>
                            </div>

                            <!-- Kolom Kanan untuk Gambar -->
                            <div class="lg:w-full py-4">
                                <!-- Tambahkan gambar Anda di sini -->
                                <img src="/assets/img_charter1.svg" alt="Your Image" class="w-full h-auto">
                            </div>

                        </div>

                        <div class="flex justify-between items-end mt-4 mb-4">
                            <button @click="prevStep" class="px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Back
                            </button>
                            <button @click="nextStep" class="ml-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <!-- tahap 7 -->
                <div v-if="currentStep === 7">
                    <div class="mb-1 flex flex-col px-6 pt-4">
                        <div class="text-4xl font-bold mb-2">Project Charter Form</div>
                        <div class="text-xl font-bold text-gray-600">
                            Supporting Document
                        </div>
                        <div>
                            <div class="flex pt-4 mb-4">
                                <button @click="openAddDocModal"
                                    class="ml-auto px-6 py-2 bg-[#C53030] text-white rounded-md">
                                    + Add Document
                                </button>
                            </div>
                        </div>

                        <!-- Supporting Document Table -->
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border-collapse rounded-md">
                                <thead>
                                    <tr>
                                        <th class="py-2 px-6 border-b bg-gray-100">No</th>
                                        <th class="py-2 px-6 border-b bg-gray-100">Document Name</th>
                                        <th class="py-2 px-6 border-b bg-gray-100">Notes</th>
                                        <th class="py-2 px-6 border-b bg-gray-100">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="document in supportingDocuments" :key="document.id">
                                        <!-- Kolom data dokumen di sini -->
                                        <td class="py-4 px-6 border-b text-center">
                                            {{ document.id }}
                                        </td>
                                        <td class="py-2 px-6 border-b text-center">
                                            {{ document.name }}
                                        </td>
                                        <td class="py-2 px-6 border-b text-center">
                                            {{ document.notes }}
                                        </td>
                                        <td class="py-2 px-6 border-b text-center">
                                            <button class="mr-2" @click="openDeleteConfirmationModal(document.id)">
                                                <!-- Delete Icon -->
                                                <i class="fas fa-trash-can"></i>
                                            </button>
                                            <button class="mr-2">
                                                <!-- Edit Icon -->
                                                <i class="fas fa-eye"
                                                    @click="openDocumentModal(document.id, document.documentName, document.notes)"></i>
                                            </button>
                                            <!-- Tambahkan tombol aksi lainnya jika diperlukan -->

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Modal untuk add document -->
                        <div v-if="addDocModal.isOpen"
                            class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                            <div class="bg-white px-6 py-4 rounded-xl w-auto">
                                <div class="flex justify-end">
                                    <button @click="closeAddDocModal"
                                        class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                                <div class="bg-white px-8 rounded-lg w-auto">
                                    <!-- Konten modal add document di sini -->
                                    <div>
                                        <h2 class="text-xl font-semibold mb-4">Add Document</h2>

                                        <!-- Input untuk file -->
                                        <div class="mb-4">
                                            <label for="fileInput" class="block text-sm font-medium text-gray-700">Choose
                                                File</label>
                                            <input type="file" id="fileInput" @change="handleFileChange"
                                                class="mt-1 p-1 border rounded-md w-full">
                                        </div>

                                        <!-- Input untuk document name -->
                                        <div class="mb-4">
                                            <label for="docNameInput"
                                                class="block text-sm font-medium text-gray-700">Document
                                                Name</label>
                                            <input type="text" id="docNameInput" v-model="documentName"
                                                placeholder="Enter document name" class="mt-1 p-1 border rounded-md w-full">
                                        </div>

                                        <!-- Input untuk note -->
                                        <div class="mb-4">
                                            <label for="noteInput"
                                                class="block text-sm font-medium text-gray-700">Note</label>
                                            <textarea id="noteInput" v-model="note" placeholder="Enter notes"
                                                class="mt-1 p-1 border rounded-md w-full"></textarea>
                                        </div>

                                        <!-- Tombol untuk menyimpan -->
                                        <button @click="saveDocument"
                                            class="px-6 py-2 bg-[#C53030] text-white rounded-md">Save</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Modal for Delete Confirmation -->
                        <div v-if="showDeleteConfirmationModal"
                            class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                            <div class="bg-white px-6 py-4 rounded-xl w-auto">
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
                                            document
                                            <br>from
                                            the supporting documents list?
                                        </p>
                                    </div>
                                    <div class="flex justify-center">
                                        <button @click="deleteDocument"
                                            class="px-8 py-2 my-2 bg-[#C53030] text-white rounded-md">
                                            Delete
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Paging for Supporting Document Table -->
                        <div class="flex justify-center items-center mt-4 space-x-4">
                            <button @click="prevPageSupportingDocuments" :disabled="currentPageSupportingDocuments === 1"
                                class="font-semibold text-sm text-gray-400 rounded-md">
                                Prev
                            </button>
                            <div class="flex items-center space-x-2">
                                <button v-for="pageNumber in pageNumbersSupportingDocuments" :key="pageNumber"
                                    @click="goToPageSupportingDocuments(pageNumber)" :class="{
                                        'bg-[#C53030] text-white rounded-lg py-2 px-3 text-xs': pageNumber === currentPageSupportingDocuments,
                                        'text-sm text-gray-400 border-2 rounded-lg py-2 px-3': pageNumber !== currentPageSupportingDocuments,
                                    }">
                                    {{ pageNumber }}
                                </button>
                            </div>
                            <button @click="nextPageSupportingDocuments"
                                :disabled="currentPageSupportingDocuments === totalPagesSupportingDocuments"
                                class="font-semibold text-sm text-gray-400 rounded-md">
                                Next
                            </button>
                        </div>



                        <div class="flex justify-between items-end mt-4 mb-4">
                            <button @click="prevStep" class="px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Back
                            </button>
                            <button @click="nextStep" class="ml-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Tahap 8 -->
                <div v-if="currentStep === 8">
                    <div class="mb-1 flex flex-col-reverse sm:flex-col px-6 pt-4">
                        <div class="text-4xl font-bold mb-2">Project Charter Form</div>

                        <!-- Formulir di Kolom Kiri dan Gambar di Kolom Kanan -->
                        <div class="flex flex-col lg:flex-row space-x-8">
                            <div class="flex flex-col lg:w-3/4">
                                <div class="">
                                    <label class="block text-md font-medium pt-6 text-slate-700">
                                        Note
                                    </label>
                                    <textarea name="descriptions"
                                        class="mt-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 rounded-md sm:text-sm" />
                                </div>

                                <div>
                                    <label class="block text-md font-medium text-slate-700">
                                        Approved By
                                    </label>
                                    <!-- Placeholder textarea -->
                                    <div class="mt-2 w-full h-32 bg-white border shadow-sm border-slate-300 rounded-md">
                                    </div>

                                </div>

                                <div class="flex flex-col lg:flex-row">


                                    <div class="flex flex-col lg:w-full">
                                        <label class="block text-md font-medium text-slate-700">
                                            Name :

                                            <input type="text" style="border: none;"
                                                class="bg-white placeholder-slate-400 rounded-md sm:text-sm px-3 py-2 my-1">
                                        </label>
                                        <hr>


                                        <label class="block text-md font-medium text-slate-700">
                                            Title :

                                            <input type="text" style="border: none;"
                                                class="bg-white placeholder-slate-400 rounded-md sm:text-sm px-3 py-2 my-1">
                                        </label>
                                        <hr>


                                        <label class="block text-md font-medium text-slate-700">
                                            CC To :

                                            <input type="text" style="border: none;"
                                                class="bg-white placeholder-slate-400 rounded-md sm:text-sm px-3 py-2 my-1">
                                        </label>
                                        <hr>


                                        <label class="block text-md font-medium text-slate-700">
                                            Date :

                                            <input type="text" style="border: none;"
                                                class="bg-white placeholder-slate-400 rounded-md sm:text-sm px-3 py-2 my-1">
                                        </label>
                                        <hr>

                                    </div>
                                    <div class="flex flex-col lg:w-full">
                                        <label class="block text-md font-medium text-slate-700">
                                            Name :

                                            <input type="text" style="border: none;"
                                                class="bg-white placeholder-slate-400 rounded-md sm:text-sm px-3 py-2 my-1">
                                        </label>
                                        <hr>


                                        <label class="block text-md font-medium text-slate-700">
                                            Title :

                                            <input type="text" style="border: none;"
                                                class="bg-white placeholder-slate-400 rounded-md sm:text-sm px-3 py-2 my-1">
                                        </label>
                                        <hr>


                                        <label class="block text-md font-medium text-slate-700">
                                            CC To :

                                            <input type="text" style="border: none;"
                                                class="bg-white placeholder-slate-400 rounded-md sm:text-sm px-3 py-2 my-1">
                                        </label>
                                        <hr>


                                        <label class="block text-md font-medium text-slate-700">
                                            Date :

                                            <input type="text" style="border: none;"
                                                class="bg-white placeholder-slate-400 rounded-md sm:text-sm px-3 py-2 my-1">
                                        </label>
                                        <hr>

                                    </div>
                                </div>



                            </div>


                            <!-- Kolom Kanan untuk Gambar -->
                            <div class="lg:w-full py-2 px-6">
                                <!-- Tambahkan gambar Anda di sini -->
                                <img src="/assets/img_charter2.svg" alt="Your Image" class="w-auto h-auto">
                            </div>

                        </div>
                        <div class="flex justify-between items-end mt-4 mb-4">
                            <button @click="prevStep" class="px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
                                Back
                            </button>
                            <button @click="nextStep" class="ml-auto px-10 h-10 text-sm bg-[#C53030] text-white rounded-md">
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
export default {
    data() {
        return {

            currentPageSupportingDocuments: 1, // Halaman saat ini
            documentsPerPage: 10,

            showDeleteConfirmationModal: false,
            // Properti lain yang mungkin diperlukan
            deletingDocumentId: null,

            addDocModal: {
                isOpen: false,
            },

            supportingDocuments: [
                { No: '', documentName: 'baju', notes: "apapun dan mana" }
            ],
            modalData: {
                id: null,
                documentName: '',
                notes: ''
            },
            currentPage: 1,
            documentsPerPage: 5,


            membersResponsiplePerPage: 4,
            currentPageMembersResponsiple: 1,

            membersResponsiple: [
                { name: '', role: '', description: '' }
            ],

            milestones: [
                { date: '', milestone: '', description: '' }
            ],
            milestonesPerPage: 5,
            currentPageMilestones: 1,



            showAddMoreButton: true,

            deliverablesPerPage: 5,
            currentPageDeliverables: 1,

            currentStep: 1,
            deliverables: [{ value: '' }],

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

        totalSupportingDocuments() {
            return this.supportingDocuments.length;
        },
        totalPagesSupportingDocuments() {
            return Math.ceil(this.totalSupportingDocuments / this.documentsPerPage);
        },

        pageNumbersSupportingDocuments() {
            const maxVisiblePages = 10;
            const pages = [];
            const ellipsis = '...';

            if (this.totalPagesSupportingDocuments <= maxVisiblePages) {
                for (let i = 1; i <= this.totalPagesSupportingDocuments; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);

                const startPage = Math.max(2, this.currentPageSupportingDocuments - 2);
                const endPage = Math.min(this.totalPagesSupportingDocuments - 1, startPage + maxVisiblePages - 3);

                if (startPage > 2) {
                    pages.push(ellipsis);
                }

                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }

                if (endPage < this.totalPagesSupportingDocuments - 1) {
                    pages.push(ellipsis);
                }

                pages.push(this.totalPagesSupportingDocuments);
            }

            return pages;
        },


        paginatedSupportingDocuments() {
            const startIndex = (this.currentPage - 1) * this.documentsPerPage;
            const endIndex = startIndex + this.documentsPerPage;
            return this.supportingDocuments.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.supportingDocuments.length / this.documentsPerPage);
        },
        pageNumbers() {
            const maxVisiblePages = 5; // Sesuaikan jumlah halaman yang terlihat sesuai kebutuhan
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

        totalPagesMembersResponsiple() {
            return Math.ceil(this.membersResponsiple.length / this.membersResponsiplePerPage);
        },
        pageNumbersMembersResponsiple() {
            const maxVisiblePages = 10;
            const pages = [];
            if (this.totalPagesMembersResponsiple <= maxVisiblePages) {
                for (let i = 1; i <= this.totalPagesMembersResponsiple; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                const startPage = Math.max(2, this.currentPageMembersResponsiple - 2);
                const endPage = Math.min(this.totalPagesMembersResponsiple - 1, this.currentPageMembersResponsiple + 2);
                if (startPage > 2) {
                    pages.push('...');
                }
                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }
                if (endPage < this.totalPagesMembersResponsiple - 1) {
                    pages.push('...');
                }
                pages.push(this.totalPagesMembersResponsiple);
            }
            return pages;
        },

        paginatedMembersResponsiple() {
            const start = (this.currentPageMembersResponsiple - 1) * this.membersResponsiplePerPage;
            const end = start + this.membersResponsiplePerPage;
            const filteredMembersResponsiple = this.membersResponsiple.slice(start, end);
            return filteredMembersResponsiple;
        },


        totalPagesMilestones() {
            return Math.ceil(this.milestones.length / this.milestonesPerPage);
        },
        pageNumbersMilestones() {
            const maxVisiblePages = 10;
            const pages = [];
            if (this.totalPagesMilestones <= maxVisiblePages) {
                for (let i = 1; i <= this.totalPagesMilestones; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                const startPage = Math.max(2, this.currentPageMilestones - 2);
                const endPage = Math.min(this.totalPagesMilestones - 1, this.currentPageMilestones + 2);
                if (startPage > 2) {
                    pages.push('...');
                }
                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }
                if (endPage < this.totalPagesMilestones - 1) {
                    pages.push('...');
                }
                pages.push(this.totalPagesMilestones);
            }
            return pages;
        },
        paginatedMilestones() {
            const start = (this.currentPageMilestones - 1) * this.milestonesPerPage;
            const end = start + this.milestonesPerPage;
            const filteredMilestones = this.milestones.slice(start, end);
            return filteredMilestones;
        },


        totalPagesDeliverables() {
            return Math.ceil(this.deliverables.length / this.deliverablesPerPage);
        },
        paginatedDeliverables() {
            const start = (this.currentPageDeliverables - 1) * this.deliverablesPerPage;
            const end = start + this.deliverablesPerPage;
            const filteredDeliverables = this.deliverables.slice(start, end);
            return filteredDeliverables;
        },
        pageNumbersDeliverables() {
            const maxVisiblePages = 10;
            const pages = [];
            if (this.totalPagesDeliverables <= maxVisiblePages) {
                for (let i = 1; i <= this.totalPagesDeliverables; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                const startPage = Math.max(2, this.currentPageDeliverables - 2);
                const endPage = Math.min(this.totalPagesDeliverables - 1, this.currentPageDeliverables + 2);
                if (startPage > 2) {
                    pages.push('...');
                }
                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }
                if (endPage < this.totalPagesDeliverables - 1) {
                    pages.push('...');
                }
                pages.push(this.totalPagesDeliverables);
            }
            return pages;
        },

        paginatedDeliverables() {
            const start = (this.currentPageDeliverables - 1) * this.deliverablesPerPage;
            const end = start + this.deliverablesPerPage;
            const filteredDeliverables = this.deliverables.slice(start, end);
            return filteredDeliverables;
        },

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

        prevPageSupportingDocuments() {
            if (this.currentPageSupportingDocuments > 1) {
                this.currentPageSupportingDocuments--;
            }
        },
        nextPageSupportingDocuments() {
            if (this.currentPageSupportingDocuments < this.totalPagesSupportingDocuments) {
                this.currentPageSupportingDocuments++;
            }
        },
        goToPageSupportingDocuments(pageNumber) {
            this.currentPageSupportingDocuments = pageNumber;
        },

        openDeleteConfirmationModal(documentId) {
            this.deletingDocumentId = documentId;
            this.showDeleteConfirmationModal = true;
        },
        // Metode untuk membatalkan penghapusan
        cancelDelete() {
            this.showDeleteConfirmationModal = false;
            this.deletingDocumentId = null;
        },
        // Metode untuk menghapus dokumen
        deleteDocument() {
            // Implementasi logika penghapusan dokumen di sini
            // Anda dapat menggunakan this.deletingDocumentId untuk mendapatkan ID dokumen yang akan dihapus
            // Setelah penghapusan berhasil, atur showDeleteConfirmationModal kembali ke false
            // dan lakukan pembaruan data Supporting Documents jika diperlukan
            this.showDeleteConfirmationModal = false;
            this.deletingDocumentId = null;
        },

        openAddDocModal() {
            // Buka modal add document
            this.addDocModal.isOpen = true;
        },
        closeAddDocModal() {
            // Tutup modal add document
            this.addDocModal.isOpen = false;
        },
        saveDocument() {
            // Logika untuk menyimpan dokumen
            // ...
            // Tutup modal setelah menyimpan
            this.closeAddDocModal();
        },

        openModal() {
            // Logika untuk membuka modal tambah dokumen
            // Setelah modal dibuka, Anda dapat mengosongkan modalData jika perlu
        },
        openDocumentModal(id, documentName, notes) {
            // Logika untuk membuka modal edit dokumen dengan data yang ada
            this.modalData.id = id;
            this.modalData.documentName = documentName;
            this.modalData.notes = notes;
            // Selanjutnya, buka modal sesuai kebutuhan
        },
        confirmDelete(id) {
            // Logika untuk mengonfirmasi dan menghapus dokumen dengan ID tertentu
            if (confirm("Are you sure you want to delete this document?")) {
                // Panggil fungsi penghapusan sesuai kebutuhan
                // Setelah penghapusan berhasil, perbarui data atau lakukan tindakan lain yang diperlukan
            }
        },

        goToPageMembersResponsiple(pageNumber) {
            this.currentPageMembersResponsiple = pageNumber;
        },

        nextPageMembersResponsiple() {
            if (this.currentPageMembersResponsiple < this.totalPagesMembersResponsiple) {
                this.currentPageMembersResponsiple++;
            }
        },
        prevPageMembersResponsiple() {
            if (this.currentPageMembersResponsiple > 1) {
                this.currentPageMembersResponsiple--;
            }
        },

        deleteMemberResponsiple(index) {
            this.membersResponsiple.splice(index, 1);
        },

        addMoreMemberResponsiple() {
            this.membersResponsiple.push({ date: '', member: '', description: '' });
        },


        addMoreMilestone() {
            this.milestones.push({ date: '', milestone: '', description: '' });
        },

        deleteMilestone(index) {
            this.milestones.splice(index, 1);
        },
        nextPageMilestones() {
            if (this.currentPageMilestones < this.totalPagesMilestones) {
                this.currentPageMilestones++;
            }
        },
        prevPageMilestones() {
            if (this.currentPageMilestones > 1) {
                this.currentPageMilestones--;
            }
        },
        goToPageMilestones(pageNumber) {
            this.currentPageMilestones = pageNumber;
        },


        nextPageDeliverables() {
            if (this.currentPageDeliverables < this.totalPagesDeliverables) {
                this.currentPageDeliverables++;
            }
            this.showAddMoreButton = this.currentPageDeliverables === this.totalPagesDeliverables &&
                this.deliverables.length % this.deliverablesPerPage === 0;
        },

        prevPageDeliverables() {
            if (this.currentPageDeliverables > 1) {
                this.currentPageDeliverables--;
            }
        },

        goToPageDeliverables(pageNumber) {
            this.currentPageDeliverables = pageNumber;
        },

        deleteDeliverable(index) {
            this.deliverables.splice(index, 1);
        },
        addMore() {
            this.deliverables.push({ value: '' });
            this.showAddMoreButton = this.deliverables.length < 5;
        },

        nextStep() {
            if (this.currentStep < 8) {
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