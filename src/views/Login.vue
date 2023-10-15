<template>
    <body>
        <Toast />
        <div class="flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
                <div class="col-12 mt-5 xl:mt-0 text-center">
                </div>
                <div class="col-12 xl:col-6"
                    style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, #049AB9, rgba(33, 150, 243, 0) 30%);">
                    <div class="h-full w-full m-0 py-7 px-4"
                        style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                        <div class="text-center mb-5">
                            <img src="../../public/images/logonegro.png" alt="Image" height="100" class="mb-3">

                            <div class="text-900 text-3xl font-medium mb-3"></div>
                            <span class="text-600 font-medium">Ingresa para continuar</span>
                        </div>

                        <div class="w-full md:w-10 mx-auto">
                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Email"
                                style="padding:1rem;" />

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>

                            <InputText id="password1" v-model="password" type="password" class="w-full mb-3"
                                placeholder="Contraseña" style="padding:1rem;" />


                            <div class="flex align-items-center justify-content-between mb-3 ">
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: #049AB9"
                                    @click="showRecovePass">Recuperar contraseña</a>
                            </div>
                            <Button style="background-color: #049AB9; color: white;" @click="loginAdmin(email, password)" label="Ingresar"
                                class="w-full p-3 text-xl"></button>


                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loadingLogin == true" style="text-align:center; padding-top: 20%;" class="loader">
            <h3>Cargando...</h3>
            <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" animationDuration=".5s" aria-label="Cargando" />
            <br>
        </div>

        <Dialog v-model:visible="dialogForgotPassword" :style="{ width: '550px' }" :modal="true" :closeOnEscape="true"
            :closable="true" header="Recuperar contraseña">
            <div class="field p-fluid">
                <label for="forgotPassword" class="">Ingresa tu email:</label>
                <InputText style="text-align: center;" id="forgotPassword" required="true" autofocus v-model="email"
                    placeholder="email" />
            </div>
            <div style="text-align:center;">
                <Button style="background-color: #049AB9; color: white; text-align: center;" label="Recuperar"
                    icon="pi pi-plus" class="p-button-outlined" @click="resetPassword(email)" />
            </div>

        </Dialog>
    </body>
</template>

<script>
import axios from 'axios';
import httpService from '../services/httpServices'
// import LoginService from '../service/LoginService';
export default {
    data() {
        return {
            email: '',
            password: '',
            checked: false,
            user: null,
            dialogForgotPassword: false,
            loginService: '',
            loadingLogin: false,
            httpService: new httpService()
        }
    },
    created() {

    },
    mounted() {

        // this.setDataLogin()

    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        },
    },
    methods: {

        showRecovePass() {

            this.dialogForgotPassword = true;

        },
        async loginAdmin(email, password) {
            try {
                if (!email || !password) {
                    this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Por favor completado todos los campos', life: 4000  });
                    this.loadingLogin = false;
                } else {
                    let data_login = {
                        "type_user": 'admin',
                        "email": email,
                        "password": password
                    }
                    const result_login = await this.httpService.postRequest('api/v1/auth/login', data_login)
                    if (result_login.error) {
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: result_login.message, life: 4000  });
                    } else {
                        const token = result_login.token
                        const rol = result_login.user.type
                        if(token){
                            localStorage.setItem('tkn', token);
                            localStorage.setItem('rol', rol);
                            this.$router.push('/crearRuta')
                        }
                    }
                }
            } catch (error) {
                console.log("loginAdmin ~ error:", error)

            }

        },

        async login() {

            let errors = [];

            this.loadingLogin = true;

            if (!this.email || !this.password) {

            } else {
                let json = {
                    "email": this.email,
                    "password": this.password
                }

                let errors = []

                await this.loginService.formLogin(json).then(data => {



                    this.user = data.data

                    if (this.user.ok == true) {
                        if (!this.user.token) {
                            this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Token invalido o no existe' });
                        } else {
                            this.$toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Login correcto' });
                            localStorage.setItem('token', this.user.token);
                            localStorage.setItem('nameUser', this.user.user.name);
                            localStorage.setItem('roleUser', this.user.user.role);
                            localStorage.setItem('idUser', this.user.user._id);
                            if (this.user.user.subscription) {
                                localStorage.setItem('subscription', this.user.user.subscription);
                            }
                            this.$router.push('/').then(() => { this.$router.go() })
                        }
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar ingresar, verifique que los datos sean correctos' });
                    }
                }).catch(function (error) {
                    if (error.response) {

                        console.log(error.response.data);
                        if (error.response.data.email) {
                            return alert(error.response.data.email)
                        } else if (error.response.data.err) {
                            return alert(error.response.data.err.message)
                        }

                    } else if (error.request) {

                        console.log(error.request);
                    } else {

                        console.log('Error', error.message);
                    }
                    console.log(error);
                    errors.push({ message: error.message, type: error.name })
                }).finally(() => {
                    this.loadingLogin = false;
                    if (errors.length >= 1) {
                        errors.forEach(error => {

                            this.$toast.add({ severity: 'error', summary: 'Error', detail: `${error.message} ${error.type}`, life: 4000 });

                        })

                    }
                });
            }
        },

        resetPassword(email) {

            let json = {
                email: email
            };

            let errors = [];

            this.loginService.recoverPassword(json).then(data => {

                if (data.ok == true) {
                    this.$toast.add({ severity: 'success', summary: 'Correo enviado', detail: 'Revisa tu correo para recupera tu contraseña' });
                } else {
                    this.$toast.add({ severity: 'info', summary: 'Info', detail: data.message });
                }
            }).catch(function (error) {
                if (error.response) {

                    // console.log(error.response.data);
                    errors.push({ message: error.response.data.message })
                    if (error.response.data.email) {
                        return alert(error.response.data.email)
                    } else if (error.response.data.err) {
                        return alert(error.response.data.err.message)
                    }

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

                errors.push({ message: error.message, type: error.name })

            }).finally(() => {
                if (errors.length >= 1) {
                    errors.forEach(error => {
                        if (error.message == 'Network Error') {

                            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al hacer la petición, Axios: Network Error', life: 4000 });

                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: `${error.message} ${error.type}`, life: 4000 });
                        }
                    })

                }
            });

        }
    }
}
</script>

<style lang="scss">
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
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
    opacity: 0.9;
    filter: alpha(opacity=40);
}
</style>