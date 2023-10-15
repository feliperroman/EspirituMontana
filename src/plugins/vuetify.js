// import Vue from "vue";
// import Vuetify from "vuetify/lib/framework";

// Vue.use(Vuetify);

// export default new Vuetify({
//   theme: {
//     themes: {
//       light: {
//         secondary: "#f6e8ff",
//         white: "#fbfbfc",
//       },
//     },
//   },
//   // breakpoint: {
//   //   thresholds: {
//   //     xs: 400,
//   //     sm: 576,
//   //     md: 768,
//   //     lg: 992,
//   //     xl: 1200,
//   //   },
//   //   scrollBarWidth: 24,
//   // },
// });

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  breakpoint: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  },
})
