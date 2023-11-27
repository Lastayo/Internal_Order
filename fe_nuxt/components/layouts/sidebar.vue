<template>
    <aside class="sidebar">
        <div class="h-full w-full flex flex-col py-6 bg-[#ffff]">
            <div class="order-first hidden w-full lg:block">
                <img class="p-2 centered-image" src="assets/Telkomsigma-baru.svg" alt="" />
            </div>
            <div class="pt-32 relative ">
                <ul class="list-none">
                    <li @click="navigateTo('/dashbord')" class="cursor-pointer flex items-center">
                        <i class="fas fa-home px-2"></i>Dashboard
                    </li>
                    <li @click="navigateTo('/user')" class="cursor-pointer flex items-center">
                        <i class="fas fa-user px-2"></i>User
                    </li>
                    <li @click="navigateTo('/employee')" class="cursor-pointer flex items-center">
                        <i class="fas fa-clipboard-user px-2"></i>Employee
                    </li>
                    <li @click="toggleDropdown('internalOrder')" @mouseleave="closeDropdown('internalOrder')"
                        class="relative group cursor-pointer">
                        <i class="fas fa-receipt px-2"></i>
                        <span class="whitespace-nowrap">Internal Order</span>
                        <i class="fas fa-greater-than px-8 fa-2xs"></i>
                        <ul v-if="dropdowns.internalOrder" class="list-none absolute left-0 top-full hidden">
                            <li @click="navigateTo('/internal-order/item1')" class="cursor-pointer flex items-center">
                                <i class="fas fa-circle fa-2xs px-3"></i>Order
                            </li>
                            <li @click="navigateTo('/internal-order/item2')" class="cursor-pointer flex items-center">
                                <i class="fas fa-circle fa-2xs px-3"></i>Repository
                            </li>
                        </ul>
                    </li>
                    <li @click="toggleDropdown('projectCharter')" @mouseleave="closeDropdown('projectCharter')"
                        :class="{ 'mt-20': dropdowns.internalOrder }" class="relative group cursor-pointer">
                        <i class="fas fa-receipt px-2"></i>
                        <span class="whitespace-nowrap">Project Charter</span>
                        <i class="fas fa-greater-than px-6   fa-2xs"></i>
                        <ul v-if="dropdowns.projectCharter" class="list-none absolute left-0 top-full hidden">
                            <li @click="navigateTo('/project-charter/item1')" class="cursor-pointer flex items-center">
                                <i class="fas fa-circle fa-2xs px-3"></i>Order
                            </li>
                            <li @click="navigateTo('/project-charter/item2')" class="cursor-pointer flex items-center">
                                <i class="fas fa-circle fa-2xs px-3"></i>Repository
                            </li>
                        </ul>
                    </li>
                    <li @click="navigateTo('/logout')" :class="{ 'mt-20': dropdowns.projectCharter }"
                        class="cursor-pointer flex items-center">
                        <i class="fas fa-right-from-bracket px-2"></i>Logout
                    </li>
                </ul>
                <div>
                    <div @click="navigateTo('/profile')" class="profile-section">
                        <div class="profile-info">
                            <img class="profile-picture" src="assets/haikal-profile.jpg" alt="Profile Picture" />
                            <div class="user-info">
                                <div class="username">Haikal Adibasta</div>
                                <div class="email">superhaikal@gmail.com</div>
                            </div>
                        </div>
                        <ul v-if="dropdowns.internalOrder" class="list-none absolute left-0 top-full hidden z-50">
                        </ul>
                    </div>
                </div>
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
            },
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
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
    },
};
</script>
  
<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');


.user-info {
    display: flex;
    flex-direction: column;
}

.username {
    font-weight: normal;
    font-size: 14px;
    /* Adjust the font size for username */

}

.email {
    font-size: 12px;
    /* Adjust the font size for email */
    color: #808080;
    /* Grey color for email */
}

.profile-section {

    position: sticky;
    top: 20px;
    /* Adjust the top position as needed */
    border-top: 2px solid #ccc;
    margin-top: 190px;
    padding: 20px;
    background-color: #ffffff;
    cursor: pointer;
    z-index: 100;
    width: 280px;

}

.profile-section:hover {
    border-radius: 5px;
    background-color: #eaeaea;
}

.profile-info {
    display: flex;
    align-items: center;
}

.profile-picture {
    width: 40px;
    /* Adjust the width of the profile picture */
    height: 40px;
    /* Adjust the height of the profile picture */
    border-radius: 50%;
    /* Make it circular */
    margin-right: 10px;
    /* Add margin to separate profile picture from user info */
}

.centered-image {
    max-width: 100%;
    display: block;
    margin: 0 auto;
}

.bar {
    position: fixed;
    height: 10vh;
    top: 0;
    left: 0;
    padding-left: 0px;
    padding-top: 480px;
}

.sidebar {
    font-family: 'Poppins';
    width: 280px;
    background-color: #ffffff;
    color: rgb(82, 82, 82)000;
    position: fixed;
    /* Fixed position so it stays visible while scrolling */
    height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    /* Add a subtle box shadow for depth */
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
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
    /* Add a smooth transition for hover effect */
}

li:hover {

    color: #ffffff;
    background-color: #d40000;
    /* Change the background color on hover */
    border-radius: 7px;
}

ul ul {
    display: none;
    padding-left: 15px;
}

ul li:hover>ul {

    display: block;
}
</style>
  