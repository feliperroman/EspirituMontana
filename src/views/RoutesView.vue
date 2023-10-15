<template>
    <div>
        <div class="container">
            <div class="card mt-0" style="background-color: black;">
                <h2 class="text-center mt-0" style="color: white;">Conoce todas las rutas</h2>
                <v-row no-gutters>
                    <v-col cols="3" v-for="(route, index) of routes" class=" d-flex justify-content-around">
                        <Card class=" ml-2 mr-2 mb-5 mt-3" style="border-radius: 20px !important; color: black; position: relative;">
                            <template #header>
                                <!-- <img alt="user header"  :src="displayedImage(route.images[0])" style="object-fit: cover; height: auto;" class="card__img" /> -->
                                <v-img :src="displayedImage(route.images[0])" cover style="object-fit: cover; border-top-right-radius: 20px !important; border-top-left-radius: 20px !important;"></v-img>
                            </template>
                            <template #title>
                                <div class="d-flex justify-content-center">
                                    {{ route?.title ? route.title.toUpperCase() : 'Sin título' }} {{ route?.km ? route.km + 'K' : 'Sin km' }} 
                                <Tag class="ml-2" :value="route.quota_status" :severity="getSeverity(route.quota_status)" />
                                </div>
                          

                                </template>
                            <template #subtitle> {{ route?.location ? route.location : 'Sin ubicación' }} - ${{ route?.price
                                ? route.price.toLocaleString('es-CO') : 'Sin precio' }}</template>
                            <template #content >
                                <v-progress-linear
                                    :model-value="valueProgress(route.quantity_persons, route.assistants?.length)"
                                    color="light-green-darken-4" height="15" striped class="mt-1">
                                    <template v-slot:default="{ value }">
                                        <strong>{{ Math.ceil(value) }}%</strong>
                                    </template>
                                </v-progress-linear>
                                <Tag class="mr-1 mb-1 mt-2" v-for="(date, index) in route.dates" :value="date"
                                    severity="success" />
                          
                                <div class="mt-4">
                                    <p class="mb-5">
                                        {{ route?.description ? route.description : 'Sin descripción' }}
                                    </p>
                                    <!-- <p v-if="route.packages?.length > 0"><strong>Paquetes :</strong> </p>
                                    <Tag class="mr-1 mb-1" v-if="route.packages?.length > 0" v-for="(packag, index) in route.packages" :value="packag.title"
                                        severity="success" /> -->
                                </div>

                                <div class="flex align-items-center justify-content-center ">
                                    <Button rounded @click="viewRoute(route, index)" class="mb-1" icon="pi pi-eye" label="Ver más"
                                        style="color:#5d7800; background-color: white;position: absolute; bottom: 0; border: 1px solid #5d7800;" />
                                </div>
                            </template>

                        </Card>
                    </v-col>
                </v-row>
                <!-- <div class="grid">
                    <div class="col-4" v-for="(route, index) of routes">
                        <Card>
                            <template #header>
                                <v-img :src="displayedImage(route.images[0])" cover style="object-fit: cover;"></v-img>
                            </template>
                            <template #title> {{ route?.title ? route.title : 'Sin título' }}</template>
                            <template #subtitle> {{ route?.location ? route.location : 'Sin ubicación' }} </template>
                            <template #content>
                                <Tag class="mr-3" :value="route.quota_status" :severity="getSeverity(route.quota_status)" />
                                <Tag class="ml-1 mr-1" v-for="(date, index) in route.dates" :value="date"
                                    :severity="getSeverity(route.quota_status)" />
                                <div class="mt-4 mb-4">
                                    <p>
                                        {{ route?.description ? route.description : 'Sin descripción' }}
                                    </p>
                                    <ul>
                                        <li>Transporte</li>
                                        <li>Alimetación</li>
                                        <li>Seguro</li>
                                    </ul>
                                </div>

                                <div class="flex align-items-center justify-content-center">
                                    <Button @click="viewRoute(route, index)" icon="pi pi-eye" label="Ver"
                                        style="color: white" />
                                </div>
                            </template>

                        </Card>
                    </div>
                </div> -->
            </div>

        </div>

    </div>
</template>

<script>

import HttpService from '../services/httpServices'
export default {
    components: {},
    data() {
        return {
            httpService: new HttpService(),
            routes: [],
            url_base: import.meta.env.VITE_RUTA_BACKEND,


        }
    },
    mounted() {
        this.getAllRoutes()
    },
    methods: {
        getSeverity(status) {
            try {
                switch (status) {
                    case 'Disponible':
                        return 'success';

                    case 'Pocos cupos':
                        return 'warning';

                    case 'Finalizada':
                        return 'danger';

                    default:
                        return null;
                }
            } catch (error) {
                console.log("getSeverity ~ error:", error);
            }
        },
        valueProgress(cupos_disponibles, cupos_reservados) {
            try {
                const porcentaje = (cupos_reservados / cupos_disponibles) * 100;
                return Math.round(porcentaje);
            } catch (error) {
                console.log("valueProgress ~ error:", error)
            }
        },
        displayedImage(image) {
            const basePath = this.url_base;
            //OJO ESTO
            if (image) {
                return basePath + image;
            } else {
                return basePath;
            }
        },
        async getAllRoutes() {
            try {
                const get_routes = await this.httpService.getRequest('api/v1/routes/getAll')
                if (get_routes.error) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: get_routes.message, life: 4000 });
                } else if (!get_routes.error && !get_routes.data) {
                    this.$toast.add({ severity: 'info', summary: 'Info', detail: get_routes.message, life: 4000 });
                } else {
                    this.routes = get_routes.data
                }
                console.log("get_routes:", get_routes)
            } catch (error) {
                console.log("getAllRoutes ~ error:", error);
            }
        },
        async viewRoute(ruta, index) {
            try {
                this.$store.dispatch('setViewRoute', ruta);
                this.$router.push('/verRuta');
            } catch (error) {
                console.log("🚀 ~ file: RoutesView.vue:66 ~ viewRoute ~ error:", error)

            }
        }
    }
}
</script>

<style>
.card__img {
    display: block;
    width: 100%;
    height: 13rem;
    object-fit: cover;
}
</style>
