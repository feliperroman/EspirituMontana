<template>
  <Toast />
  <a href="https://api.whatsapp.com/send?phone=7982325518&text=Hello, guruji customer care" class="float" target="_blank">
<i class="pi pi-whatsapp my-float"></i>
</a>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>
    <div>
      <v-carousel cycle interval="4000" v-if="$route.path == '/'" src="../../public/images/es.jpg" hide-delimiters height="100vh">
        <template v-slot:prev="{ props }">
          <v-btn variant="elevated" @click="props.onClick" icon="pi pi-angle-left"></v-btn>
        </template>
        <template v-slot:next="{ props }">
          <v-btn variant="elevated" icon="pi pi-angle-right" @click="props.onClick"></v-btn>
        </template>
        <v-carousel-item :src="carousel1" cover></v-carousel-item>
        <v-carousel-item :src="carousel2" cover></v-carousel-item>
        <v-carousel-item :src="carousel3" cover></v-carousel-item>
      </v-carousel>
    </div>
    <div class="layout-main-container wrapper img-back">

      <div class="layout-main ">
        <router-view />
      </div>
      <AppFooter />
    </div>

    <transition name="layout-mask">
      <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
    </transition>
  </div>
</template>

<script>
import carousel1 from '../public/images/es.jpg'
import carousel2 from './assets/imgs/carousel2.jpg'
import carousel3 from './assets/imgs/carousel3.jpg'

import AppTopBar from './components/Header.vue';
import AppMenu from './AppMenu.vue';
import AppFooter from './AppFooter.vue';

export default {
  emits: ['change-theme'],
  data() {
    return {
      layoutMode: 'static',
      carousel1: carousel1,
      carousel2: carousel2,
      carousel3: carousel3,
      staticMenuInactive: true,
      overlayMenuActive: true,
      mobileMenuActive: true,
      menu: [
        {
          items: [
            { label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/', visible: () => this.hideMenu() }
          ]
        },
        {
          items: [
            {
              label: 'Rutas', icon: 'pi pi-fw pi-chart-line', to: '/rutas',
              visible: () => this.hideMenu()
            },
            {
              label: 'Quienes Somos', icon: 'pi pi-fw pi-question', to: '/quienesSomos',
              visible: () => this.hideMenu()
            },
            {
              label: 'Galería', icon: 'pi pi-fw pi-user', visible: () => this.hideMenu(),

            },
            // {
            //   label: 'Contáctanos', icon: 'pi pi-fw pi-users', to: '/dashboard2',
            //   visible: () => this.hideMenu()
            // },
            // {
            //   label: 'Comentarios', icon: 'pi pi-fw pi-send', to: '#carousel_setion',
            //   visible: () => this.hideMenu()
            // },
            {
              label: 'Rutas', icon: 'pi pi-fw pi-chart-line', visible: () => this.isAdmin(),
              items: [
                {
                  label: 'Crear ruta', icon: 'pi pi-fw pi-globe', to: '/crearRuta',
                },
                {
                  label: 'Ver todas', icon: 'pi pi-fw pi-book', to: '/verRutas',
                },
              ]
            },
            {
              label: 'Clientes', icon: 'pi pi-fw pi-user', visible: () => this.isAdmin(),
              items: [
                {
                  label: 'Crear cliente', icon: 'pi pi-fw pi-plus', to: '/crearCliente',
                },
                {
                  label: 'Ver clientes', icon: 'pi pi-fw pi-book', to: '/verClientes',
                },
              ]
            },
            {
              label: 'Galería', icon: 'pi pi-fw pi-user', visible: () => this.isAdmin(),

            },

            // {
            //   label: 'Marcas', icon: 'pi pi-fw pi-th-large', to: '/marca',
            //   visible: () => this.hideMenu()
            // },
            // {
            //   label: 'Marcas PQC', icon: 'pi pi-fw pi-qrcode', to: '/marcasPqc', visible: () => this.hideMenu(),
            // },
            // {
            //   label: 'LE en sistema', icon: 'pi pi-fw pi-server', to: '/LEinSystem',
            //   visible: () => this.hideMenu()
            // },
            // {
            //   label: 'Despachos', icon: 'pi pi-fw pi-car', to: '/despachoConsultar',
            //   visible: () => this.hideMenu()

            // },
            // {
            //   label: 'Pendientes', icon: 'pi pi-fw pi-calendar',
            //   visible: () => this.hideMenu(),
            //   items: [
            //     {
            //       label: 'Pendientes Globales', icon: 'pi pi-fw pi-globe', to: '/pendientesGlobales',


            //     },
            //     {
            //       label: 'Pendientes Lista', icon: 'pi pi-fw pi-book', to: '/pendientesLista',


            //     },
            //     {
            //       label: 'Totales por marca', icon: 'pi pi-fw pi-th-large', to: '/totalesMarca',


            //     },
            //     {
            //       label: 'Pendientes Sku', icon: 'pi pi-fw pi-sort-alpha-down', to: '/pendientesSku',


            //     },
            //   ]
            // },
            // {
            //   label: 'PQC/ESP', icon: 'pi pi-fw pi-chart-bar',
            //   items: [
            //     {
            //       label: 'Crear', icon: 'pi pi-fw pi-box', to: '/crearPqc',

            //     },
            //     {
            //       label: 'Ver', icon: 'pi pi-fw pi-eye',
            //       items: [
            //         { label: `PRE-PQC/ESP's`, icon: 'pi pi-fw pi-inbox', to: '/allPrePqc' },
            //         { label: `PQC/ESP's`, icon: 'pi pi-fw pi-check-square', to: '/allPqc' },
            //         { label: `Listas de empaque`, icon: 'pi pi-fw pi-check-square', to: '/lepqc', visible: () => this.hideMenu() }
            //       ]
            //     }

            //   ]
            // },
            // {
            //   label: 'Sobrantes', icon: 'pi pi-fw pi-search-minus', to: '/sobrantesReport',
            //   visible: () => this.hideMenu()
            //   // items: [
            //   //     {
            //   //         label: 'Sobrantes Todos', icon: 'pi pi-fw pi-shopping-bag', to: '/sobrantesAll',

            //   //     },
            //   //     {
            //   //         label: 'Sobrantes Reporte', icon: 'pi pi-fw pi-shopping-bag', to: '/sobrantesReport',

            //   //     },
            //   // ]
            // },
            // {
            //   label: 'Pronostico', icon: 'pi pi-fw pi-cloud', to: '/pronosticos',
            //   visible: () => this.hideMenu()
            // },
            // {
            //   label: 'Cierres', icon: 'pi pi-fw pi-times', to: '/cierres',
            //   visible: () => this.hideMenu()
            // },
            // {
            //   label: 'Usuarios', icon: 'pi pi-fw pi-user-plus', to: '/usuarios',
            //   visible: () => this.isUserRole()
            // },
            // {
            //   label: 'Simulación', icon: 'pi pi-fw pi-sync', to: '/simulacion',
            //   visible: () => this.hideMenu()
            // },
          ]
        },
      ]
    }
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    }
  },
  methods: {
    isAdmin() {
      try {
        const role = localStorage.getItem('rol')
        if (role === 'admin') {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("isAdmin error:", error);
      }
    },
    hideMenu() {
      const role = localStorage.getItem('rol')
      if (role === 'admin') {
        return false;
      } else {
        return true;
      }
    },

    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === 'overlay') {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        }
        else if (this.layoutMode === 'static') {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      }
      else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    addClass(element, className) {
      if (element.classList)
        element.classList.add(className);
      else
        element.className += ' ' + className;
    },
    removeClass(element, className) {
      if (element.classList)
        element.classList.remove(className);
      else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === 'static')
          return !this.staticMenuInactive;
        else if (this.layoutMode === 'overlay')
          return this.overlayMenuActive;
      }

      return true;
    }
  },
  computed: {
    containerClass() {
      return ['layout-wrapper', {
        'layout-overlay': this.layoutMode === 'overlay',
        'layout-static': this.layoutMode === 'static',
        'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
        'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
        'layout-mobile-sidebar-active': this.mobileMenuActive,
        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
        'p-ripple-disabled': this.$primevue.config.ripple === false
      }];
    },
    logo() {
      return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
    }
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, 'body-overflow-hidden');
    else
      this.removeClass(document.body, 'body-overflow-hidden');
  },
  components: {
    'AppTopBar': AppTopBar,
    'AppMenu': AppMenu,
    'AppFooter': AppFooter,
  }
}
</script>

<style lang="scss">
.im {

  width: 100% !important;
  height: 100% !important;

}

.float{
  position: fixed;
    width: 60px;
    height: 56px;
    bottom: 22px;
    left: 18px;
    background-color: #25d366;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    font-size: 30px;
    /* box-shadow: 2px 2px 3px #999; */
    z-index: 100;
}

.my-float{
	margin-top:16px;
}

body {
  background-color: black
  // background-repeat: repeat;
  // background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.663) 0%, rgba(0, 0, 0, 0.664) 35%, rgba(0, 0, 0, 0.666) 100%), url(/public/images/Rutas/ruta_jardin.jpg) !important;

}



@import './App.scss';



@media screen and (max-width : 425px) {


  .wrapper {
    display: flex !important;
    flex-direction: column !important;
    min-height: 100vh !important;
    justify-content: space-between !important;
    padding: 2rem 2rem 2rem 4rem !important;
    transition: margin-left 0.2s !important;
    padding-left: 0rem !important;
    padding-right: 0rem !important;
  }



}
</style>

