
<template>
    <!-- Tombol untuk membuka/tutup sidebar -->
    <button class="toggle-button " @click="toggleSidebar">
        <i :class="{ 'fas fa-bars': !isOpen }"></i>
    </button>
    
    <aside class="sidebar" :class="{ 'sidebar-open': isOpen }">

         <!-- Tombol untuk membuka/tutup sidebar -->
         <button class="toggle-button " @click="toggleSidebar">
                <i :class="{ 'fas fa-bars': !isOpen, 'fas fa-bars': isOpen }"></i>
            </button>

        <div class="h-full w-full flex flex-col py-6 bg-[#ffff]">
            <div class="order-first hidden w-full lg:block">
                <img class="p-2 centered-image" src="/assets/Telkomsigma-baru.svg" alt="" />
            </div>

            <div class="pt-36 ">
                <ul class="list-none">
                    <li @click="navigateTo('/dashboard')" class="cursor-pointer flex items-center">
                        <i class="fas fa-home px-4 text-xl"></i>Dashboard
                    </li>
                    <li @click="navigateTo('/user')" class="cursor-pointer flex items-center">
                        <i class="fas fa-user px-4 text-xl"></i>User
                    </li>
                    <li @click="toggleDropdown('internalOrder')" class="relative group cursor-pointer">
                        <i class="fas fa-receipt px-4 text-lg"></i>
                        <span class="whitespace-nowrap">Internal Order</span>
                        <i class="fas fa-greater-than px-8 fa-2xs"></i>
                        <ul v-if="dropdowns.internalOrder" class="list-none absolute left-0 top-full ">
                            <li @click="navigateTo('/IO/order')" class="cursor-pointer flex my-2 items-center">
                                <i class="fas fa-circle fa-2xs px-3"></i>Order
                            </li>
                            <li @click="navigateTo('/IO/repository')" class="cursor-pointer flex items-center">
                                <i class="fas fa-circle fa-2xs px-3"></i>Repository
                            </li>
                        </ul>
                    </li>
                    <li @click="toggleDropdown('projectCharter')" :class="{ 'mt-24': dropdowns.internalOrder }"
                        class="relative group cursor-pointer">
                        <i class="fas fa-receipt px-4 text-lg"></i>
                        <span class="whitespace-nowrap">Project Charter</span>
                        <i class="fas fa-greater-than px-6 fa-2xs"></i>
                        <ul v-if="dropdowns.projectCharter" class="list-none absolute left-0 top-full hidden">
                            <li @click="navigateTo('/PC/order')" class="cursor-pointer flex my-2 items-center">
                                <i class="fas fa-circle fa-2xs px-3"></i>Order
                            </li>
                            <li @click="navigateTo('/PC/repository')" class="cursor-pointer flex items-center">
                                <i class="fas fa-circle fa-2xs px-3"></i>Repository
                            </li>
                        </ul>
                    </li>
                    <li @click="destroyToken('/login')" :class="{ 'mt-24': dropdowns.projectCharter }"
                        class="cursor-pointer flex items-center">
                        <i class="fas fa-right-from-bracket px-4 text-lg"></i>Logout
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>
  
<script>
export default {
    data() {
        return {
            dropdowns: {
                internalOrder: false,
                projectCharter: false,
                currentRoute: '',
            },
            isOpen: true,
        };
    },
    methods: {
        toggleSidebar() {
            this.isOpen = !this.isOpen;
        },
        navigateTo(route) {
            this.currentRoute = route;
        },
        toggleDropdown(key) {
            this.dropdowns[key] = !this.dropdowns[key];
        },
        openDropdown(key) {
            this.dropdowns[key] = true;
        },
        closeDropdown(key) {
            this.dropdowns[key] = false;
        },
        navigateTo(route) {
            this.$router.push(route);
        },

        destroyToken() {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('tokenExpiration');

            this.$router.push('/login');
        },
    },
};
</script>
  
<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');


.centered-image {
    max-width: 100%;
    display: block;
    margin: 0 auto;
}

.sidebar {
    font-family: 'Poppins';
    width: 280px;
    display: none;
    background-color: #ffffff;
    color: rgb(82, 82, 82)000;
    height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: translateX(-280px);
    transition: transform 0.3s ease-in-out;

}

.sidebar-open {
    transform: translateX(0);
    position: relative;
    display: block;
}

.toggle-button {
    position: fixed;
    top: 20px;
    left: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #333;
}

.sidebar-open .toggle-button i {
    transform: rotate(180deg);
}

nav {
    padding: 10px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    font-size: 16px;
    color: rgb(100, 100, 100);
    border-radius: 7px;
    list-style-type: none;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    padding-left: 10px;
    cursor: pointer;
    transition: background-color;
    /* Add a smooth transition for hover effect */
}

li:hover {

    color: #ffffff;
    background-color: #d40000;
    /* Change the background color on hover */
    border-radius: 7px;
}

.active {
    background-color: #d40000;
}

ul ul {

    display: block;
    padding-left: 4px;
}
</style>
