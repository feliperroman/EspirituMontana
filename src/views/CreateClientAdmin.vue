<template>
    <Toast />
    <div class="container">
        <div class="card mt-12">
            <h3 style="text-align: center;">Crear cliente</h3>
            <div class="">
                <v-row no-gutters>
                    <v-col cols="3">
                        <div class="field p-fluid ml-1  mr-1" style="text-align: center;">
                            <label style="text-align: center;">Nombre</label>
                            <InputText v-model="new_client.first_name" :required="true" autofocus
                                placeholder="Escriba el nombre" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid ml-1 mr-1" style="text-align: center;">
                            <label>Apellido</label>
                            <InputText v-model="new_client.last_name" :required="true" autofocus
                                placeholder="Escriba apellidos" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Correo electronico</label>
                            <InputText v-model="new_client.email" :required="true" autofocus
                                placeholder="Escriba el correo" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Documento</label>
                            <InputNumber v-model="new_client.document" :required="true" autofocus :useGrouping="false"
                                placeholder="Escriba el documento" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label style="text-align: center;">Teléfono</label>
                            <InputNumber v-model="new_client.phone_number" :useGrouping="false" :required="true" autofocus
                                inputId="integeronly" placeholder="Escriba el teléfono" />

                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label style="text-align: center;">EPS</label>
                            <InputText v-model="new_client.eps" :required="true" autofocus placeholder="Escriba la eps" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Tipo sangre</label>
                            <Dropdown ref="rh" id="rh" v-model="new_client.rh"
                                :options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                                placeholder="Selecciona un tipo de sangre" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Tipo documento</label>
                            <Dropdown ref="type_document" id="type_document" v-model="new_client.type_document"
                                :options="['C.C', 'T.I', 'C.E']" placeholder="Selecciona un tipo" />
                        </div>
                    </v-col>

                    <v-col cols="4">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Observaciones de salud</label>
                            <Textarea v-model="new_client.health_observations" rows="5" cols="30" />
                        </div>
                    </v-col>

                </v-row>
                <div style="display: flex; justify-content: center;">
                    <Button style="background-color: #00ff37; color: white;" label="Crear" icon="pi pi-plus"
                        class="ms:w-full p-button-outlined mr-2 buttonDtResponsive" @click="createClient(new_client)"
                        v-tooltip.top="'Agregar cliente'" />
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import moment from 'moment';
import httpServices from '../services/httpServices'
export default {
    data() {
        return {
            moment: moment,
            route: {},
            new_client: {},
            date: null,
            dates: [],
            packages: [],
            includePackages: [],
            images: [],
            dialogPackage: false,
            package: null,
            include: null,
            loader: false,
            deletePackage: false,
            httpService: new httpServices(),
            imgRoute: null,
            previewImg: null,
            showImg: false,
            dialogImg: false,
            images: []

        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        async createClient(new_client) {
            try {
                const is_valid = this.validateClient(new_client);
                if (is_valid) {
                    const create_client = await this.httpService.postRequest('api/v1/clients/create', new_client)
                    if (create_client.error) {
                        console.log("create_client:", create_client)
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: create_client.message, life: 4000 });
                    } else if (!create_client.error && !create_client.data) {
                        this.$toast.add({ severity: 'info', summary: 'Info', detail: 'No se pudo crear el cliente', life: 4000 });
                    } else {
                        this.$toast.add({ severity: 'success', summary: 'Exitoso', detail: 'El cliente se ha creado correctamente', life: 4000 });
                        this.new_client = {}
                    }
                }

            } catch (error) {
                console.log("createClient ~ error:", error);
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
        addImagesArray(image) {
            try {
                this.images.push(image[0])
                this.dialogImg = false
                this.imgRoute = null
                this.previewImg = null
            } catch (error) {
                console.log("addImagesArray ~ error:", error)
            }
        },
        addImg() {
            this.dialogImg = true
        },
        Preview_image(image) {
            if (image == null) {
                this.previewImg = null
            } else {
                this.previewImg = URL.createObjectURL(image[0]);
                this.showImg = true;
            }
        },
        myUploader(event) {
            console.log("🚀 ~ file: CreateRoute.vue:212 ~ myUploader ~ event:", event)
            let image = event.files[0]
            console.log("🚀 ~ file: CreateRoute.vue:214 ~ myUploader ~ image:", image)
            // this.File = null
            // this.totalSize = 0;
            // this.files = event.files
            // let file = this.files[0];
            // this.uploadedFiles = event.files
            // this.File = file;
        },
        async saveImage(image) {
            try {
                const fd = new FormData();
                fd.append('image', image, image.name)
                const save_img = await this.httpService.postRequestFormDataA('api/v1/admin/routeImg')

            } catch (error) {
                console.log("saveImage ~ error:", error)
            }
        },
        onUpload(event) {
            console.log("🚀 ~ file: CreateRoute.vue:221 ~ onUpload ~ event:", event)
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        },
        addDate(date) {
            try {
                if (date !== '' && date !== null) {
                    let date_formated = moment(date).format('DD/MM/YYYY')
                    if (date_formated) {
                        if (this.dates.includes(date_formated)) {
                            this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Ya agregaste ésta fecha', life: 4000 });
                        } else {
                            this.dates.push(date_formated)
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
        validatePackage(item, includes) {
            try {
                if (item && includes) {
                    let errors = [];
                    if (includes?.length <= 0) {
                        errors.push('incluye');
                    }
                    if (!item.title || item?.title === '') {
                        errors.push('título');
                    }
                    if (!item.price || item?.price === '') {
                        errors.push('precio');
                    }
                    if (!item.limit || item?.limit === '') {
                        errors.push('límite');
                    }
                    if (!item.description || item?.description === '') {
                        errors.push('descripción');
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
                }
            } catch (error) {
                console.log("validatePackage error:", error)
            }
        },
        deleteDate(index) {
            try {
                this.dates.splice(index, 1)
            } catch (error) {
                console.log("deleteDate error:", error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error en la función deleteDate', life: 4000 });
            }
        },
        createPackge() {
            try {
                this.dialogPackage = true
                this.package = {}
                this.includePackages = []
                this.deletePackage = false
            } catch (error) {
                console.log("createPackge error", error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error en la función createPackge', life: 4000 });
            }
        },
        async addPackage(item) {
            try {
                if (item) {
                    let is_valid = this.validatePackage(item, this.includePackages)
                    if (is_valid) {
                        let new_package = {
                            ...item,
                            includes: this.includePackages
                        }
                        this.packages.push(new_package);
                        this.dialogPackage = false
                        this.package = null
                        this.includePackages = []
                    }
                }
            } catch (error) {
                console.log("addPackage error:", error);
            }

        },
        addInclude(include) {
            try {
                if (include) {
                    this.includePackages.push(include)
                    this.include = null

                } else {
                    this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Escribe un item para continuar', life: 4000 });
                }

            } catch (error) {
                console.log("addInclude ~ error:", error)

            }

        },
        deleteInclude(index) {
            try {
                this.includePackages.splice(index, 1)
            } catch (error) {
                console.log("deleteInclude error:", error)
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error en la función deleteInclude', life: 4000 });

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
    }
}
</script>
<style lang="scss">
.profile-picture {
    max-width: auto;
    height: auto;
}


.inner-container {
    margin-top: 10px;
    background-color: white;
    border-radius: 17px;
    padding: 16px 16px;
}

.dialog-container-profile {
    padding: 10px;
    background-color: #faf8fb;
    border-radius: 20px;
}


.mini-picture {
    border: 1px solid #c5c3c3;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
}

.loader {
    /* Loader Div Class */
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background-color: #eceaea;
    background-size: 50px;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 10000000;
    opacity: 0.4;
    filter: alpha(opacity=40);
}


@keyframes text_713 {
    0% {
        letter-spacing: 1px;
        transform: translateX(0px);
    }

    40% {
        letter-spacing: 2px;
        transform: translateX(26px);
    }

    80% {
        letter-spacing: 1px;
        transform: translateX(32px);
    }

    90% {
        letter-spacing: 2px;
        transform: translateX(0px);
    }

    100% {
        letter-spacing: 1px;
        transform: translateX(0px);
    }
}

@keyframes loading_713 {
    0% {
        width: 16px;
        transform: translateX(0px);
    }

    40% {
        width: 100%;
        transform: translateX(0px);
    }

    80% {
        width: 16px;
        transform: translateX(64px);
    }

    90% {
        width: 100%;
        transform: translateX(0px);
    }

    100% {
        width: 16px;
        transform: translateX(0px);
    }
}

@keyframes loading2_713 {
    0% {
        transform: translateX(0px);
        width: 16px;
    }

    40% {
        transform: translateX(0%);
        width: 80%;
    }

    80% {
        width: 100%;
        transform: translateX(0px);
    }

    90% {
        width: 80%;
        transform: translateX(15px);
    }

    100% {
        transform: translateX(0px);
        width: 16px;
    }
}
</style>