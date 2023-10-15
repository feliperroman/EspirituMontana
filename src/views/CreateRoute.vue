<template>
    <Toast />
    <div class="container">
        <div class="card mt-12">
            <h3 style="text-align: center;">Crear ruta</h3>
            <div class="">
                <v-row no-gutters>
                    <v-col cols="3">
                        <div class="field p-fluid ml-1  mr-1" style="text-align: center;">
                            <label style="text-align: center;">Título</label>
                            <InputText ref="cliente" id="cliente" v-model="route.title" :required="true" autofocus
                                placeholder="Escriba el título de la ruta" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid ml-1 mr-1" style="text-align: center;">
                            <label>Locación</label>
                            <InputText ref="cliente" id="cliente" v-model="route.location" :required="true" autofocus
                                placeholder="Escriba la locación de la ruta" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Kilómetros</label>
                            <InputNumber v-model="route.km" :required="true" autofocus inputId="integeronly"
                                placeholder="Escriba los km de la ruta" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Nivel</label>
                            <InputText ref="cliente" id="cliente" v-model="route.level" :required="true" autofocus
                                placeholder="Escriba el nivel de la ruta" />
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label style="text-align: center;">Precio</label>
                            <InputNumber v-model="route.price" :required="true" autofocus inputId="integeronly"
                                placeholder="Escriba el precio" />

                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label style="text-align: center;">Cantidad personas</label>
                            <InputNumber v-model="route.quantity_persons" :required="true" autofocus inputId="integeronly"
                                placeholder="Escriba la cantidad de pers." />
                        </div>
                    </v-col>
                    <v-col cols="5">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Fechas</label>
                            <Calendar v-model="date" />
                            <div class="mt-1">
                                <v-badge v-if="dates.length > 0" v-for="(date, index) of dates" color="success"
                                    :content="date" :key="index" inline @click="deleteDate(index)">

                                </v-badge>

                            </div>
                        </div>
                    </v-col>
                    <v-col cols="1">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Agregar</label>
                            <Button style="background-color: #0088ff; color: white;" label="" icon="pi pi-plus"
                                class="ms:w-full p-button-outlined mr-2 buttonDtResponsive" @click="addDate(date)"
                                v-tooltip.top="'Agregar fecha'" />
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Descripción</label>
                            <Textarea v-model="route.description" rows="5" cols="30" />
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Imagenes</label>
                            <Button style="background-color: #0088ff; color: white;" label="Agregar imagen"
                                icon="pi pi-plus" class="ms:w-full p-button-outlined mr-2 ml-2 " @click="addImg()"
                                v-tooltip.top="'Agregar imagen'" />
                            <div v-if="images.length > 0" class="mt-4 mb-4 ml-2 mr-2 text-left">
                                <v-badge v-for="(image, index) of images" color="success" :content="'Foto ' + (index + 1)"
                                    :key="index" inline @click="deleteImg(index)" />
                            </div>
                            <!-- <FileUpload mode="basic" name="demo[]" :customUpload="true" @uploader="myUploader($event)"
                                accept="image/*" :maxFileSize="1000000" @upload="onUpload($event)" />
                            <v-file-input @change="Preview_image(imgRoute)" label="Escoge tu foto" v-model="imgRoute" variant="filled"
                                color="purple" prepend-icon="mdi-camera" /> -->
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                            <label>Paquetes</label>
                            <Button style="background-color: #0088ff; color: white;" label="Agregar paquete"
                                icon="pi pi-plus" class="ms:w-full p-button-outlined mr-2 ml-2 " @click="createPackge()"
                                v-tooltip.top="'Agregar paquete'" />
                            <div>
                                <Button v-if="packages.length > 0" v-for="(item, index) of packages" :key="index"
                                    style="background-color: #00ff37; color: white;" :label="item.title" icon="pi pi-eye"
                                    class="ms:w-full p-button-outlined mr-2 ml-2  " @click="seePackage(item)"
                                    v-tooltip.top="'Ver paquete'" />
                            </div>
                        </div>

                    </v-col> 
                
                            <!-- <v-col cols="4">
                                <div class="field p-fluid  ml-1  mr-1" style="text-align: center;">
                                <label>Incluye</label>
                                <InputText ref="includeRoute" id="includeRoute" v-model="includeRoute" :required="true" autofocus
                                        placeholder="Escribe la lista de items" v-on:keyup.enter="addIncludeRoute(includeRoute)" />
                                        <div class="mt-4 mb-4 ml-2 mr-2 text-left">
                                        <v-badge v-if="includesRoute.length > 0" v-for="(item, index) of includesRoute"
                                            color="success" :content="item" :key="index" inline @click="deleteIncludeRoute(index)" />
                                    </div>
                           
                            </div>

                        </v-col>   -->
                </v-row>
                <div style="display: flex; justify-content: center;">
                    <Button style="background-color: #00ff37; color: white;" label="Crear" icon="pi pi-plus"
                        class="ms:w-full p-button-outlined mr-2 buttonDtResponsive" @click="createRoute(route,images,dates,packages)"
                        v-tooltip.top="'Agregar ruta nueva'" />
                </div>
            </div>

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
                                        color="success" :content="item" :key="index" inline @click="deleteInclude(index)" />
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
            <!-- <div v-if="showImg == true" class="mini-picture" @click="dialog = true">
                <v-img :src="previewImg" cover></v-img>
            </div> -->
            <v-dialog v-model="dialogImg" width="600" style="border-radius: 15px">
                <v-card class="dialog-container-profile">
                    <div>
                        <div class="d-flex justify-space-between">
                            <div></div>
                            <h4 style="text-align: center;">Subir imagen</h4>
                            <div>
                                <v-btn small icon color="#005693" @click="dialogImg = false">
                                    <v-icon>pi pi-times</v-icon>
                                </v-btn>
                            </div>
                        </div>
                        <div class="mt-3 inner-container">
                            <v-file-input @change="Preview_image(imgRoute)" label="Escoge tu foto" v-model="imgRoute"
                                variant="filled" color="purple" prepend-icon="mdi-camera" />
                            <v-img :src="previewImg" cover class="profile-picture"></v-img>
                            <div v-if="imgRoute !== null" style="text-align: center;">
                                <Button label="Confirmar" class="mt-2 ml-2 mr-2" @click="addImagesArray(imgRoute)"
                                    style="background-color: #005693; color: white;" />
                            </div>

                        </div>
                    </div>
                </v-card>
            </v-dialog>
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
            images: [],
            includeRoute: null,
            includesRoute: []

        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        async createRoute(route, images, dates, packages) {
            try {
                const is_valid = this.validateRoute(route, images, dates, packages)
                if (is_valid) {
                    let new_route = {
                        title: route.title,
                        description: route.description,
                        km: route.km,
                        location: route.location,
                        dates: dates,
                        quantity_persons: route.quantity_persons,
                        level: route.level,
                        price: route.price,
                        packages: packages,
                        includes: this.includesRoute?.length > 0 ? this.includesRoute : []
                    }
                    const create_route = await this.httpService.postRequestA('api/v1/routes/create', new_route)
                    if(create_route.error){
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al crear la ruta, consultar con desarrollador', life: 4000 });
                    }else if(!create_route.error && !create_route.data){
                        this.$toast.add({ severity: 'info', summary: 'Info', detail: 'No se pudo crear la ruta', life: 4000 });
                    }else{
                        const route = create_route.data
                        if(route._id){
                            this.$toast.add({ severity: 'success', summary: 'Exitoso', detail: 'La ruta se ha creado correctamente', life: 4000 });
                            let all_images = new FormData();
                            images.forEach(image => {
                                all_images.append('images[]', image)
                            });
                            all_images.append('id_route', route._id)
                          await this.httpService.postRequestFormDataA('api/v1/routes/images', all_images)
                        }
                    }
                }
            } catch (error) {
                console.log("createRoute ~ error:", error)

            }

        },
        validateRoute(route, images, dates, packages) {
            try {
               
                    let errors = [];
                    if (images?.length <= 0) {
                        errors.push('imagenes');
                    }
                    if (dates?.length <= 0) {
                        errors.push('fechas');
                    }
                    // if (packages?.length <= 0) {
                    //     errors.push('imagenes');
                    // }
                    if (!route.title || route?.title === '') {
                        errors.push('título');
                    }
                    if (!route.location || route?.location === '') {
                        errors.push('locación');
                    }
                    if (!route.km || route?.km === '') {
                        errors.push('kilómetros');
                    }
                    if (!route.level || route?.level === '') {
                        errors.push('nivel');
                    }
                    if (!route.price || route?.price === '') {
                        errors.push('precio');
                    }
                    if (!route.quantity_persons || route?.quantity_persons === '') {
                        errors.push('personas');
                    }
                    if (!route.description || route?.description === '') {
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
        addIncludeRoute(includeRoute) {
            try {
                if (includeRoute) {
                    this.includesRoute.push(includeRoute)
                    this.includeRoute = null

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
        deleteIncludeRoute(index) {
            try {
                this.includesRoute.splice(index, 1)
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