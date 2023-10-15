<template>
    <div>
        <div class="container mt-12">
            <div class="card mt-0">
                <h1 style="text-align: center;">Rutas</h1>
                <DataTable :filters="filtersRoutes" filterDisplay="menu" ref="dt" v-model:filters="filtersRoutes"
                    :value="routes">
                    <template #header>
                        <div class="mt-2 mb-2" style="display: flex;">
                            <span class="p-input-icon-left ">
                                <i class="pi pi-search" />
                                <InputText v-model="filtersRoutes['global'].value" placeholder="Buscar..."
                                    v-tooltip.top="'Buscador'" class="buttonDtResponsive" />
                            </span>
                            <Button style="color:#5d7800; background-color: white;" label="Exportar"
                                class="ms:w-full p-button-outlined mr-2 ml-2 buttonDtResponsive" @click="exportData(routes)"
                                v-tooltip.top="'Exportar datos'" />
                        </div>

                    </template>
                    <Column :sortable="true" field="title" header="Ruta"></Column>
                    <Column :sortable="true" field="km" header="KM"></Column>
                    <Column :sortable="true" field="price" header="Precio"></Column>
                    <Column field="status" header="Estado">

                        <template #body="slotProps">
                            <div class="text-center">
                                {{ slotProps.data.status === 'active' ? 'Activa' : '' }}
                            </div>
                        </template>
                    </Column>
                    <Column field="assistants" header="Reservas">
                        <template #body="slotProps">
                            <div class="text-center">
                                {{ slotProps.data.assistants ? slotProps.data.assistants.length : 0 }}
                            </div>
                        </template>
                    </Column>
                    <Column field="ratingres" header="Cupos restantes">
                        <template #body="slotProps">
                            <div class="text-center">
                                {{ cuposRestantes(slotProps.data) }}
                            </div>
                        </template>
                    </Column>
                    <Column field="quantity_persons" header="Cupos total"></Column>
                    <Column field="packages" header="Paquetes">
                        <template #body="slotProps">
                            <div class="text-center">
                                {{ slotProps.data.packages.length }}
                            </div>
                        </template>
                    </Column>
                    <Column field="" header="Acciones" class="text-center">
                        <template #body="slotProps">
                            <div class="text-center">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-text"
                                    @click="openEdit(slotProps.data)" v-tooltip.top="'Editar'" style="color: #2D5F93;" />
                                <Button icon="pi pi-trash" class="p-button-rounded  p-button-text"
                                    v-tooltip.top="'Eliminar'" @click="showModalEliminarPqc(slotProps.data)"
                                    style="color: #2D5F93" />
                                <Button icon="pi pi-eye" class="p-button-rounded  p-button-text"
                                    v-tooltip.top="'Ver reservas'" @click="verReservas(slotProps.data)"
                                    style="color: #2D5F93" />
                            </div>
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-if="dialogEdit === true && route_edit !== null" v-model:visible="dialogEdit" modal
                    header="Editar cliente" :style="{ width: '50vw' }">
                    <div class="p-fluid">
                        <div class="field">
                            <label>Título</label>
                            <InputText v-model="route_edit.title" :required="true" autofocus
                                placeholder="Escriba el título" />
                        </div>
                        <div class="field">
                            <label>Descripción</label>
                            <Textarea v-model="route_edit.description" rows="5" cols="30" />
                        </div>
                        <div class="field">
                            <label>Kilómetros</label>
                            <InputText v-model="route_edit.km" :required="true" autofocus placeholder="Escriba los km" />
                        </div>
                        <div class="field">
                            <label>Locación</label>
                            <InputText v-model="route_edit.location" :required="true" autofocus
                                placeholder="Escriba la locación" />
                        </div>
                        <div class="field">
                            <label>Fechas</label>
                            <Calendar v-model="date" />
                            <Button style="background-color: #0088ff; color: white;" label="" icon="pi pi-plus"
                                class="ms:w-full p-button-outlined mr-2 buttonDtResponsive" @click="addDate(date)"
                                v-tooltip.top="'Agregar fecha'" />
                            <div class="mt-1">
                                <v-badge v-if="route_edit.dates?.length > 0" v-for="(date, index) of route_edit.dates"
                                    color="success" :content="date" :key="index" inline @click="deleteDate(index)">

                                </v-badge>

                            </div>
                        </div>
                        <div class="field">
                            <label>Cantidad total</label>
                            <InputText v-model="route_edit.quantity_persons" :required="true" autofocus
                                placeholder="Escriba la cantidad" />
                        </div>
                        <div class="field">
                            <label>Nivel</label>
                            <InputText v-model="route_edit.level" :required="true" autofocus
                                placeholder="Escriba el nivel" />
                        </div>
                        <div class="field">
                            <label>Precio</label>
                            <InputNumber v-model="route_edit.price" :required="true" autofocus
                                placeholder="Escriba el precio" />
                        </div>
                        <div class="field">
                            <label>Paquetes</label>
                            <Button style="background-color: #0088ff; color: white;" label="Agregar paquete"
                                icon="pi pi-plus" class="ms:w-full p-button-outlined mr-2 ml-2 " @click="createPackge()"
                                v-tooltip.top="'Agregar fecha'" />
                            <div>
                                <Button v-if="route_edit.packages?.length > 0" v-for="(item, index) of route_edit.packages"
                                    :key="index" style="background-color: #2f9745; color: white;" :label="item.title"
                                    icon="pi pi-eye" class="ms:w-full p-button-outlined mr-2 ml-2  "
                                    @click="seePackage(item)" v-tooltip.top="'Agregar ruta nueva'" />
                            </div>
                        </div>
                        <!--   <div class="field">
                    <label>Correo electronico</label>
                    <InputText v-model="route_edit.email" :required="true" autofocus placeholder="Escriba el correo" />
                </div>
                <div class="field">
                    <label>Documento</label>
                    <InputNumber v-model="route_edit.document" :required="true" autofocus :useGrouping="false"
                        placeholder="Escriba el documento" />
                </div>
                <div class="field">
                    <label style="text-align: center;">Teléfono</label>
                    <InputNumber v-model="route_edit.phone_number" :useGrouping="false" :required="true" autofocus
                        inputId="integeronly" placeholder="Escriba el teléfono" />

                </div>
                <div class="field">
                    <label style="text-align: center;">EPS</label>
                    <InputText v-model="route_edit.eps" :required="true" autofocus placeholder="Escriba la eps" />
                </div>
                <div class="field">
                    <label>Tipo sangre</label>
                    <Dropdown ref="rh" id="rh" v-model="clientEdit.rh"
                        :options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                        placeholder="Selecciona un tipo de sangre" />
                </div>
                <div class="field">
                    <label>Tipo documento</label>
                    <Dropdown ref="type_document" id="type_document" v-model="clientEdit.type_document"
                        :options="['C.C', 'T.I', 'C.E']" placeholder="Selecciona un tipo" />
                </div>
                <div class="field">
                    <label>Observaciones de salud</label>
                    <Textarea v-model="clientEdit.health_observations" rows="5" cols="30" />
                </div> -->
                    </div>
                    <div style="display: flex; justify-content: center;">
                        <Button style="background-color: #2f9745; color: white;" label="Editar" icon="pi pi-pencil"
                            class="p-button-outlined buttonDtResponsive" @click="editRoute(clientEdit)"
                            v-tooltip.top="'Editar ruta'" />
                    </div>
                </Dialog>

                <Dialog v-model:visible="reservasDialog" :style="{ width: '70%' }" :modal="true" class="p-fluid"
                    :closeOnEscape="true" :closable="true" header="Reservas">
                    <Timeline :value="reservasRuta" layout="vertical" align="bottom" class="p-timeline-vertical"
                        dataKey="status">
                        <template #marker>
                            <span class="custom-marker" style="backgroundColor: white;">
                                <!-- <i class="pi pi-arrow-down"></i> -->
                            </span>
                        </template>
                        <template #content="slotProps">
                            <Card class="mt-2 mb-2">
                                <template #title>
                                    {{ slotProps.item.client.first_name }} {{ slotProps.item.client.last_name }}
                                </template>
                                <template #subtitle>
                                    {{ slotProps.item.client.type_document }} {{ slotProps.item.client.document }}
                                    <br>
                                    {{ slotProps.item.client.phone_number }}


                                </template>
                                <template #content>
                                    <p>El correo {{ slotProps.item.client.email }} ha reservado 1 cupo para la ruta</p>
                                    <p v-if="slotProps.item?.package">Paquete: {{ slotProps.item?.package?.title }} - ${{
                                        slotProps.item?.package?.price.toLocaleString('es-CO') }}</p>

                                    <!-- <p>Estado y fecha del pedido </p> -->

                                </template>
                            </Card>
                        </template>
                    </Timeline>
                </Dialog>


                <Dialog v-if="dialogPackage === true && package !== null" v-model:visible="dialogPackage" modal
                    header="Agregar paquete" :style="{ width: '50vw' }">
                    <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
                        <v-row no-gutters>
                            <v-col cols="5">
                                <div class="field p-fluid ml-1  mr-1" style="text-align: center;">
                                    <label style="text-align: center;">Título</label>
                                    <InputText ref="cliente" id="cliente" v-model="package.title" :required="true" autofocus
                                        placeholder="Paquete básico" />
                                </div>
                            </v-col>
                            <v-col cols="4" lg="4" xl="4">
                                <div class="field p-fluid ml-1  mr-1" style="text-align: center;">
                                    <label style="text-align: center;">Precio</label>
                                    <InputNumber v-model="package.price" :required="true" autofocus inputId="integeronly"
                                        placeholder="100.000" />
                                </div>
                            </v-col>
                            <v-col cols="3">
                                <div class="field p-fluid ml-1  mr-1" style="text-align: center;">
                                    <label style="text-align: center;">Límite</label>
                                    <InputNumber v-model="package.limit" :required="true" autofocus inputId="integeronly"
                                        placeholder="20" />
                                </div>
                            </v-col>
                            <v-col cols="5">
                                <div class="field p-fluid ml-1  mr-1" style="text-align: center;">
                                    <label style="text-align: center;">Incluye</label>
                                    <InputText ref="cliente" id="cliente" v-model="include" :required="true" autofocus
                                        placeholder="Escribe la lista de items" v-on:keyup.enter="addInclude(include)" />
                                    <div class="mt-4 mb-4 ml-2 mr-2 text-left">
                                        <v-badge v-if="includePackages.length > 0" v-for="(item, index) of includePackages"
                                            color="success" :content="item" :key="index" inline
                                            @click="deleteInclude(index)" />
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="1">
                                <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                                    <label>Agregar</label>
                                    <Button v-if="!deletePackage" style="background-color: #0088ff; color: white;" label=""
                                        icon="pi pi-plus" class="ms:w-full p-button-outlined " @click="addInclude(include)"
                                        v-tooltip.top="'Agregar fecha'" />
                                    <Button v-if="deletePackage" style="background-color: white; color: #0088ff;" label=""
                                        icon="pi pi-times" class="ms:w-full p-button-outlined " @click="addInclude(include)"
                                        v-tooltip.top="'Quitar paquete'" />
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="field p-fluid  ml-2  mr-1" style="text-align: center;">
                                    <label>Descripción</label>
                                    <Textarea v-model="package.description" rows="5" cols="30" />
                                </div>
                            </v-col>

                        </v-row>

                        <div class="mt-4" style="display: flex; justify-content: space-around;">
                            <Button label="Agregar" class="mt-2 ml-2 mr-2" @click="addPackage(package)"
                                style="background-color: #005693; color: white;" />

                        </div>

                        <div v-if="loader === true" style="text-align:center; padding-top: 20%;" class="loader">
                            <h3>Cargando...</h3>
                            <v-progress-circular indeterminate></v-progress-circular>
                        </div>



                    </div>

                </Dialog>
                <!-- <DataTable :value="products">
                    <Column field="code" header="Ruta"></Column>
                    <Column field="km" header="KM"></Column>
                    <Column field="name" header="Precio"></Column>
                    <Column field="category" header="Estado"></Column>
                    <Column field="quantity" header="Reservas"></Column>
                    <Column field="ratingres" header="Cupos restantes"></Column>
                    <Column field="rating" header="Cupos total"></Column>
                    <Column field="paquetes" header="Paquetes"></Column>
                    <Column field="" header="Acciones" class="text-center">
                        <template #body="slotProps">
                            <div class="text-center">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-text"
                                    @click="openEdit(slotProps.data)" v-tooltip.top="'Editar'" style="color: #2D5F93;" />
                                <Button icon="pi pi-trash" class="p-button-rounded  p-button-text"
                                    v-tooltip.top="'Eliminar'" @click="showModalEliminarPqc(slotProps.data)"
                                    style="color: #2D5F93" />
                                <Button icon="pi pi-eye" class="p-button-rounded  p-button-text"
                                    v-tooltip.top="'Ver reservas'" @click="showModalEliminarPqc(slotProps.data)"
                                    style="color: #2D5F93" />
                            </div>
                        </template>
                    </Column>
                </DataTable> -->
            </div>
        </div>
    </div>
</template>

<script>
import { read, utils, writeFileXLSX, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import moment from 'moment'
import DataTable from 'primevue/datatable';
import HttpService from '../services/httpServices'
export default {
    data() {
        return {
            httpService: new HttpService(),
            moment: moment,
            dialogEdit: false,
            date: null,
            routes: [],
            reservasDialog: false,
            reservasRuta: [],
            route_edit: {},
            package: null,
            includePackages: [],
            dialogPackage: false,
            include: null,
            filtersRoutes: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'title': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'km': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'price': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'status': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'quantity_persons': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            }

        }
    },
    mounted() {
        this.getAllRoutes();
    },
    methods: {
        s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        },
        exportData() {
            try {
                const dataCurrents = this.$refs.dt.processedData;
                let data = [];
                let xlsRows = [];
                dataCurrents.map(d => {
                    data.push({
                        'Titulo': d.title,
                        'Kilómetros': d.km,
                        'Precio': d.price.toLocaleString(),
                        'Estado': d.status,
                        "Fechas": d.dates.toString(),
                        "Nivel": d.level,
                        "Locación": d.location,
                        "Asistentes": d.assistants?.length,
                    });
                });
                let wb = utils.book_new();
                wb.Props = {
                    Title: "Rutas",
                    Subject: "Espiritu Montana",
                    Author: "Espiritu Montana",
                    CreatedDate: new Date()
                };
                xlsRows = data;
                let createXLSLFormatObj = [];
                xlsRows.forEach(function (value) {
                    createXLSLFormatObj.push(value);
                });
                let ws_name = "Rutas";
                let ws = utils.json_to_sheet(createXLSLFormatObj);
                utils.book_append_sheet(wb, ws, ws_name);
                var wscols = [
                    { wch: 25 },
                    { wch: 10 },
                    { wch: 20 },
                    { wch: 10 },
                    { wch: 25 },
                    { wch: 8 },
                    { wch: 15 },
                    { wch: 10 },
                ];
                ws['!cols'] = wscols;
                var wbout = write(wb, {
                    bookType: 'xlsx',
                    type: 'binary'
                });

                saveAs(new Blob([this.s2ab(wbout)], {
                    type: "application/octet-stream"
                }), 'resumen_rutas_' + moment().format("DD-MM-YYYY") + '.xlsx');
            } catch (error) {
                console.log(" exportData ~ error:", error);
            }
        },
        seePackage(item) {
            try {
                if (item) {
                    const { includes, ...rest } = item
                    this.package = rest
                    this.includePackages = includes
                    this.dialogPackage = true
                    this.deletePackage = true
                }
            } catch (error) {
                console.log("seePackage error:", error)

            }
        },
        deleteDate(index) {
            try {
                this.route_edit.dates.splice(index, 1)
            } catch (error) {
                console.log("deleteDate error:", error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error en la función deleteDate', life: 4000 });
            }
        },
        addDate(date) {
            try {
                if (date !== '' && date !== null) {
                    let date_formated = moment(date).format('DD/MM/YYYY')
                    if (date_formated) {
                        if (this.route_edit.dates.includes(date_formated)) {
                            this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Ya agregaste ésta fecha', life: 4000 });
                        } else {
                            this.route_edit.dates.push(date_formated)
                            this.date = null
                        }
                    } else {
                        this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Ha ocurrido un error al agregar la fecha', life: 4000 });
                    }
                } else {
                    this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Selecciona una fecha para continuar', life: 4000 });
                }
            } catch (error) {
                console.log("addDate error:", error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error en la función addDate', life: 4000 });
            }
        },
        async getAllRoutes() {
            try {
                const get_all = await this.httpService.getRequestA('api/v1/routes/getAll');
                this.routes = get_all.data
            } catch (error) {
                console.log("getAllRoutes ~ error:", error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error getAllRoutes', life: 4000 });
            }
        },
        cuposRestantes(route) {
            try {
                let assistants = route.assistants || []
                let quantity_persons = route.quantity_persons
                let result = quantity_persons - assistants.length
                return result
            } catch (error) {
                console.log("cuposRestantes ~ error:", error)

            }
        },
        verReservas(ruta) {
            try {
                if (ruta.assistants?.length > 0) {
                    this.reservasDialog = true
                    this.reservasRuta = ruta.assistants
                }
            } catch (error) {
                console.log("verReservas ~ error:", error)
            }
        },
        openEdit(route) {
            try {
                this.route_edit = route
                this.dialogEdit = true

            } catch (error) {
                console.log("openEdit ~ error:", error)

            }
        }

    }
}
</script>

<style></style>