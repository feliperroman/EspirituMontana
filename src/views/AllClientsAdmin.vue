<template>
    <div>
        <div class="container mt-0">
            <div class="card mt-0">
                <h1 style="text-align: center;">Clientes</h1>

                <DataTable :filters="filtersClients" filterDisplay="menu" ref="dt" v-model:filters="filtersClients" :value="clients">
                    <template #header>
                        <div class="mt-2 mb-2" style="display: flex;">
                            <span class="p-input-icon-left ">
                                <i class="pi pi-search" />
                                <InputText v-model="filtersClients['global'].value" placeholder="Buscar..."
                                    v-tooltip.top="'Buscador'" class="buttonDtResponsive" />
                            </span>
                            <Button style="color:#5d7800; background-color: white;" label="Exportar"
                                class="ms:w-full p-button-outlined mr-2 ml-2 buttonDtResponsive" @click="exportData()"
                                v-tooltip.top="'Exportar datos'" />
                        </div>
                    </template>
                    <Column :sortable="true" field="first_name" header="Nombre" class="text-center"></Column>
                    <Column :sortable="true" field="last_name" header="Apellido " class="text-center"></Column>
                    <Column :sortable="true" field="email" header="Correo" class="text-center"></Column>
                    <Column :sortable="true" field="phone_number" header="Celular" class="text-center"></Column>
                    <Column :sortable="true" field="document" header="Documento" class="text-center"></Column>
                    <Column :sortable="true" field="rh" header="Sangre" class="text-center"></Column>
                    <Column :sortable="true" field="eps" header="Eps" class="text-center"></Column>
                    <Column field="status" header="Estado" class="text-center"></Column>
                    <Column field="" header="Acciones" class="text-center" style="min-width: 8rem; max-width: 10.5rem;">
                        <template #body="slotProps">
                            <div class="text-center">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-text"
                                    @click="openEdit(slotProps.data)" v-tooltip.top="'Editar'" style="color: #2D5F93;" />
                                <!-- <Button icon="pi pi-trash" class="p-button-rounded  p-button-text"
                                    v-tooltip.top="'Eliminar'" @click="deleteClient(slotProps.data)"
                                    style="color: #2D5F93" /> -->
                                <Button icon="pi pi-eye" class="p-button-rounded  p-button-text"
                                    v-tooltip.top="'Ver reservas'" @click="showPrebookings(slotProps.data)"
                                    style="color: #2D5F93" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <Dialog v-if="dialogEdit === true && clientEdit !== null" v-model:visible="dialogEdit" modal header="Editar cliente"
            :style="{ width: '50vw' }">
            <div class="p-fluid">
                <div class="field">
                    <label>Nombre</label>
                    <InputText v-model="clientEdit.first_name" :required="true" autofocus placeholder="Escriba el nombre" />
                </div>
                <div class="field">
                    <label>Apellido</label>
                    <InputText v-model="clientEdit.last_name" :required="true" autofocus placeholder="Escriba apellidos" />
                </div>
                <div class="field">
                    <label>Correo electronico</label>
                    <InputText v-model="clientEdit.email" :required="true" autofocus placeholder="Escriba el correo" />
                </div>
                <div class="field">
                    <label>Documento</label>
                    <InputNumber v-model="clientEdit.document" :required="true" autofocus :useGrouping="false"
                        placeholder="Escriba el documento" />
                </div>
                <div class="field">
                    <label style="text-align: center;">Teléfono</label>
                    <InputNumber v-model="clientEdit.phone_number" :useGrouping="false" :required="true" autofocus
                        inputId="integeronly" placeholder="Escriba el teléfono" />

                </div>
                <div class="field">
                    <label style="text-align: center;">EPS</label>
                    <InputText v-model="clientEdit.eps" :required="true" autofocus placeholder="Escriba la eps" />
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
                </div>
            </div>
            <div style="display: flex; justify-content: center;">
                <Button style="background-color: #00ff37; color: white;" label="Editar" icon="pi pi-plus"
                    class="ms:w-full p-button-outlined mr-2 buttonDtResponsive" @click="editClient(clientEdit)"
                    v-tooltip.top="'Editar cliente'" />
            </div>
        </Dialog>

        <Dialog v-if="listPrebookings === true && prebookingsClient?.length > 0" v-model:visible="listPrebookings"
            :style="{ width: '450px' }" :modal="true" class="p-fluid" :closeOnEscape="true" :closable="true"
            header="Reservas">
            <Timeline :value="prebookingsClient" layout="vertical" align="bottom" class="p-timeline-vertical"
                dataKey="status">
                <template #marker>
                    <span class="custom-marker" style="backgroundColor: white;">
                        <!-- <i class="pi pi-arrow-down"></i> -->
                    </span>
                </template>
                <template #content="slotProps">
                    <Card class="mt-2 mb-2">
                        <template #title>
                            {{ slotProps.item.title }}
                        </template>
                        <template #subtitle>
                            <!-- {{ $appDate.formatDate(slotProps.item.date) }} -->
                            {{ 'Fecha de reserva: ' + ' ' + moment(slotProps.item.date_booked).format('DD/MM/YYYY') }}
                        </template>
                        <template #content>
                            <!-- <p>Estado y fecha del pedido </p> -->
                            <!-- {{ slotProps.item.mensaje }} -->
                            {{ 'Reservó con: ' + ' ' + slotProps.item.price }}
                        </template>
                    </Card>
                </template>
            </Timeline>
        </Dialog>


    </div>
</template>

<script>
import { read, utils, writeFileXLSX, write } from 'xlsx';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { saveAs } from 'file-saver';
import moment from 'moment'
import DataTable from 'primevue/datatable';
import HttpService from '../services/httpServices'
export default {
    data() {
        return {
            httpService: new HttpService(),
            clients: [],
            moment: moment,
            listPrebookings: false,
            prebookingsClient: [],
            dialogEdit: false,
            clientEdit: null,
            filtersClients: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'first_name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'last_name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'email': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'phone_number': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'document': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'rh': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'eps': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'status': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },


            }
        }
    },
    mounted() {
        this.getClients()
    },
    methods: {
        s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        },
        exportData(){
            try {
                const dataCurrents = this.$refs.dt.processedData;
                let data = []
                dataCurrents.forEach(client=>{
                    data.push({
                        nombre: client.first_name,
                        apellidos: client.last_name,
                        'tipo doc': client.type_document,
                        documento: client.document,
                        celular: client.phone_number,
                        eps: client.eps,
                        sangre: client.rh,
                        email: client.email,
                        observaciones: client.health_observations
                    })
                })
                let xlsRows = [];
                let wb = utils.book_new();
                wb.Props = {
                    Title: "Clientes",
                    Subject: "Espiritu Montana",
                    Author: "Espiritu Montana",
                    CreatedDate: new Date()
                };
                xlsRows = data;
                let createXLSLFormatObj = [];
                xlsRows.forEach(function (value) {
                    createXLSLFormatObj.push(value);
                });
                let ws_name = "Clientes";
                let ws = utils.json_to_sheet(createXLSLFormatObj);
                utils.book_append_sheet(wb, ws, ws_name);
                var wscols = [
                    { wch: 25 },
                    { wch: 25 },
                    { wch: 25 },
                    { wch: 25 },
                    { wch: 25 },
                    { wch: 25 },
                    { wch: 25 },
                    { wch: 25 },
                    { wch: 25 },

                ];
                ws['!cols'] = wscols;
                var wbout = write(wb, {
                    bookType: 'xlsx',
                    type: 'binary'
                });

                saveAs(new Blob([this.s2ab(wbout)], {
                    type: "application/octet-stream"
                }), 'resumen_clientes_' + moment().format("DD-MM-YYYY") + '.xlsx');
            } catch (error) {
                console.log(" exportData ~ error:", error);
            }
        },
        async getClients() {
            try {
                const get_clients = await this.httpService.getRequestA('api/v1/clients/getAll')
                if (!get_clients.error && get_clients.data) {
                    this.clients = get_clients.data
                }
            } catch (error) {
                console.log("getClients error", error);
                this.$toast.add({ severity: 'info', summary: 'Info', detail: ' ', life: 4000 });

            }
        },
        openEdit(client) {
            try {
                this.dialogEdit = true
                this.clientEdit = { ...client }
            } catch (error) {
                console.log("openEdit ~ error:", error)
            }
        },
        async editClient(client) {
            try {
                const is_valid = this.validateClient(client)
                if (is_valid) {
                    const update_client = await this.httpService.postRequestA('api/v1/clients/update', client)
                    if (update_client.error) {
                        console.log("update_client:", update_client)
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: update_client.message, life: 4000 });
                    } else if (!update_client.error && !update_client.data) {
                        this.$toast.add({ severity: 'info', summary: 'Info', detail: update_client.message, life: 4000 });
                    } else {
                        this.dialogEdit = false
                        this.clientEdit = null
                        this.$toast.add({ severity: 'success', summary: 'Exitoso', detail: update_client.message, life: 4000 });
                        await this.getClients();
                    }
                }
            } catch (error) {
                console.log("editClient ~ error:", error);
            }
        },
        async deleteClient(client) {
            try {
                let inactive_client = {
                    ...client,
                    status: 'inactive'
                }
                const update_client = await this.httpService.postRequestA('api/v1/clients/update', inactive_client)
                if (update_client.error) {
                    console.log("update_client:", update_client)
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: update_client.message, life: 4000 });
                } else if (!update_client.error && !update_client.data) {
                    this.$toast.add({ severity: 'info', summary: 'Info', detail: update_client.message, life: 4000 });
                } else {
                    this.$toast.add({ severity: 'success', summary: 'Exitoso', detail: update_client.message, life: 4000 });
                    await this.getClients();
                }
            } catch (error) {
                console.log("deleteClient error", error);
            }
        },
        validateClient(client) {
            try {
                let errors = [];
                if (!client?.first_name || client?.first_name === '') {
                    errors.push('nombre');
                }
                if (!client?.last_name || client?.last_name === '') {
                    errors.push('apellido');
                }
                if (!client?.email || client?.email === '') {
                    errors.push('correo');
                }
                if (!client?.document || client?.document === '') {
                    errors.push('documento');
                }
                if (!client?.phone_number || client?.phone_number === '') {
                    errors.push('teléfono');
                }
                if (!client?.eps || client?.eps === '') {
                    errors.push('eps');
                }
                if (!client?.rh || client?.rh === '') {
                    errors.push('tipo sangre');
                }
                if (!client?.type_document || client?.type_document === '') {
                    errors.push('tipo doc');
                }
                if (errors.length > 0) {
                    let string = ''
                    errors.forEach(error => {
                        string = string + ' ' + error + ' '
                    });
                    this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Faltan los campos ' + string, life: 4000 });
                    return false
                } else {
                    return true
                }

            } catch (error) {
                console.log("validatePackage error:", error)
            }
        },
        async seePurchased() {
            try {

            } catch (error) {
                console.log("seePurchased ~ error:", error)
            }
        },
        async showPrebookings(client) {
            try {
                if (client) {
                    const client_id = client._id
                    const find_bookings = await this.httpService.postRequestA('api/v1/users/seeBookings', { client_id: client_id })
                    console.log("find_bookings:", find_bookings)
                    if (find_bookings.error) {
                        console.log("find_bookings error:", find_bookings)
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: find_bookings.message, life: 4000 });
                    } else if (!find_bookings.error && find_bookings?.data?.length <= 0) {
                        this.$toast.add({ severity: 'info', summary: 'Info', detail: 'El cliente no ha reservado rutas', life: 4000 });
                    } else {
                        this.$toast.add({ severity: 'success', summary: 'Exitoso', detail: find_bookings.message, life: 4000 });
                        this.listPrebookings = true
                        this.prebookingsClient = find_bookings.data
                    }
                }
            } catch (error) {
                console.log("showPrebookings ~ error:", error)

            }
        }

    }
}
</script>

<style></style>