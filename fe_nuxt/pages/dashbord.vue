<template>
    <div class="bg-[#EDF2F7] bg-cover min-h-screen">
        <LayoutsSidebar />
        <LayoutsNavbar />
        <div class="py-8 pl-96 pr-10">
            <div class="h-full w-11/12 flex flex-col p-5 bg-[#C53030] rounded">
                <h1 class="text-white font-semibold sm:text-md md:text-xl lg:text-2xl">Welcome Back!</h1>
                <h1 class="text-white font-bold sm:text-2xl md:text3xl lg:text-4xl">Nahiya Zahrah As Admin</h1>
            </div>

            <div class="py-6 flex space-x-7"> <!-- Menambahkan kelas flex dan space-x-4 untuk memberi ruang antar elemen -->
                <div class="h-32 w-80 flex flex-col border-2 p-6 text-center bg-[#ffffff] rounded-lg">
                    <h1 class="text-black font-bold sm:text-xl ">Internal Order Project</h1>
                </div>
                <div class="h-32 w-80 flex flex-col border-2 p-6 text-center bg-[#ffffff] rounded-lg">
                    <h1 class="text-black font-bold sm:text-xl ">Total Project</h1>
                </div>
                <div class="h-32 w-80 flex flex-col border-2 p-6 text-center bg-[#ffffff] rounded-lg">
                    <h1 class="text-black font-bold sm:text-xl ">Project Charter</h1>
                </div>
            </div>

            <div class="flex space-x-14"> <!-- Menambahkan kelas flex dan space-x-6 untuk memberi ruang antar elemen -->
                <div class="h-72 px-28 flex flex-col border-2 p-6 text-center bg-[#ffffff] rounded-lg">
                    <h1 class="text-black font-bold sm:text-xl ">Internal Order Status Bar</h1>
                    <canvas ref="iosbChart"></canvas>
                </div>
                <div class="h-72 px-28 flex flex-col border-2 p-6 text-center bg-[#ffffff] rounded-lg">
                    <h1 class="text-black font-bold sm:text-xl ">Project Charter Status Bar</h1>
                    <canvas ref="pcsbChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
    mounted() {
        this.createDonutChart('iosbChart', [30, 25, 25], ['On Going', 'Finish', 'Dropped'], ['#C53030', '#E7E7E7', '#68788F']);
        this.createDonutChart('pcsbChart', [15, 60, 25], ['On Going', 'Finish', 'Dropped'], ['#C53030', '#E7E7E7', '#68788F']);
    },
    methods: {
        createDonutChart(chartId, data, labels, colors) {
            const ctx = this.$refs[chartId].getContext('2d');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: colors,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        },
    },
};
</script>

<style>
/* .all-box {
    padding: 41%;
} */

.welcome-box {

    background-color: #C53030;

}

.welcome-box h1,
.welcome-box h3 {
    margin: 0;
    color: #ffff;
}

.welcome-box h1 {
    font-weight: 600;
    font-size: 18px;
    padding-top: 1px;

}

.welcome-box h3 {
    font-weight: bold;
    /* Add this line to make h3 bold */
    font-size: 35px;
}

/* Add a media query for smaller screens */

.IOP-box {
    display: flex;
    flex-direction: column;
    align-items: center;


    position: fixed;
    top: 39%;
    right: 65.8%;
    transform: translate(50%, -50%);
    border-radius: 5px;
    width: 80%;
    /* Set a percentage width for responsiveness */
    max-width: 100px;
    /* Set a maximum width for responsiveness */
    min-width: 340px;
    /* Set a minimum width for responsiveness */
    height: 160px;
    /* Set height to auto for responsiveness */
    max-height: 80vh;
    /* Set a maximum height for responsiveness */
    padding: 15px;
    background-color: #ffff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.IOP-box p {
    font-weight: bold;
    font-size: 20px;
}

.TP-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    top: 39%;
    right: 41%;
    /* Adjust the right position */
    transform: translate(50%, -50%);
    border-radius: 5px;
    width: 80%;
    /* Set a percentage width for responsiveness */
    max-width: 100px;
    /* Set a maximum width for responsiveness */
    min-width: 340px;
    /* Set a minimum width for responsiveness */
    height: 160px;
    /* Set height to auto for responsiveness */
    max-height: 80vh;
    /* Set a maximum height for responsiveness */
    padding: 15px;
    background-color: #ffff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.TP-box p {
    font-weight: bold;
    font-size: 20px;
}

.IPC-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    top: 39%;
    right: 16.2%;
    /* Adjust the right position */
    transform: translate(50%, -50%);
    border-radius: 5px;
    width: 80%;
    /* Set a percentage width for responsiveness */
    max-width: 100px;
    /* Set a maximum width for responsiveness */
    min-width: 340px;
    /* Set a minimum width for responsiveness */
    height: 160px;
    /* Set height to auto for responsiveness */
    max-height: 80vh;
    /* Set a maximum height for responsiveness */
    padding: 15px;
    background-color: #ffff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.IPC-box p {
    font-weight: bold;
    font-size: 20px;
}

.IOSB-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    top: 74%;
    right: 60%;
    /* Adjust the right position */
    transform: translate(50%, -50%);
    border-radius: 5px;
    width: 80%;
    /* Set a percentage width for responsiveness */
    max-width: 100px;
    /* Set a maximum width for responsiveness */
    min-width: 520px;
    /* Set a minimum width for responsiveness */

    /* Set height to auto for responsiveness */
    max-height: 80vh;
    /* Set a maximum height for responsiveness */
    padding: 15px;
    background-color: #ffff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.IOSB-box p {
    font-weight: bold;
    font-size: 20px;
}

.PCSB-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    top: 74%;
    right: 22%;
    /* Adjust the right position */
    transform: translate(50%, -50%);
    border-radius: 5px;
    width: 80%;
    /* Set a percentage width for responsiveness */
    max-width: 100px;
    /* Set a maximum width for responsiveness */
    min-width: 520px;
    /* Set a minimum width for responsiveness */
    height: 300px;
    /* Set height to auto for responsiveness */
    max-height: 80vh;
    /* Set a maximum height for responsiveness */
    padding: 15px;
    background-color: #ffff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.PCSB-box p {
    font-weight: bold;
    font-size: 20px;
}

.IOSB-box,
.PCSB-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    /* ... other styles ... */
}

.donut-chart-container {
    max-width: 400px;
    /* Sesuaikan ukuran maksimum yang diinginkan */
    margin: auto;
    /* Pusatkan diagram secara horizontal */
    float: right;
    /* Sesuaikan jarak atas yang diinginkan */
}

canvas {
    width: 85%;
    /* Agar kanvas mengisi lebar elemen induknya */
}
</style>