<template>
    <div class="flex h-screen">
        <aside :class="[
            'bg-gray-800 text-white h-full fixed inset-y-0 left-0 transform transition-all duration-300 ease-in-out z-40 flex flex-col',
            sidebarOpen ? 'w-64' : 'w-16'
        ]">
            <div class="flex items-center p-4 space-x-3">
                <img src="/logo.png" alt="Logo" class="h-8 w-8" />
                <h1 class="poppins-bold" v-if="sidebarOpen">F O R S I T</h1>
            </div>

            <nav class="flex-1 space-y-2 px-2">
                <router-link to="/revenue" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700"
                    active-class="bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 3h2v14H3V3zm4 4h2v10H7V7zm4 2h2v8h-2V9zm4 4h2v4h-2v-4z" />
                    </svg>
                    <span v-if="sidebarOpen">Revenue Analysis</span>
                </router-link>

                <router-link to="/inventory" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700"
                    active-class="bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 3a2 2 0 00-2 2v12h2V5h12v12h2V5a2 2 0 00-2-2H4z" />
                    </svg>
                    <span v-if="sidebarOpen">Inventory Management</span>
                </router-link>

                <router-link to="/register" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700"
                    active-class="bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                    </svg>
                    <span v-if="sidebarOpen">Product Registration</span>
                </router-link>
            </nav>

            <button
                class="absolute top-4 -right-4 bg-gray-800 text-white px-2 py-2 rounded-r hover:bg-gray-700 shadow z-50"
                @click="toggleSidebar">
                <svg v-if="!sidebarOpen" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </aside>

        <main :class="[
            'flex-1 p-6 bg-gray-100 overflow-auto transition-all duration-300 ease-in-out',
            sidebarOpen ? 'ml-64' : 'ml-16'
        ]">
            <router-view />
        </main>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'SidebarNavigation',
    setup() {
        const sidebarOpen = ref(true);
        const toggleSidebar = () => {
            sidebarOpen.value = !sidebarOpen.value;
        };

        const router = useRouter();
        onMounted(() => {
            router.afterEach(() => {
                if (window.innerWidth < 768) {
                    sidebarOpen.value = false;
                }
            });
        });

        return {
            sidebarOpen,
            toggleSidebar,
        };
    },
};
</script>

<style scoped>
a.router-link-exact-active {
    font-weight: bold;
    background-color: #4a5568;
}
</style>