<template>
    <div>
        <div class="container" v-if="route">
            <div class="card mt-0">
                <Button icon="pi pi-arrow-circle-left"  class="p-button-rounded  p-button-text" v-tooltip.top="'Regresar'"
                    @click="$router.push('/rutas')" style="color: red; float: right;" />
                <v-row no-gutters>
                    <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                        <div>
                            <v-carousel cycle interval="4000"  show-arrows="hover"
                                style="object-fit: cover; max-width: 80%; margin-left: auto; margin-right: auto; border-radius: 20px !important;">
                                <template v-slot:prev="{ props }">
                                    <v-btn variant="elevated" @click="props.onClick" icon="pi pi-angle-left"></v-btn>
                                </template>
                                <template v-slot:next="{ props }">
                                    <v-btn variant="elevated" icon="pi pi-angle-right" @click="props.onClick"></v-btn>
                                </template>
                                <v-carousel-item v-for="(img, index) of route.images" :key="index"
                                    :src="displayedImage(img)" cover
                                    style="object-fit: cover; max-width: 80% ; margin-left: auto; margin-right: auto; border-radius: 20px !important;"></v-carousel-item>

                            </v-carousel>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                        <h2 class="text-center">{{ route.title ? route.title.toUpperCase() : 'Sin título' }}</h2>
                        <v-row class="mt-3 mb-0">
                            <v-col cols="3" style="display: flex;">
                                <p><strong>Nivel: </strong>{{ route.level }}</p>
                            </v-col>
                            <v-col cols="3" style="display: flex;">
                                <p><strong>Cupos: </strong>{{ cuposdisponibles(route.quantity_persons, route.assistants) }}
                                </p>
                            </v-col>
                            <v-col cols="3" style="display: flex;">
                                <p><strong>Km: </strong>{{ route.km }}</p>
                            </v-col>
                            <v-col cols="3" style="display: flex;">
                                <p><strong>Precio: </strong>{{ route.price ? '$'+route.price.toLocaleString('es-CO') : 'Sin precio' }}</p>
                            </v-col>
                        </v-row>
                        <div class="mt-0 mb-4">
                            <v-progress-linear
                                :model-value="valueProgress(route.quantity_persons, route.assistants?.length)"
                                color="light-green-darken-4" height="15" striped class="mt-0">
                                <template v-slot:default="{ value }">
                                    <strong>{{ Math.ceil(value) }}%</strong>
                                </template>
                            </v-progress-linear>
                        </div>
                        <div class="mb-4" v-if="route.packages?.length > 0" >
                            <p class="text-center mt-2 mb-4"><strong>Selecciona un paquete:</strong></p>
                            <div class="mt-1 mb-4" style="display: flex; justify-content: space-around;">
                                <Button v-for="(pack, index) of route.packages" :key="index" :label="pack.title"
                                    icon="pi pi-eye" class="mt-2 ml-2 mr-2 p-button-outlined" rounded  
                                    style="background-color: rgb(34 197 94)border: 0px solid rgb(34 197 94);color: rgb(93, 120, 0); margin: 0"
                                    @click="seePackage(pack)" />
                            </div>
                        </div>
                        <div class=" mb-4">
                            <p class="mt-7">{{ route.description ? route.description : 'Sin descripción' }}</p>
                        </div>
                      
                        <div class="d-flex mt-3" >
                            <p class="mt-1 mr-2"><strong>Fechas: </strong></p>
                            <Tag class="mr-1 mb-1 " v-for="(date, index) in route.dates" :value="date" severity="success" />
                            
                        </div>
                        <div class="mt-4" style="float: right;">
                                <Button icon="pi pi-whatsapp" rounded  style="    color: rgb(255 255 255);
    margin: 0px;
    background-color: rgb(34, 197, 94);
    border: 1px solid rgb(34, 197, 94);">

                                </Button>
                            </div>
              
                        <p v-if="route?.includes?.length > 0" class="text-center mb-0 mt-2"><strong>Incluye:</strong></p>


                        <div class="d-flex justify-content-center" v-if="route?.includes?.length > 0">

                            <ul v-for="(item, index) in route.includes" :key="index" class="mt-3  ">
                                <li class="text-center mr-1 ml-1" style="list-style-type: none;">{{ item }}</li>
                            </ul>
                        </div>
                       
                        <div v-if="!route.packages?.length" class="d-flex mt-5" style="justify-content: space-between;">
                            <Button @click="viewRoute(route, index)" icon="pi pi-eye" label="Regresar"
                                style="color: rgb(0 86 147); background-color: white;" />
                            <Button @click="viewRoute(route, index)" icon="pi pi-eye" label="Reservar"
                                style="color: white" />
                        </div>
                    </v-col>
                </v-row>
                <!-- <div class="grid d-flex justify-content-around">
                    <div class="col-4" >
                        <Card>
                            <template #header>
                                
                            </template>
                            <template #title> {{ route?.title ? route.title : 'Sin título' }}</template>
                            <template #subtitle> {{ route?.location ? route.location : 'Sin ubicación' }} </template>
                            <template #content>
                                <p>
                                    {{ route?.description ? route.description : 'Sin descripción' }}
                                </p>
                                <div class="flex align-items-center justify-content-center">
                            </div>
                            </template>
                           
                        </Card>
                    </div>
                </div> -->
            </div>

            <Dialog v-if="showPaquete" v-model:visible="showPaquete" modal :header="''" :closable="false"  :closeOnEscape="true"
                :style="{ width: '50vw' }">
                <div class=" m-2 text-center ">
                    <div style="display: flex; justify-content: space-between;">
                        <h4 class="mt-0 "><strong>{{ selectedPackage.title ? 'PAQUETE ' + selectedPackage.title.toUpperCase()  : 'Sin título' }}</strong> </h4>
                        <Tag class="ml-2  " :value="selectedPackage.price ? 'RUEDA POR COP $' +
                        selectedPackage.price.toLocaleString() : ''" :severity="'success'" style="height: 5vh;
    width: 43vh;
    font-size: 3vh;" />
                    </div>
                  
                    <p class="ml-1 mr-1 mt-0 mb-3 text-left">
                        {{ selectedPackage.description ? selectedPackage.description : 'Sin descripción' }}
                    </p>
                    <div class="ml-1 mr-1 mb-3 ">
                        <p class="text-left font-bold mt-0 mb-0">El paquete incluye:</p>
                                    <span v-for="(item, index) of selectedPackage.includes" class="">{{  item ? (index+1) !== selectedPackage.includes?.length ? item+' - ' : item : '' }}</span>
                                </div>
                   
                   

                    <div class="mt-7 mb-2" style="display: flex; justify-content: space-around;">
                        <Button label="Reservar" class=""  @click="reservarRuta(route, selectedPackage)"
                            style="background-color: rgb(34, 197, 94); color: white;height: 50%; border: 1px solid rgb(34, 197, 94)" />
                            <Button label="Regresar" class=""  @click="showPaquete = false"
                            style="background-color: white; color: rgb(34, 197, 94);height: 50%; border: 1px solid rgb(34, 197, 94)" />
                 
                    </div>
                </div>
            </Dialog>

            <!-- DIALOGO PARA RESERVAR LA RUTA -->

            <Dialog v-if="dialogReservar === true && route != null" v-model:visible="dialogReservar" modal
                header="Reservar cupo" :style="{ width: '45vw' }">
                <div v-if="client_exist === null" class="d-flex p-fluid">
                    <Button label="Soy usuario registrado" class="mt-2 ml-2 mr-2" @click="client_exist = true"
                        style="color: white; background-color: rgb(34, 197, 94) ; border: 1px solid rgb(34, 197, 94);" />
                    <Button label="Soy usuario nuevo" class="mt-2 ml-2 mr-2" @click="client_exist = false"
                        style="background-color: #ffffff; color: rgb(34, 197, 94); border: 1px solid rgb(34, 197, 94);" />
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
                            <InputNumber ref="phone_number" id="phone_number" v-model="reserva.phone_number"
                                :required="true" autofocus placeholder="0192837456" :useGrouping="false" />
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
                                <Dropdown  filter  ref="eps" id="rh" v-model="reserva.eps"
                                :options="epss" optionLabel="name"
                            placeholder="Escriba el nombre de su eps" />
                        </div>
                        <div class="field">
                            <label for="eps" class="">Observaciones de salud</label>
                            <Textarea v-model="reserva.health_observations" rows="5" cols="30" />

                        </div>
                        <div>
                            <Button label="Finalizar" class="mt-2 ml-2 mr-2" @click="validarCampos(reserva, route)"
                                style="color: white; background-color: rgb(34, 197, 94) ; border: 1px solid rgb(34, 197, 94);" />
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
                                style="color: white; background-color: rgb(34, 197, 94) ; border: 1px solid rgb(34, 197, 94);" />
                        </div>
                    </div>

                </div>
            </Dialog>

            <!-- DIALOGO PARA LA CANTIDAD DE RESERVAS -->

            <Dialog v-if="dialogCantidadReservas === true" v-model:visible="dialogReservar" modal
                header="Cantidad de reservas" :style="{ width: '45vw' }">
                <div>
                    <div class="mb-3 text-center">
                        <h4 clas>Total cupos a reservar: {{ addReservas?.length > 0 ? addReservas.length + 1 : 1 }}</h4>
                    </div>
                    <div class="d-flex " style="justify-content: center;">
                        <Button label="Pagar" class="mt-2 ml-2 mr-2"
                            @click="reservaUsuarioExistente(client, route, this.addReservas)" style="color: white; background-color: rgb(34, 197, 94) ; border: 1px solid rgb(34, 197, 94);" />
                        <Button label="Añadir más cupos" class="mt-2 ml-2 mr-2" @click="addCupo()"
                            style="background-color: #ffffff; color: rgb(34, 197, 94); border: 1px solid rgb(34, 197, 94);" />
                    </div>

                </div>

            </Dialog>

            <!-- DIALOGO PARA RESERVAR LA RUTA -->

            <Dialog v-if="dialogAddReserva === true && route != null" v-model:visible="dialogReservar" modal
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
                            <InputNumber ref="phone_number" id="phone_number" v-model="reserva.phone_number"
                                :required="true" autofocus placeholder="0192837456" :useGrouping="false" />
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
                                <Dropdown filter  ref="eps" id="rh" v-model="reserva.eps"
                            :options="epss" optionLabel="name"
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

    </div>
</template>

<script>
import HttpService from '../services/httpServices'
export default {
    components: {},
    data() {
        return {
            epss: [
                { name: 'Sura', code: 'AU' },
                { name: 'Coopsana', code: 'BR' },
                { name: 'Cafesalud', code: 'CN' },
                { name: 'Eps1', code: 'EG' },
                { name: 'Eps2', code: 'FR' },
               
            ],
            httpService: new HttpService(),
            route: this.$store.state.viewRoute,
            url_base: import.meta.env.VITE_RUTA_BACKEND,
            showPaquete: false,
            selectedPackage: null,
            reserva: {},
            dialogReservar: false,
            client_exist: null,
            client: {},
            addReservas: [],
            dialogCantidadReservas: false,
            dialogAddReserva: false

        }
    },
    created() {
        if (!this.route || this.route === undefined) {
            this.$router.push('/');
        }
    },
    mounted() {


    },
    methods: {
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

        addCupo() {
            try {
                this.dialogAddReserva = true
                this.reserva = {}
            } catch (error) {
                console.log("addCupo ~ error:", error)
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
                        this.$router.push('/payment')
                    }
                }
            } catch (error) {
                console.log("reservaUsuarioExistente ~ error:", error);
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
                    }
                }
            } catch (error) {
                console.log("crearReserva ~ error:", error);
            }
        },
        validarCampos(campos, ruta) {
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
        async reservarRuta(ruta, paquete) {
            try {
                this.reserva = {}
                this.dialogReservar = true
                this.client_exist = null
            } catch (error) {
                console.log("reservarRuta ~ error:", error);
            }
        },
        seePackage(paquete) {
            try {
                this.showPaquete = true
                this.selectedPackage = paquete

            } catch (error) {
                console.log("seePackage ~ error:", error);
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
        valueProgress(cupos_disponibles, cupos_reservados) {
            try {
                const porcentaje = (cupos_reservados / cupos_disponibles) * 100;
                return Math.round(porcentaje);
            } catch (error) {
                console.log("valueProgress ~ error:", error)
            }
        },
        cuposdisponibles(dispo, asistentes) {
            try {
                let result = dispo - asistentes?.length
                return Math.round(result);

            } catch (error) {
                console.log("cuposdisponibles ~ error:", error)

            }
        }

    }
}
</script>

<style></style>
