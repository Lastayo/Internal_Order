<template>
    <div class="flex bg-[#EDF2F7] bg-cover min-h-screen">
        <!-- Sidebar -->
        <LayoutsSidebar />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Navbar -->
            <LayoutsNavbar />

            <div class="IOform flex-1 bg-white px-8 pt-6 overflow-hidden flex flex-col m-10 ml-12 rounded-2xl shadow-md">
                <!-- Step 1 -->
                <div v-if="currentStep === 1" class="pt-6">
                    <div class="mb-4 flex flex-col pt-4">
                        <div class="text-4xl font-bold mb-4">Repository</div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border-collapse rounded-md">
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b bg-gray-100">No</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">App Name</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">IWO</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">Customer</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">BU Delivery</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">CreatedAt</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">Status</th>
                                    <th class="py-2 px-4 border-b bg-gray-100">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="pcProject in paginatedpcProjects" :key="pcProject.id">
                                    <td class="py-4 px-4 border-b text-center">{{ pcProject.id }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ pcProject.appName }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ pcProject.IWO }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ pcProject.Customer }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ pcProject.BUDelivery }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ pcProject.CreatedAt }}</td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <span :class="getStatusClass(pcProject.status)">{{ pcProject.status }}</span>
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <button v-if="pcProject.status !== ''" class="info mr-2"
                                            @click="goToStep2(pcProject)">
                                            <i class="text-gray-400 fas fa-info-circle hover:text-gray-700 text-lg"></i>
                                        </button>
                                        <button v-if="pcProject.status !== 'DONE'" class="edit mr-2"
                                            @click="goToStep3(pcProject)">
                                            <i class="text-gray-400 fas fa-edit hover:text-gray-700 text-lg"></i>
                                        </button>
                                        <button v-if="pcProject.status !== ''" class="mr-2"
                                            @click="confirmDelete(pcProject.id)">
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

                <!-- Step 2 -->
                <div v-if="currentStep === 2">
                    <div class="flex justify-end">
                        <button @click="closeDetailBoxAndGoToRepository"
                            class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                            <i class="fas fa-times"></i>
                        </button>

                    </div>
                    <div class="mb-4 flex flex-col px-4">
                        <div class="text-4xl font-bold mb-2">Detail Application
                            <div class="font-medium text-xl text-gray-400">Project Charter App: {{ selectedpcProject.appName
                            }}
                            </div>
                            <div class="flex justify-end pr-12 "><span :class="getStatusClass(selectedpcProject.status)">{{
                                selectedpcProject.status }}</span></div>
                        </div>

                    </div>

                    <!-- Your tabs (Internal, Timeline, Timeplan, Activity) here -->
                    <div class=" flex justify-start space-x-6 px-4 overflow-x-auto">
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'projectInfo1' }"
                            @click="activeTab = 'projectInfo1'">ProjectInfo-1</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'projectInfo2' }"
                            @click="activeTab = 'projectInfo2'">ProjectInfo-2</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'projectInfo3' }"
                            @click="activeTab = 'projectInfo3'">ProjectInfo-3</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'projectInfo4' }"
                            @click="activeTab = 'projectInfo4'">ProjectInfo-4</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'projectInfo5' }"
                            @click="activeTab = 'projectInfo5'">ProjectInfo-5</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'projectInfo6' }"
                            @click="activeTab = 'projectInfo6'">Project Info-6</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTab === 'signature' }"
                            @click="activeTab = 'signature'">Signature</div>
                    </div>

                    <!-- Info-1 -->
                    <div v-if="activeTab === 'projectInfo1'" class="px-4">

                        <div class=" py-4">
                            <div class="flex flex-col lg:flex-row gap-x-8">
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium text-slate-700">
                                        Project Name
                                    </label>
                                    <div
                                        class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                        {{
                                            selectedpcProject.appName }}
                                    </div>
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        IWO
                                    </label>
                                    <div
                                        class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                        {{
                                            selectedpcProject.IWO }}
                                    </div>
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        Project Manager
                                    </label>
                                    <div
                                        class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                        {{
                                            selectedpcProject.ProjectManager }}
                                    </div>
                                    <label class="block text-md font-medium text-slate-700">
                                        Customer
                                    </label>
                                    <div
                                        class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                        {{
                                            selectedpcProject.Customer }}
                                    </div>
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        End Customer
                                    </label>
                                    <div
                                        class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                        {{
                                            selectedpcProject.EndCustomer }}
                                    </div>
                                </div>
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium text-slate-700 mb-1">
                                        BU Delivery
                                    </label>
                                    <div
                                        class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                        {{
                                            selectedpcProject.BUDelivery }}
                                    </div>
                                    <label class="block text-md font-medium text-slate-700 mt-2">
                                        BU Relate
                                    </label>
                                    <div
                                        class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                        {{
                                            selectedpcProject.BURelate }}
                                    </div>
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        Project Descriptions
                                    </label>

                                    <textarea readonly v-model="selectedpcProject.ProjectDescription"
                                        class="placeholder-text text-gray-600 mt-2 w-full px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 rounded-md"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Info-2 -->
                    <div v-if="activeTab === 'projectInfo2'" class="px-4">
                        <div class=" py-4">

                            <div class="flex space-x-8">
                                <div class="flex flex-col w-full relative">
                                    <label class=" text-md font-medium text-slate-700 mb-1">
                                        High Level Requirment
                                    </label>
                                    <div
                                        class="flex items-center bg-gray-100 justify-between border text-gray-400 shadow-sm placeholder-slate-400 border-slate-300 pl-3 py-6 rounded-md sm:text-sm mb-1">
                                        <span>
                                            {{ selectedpcProject.highLevelReq }}
                                        </span>
                                        <span class="cursor-pointer px-3">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                    </div>
                                    <label class="block text-md font-medium text-slate-700 mb-1">
                                            Assumptions
                                        </label>
                                        <textarea readonly name="descriptions" v-model="selectedpcProject.Assumptions"
                                            class="placeholder-text text-gray-600 mt-1 w-full px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 rounded-md" />
                                    
                                            <label class="block text-md font-medium text-slate-700">
                                            Constraints
                                        </label>
                                        <textarea readonly v-model="selectedpcProject.Constrains"
                                            class="placeholder-text text-gray-600 mt-2 w-full px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 rounded-md" />
                                </div>

                                <div class="flex flex-col w-full relative">
                                    <div class="">
                                        <label class="block text-md font-medium text-slate-700">
                                            Risk
                                        </label>
                                        <textarea readonly name="descriptions" v-model="selectedpcProject.Risk"
                                            class="placeholder-text text-gray-600 mt-1 w-full px-3 py-3 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 rounded-md" />
                                    </div>
                                    <label class="block text-md font-medium text-slate-700 mb-1">
                                        Key Stakeholders
                                    </label>
                                    <div
                                        class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                        {{
                                            selectedpcProject.KeyStakeholder }}</div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Info-3 -->
                    <div v-if="activeTab === 'projectInfo3'" class="px-4">
                        <div class=" py-4">
                            <div class="text-md font-medium mb-2">Deliverables & Success Criteria <span
                                    class=" text-xs text-gray-500">(required)</span></div>
                            <div class="border border-gray-300 p-2 rounded bg-gray-100 placeholder-text text-gray-600">
                                {{
                                    selectedpcProject.deliverableCriteria }}</div>

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
                        </div>
                    </div>

                    <!-- Info-4 -->
                    <div v-if="activeTab === 'projectInfo4'" class="px-4">
                        <div class="py-4">
                            <div class="text-md font-medium mb-2">Milestones <span
                                    class=" text-xs text-gray-500">(required)</span></div>
                            <!-- Tabel Milestones -->
                            <div class=" overflow-x-auto">
                            <table class="min-w-full bg-white border-collapse rounded-md">
                                <thead>
                                    <tr>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">No</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">Date</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">Milestone</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">Description</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(milestone, index) in paginatedMilestones" :key="index">
                                        <td class="py-1 px-4 text-center placeholder-slate-400 ">{{ (currentPageMilestones -
                                            1)
                                            *
                                            milestonesPerPage + index + 1 }}</td>
                                        <td class="py-1 px-4">
                                            <div
                                                class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm">
                                                {{ selectedpcProject.milestonesData[index].Date }}
                                            </div>
                                        </td>
                                        <td class="py-1 px-4">
                                            <div
                                                class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm">
                                                {{ selectedpcProject.milestonesData[index].Milestone }}
                                            </div>
                                        </td>
                                        <td class="py-1 px-4">
                                            <div
                                                class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm">
                                                {{ selectedpcProject.milestonesData[index].DescriptionM }}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
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
                                <button @click="nextPageMilestones"
                                    :disabled="currentPageMilestones === totalPagesMilestones"
                                    class="font-semibold text-sm text-gray-400 rounded-md">
                                    Next
                                </button>
                            </div>

                        </div>
                    </div>

                    <!-- Info-5 -->
                    <div v-if="activeTab === 'projectInfo5'" class="px-4">
                        <div class="py-4">
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
                            <div class="overflow-x-auto">
                                <table class="min-w-full bg-white border-collapse rounded-md px-4">
                                    <thead>
                                        <tr>
                                            <th class="py-2 px-4 border-b bg-gray-100 text-center">No</th>
                                            <th class="py-2 px-4 border-b bg-gray-100 text-center">Name</th>
                                            <th class="py-2 px-4 border-b bg-gray-100 text-center">Role</th>
                                            <th class="py-2 px-4 border-b bg-gray-100 text-center">Description</th>
                                            <th class="py-2 px-4 border-b bg-gray-100 text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(memberResponsiple, index) in paginatedMembersResponsiple" :key="index">
                                            <td class="py-1 px-4 text-center placeholder-slate-400 ">
                                                {{ (currentPageMembersResponsiple - 1) * membersResponsiplePerPage + index +
                                                    1 }}
                                            </td>
                                            <td class="py-1 px-4">
                                                <div
                                                    class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm">
                                                    {{ selectedpcProject.memberResponsipleData[index].NameMR }}
                                                </div>
                                            </td>
                                            <td class="py-1 px-4">
                                                <div
                                                    class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm">
                                                    {{ selectedpcProject.memberResponsipleData[index].RoleMR }}
                                                </div>
                                            </td>
                                            <td class="py-1 px-4">
                                                <div
                                                    class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm">
                                                    {{ selectedpcProject.memberResponsipleData[index].DescriptionMR }}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
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
                    </div>
                     <!-- Modal untuk Add Document -->
                <div v-if="isAddDocumentModalOpen"
                    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <!-- Konten modal di sini -->
                    <div class="bg-white px-6 py-4 rounded-xl w-auto">
                        <div class="flex justify-end">
                            <button @click="closeAddDocModal"
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
                                    <input type="file" id="fileInput" @change="handleFileChange"
                                        class="mt-1 p-1 border rounded-md w-full">
                                </div>

                                <!-- Input untuk document name -->
                                <div class="mb-4">
                                    <label for="docNameInput" class="block text-sm font-medium text-gray-700">Document
                                        Name</label>
                                    <input type="text" id="docNameInput" v-model="documentName"
                                        placeholder="Enter document name" class="mt-1 p-1 border rounded-md w-full">
                                </div>

                                <!-- Input untuk note -->
                                <div class="mb-4">
                                    <label for="noteInput" class="block text-sm font-medium text-gray-700">Note</label>
                                    <textarea id="noteInput" v-model="note" placeholder="Enter notes"
                                        class="mt-1 p-1 border rounded-md w-full"></textarea>
                                </div>

                                <!-- Tombol untuk menyimpan -->
                                <button @click="saveDocument"
                                    class="px-6 py-2 mb-2 bg-[#C53030] text-white rounded-md">Save</button>
                            </div>
                        </div>
                    </div>
                </div>


                    <!-- Info-6 -->
                    <div v-if="activeTab === 'projectInfo6'" class="px-4">
                        <!-- Formulir di Kolom Kiri dan Gambar di Kolom Kanan -->
                        <div class="py-4">
                            <div class="flex flex-col lg:flex-row space-x-6">
                                <div class="flex flex-col lg:w-full">
                                    <div class="">
                                        <label class="block text-md font-medium text-slate-700">
                                            Project Manager’s Responsibility
                                        </label>
                                        <textarea readonly name="descriptions" v-model="selectedpcProject.projectMRespon"
                                            class="placeholder-text text-gray-600 mt-2 w-full px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 rounded-md" />
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
                                                <input readonly v-model="selectedpcProject.projectValue" type="boolean"
                                                    name="project-value" pattern="[0-9]*"
                                                    class="placeholder-text text-gray-600 mt-1 pl-10 pr-3 py-2 w-full bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 rounded-md"
                                                    placeholder="0" />
                                            </div>
                                        </div>

                                    </div>

                                    <div class="">
                                        <label class="block text-md font-medium pt-2 text-slate-700">
                                            Start Date
                                        </label>
                                        <input type="date" name="start-date"
                                            class="placeholder-text text-gray-600 mt-2 w-full px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 rounded-md"
                                            placeholder="Select Start Date" />
                                    </div>
                                    <div class="">
                                        <label class="block text-md font-medium pt-2 text-slate-700">
                                            End Date
                                        </label>
                                        <input type="date" name="end-date"
                                            class="placeholder-text text-gray-600 mt-2 w-full px-3 py-2 bg-gray-100 border shadow-sm border-slate-300 placeholder-slate-400 rounded-md"
                                            placeholder="Select End Date" />
                                    </div>
                                </div>


                                <div class="lg:w-full">
                                    <div class="overflow-x-auto">
                                        <label class="block text-md font-medium text-slate-700 mb-2">
                                            Supporting Document
                                        </label>
                                        <table class="min-w-full bg-white border-collapse rounded-md">
                                            <thead>
                                                <tr>
                                                    <th class="py-2 px-4 border-b bg-gray-100 text-md font-medium">No</th>
                                                    <th class="py-2 px-4 border-b bg-gray-100 text-md font-medium">Document
                                                        Name
                                                    </th>
                                                    <th class="py-2 px-4 border-b bg-gray-100 text-md font-medium">Notes
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="document in supportingDocument" :key="document.id">
                                                    <!-- Kolom data dokumen di sini -->
                                                    <td class="py-4 px-4 border-b text-center">
                                                        {{ selectedpcProject.id }}
                                                    </td>
                                                    <td class="py-2 px-4 border-b text-center">
                                                        {{ selectedpcProject.supportingDocument[index].DocumentNameSD }}
                                                    </td>
                                                    <td class="py-2 px-4 border-b text-center">
                                                        {{ selectedpcProject.supportingDocument[index].NotesSD }}
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Signature -->
                    <div v-if="activeTab === 'signature'" class="px-4">
                        <div class="py-4">
                            <div class="flex flex-col lg:flex-row space-x-8">
                                <div class="flex flex-col lg:w-3/4">
                                    <div class="">
                                        <label class="block text-md font-medium text-slate-700">
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
                                        <div class="mt-2 w-full h-28 bg-white border shadow-sm border-slate-300 rounded-md">
                                        </div>

                                    </div>

                                    <div class="flex flex-col lg:flex-row">


                                        <div class="flex flex-col lg:w-1/2">
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
                                        <div class="flex flex-col lg:w-1/2">
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
                                <div class="lg:w-full py-2 px-4">

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <!-- EDIT BOX Step 3 -->
                <div v-if="currentStep === 3">
                    <div class="flex justify-end">
                        <button @click="closeDetailBoxAndGoToRepository"
                            class="text-black-200 bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                            <i class="fas fa-times"></i>
                        </button>

                    </div>
                    <div class="mb-4 flex flex-col px-4">
                        <div class="text-4xl font-bold mb-2">Detail Application
                            <div class="font-medium text-xl text-gray-400">Project Charter App: {{ selectedpcProject.appName
                            }}
                            </div>
                            <div class="flex justify-end pr-12 "><span :class="getStatusClass(selectedpcProject.status)">{{
                                selectedpcProject.status }}</span></div>
                        </div>

                    </div>

                    <!-- Your tabs (Internal, Timeline, Timeplan, Activity) here -->
                    <div class=" flex justify-start space-x-6 px-4 overflow-x-auto">
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTabE === 'projectEdit1' }"
                            @click="activeTabE = 'projectEdit1'">ProjectEdit-1</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTabE === 'projectEdit2' }"
                            @click="activeTabE = 'projectEdit2'">ProjectEdit-2</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTabE === 'projectEdit3' }"
                            @click="activeTabE = 'projectEdit3'">ProjectEdit-3</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTabE === 'projectEdit4' }"
                            @click="activeTabE = 'projectEdit4'">ProjectEdit-4</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTabE === 'projectEdit5' }"
                            @click="activeTabE = 'projectEdit5'">ProjectEdit-5</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTabE === 'projectEdit6' }"
                            @click="activeTabE = 'projectEdit6'">Project Edit-6</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTabE === 'projectEdit7' }"
                            @click="activeTabE = 'projectEdit7'">Project Edit-7</div>
                        <div class="cursor-pointer" :class="{ 'tab-active': activeTabE === 'signatureEdit' }"
                            @click="activeTabE = 'signatureEdit'">Signature</div>
                    </div>

                    <!-- Edit-1 -->
                    <div v-if="activeTabE === 'projectEdit1'" class="px-4">

                        <div class=" py-4">
                            <div class="flex space-x-8">
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium text-slate-700">
                                        Project Name
                                    </label>
                                    <input v-model="selectedpcProject.appName"
                                        class="border border-gray-300 p-2 rounded bg-white placeholder-text text-gray-600">
                                </div>
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium text-slate-700 mb-1">
                                        BU Delivery
                                    </label>
                                    <input v-model="selectedpcProject.BUDelivery"
                                        class="border border-gray-300 p-2 rounded bg-white placeholder-text text-gray-600">
                                </div>
                            </div>
                            <div class="flex space-x-8">
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        IWO
                                    </label>
                                    <input v-model="selectedpcProject.IWO"
                                        class="border border-gray-300 p-2 rounded bg-white placeholder-text text-gray-600">
                                </div>
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium text-slate-700 mt-2">
                                        BU Relate
                                    </label>
                                    <input v-model="selectedpcProject.BURelate"
                                        class="border border-gray-300 p-2 rounded bg-white placeholder-text text-gray-600">
                                </div>
                            </div>
                            <div class="flex space-x-8">
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        Project Manager
                                    </label>
                                    <input v-model="selectedpcProject.ProjectManager"
                                        class="border border-gray-300 p-2 rounded bg-white placeholder-text text-gray-600">
                                </div>
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        Project Descriptions
                                    </label>

                                    <input v-model="selectedpcProject.ProjectDescription"
                                        class="border border-gray-300 p-2 rounded bg-white placeholder-text text-gray-600">
                                </div>
                            </div>
                            <div class="flex space-x-8">
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium text-slate-700">
                                        Customer
                                    </label>
                                    <input v-model="selectedpcProject.Customer"
                                        class="border border-gray-300 p-2 rounded bg-white placeholder-text text-gray-600">
                                </div>
                                <div class="flex flex-col w-full relative">
                                </div>
                            </div>

                            <div class="flex space-x-8 mb-12">
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium pt-2 text-slate-700">
                                        End Customer
                                    </label>
                                    <input v-model="selectedpcProject.EndCustomer"
                                        class="border border-gray-300 p-2 rounded bg-whie placeholder-text text-gray-600">
                                </div>
                                <div class="flex flex-col w-full relative"></div>
                            </div>

                        </div>
                    </div>

                    <!-- Edit-2 -->
                    <div v-if="activeTabE === 'projectEdit2'" class="px-4">
                        <div class=" py-4">

                            <div class="flex space-x-8">
                                <div class="flex flex-col w-full relative">
                                    <label class=" text-md font-medium text-slate-700 mb-1">
                                        High Level Requirment
                                    </label>

                                    <div
                                        class="flex bg-white items-center justify-between border text-gray-400 shadow-sm placeholder-slate-400 border-slate-300 pl-3 py-2 rounded-md sm:text-sm mb-2">
                                        <span>
                                            <!-- Konten utama (teks atau input) di sini -->

                                        </span>
                                        <span class="cursor-pointer px-3">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="flex flex-col w-full relative">
                                    <div class="">
                                        <label class="block text-md font-medium text-slate-700">
                                            Risk
                                        </label>
                                        <textarea v-model="selectedpcProject.Risk"
                                            class="border border-gray-300 w-full p-2 rounded bg-white placeholder-text text-gray-600">
                                </textarea>
                                    </div>

                                </div>
                            </div>

                            <div class="flex space-x-8">
                                <div class="flex flex-col w-full relative">
                                    <div class="mb-1">
                                        <label class="block text-md font-medium text-slate-700 mb-1">
                                            Assumptions <span class=" text-xs text-gray-500">(required)</span>
                                        </label>
                                        <textarea v-model="selectedpcProject.Assumptions"
                                            class="border border-gray-300 w-full p-2 rounded bg-white placeholder-text text-gray-600">
                                </textarea>
                                    </div>

                                </div>
                                <div class="flex flex-col w-full relative">
                                    <label class="block text-md font-medium text-slate-700 mb-1">
                                        Key Stakeholders
                                    </label>
                                    <input v-model="selectedpcProject.KeyStakeholder"
                                        class="border border-gray-300 p-2 rounded bg-white placeholder-text text-gray-600">
                                </div>
                            </div>
                            <div class="flex space-x-8">
                                <div class="flex flex-col w-full relative">
                                    <div class="mb-2">
                                        <label class="block text-md font-medium text-slate-700">
                                            Constraints
                                        </label>
                                        <textarea v-model="selectedpcProject.Constrains"
                                            class="border border-gray-300 w-full p-2 rounded bg-white placeholder-text text-gray-600">
                                </textarea>
                                    </div>
                                </div>
                                <div class="flex flex-col w-full relative">

                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Edit-3 -->
                    <div v-if="activeTabE === 'projectEdit3'" class="px-4">
                        <div>
                            <div class="mb-4 flex flex-col py-4">
                                <div class="text-md font-medium mb-2">Deliverables & Success Criteria <span
                                        class=" text-xs text-gray-500">(required)</span></div>

                                <!-- Inputan untuk Deliverables & Success Criteria -->
                                <div v-for="(deliverable, index) in paginatedDeliverables" :key="index"
                                    class="flex items-center mb-2">
                                    <input v-model="selectedpcProject.deliverableCriteria" type="text"
                                        class="flex-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 placeholder-text text-gray-600 rounded-md sm:text-sm mr-2"
                                        placeholder="Input Deliverables & Success Criteria" />

                                    <!-- Tombol Delete -->
                                    <button @click="deleteDeliverable(index)"
                                        class="px-7 py-2 bg-white border border-[#C53030] text-[#C53030] rounded-md">
                                        Delete
                                    </button>
                                </div>

                                <!-- Tombol Add More hanya muncul pada inputan terakhir -->
                                <div class="flex justify-end">
                                    <button @click="addMore" class="px-4 py-2 bg-[#C53030] text-white rounded-md">
                                        Add More
                                    </button>
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
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Edit-4 -->
                    <div v-if="activeTabE === 'projectEdit4'" class="px-6">
                        <div class="py-4">

                            <div class="px-4 pt-4">
                                <div class="text-md font-medium mb-2">Milestones
                                </div>
                            </div>

                            <div class="overflow-x-auto">
                            <!-- Tabel Milestones -->
                            <table class="min-w-full bg-white border-collapse rounded-md px-4">
                                <thead>
                                    <tr>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">No</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">Date</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">Milestone</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">Description</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(milestone, index) in paginatedMilestones" :key="index">
                                        <td class="py-1 px-4 text-center placeholder-slate-400 ">{{ (currentPageMilestones -
                                            1)
                                            *
                                            milestonesPerPage + index + 1 }}</td>
                                        <td class="py-1 px-4">
                                            <input v-model="selectedpcProject.milestonesData[index].Date" type="text"
                                                class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm" />
                                        </td>
                                        <td class="py-1 px-4">
                                            <input v-model="selectedpcProject.milestonesData[index].Milestone" type="text"
                                                class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm" />
                                        </td>
                                        <td class="py-1 px-4">
                                            <input v-model="selectedpcProject.milestonesData[index].DescriptionM"
                                                type="text"
                                                class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm" />
                                        </td>
                                        <td class="py-1  flex justify-end">
                                            <button @click="deleteMilestone(index)"
                                                class="text-center px-6 py-2 bg-white border border-[#C53030] text-[#C53030] rounded-md">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                            <!-- Tombol Add More hanya muncul pada inputan terakhir -->
                            <div class="flex justify-end">
                                <button @click="addMoreMilestone" class="px-4 py-2 bg-[#C53030] text-white rounded-md">
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
                                <button @click="nextPageMilestones"
                                    :disabled="currentPageMilestones === totalPagesMilestones"
                                    class="font-semibold text-sm text-gray-400 rounded-md">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Edit-5 -->
                    <div v-if="activeTabE === 'projectEdit5'" class="px-4">
                        <div class="py-4">
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

                            <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border-collapse rounded-md px-4">
                                <thead>
                                    <tr>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">No</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">Name</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">Role</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center">Description</th>
                                        <th class="py-2 px-4 border-b bg-gray-100 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(memberResponsiple, index) in paginatedMembersResponsiple" :key="index">
                                        <td class="py-1 px-4 text-center placeholder-slate-400 ">
                                            {{ (currentPageMembersResponsiple - 1) * membersResponsiplePerPage + index + 1
                                            }}
                                        </td>
                                        <td class="py-1 px-4">
                                            <input v-model="selectedpcProject.memberResponsipleData[index].NameMR"
                                                type="text"
                                                class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm"
                                                placeholder="Input Date" />
                                        </td>
                                        <td class="py-1 px-4">
                                            <input v-model="selectedpcProject.memberResponsipleData[index].RoleMR"
                                                type="text"
                                                class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm"
                                                placeholder="Input Member" />
                                        </td>
                                        <td class="py-1 px-4">
                                            <input v-model="selectedpcProject.memberResponsipleData[index].DescriptionMR"
                                                type="text"
                                                class="text-center w-full pl-3 py-2 bg-white placeholder-slate-400 rounded-md sm:text-sm"
                                                placeholder="Input Description" />
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
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
                    </div>

                    <!-- Edit-6 -->
                    <div v-if="activeTabE === 'projectEdit6'" class="px-4">
                        <!-- Formulir di Kolom Kiri dan Gambar di Kolom Kanan -->
                        <div class="py-4">
                            <div class="flex flex-col lg:flex-row space-x-6">
                                <div class="flex flex-col lg:w-2/3">
                                    <div class="">
                                        <label class="block text-md font-medium text-slate-700">
                                            Project Manager’s Responsibility
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
                                <div class="lg:w-full">
                                    <img src="/assets/pana.svg" alt="Your Image" class="w-auto h-96 p-4">
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Edit-7 -->
                    <div v-if="activeTabE === 'projectEdit7'" class="px-4">
                        <div class="mb-1 flex flex-col">

                            <div>
                                <div class="flex pt-4 mb-4">
                                    <button @click="openAddDocModal"
                                        class="ml-auto px-4 py-2 bg-[#C53030] text-white rounded-md">
                                        + Add Document
                                    </button>
                                </div>
                            </div>

                            <!-- Supporting Document Table -->
                            <div class="overflow-x-auto">
                                <table class="min-w-full bg-white border-collapse rounded-md">
                                    <thead>
                                        <tr>
                                            <th class="py-2 px-4 border-b bg-gray-100">No</th>
                                            <th class="py-2 px-4 border-b bg-gray-100">Document Name</th>
                                            <th class="py-2 px-4 border-b bg-gray-100">Notes</th>
                                            <th class="py-2 px-4 border-b bg-gray-100">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="document in supportingDocuments" :key="document.id">
                                            <!-- Kolom data dokumen di sini -->
                                            <td class="py-4 px-4 border-b text-center">
                                                {{ document.id }}
                                            </td>
                                            <td class="py-2 px-4 border-b text-center">
                                                {{ document.name }}
                                            </td>
                                            <td class="py-2 px-4 border-b text-center">
                                                {{ document.notes }}
                                            </td>
                                            <td class="py-2 px-4 border-b text-center">
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
                                <div class="bg-white px-4 py-4 rounded-xl w-auto">
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
                                                <label for="fileInput"
                                                    class="block text-sm font-medium text-gray-700">Choose
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
                                                    placeholder="Enter document name"
                                                    class="mt-1 p-1 border rounded-md w-full">
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
                                                class="px-4 py-2 bg-[#C53030] text-white rounded-md">Save</button>
                                        </div>
                                    </div>

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
                                                class=" text-[#C53030] text-4xl rounded-full bg-white px-4 py-3 border-[#C53030] border-4 mb-4">
                                                <i class="fas fa-trash-can"></i>
                                            </div>
                                            <p class="text-xl font-medium text-gray-600 text-center">Are you sure to delete
                                                this
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
                                <button @click="prevPageSupportingDocuments"
                                    :disabled="currentPageSupportingDocuments === 1"
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




                        </div>
                    </div>

                    <!-- Signature -->
                    <div v-if="activeTabE === 'signatureEdit'" class="px-4">
                        <div class="py-4">
                            <div class="flex flex-col lg:flex-row space-x-8">
                                <div class="flex flex-col lg:w-3/4">
                                    <div class="">
                                        <label class="block text-md font-medium text-slate-700">
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
                                        <div class="mt-2 w-full h-28 bg-white border shadow-sm border-slate-300 rounded-md">
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
                                <div class="lg:w-full py-2 px-4">

                                </div>

                            </div>

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

            deliverablesPerPage: 5,
            currentPageDeliverables: 1,

            currentStep: 1,
            deliverables: [{ value: '' }],

            iwoDate: [
                { IWO: "24/24/3283/23" }
            ],

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



            pcProjects: [
                {
                    id: 1, appName: "Shopee", IWO: "24/045/742H4", Customer: "Haikal", status: "DRAFT", BUDelivery: "PT. MENCARI CINTA SEJATI",
                    CreatedAt: "07-12-2023", BURelate: "Sigma Global Service Delivery Center (JSC)", ProjectManager: "Haikal Adibasta", EndCustomer: "BU Operation and Maintenance",
                    ProjectDescription: "Sebuah project pengembangan aplikasi berbasis server",
                    highLevelReq: "", Risk: "Sebutkan resiko-resiko yang mungkin terjadi di dalam project",
                    Assumptions: "Apa yang paling susah dari sekian risk", KeyStakeholder: "Pri Desta Yudha", Constrains: "Semangat guys ngerjain nya",
                    deliverableCriteria: "PDF Document",
                    milestonesData: [{
                        Date: "10-10-2023",
                        Milestone: "Kick Off",
                        DescriptionM: "Kick Off akan dimulai tgl 10",
                    }],
                    memberResponsipleData: [{
                        NameMR: "Juddin",
                        RoleMR: "Member",
                        DescriptionMR: "Adalah seorang member turu nan",
                    }],
                    supportingDocument: [{
                        DocumentNameSD: "KHK Document",
                        NotesSD: "Document pelengkap"
                    }],
                    projectMRespon: "Sebuah apapun akan dilakukan", projectValue: "298.000.009",

                    signature: [{
                        noteSG: "usahakan selesai sesuai deadline",

                    }]
                },


                { id: 2, appName: "Go jek", IWO: "24/045/742H4", Customer: "Haikal", status: "DONE", BUDelivery: "PT. MAJU MUNDUR", CreatedAt: "07-12-2023", BURelate: "Sigma Global Service Delivery Center (JSC)", ProjectManager: "Haikal Adibasta", EndCustomer: "BU Operation and Maintenance", ProjectDescription: "Sebuah project pengembangan aplikasi berbasis server" },
                { id: 3, appName: "MONARA", IWO: "24/045/742H4", Customer: "Haikal", status: "DRAFT", BUDelivery: "PT. SIGMA CARAKA", CreatedAt: "07-12-2023", BURelate: "Sigma Global Service Delivery Center (JSC)", ProjectManager: "Haikal Adibasta", EndCustomer: "BU Operation and Maintenance", ProjectDescription: "Sebuah project pengembangan aplikasi berbasis server" },
                { id: 4, appName: "TIX", IWO: "24/045/742H4", Customer: "Haikal", status: "DRAFT", BUDelivery: "PT. SENTOSA", CreatedAt: "07-12-2023", BURelate: "Sigma Global Service Delivery Center (JSC)", ProjectManager: "Haikal Adibasta", EndCustomer: "BU Operation and Maintenance", ProjectDescription: "Sebuah project pengembangan aplikasi berbasis server" },
                { id: 5, appName: "Lazada", IWO: "24/045/742H4", Customer: "Haikal", status: "DONE", BUDelivery: "PT. PETUALANG", CreatedAt: "07-12-2023", BURelate: "Sigma Global Service Delivery Center (JSC)", ProjectManager: "Haikal Adibasta", EndCustomer: "BU Operation and Maintenance", ProjectDescription: "Sebuah project pengembangan aplikasi berbasis server" },
                { id: 6, appName: "JANGO", IWO: "24/045/742H4", Customer: "Haikal", status: "DONE", BUDelivery: "PT. GOJEK", CreatedAt: "07-12-2023", BURelate: "Sigma Global Service Delivery Center (JSC)", ProjectManager: "Haikal Adibasta", EndCustomer: "BU Operation and Maintenance", ProjectDescription: "Sebuah project pengembangan aplikasi berbasis server" },
                { id: 7, appName: "MUSLIM PRO", IWO: "24/045/742H4", Customer: "Haikal", status: "DRAFT", BUDelivery: "PT. CAHAYA ILAHI", CreatedAt: "07-12-2023", BURelate: "Sigma Global Service Delivery Center (JSC)", ProjectManager: "Haikal Adibasta", EndCustomer: "BU Operation and Maintenance", ProjectDescription: "Sebuah project pengembangan aplikasi berbasis server" },
                { id: 8, appName: "Shopee", IWO: "24/045/742H4", Customer: "Haikal", status: "DRAFT", BUDelivery: "PT. NYENI NYENUK", CreatedAt: "07-12-2023", BURelate: "Sigma Global Service Delivery Center (JSC)", ProjectManager: "Haikal Adibasta", EndCustomer: "BU Operation and Maintenance", ProjectDescription: "Sebuah project pengembangan aplikasi berbasis server" },
            ],

            itemsPerPage: 5,
            currentPage: 1,
            selectedpcProject: null,
            activeTab: "projectInfo1",
            activeTabE: "projectEdit1",

            editingpcProject: null,
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

        paginatedTimelines() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const filteredTimelines = this.timelines.slice(start, end);
            return filteredTimelines;
        },

        isSidebarClickable() {
            return !this.selectedpcProject && !this.editingpcProject;
        },
        totalPages() {
            return Math.ceil(this.pcProjects.length / this.itemsPerPage);
        },
        paginatedpcProjects() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const filteredpcProjects = this.pcProjects.slice(start, end);
            return filteredpcProjects;
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

        openUploadModal() {
            // Logika untuk membuka modal upload
            this.uploadModal.isOpen = true;
        },
        closeUploadModal() {
            // Logika untuk menutup modal upload
            this.uploadModal.isOpen = false;
        },

        confirmDelete(projectId) {
            // Set deletingProjectId
            this.deletingProjectId = projectId;
            // Show the delete confirmation modal
            this.showDeleteConfirmationModal = true;
        },

        deleteProject() {
            // Implementasi logika penghapusan proyek
            const indexToDelete = this.pcProjects.findIndex(project => project.id === this.deletingProjectId);

            if (indexToDelete !== -1) {
                this.pcProjects.splice(indexToDelete, 1);
            }

            // Setelah penghapusan, tutup modal konfirmasi
            this.showDeleteConfirmationModal = false;
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
                statusChange: { from: this.selectedpcProject.status, to: newStatus },
                timestamp: this.getCurrentTime(),
            });

            // Perbarui status internal order
            this.selectedpcProject.status = newStatus;
        },

        goToStep2(pcProject) {
            // Set currentStep to 2 and show details for the clicked project
            this.currentStep = 2;
            this.showDetailBox(pcProject);
        },
        goToStep3(pcProject) {
            this.currentStep = 3;
            this.selectedpcProject = pcProject;
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
                'bg-green-100 rounded-sm px-3 text-green-700 text-sm': status === 'DONE',

                'bg-gray-200 rounded-sm px-3 text-gray-700 text-sm': status === 'DRAFT',
            };
        },
        showDetailBox(pcProject) {
            this.selectedpcProject = pcProject;
            this.editingpcProject = null; // Reset editing state when showing details
        },
        editpcProject(pcProject) {
            // Copy the object to avoid modifying the original
            this.editingpcProject = { ...pcProject };
            this.selectedpcProject = null; // Reset detail view when editing
        },
        cancelEdit() {
            this.editingpcProject = null;
        },
        saveEdit() {
            // Perform save logic, update the pcProject in the array, etc.
            // Once saved, reset editing state
            this.editingpcProject = null;
        },
        closeDetailBoxAndGoToRepository() {
            // Reset currentStep to 1 (Repository page)
            this.currentStep = 1;

            // Clear selected and editing projects
            this.selectedpcProject = null;
            this.editingpcProject = null;
        },
        toggleDetailBox(pcProject) {
            // Toggle between showing and hiding the detail box
            if (this.selectedpcProject === pcProject) {
                // If the same project is clicked again, close the detail box
                this.selectedpcProject = null;
            } else {
                // If a different project is clicked, show the detail box
                this.selectedpcProject = pcProject;
                this.editingpcProject = null; // Reset editing state when showing details
            }
        },
    },
};
</script>

<style scoped>@import '@fortawesome/fontawesome-free/css/all.css';
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
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 3px;
}</style>