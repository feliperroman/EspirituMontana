<template>
    <div class="card mt-0"
        :style="$vuetify.display.xs ? 'padding: 0; background-color: black;' : 'background-color: black;'">
        <h3 style="text-align: center; color:white">Próximas rutas</h3>
        <Carousel :value="recent_routes" :numVisible="4" :numScroll="3" :responsiveOptions="responsiveOptions"
            style="margin-bottom: 20px;">
            <template #item="slotProps" class="mb-0" style="margin-bottom: 20px;">
                <div class="border-1 surface-border border-round m-2 text-center  h-100"
                    style="position: relative; border-radius: 20px !important; background-color: white; border: 0px solid #5d7800 !important">
                    <v-img :src="displayedImage(slotProps.data.images[0])" height="250px" cover
                        style="object-fit: cover; border-top-left-radius: 20px !important; border-top-right-radius: 20px !important;"></v-img>
                    <!-- <div class="mb-0" style="background-color: #c5c5c5;">
                        <img :src="displayedImage(slotProps.data.images[0])" :alt="slotProps.data.title"
                            class=" mb-0 mt-1" style="width: auto; height: 250px;" />
                    </div> -->
                    <div class="mt-3 mb-0 px-2 d-flex justify-content-center">
                        <Tag class="mr-2 ml-0" :value="slotProps.data.quota_status"
                            :severity="getSeverity(slotProps.data.quota_status)" style="height: 50%;" />
                        <h5 class="mb-1 mt-0">{{ slotProps.data.title ? slotProps.data.title.toUpperCase() : 'Sin título' }}
                            {{
                                slotProps.data.km ? slotProps.data.km + 'KM' : 'Sin km' }}</h5>
                    </div>
                    <div class="mt-2 mb-0 px-4">
                        <h6 class="text-left ml-1">Duración: {{ slotProps.data.dates ? slotProps.data.dates.length + ' días'
                            : 0 }}</h6>

                    </div>
                    <div class="py-1 px-4 text-left ml-1 mt-0">
                        <p class="mb-4">{{ slotProps.data.preview_description ? slotProps.data.preview_description : 'Sin descripción' }}
                        </p>


                    </div>
      
                    <div class="mt-7 mb-4 d-flex align-items-center justify-content-center">
                        <!-- <u>Conoce más</u> -->
                        <Button v-tooltip.top="'Reservar cupo'" icon="pi pi-heart-fill" rounded
                            class="p-button-outlined" link label="Rodemos" @click="viewRoute(slotProps.data)"
                            style=" color:#5d7800; background-color: white; position: absolute; bottom: 0;" />
                        <!-- <Button v-tooltip.top="'Reservar'" @click="reservarRuta(slotProps.data)" icon="pi pi-file-edit"
                                rounded severity="success" class="" st /> -->
                    </div>
                </div>
            </template>
        </Carousel>
        <div class="mt-0" style="text-align: center;">
            <Button class="p-button-outlined" label="Ver todas las rutas" @click="$router.push('/rutas')" style="    background-color: rgb(34 197 94); color: white;
    border: 1px solid rgb(34 197 94) !important;" />
        </div>

        <!-- DIALOGO PARA VER INFORMACIÓN "MAS DETALLE" DE LA RUTA -->

        <Dialog v-if="showRuta !== false && rutaSeleccionada !== null" v-model:visible="showRuta" modal
            header="Dellate de la ruta" :style="$vuetify.display.xs ? { width: '100%' } : { width: '50vw' }">
            <div class="border-1 surface-border border-round m-2 text-center " v-if="selectedPackage === null">
                <v-carousel cycle interval="4000" show-arrows="hover" height="auto">
                    <v-carousel-item v-for="(img, index) of rutaSeleccionada.images" :key="index" :src="displayedImage(img)"
                        cover style="object-fit: cover;"></v-carousel-item>

                </v-carousel>
                <!-- <div class="mb-2">
                    <img src="../../public/images/urrao.jpg" alt="" class="w-8 shadow-2">
                </div> -->
                <div class="py-5 px-3">
                    <h3>{{ rutaSeleccionada?.title ? rutaSeleccionada.title : 'Sin título' }}</h3>
                    <p>
                        {{ rutaSeleccionada.description ? rutaSeleccionada.description : 'Sin descripción' }}
                    </p>
                    <hr>
                    <h5 v-if="rutaSeleccionada.packages?.length > 0" style="text-align: center;">Paquetes disponibles</h5>
                    <div v-if="rutaSeleccionada.packages?.length > 0" class="mt-4"
                        style="display: flex; justify-content: space-around;">

                        <Button v-for="(pack, index) of rutaSeleccionada.packages" :key="index" :label="pack.title"
                            class="mt-2 ml-2 mr-2" style="    background-color: rgb(0 86 147);
    border: 1px solid rgb(0 86 147); color:white;" @click="seePackage(pack)" />

                    </div>
                    <hr v-if="rutaSeleccionada.packages?.length !== 0">
                    <div v-if="rutaSeleccionada?.includes?.length > 0">
                        <h5 class="mb-3" style="text-align: center;">Incluye</h5>

                        <ul v-for="(item, index) in rutaSeleccionada.includes" :key="index" class="mt-3 ">
                            <li style="list-style-type: none;">{{ item }}</li>
                        </ul>
                    </div>
                    <div class="mt-4" style="display: flex; justify-content: space-around;">
                        <Button v-if="rutaSeleccionada.packages?.length === 0" label="Reservar cupo" class="mt-2 ml-2 mr-2"
                            @click="reservarRuta(rutaSeleccionada)" style="background-color: #005693; color: white" />
                        <Button label="Ver más detalles" @click="viewRoute(rutaSeleccionada)" class="mt-2 ml-2 mr-2"
                            style="background-color: #ffffff; color: #005693;" />
                    </div>
                </div>
            </div>
        </Dialog>

        <Dialog v-if="showPaquete" v-model:visible="showPaquete" modal header="Dellate del paquete"
            :style="{ width: '50vw' }">
            <div class="border-1 surface-border border-round m-2 text-center ">
                <div style="display: flex; justify-content: space-around;">
                    <h4 class="mt-2 "><strong>{{ selectedPackage.title }}</strong> </h4>

                </div>
                <p>El paquete incluye:</p>
                <OrderList v-model="selectedPackage.includes" listStyle="height:auto" dataKey="title"
                    class="mt-2 mb-2 ml-2 mr-2">
                    <template #item="slotProps">
                        <div class="flex flex-wrap p-2 align-items-center gap-3">
                            <!-- <img class="w-4rem shadow-2 flex-shrink-0 border-round"
                                    :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.item.image"
                                    :alt="slotProps.item.name" /> -->
                            <div class="flex-1 flex flex-column gap-2">
                                <span class="font-bold">{{ slotProps.item }}</span>
                                <!-- <div class="flex align-items-center gap-2">
                                        <i class="pi pi-tag text-sm"></i>
                                        <span>{{ slotProps.item.category }}</span>
                                    </div> -->
                            </div>
                            <!-- <span class="font-bold text-900">$ {{ slotProps.item.price }}</span> -->
                        </div>
                    </template>
                </OrderList>
                <p class="ml-1 mr-1">
                    {{ selectedPackage.description ? selectedPackage.description : 'Sin descripción' }}
                </p>
                <h3 style="color: #47ab47;" class="mt-2">COP {{ selectedPackage.price ? '$' +
                    selectedPackage.price.toLocaleString() : '' }}</h3>

                <div class="mt-4 mb-2" style="display: flex; justify-content: center;">
                    <Button label="Reservar" class="mt-2 ml-2 mr-2" @click="reservarRuta(rutaSeleccionada, selectedPackage)"
                        style="background-color: #005693; color: white" />
                    <Button label="Regresar" @click="selectedPackage = null" class="mt-2 ml-2 mr-2"
                        style="background-color: #ffffff; color: #005693;" />
                </div>
            </div>
        </Dialog>

        <!-- DIALOGO PARA RESERVAR LA RUTA -->

        <Dialog v-if="dialogReservar === true && rutaSeleccionada != null" v-model:visible="dialogReservar" modal
            header="Reservar cupo" :style="{ width: '45vw' }">
            <div v-if="client_exist === null" class="d-flex p-fluid">
                <Button label="Soy usuario registrado" class="mt-2 ml-2 mr-2" @click="client_exist = true"
                    style="color: white;" />
                <Button label="Soy usuario nuevo" class="mt-2 ml-2 mr-2" @click="client_exist = false"
                    style="background-color: #ffffff; color: #005693" />
            </div>
            <div class="p-fluid" v-if="client_exist !== null">
                <div v-if="client_exist === false">
                    <div class="field">
                        <label for="name" class="">Nombre</label>
                        <InputText ref="name" id="name" v-model="reserva.first_name" :required="true" autofocus
                            placeholder="Juan" />
                    </div>
                    <div class="field">
                        <label for="last_name" class="">Apellido</label>
                        <InputText ref="last_name" id="last_name" v-model="reserva.last_name" :required="true" autofocus
                            placeholder="Muñoz" />
                    </div>
                    <div class="field">
                        <label for="type_document" class="">Tipo documento</label>
                        <Dropdown ref="type_document" id="type_document" v-model="reserva.type_document"
                            :options="['C.C', 'T.I', 'C.E']" placeholder="Selecciona un tipo" />
                    </div>
                    <div class="field">
                        <label for="document" class="">Documento</label>
                        <InputNumber ref="document" id="document" v-model="reserva.document" :required="true" autofocus
                            placeholder="1025640854" :useGrouping="false" />

                    </div>
                    <div class="field">
                        <label for="email" class="">Email</label>
                        <InputText ref="email" id="email" v-model="reserva.email" :required="true" autofocus
                            placeholder="xxxxx@xxxx.com" />
                    </div>
                    <div class="field">
                        <label for="phone_number" class="">Teléfono</label>
                        <InputNumber ref="phone_number" id="phone_number" v-model="reserva.phone_number" :required="true"
                            autofocus placeholder="0192837456" :useGrouping="false" />
                    </div>
                    <div class="field">
                        <label for="rh" class="">Tipo sangre</label>
                        <Dropdown ref="rh" id="rh" v-model="reserva.rh"
                            :options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                            placeholder="Selecciona un tipo de sangre" />
                    </div>
                    <div class="field">
                        <label for="eps" class="">Eps</label>
                        <!-- <InputText ref="eps" id="eps" v-model="reserva.eps" :required="true" autofocus
                            placeholder="Escriba el nombre de su eps" /> -->
                        <Dropdown filter ref="eps" id="rh" v-model="reserva.eps" :options="epss" optionLabel="name"
                            placeholder="Escriba el nombre de su eps" />
                    </div>
                    <div class="field">
                        <label for="eps" class="">Observaciones de salud</label>
                        <Textarea v-model="reserva.health_observations" rows="5" cols="30" />

                    </div>
                    <div>
                        <Button label="Finalizar" class="mt-2 ml-2 mr-2" @click="validarCampos(reserva, rutaSeleccionada)"
                            style="background-color: #005693; color: white" />
                    </div>
                </div>
                <div v-if="client_exist === true">
                    <div class="field">
                        <label for="name" class="">Email</label>
                        <InputText ref="name" id="name" v-model="client.email" :required="true" autofocus
                            placeholder="xxxx@xxxx.com" />
                    </div>
                    <div class="field">
                        <label for="document" class="">Documento</label>
                        <InputNumber ref="document" id="document" v-model="client.document" :required="true" autofocus
                            placeholder="1025640854" :useGrouping="false" />
                    </div>
                    <div>
                        <Button label="Finalizar" class="mt-2 ml-2 mr-2" @click="validateClientFlieds(client)"
                            style="background-color: #005693; color: white" />
                    </div>
                </div>

            </div>
        </Dialog>

        <!-- DIALOGO PARA LA CANTIDAD DE RESERVAS -->

        <Dialog v-if="dialogCantidadReservas === true" v-model:visible="dialogReservar" modal header="Cantidad de reservas"
            :style="{ width: '45vw' }">
            <div>
                <div class="mb-3 text-center">
                    <h4 clas>Total cupos a reservar: {{ addReservas?.length > 0 ? addReservas.length + 1 : 1 }}</h4>
                </div>
                <div class="d-flex " style="justify-content: center;">
                    <Button label="Pagar" class="mt-2 ml-2 mr-2"
                        @click="reservaUsuarioExistente(client, rutaSeleccionada, this.addReservas)"
                        style="color: white;" />
                    <Button label="Añadir más cupos" class="mt-2 ml-2 mr-2" @click="addCupo()"
                        style="background-color: #ffffff; color: #005693" />
                </div>

            </div>

        </Dialog>

        <!-- DIALOGO PARA RESERVAR LA RUTA -->

        <Dialog v-if="dialogAddReserva === true && rutaSeleccionada != null" v-model:visible="dialogReservar" modal
            header="Añadir reserva" :style="{ width: '45vw' }">
            <div class="p-fluid">
                <div>
                    <div class="field">
                        <label for="name" class="">Nombre</label>
                        <InputText ref="name" id="name" v-model="reserva.first_name" :required="true" autofocus
                            placeholder="Juan" />
                    </div>
                    <div class="field">
                        <label for="last_name" class="">Apellido</label>
                        <InputText ref="last_name" id="last_name" v-model="reserva.last_name" :required="true" autofocus
                            placeholder="Muñoz" />
                    </div>
                    <div class="field">
                        <label for="type_document" class="">Tipo documento</label>
                        <Dropdown ref="type_document" id="type_document" v-model="reserva.type_document"
                            :options="['C.C', 'T.I', 'C.E']" placeholder="Selecciona un tipo" />
                    </div>
                    <div class="field">
                        <label for="document" class="">Documento</label>
                        <InputNumber ref="document" id="document" v-model="reserva.document" :required="true" autofocus
                            placeholder="1025640854" :useGrouping="false" />

                    </div>
                    <div class="field">
                        <label for="email" class="">Email</label>
                        <InputText ref="email" id="email" v-model="reserva.email" :required="true" autofocus
                            placeholder="xxxxx@xxxx.com" />
                    </div>
                    <div class="field">
                        <label for="phone_number" class="">Teléfono</label>
                        <InputNumber ref="phone_number" id="phone_number" v-model="reserva.phone_number" :required="true"
                            autofocus placeholder="0192837456" :useGrouping="false" />
                    </div>
                    <div class="field">
                        <label for="rh" class="">Tipo sangre</label>
                        <Dropdown ref="rh" id="rh" v-model="reserva.rh"
                            :options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                            placeholder="Selecciona un tipo de sangre" />
                    </div>
                    <div class="field">
                        <label for="eps" class="">Eps</label>
                        <!-- <InputText ref="eps" id="eps" v-model="reserva.eps" :required="true" autofocus
                            placeholder="Escriba el nombre de su eps" /> -->
                        <Dropdown filter ref="eps" id="rh" v-model="reserva.eps" :options="epss" optionLabel="name"
                            placeholder="Escriba el nombre de su eps" />
                    </div>
                    <div class="field">
                        <label for="eps" class="">Observaciones de salud</label>
                        <Textarea v-model="reserva.health_observations" rows="5" cols="30" />

                    </div>
                    <div>
                        <Button label="Continuar" class="mt-2 ml-2 mr-2" @click="pushReserva(reserva)"
                            style="background-color: #005693; color: white" />
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script >
import HttpService from '../services/httpServices'
export default {
    data() {
        return {
            epss: [
                { name: 'Sura', code: 'AU' },
                { name: 'Coopsana', code: 'BR' },
                { name: 'Cafesalud', code: 'CN' },
                { name: 'Eps1', code: 'EG' },
                { name: 'Eps2', code: 'FR' },

            ],
            epss: [
                { name: 'Sura', code: 'AU' },
                { name: 'Coopsana', code: 'BR' },
                { name: 'Cafesalud', code: 'CN' },
                { name: 'Eps1', code: 'EG' },
                { name: 'Eps2', code: 'FR' },

            ],
            dialogCantidadReservas: false,
            dialogAddReserva: false,
            addReservas: [],
            new_client: {},
            showRuta: false,
            client_exist: null,
            dialogReservar: false,
            rutaSeleccionada: null,
            client: {},
            reserva: null,
            responsiveOptions: [
                {
                    breakpoint: '1199px',
                    numVisible: 3,
                    numScroll: 3
                },
                {
                    breakpoint: '991px',
                    numVisible: 2,
                    numScroll: 2
                },
                {
                    breakpoint: '767px',
                    numVisible: 1,
                    numScroll: 1
                }
            ],
            httpService: new HttpService(),
            recent_routes: [],
            showPaquete: false,
            url_base: import.meta.env.VITE_RUTA_BACKEND,
            selectedPackage: null,
        }
    },
    mounted() {
        this.getRecentRoute();

    },
    computed: {

    },
    methods: {
        addCupo() {
            try {
                this.dialogAddReserva = true
                this.reserva = {}
            } catch (error) {
                console.log("addCupo ~ error:", error)
            }
        },
        seePackage(packagee) {
            try {
                this.showPaquete = true
                this.selectedPackage = packagee

            } catch (error) {
                console.log("seePackage error:", error)
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
        async getRecentRoute() {
            try {
                const get_routes = await this.httpService.getRequest('api/v1/dashboard/getRecentRoutes')
                if (get_routes.error) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: get_routes.message, life: 4000 });
                } else if (!get_routes.error && !get_routes.data) {
                    this.$toast.add({ severity: 'info', summary: 'Info', detail: get_routes.message, life: 4000 });
                } else {
                    this.recent_routes = get_routes.data
                }
            } catch (error) {
                console.log("getRecentRoute ~ error:", error);
            }
        },
        async validateClientFlieds(cliente) {
            try {
                const validateClient = await this.httpService.postRequest('api/v1/dashboard/validateClient', cliente);
                if (validateClient.error) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: validateClient.message, life: 4000 });
                } else if (!validateClient.error && !validateClient.data) {
                    this.$toast.add({ severity: 'info', summary: 'Info', detail: validateClient.message, life: 4000 });
                } else {
                    // this.dialogReservar = false
                    this.dialogCantidadReservas = true
                }
            } catch (error) {
                console.log("validateClientFlieds ~ error:", error)

            }
        },
        async reservaUsuarioExistente(cliente, ruta, reservas) {
            try {
                if (!cliente && !ruta) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: `Datos personales o ruta seleccionada no existe`, life: 4000 });
                } else {
                    const validateClient = await this.httpService.postRequest('api/v1/dashboard/validateClient', cliente);
                    if (validateClient.error) {
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: validateClient.message, life: 4000 });
                    } else if (!validateClient.error && !validateClient.data) {
                        this.$toast.add({ severity: 'info', summary: 'Info', detail: validateClient.message, life: 4000 });
                    } else {
                        this.$toast.add({ severity: 'success', summary: 'Exitoso', detail: validateClient.message, life: 4000 });
                        let data_to_send
                        if (this.selectedPackage !== null) {
                            let paquetes = ruta.packages
                            let result = paquetes.filter(pa => pa.title === this.selectedPackage.title)
                            if (result.length > 0) {
                                data_to_send = {
                                    client: cliente,
                                    route_id: ruta._id,
                                    route: ruta,
                                    package: result[0],
                                    more_books: reservas?.length > 0 ? reservas : null
                                }
                            } else {
                                this.$toast.add({ severity: 'info', summary: 'Info', detail: 'No fue posible asignar el paquete', life: 4000 });
                            }
                        } else {
                            data_to_send = {
                                client: cliente,
                                route_id: ruta._id,
                                route: ruta,
                                more_books: reservas?.length > 0 ? reservas : null
                            }
                        }
                        this.$store.dispatch('setRouteBuy', data_to_send);
                        this.dialogReservar = false
                        this.rutaSeleccionada = null
                        this.reserva = null
                        this.client_exist = null
                        this.showRuta = null
                        this.$router.push('/payment')
                    }
                }
            } catch (error) {
                console.log("reservaUsuarioExistente ~ error:", error);
            }
        },
        async showPasarela() {
            try {

            } catch (error) {
                console.log("showPasarela error:", error)
            }
        },
        async crearReserva(reserva, ruta) {
            try {
                if (!reserva && !ruta) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: `Datos personales o ruta seleccionada no existe`, life: 4000 });
                } else {
                    const create_client = await this.httpService.postRequest('api/v1/clients/create', reserva)
                    if (create_client.error) {
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: create_client.message, life: 4000 });
                    } else if (!create_client.error && !create_client.data) {
                        this.$toast.add({ severity: 'info', summary: 'Info', detail: create_client.message, life: 4000 });
                    } else {
                        this.$toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuario creado correctamente', life: 4000 });
                        let data_to_send
                        if (this.selectedPackage !== null) {
                            let paquetes = ruta.packages
                            let result = paquetes.filter(pa => pa.title === this.selectedPackage.title)
                            if (result.length > 0) {
                                data_to_send = {
                                    client: reserva,
                                    route: ruta,
                                    package: result[0],

                                }
                            } else {
                                this.$toast.add({ severity: 'info', summary: 'Info', detail: 'No fue posible asignar el paquete', life: 4000 });
                            }
                        } else {
                            data_to_send = {
                                client: reserva,
                                route: ruta,
                            }
                        }
                        this.$store.dispatch('setRouteBuy', data_to_send)
                        this.client = {
                            email: create_client.data.email,
                            document: create_client.data.document
                        }
                        this.dialogCantidadReservas = true

                        // this.$router.push('/payment')
                    }


                    // const create_reserva = await this.httpService.postRequest('api/v1/dashboard/createPrebookedNew', data_to_send)
                    // if (create_reserva.error) {
                    //     this.$toast.add({ severity: 'error', summary: 'Error', detail: create_reserva.message, life: 4000 });
                    // } else if (!create_reserva.error && !create_reserva.data) {
                    //     this.$toast.add({ severity: 'info', summary: 'Info', detail: create_reserva.message, life: 4000 });
                    // } else {
                    //     this.$toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Ruta reservada con éxito', life: 4000 });
                    //     this.dialogReservar = false
                    //     this.rutaSeleccionada = null
                    //     this.reserva = null
                    //     this.client_exist = null
                    //     this.showRuta = null
                    // }
                }
            } catch (error) {
                console.log("crearReserva ~ error:", error);
            }
        },
        async showRutaEvent(ruta) {
            try {
                this.showRuta = true
                this.rutaSeleccionada = ruta
                this.selectedPackage = null
            } catch (error) {
                console.log("showRutaEvent ~ error:", error);
            }

        },
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
        pushReserva(campos) {
            try {
                if (campos) {
                    let campos_null = [];
                    const keys = [
                        'document',
                        'type_document',
                        'first_name',
                        'last_name',
                        'phone_number',
                        'email',
                        'rh',
                        'eps',
                    ]
                    keys.forEach(key => {
                        if (!campos[key]) {
                            campos_null.push(key)
                        }
                    })
                    if (campos_null?.length > 0) {
                        campos_null.forEach(campo => {
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: `El campo ${campo} es obligatorio`, life: 4000 });
                        });
                    } else {
                        this.addReservas.push(campos)
                        this.dialogAddReserva = false
                        this.reserva = {}
                    }
                }
            } catch (error) {
                console.log("pushReserva ~ error:", error)
            }
        },

        async validarCampos(campos, ruta) {
            try {
                if (campos) {
                    let campos_null = [];
                    const keys = [
                        'document',
                        'type_document',
                        'first_name',
                        'last_name',
                        'phone_number',
                        'email',
                        'rh',
                        'eps',
                    ]
                    keys.forEach(key => {
                        if (!campos[key]) {
                            campos_null.push(key)
                        }
                    })
                    if (campos_null?.length > 0) {
                        campos_null.forEach(campo => {
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: `El campo ${campo} es obligatorio`, life: 4000 });
                        });
                    } else {
                        this.crearReserva(campos, ruta)
                    }
                }
            } catch (error) {
                console.log("validarCampos ~ error:", error);
            }
        },
        async reservarRuta(ruta, paquete) {
            try {
                this.reserva = {}
                this.dialogReservar = true
                this.rutaSeleccionada = ruta
                this.client_exist = null
            } catch (error) {
                console.log("reservarRuta ~ error:", error);
            }
        },
        viewRoute(ruta) {
            try {
                this.$store.dispatch('setViewRoute', ruta);
                this.$router.push('/verRuta');

            } catch (error) {
                console.log("viewRoute ~ error:", error)

            }
        }
    }
}

</script>

<style scoped >
.mob-carousel-item {

    .mob-carousel-img-container {
        height: 100%;
        width: 100%;
        display: grid;
        justify-items: center;
        align-items: center;

        .mob-carousel-img {
            align-self: center;
            height: auto;
            max-height: 100%;
        }
    }
}</style>