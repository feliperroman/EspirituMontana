<template>

    <div class="layout-topbar" style="background-color: #005693;"> 
        <Toast />
        <router-link to="/" class="layout-topbar-logo">
            <div class="mt-2">
                <!-- <img alt="Logo" :src="topbarImage()" />-->
                <img alt="Letter" src="../../public/images/logoblanco.png" /> 
                <!-- <h2 style="color: white;">Logo</h2> -->
            </div>
            <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle"
                v-tooltip.top="'Menú'" style="color: white;">
                <i class="pi pi-bars"></i>
            </button>
        </router-link>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" v-styleclass="{
            selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
            leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true
        }">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <ul v-if="rol === 'admin'" class="layout-topbar-menu hidden lg:flex origin-top">
            <li>
                <h3 style="padding-top: 3.5%; color: white;">{{ nameUser }}</h3>
            </li>
            <li>
                <button class="p-link layout-topbar-button" style="color: white;" @click="logOut">
                    <i class="pi pi-sign-out"></i>
                    <span>Log Out</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            profileDialog: false,
            nameUser: 'Daniel Ospina',
            rol: localStorage.getItem('rol')
        }
    },
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);

        },
        onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
        topbarImage() {
            return this.$appState.darkTheme ? 'images/pedi2icon.png' : 'images/pedi2icon.png';
        },
        logOut() {
            localStorage.clear();
            // window.location.reload();
            this.$router.push('/loginAdmin');
        }
    },
    computed: {
        darkTheme() {
            return this.$appState.darkTheme;
        }

    }
}
</script>

<style lang="scss" scoped></style>