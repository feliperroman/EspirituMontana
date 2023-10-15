<template>
    <div class="mt-0" v-if="$store.state.route_to_buy !== null">
        <div class="mx-auto" :style="'margin: 6vh !important; margin-top: 0px !important;'">
            <div class="mt-0  mb-3 d-flex justify-content-end">
                <b-link @click="$router.go(-1)" class="text-decoration-none text-dark">
                    <i class="fas fa-angle-left back_icon mr-4"></i>
                </b-link>
            </div>


            <!-- card -->
            <v-card v-if="step ===1" style="box-shadow:none; padding: 10px;">
                <h4 class="mb-3 mt-0 text-center">
                    Detalles del pago
                </h4>
                <hr style="margin-left: 10px; margin-right: 10px;">
                <div class="">
                    <v-row no-gutters class="mt-0">
                        <v-col v-if="route?.package" cols="12" sm="4" md="4" lg="4" xl="4" class="" style="text-align: center;">
                            <p class="mt-0 mb-0"><strong>Paquete: </strong> {{ route.package ? route.package.title : 'Sin nombre' }}</p>
                            <ul v-if="route?.package" v-for="(item, index) in route.package.includes"
                                :key="index" class="mt-3 ml-5">
                                <li style="list-style-type: none;"><strong>{{ item }}</strong></li>
                            </ul>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="" style="text-align: center;">
                            <p class="mt-0 mb-0 text-center"><strong>{{ 'Descripción ruta:' }}</strong> {{ route.route.title ? route.route.title : 'Sin nombre' }}</p>
                            <!-- <p class="mt-0 mb-0"><strong>Paquete: </strong> {{ route.package ? route.package.title : 'Sin nombre' }}</p>
                            <ul v-if="route?.package" v-for="(item, index) in route.package.includes"
                                :key="index" class="mt-3 ml-5">
                                <li>{{ item }}</li>
                            </ul> -->
                            <p class="mt-2">
                                {{ route.route.description }}
                            </p>
                        </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" xl="2" class="" style="text-align: center;">
                            <p class="mt-0 mb-0"><strong>{{ 'Precio' }}</strong></p>
                            <p class="mt-0 mb-0" >${{ this.total_price.toLocaleString('es-CO') }}</p>
                          
                        </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" xl="2" class="" style="text-align: center;">
                            <p class="mt-0 mb-0"><strong>{{ 'Cupos' }}</strong></p>
                            <p class="mt-0 mb-0" >{{ route.more_books ? route?.more_books?.length + 1 : '1' }}</p>
                            </v-col>
                        

                    </v-row>
                   
                    <v-row no-gutters class="mt-3 d-flex justify-content-around">
                        <v-col cols="12" md="12" lg="6" xl="4" class="" style=" padding: 10px;">
                            <div class="card-methods" @click="addNewCard('card')">
                                <div class="card-icon">
                                    <i class="pi pi-credit-card" style="color:  rgb(255 255 255)"></i>
                                </div>
                                <div class="ml-3">
                                    <p class="mb-0 mt-3">TARJETA</p>
                                </div>
                                <div>
                                    <svg class="" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="45"
                                        viewBox="0 0 80 80">
                                        <defs>
                                            <filter id="Ellipse_298" x="0" y="0" width="80" height="80"
                                                filterUnits="userSpaceOnUse">
                                                <feOffset dy="3" input="SourceAlpha" />
                                                <feGaussianBlur stdDeviation="3" result="blur" />
                                                <feFlood flood-opacity="0.161" />
                                                <feComposite operator="in" in2="blur" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                        </defs>
                                        <g id="Group_3125" data-name="Group 3125" transform="translate(2495 -4718)">
                                            <g transform="matrix(1, 0, 0, 1, -2495, 4718)" filter="url(#Ellipse_298)">
                                                <circle id="Ellipse_298-2" data-name="Ellipse 298" cx="31" cy="31" r="31"
                                                    transform="translate(9 6)" fill="#fff" />
                                            </g>
                                            <g id="Group_2828" data-name="Group 2828"
                                                transform="translate(-495.899 347.101)">
                                                <line id="Line_328" data-name="Line 328" y2="20"
                                                    transform="translate(-1959.101 4397.899)" fill="none" stroke="#9900e4"
                                                    stroke-linecap="round" stroke-width="3" />
                                                <line id="Line_329" data-name="Line 329" x2="20"
                                                    transform="translate(-1969.101 4407.899)" fill="none" stroke="#9900e4"
                                                    stroke-linecap="round" stroke-width="3" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" md="12" lg="6" xl="4" class="" style="padding: 10px;">
                            <div class="card-methods" @click="stepNequi()">
                                <div class="card-icon">
                                    <i class="pi pi-money-bill" style="color:  rgb(255 255 255)"></i>
                                </div>
                                <div class="ml-3">
                                    <p class="mb-0 mt-3">NEQUI</p>
                                </div>
                                <div>
                                    <svg class="" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="45"
                                        viewBox="0 0 80 80">
                                        <defs>
                                            <filter id="Ellipse_298" x="0" y="0" width="80" height="80"
                                                filterUnits="userSpaceOnUse">
                                                <feOffset dy="3" input="SourceAlpha" />
                                                <feGaussianBlur stdDeviation="3" result="blur" />
                                                <feFlood flood-opacity="0.161" />
                                                <feComposite operator="in" in2="blur" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                        </defs>
                                        <g id="Group_3125" data-name="Group 3125" transform="translate(2495 -4718)">
                                            <g transform="matrix(1, 0, 0, 1, -2495, 4718)" filter="url(#Ellipse_298)">
                                                <circle id="Ellipse_298-2" data-name="Ellipse 298" cx="31" cy="31" r="31"
                                                    transform="translate(9 6)" fill="#fff" />
                                            </g>
                                            <g id="Group_2828" data-name="Group 2828"
                                                transform="translate(-495.899 347.101)">
                                                <line id="Line_328" data-name="Line 328" y2="20"
                                                    transform="translate(-1959.101 4397.899)" fill="none" stroke="#9900e4"
                                                    stroke-linecap="round" stroke-width="3" />
                                                <line id="Line_329" data-name="Line 329" x2="20"
                                                    transform="translate(-1969.101 4407.899)" fill="none" stroke="#9900e4"
                                                    stroke-linecap="round" stroke-width="3" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-card>

            <v-card v-if="step === 2" style="box-shadow:none; padding: 10px;">
                <div v-if="payWith === 'card' " style="margin: 2%; overflow-y: scroll;">
                            <div>
                                <v-row no-gutters class="mt-0">
                                    <v-col cols="12" md="12" lg="6" xl="6">
                                        <div class="card-form mr-1" :style="$vuetify.display.xl ? 'margin-left: 2vh' : $vuetify.display.md ? 'margin: auto !important' : ''">
                                            <div class="card-form__inner">
                                                <div class="card-input">
                                                    <label for="cardNumber" class="card-input__label">Número tarjeta</label>
                                                    <input type="text" id="cardNumber" class="card-input__input"
                                                        v-model="cardNumber" v-on:focus="focusInput" v-on:blur="blurInput"
                                                        data-ref="cardNumber" autocomplete="off" :maxlength="16"
                                                        v-on:keypress="isNumber($event)">
                                                </div>
                                                <div class="card-input">
                                                    <label for="cardName" class="card-input__label">Nombre titular</label>
                                                    <input type="text" id="cardName" class="card-input__input"
                                                        v-model="cardName" v-on:focus="focusInput" v-on:blur="blurInput"
                                                        data-ref="cardName" autocomplete="off">
                                                </div>
                                                <div class="card-form__row">
                                                    <div class="card-form__col">
                                                        <div class="card-form__group">
                                                            <label for="cardMonth" class="card-input__label">Fecha
                                                                expiración</label>
                                                            <input type="text" class="card-input__input" id="cardMonth"
                                                                v-model="cardMonth" autocomplete="off"
                                                                v-on:focus="focusInput" placeholder="Mes"
                                                                v-on:blur="blurInput" :maxlength="2"
                                                                v-on:keypress="isNumber($event)" data-ref="cardDate">
                                                            <input type="text" class="card-input__input" id="cardYear"
                                                                v-model="cardYear" autocomplete="off"
                                                                v-on:focus="focusInput" placeholder="Año"
                                                                v-on:keypress="isNumber($event)" v-on:blur="blurInput"
                                                                :maxlength="2">
                                                        </div>
                                                    </div>
                                                    <div class="card-form__col -cvv">
                                                        <div class="card-input">
                                                            <label for="cardCvv" class="card-input__label">CVV</label>
                                                            <input type="text" class="card-input__input" id="cardCvv"
                                                                maxlength="4" v-model="cardCvv" v-on:focus="flipCard(true)"
                                                                v-on:blur="flipCard(false)" autocomplete="off">
                                                        </div>
                                                    </div>
                                                </div>
                                                <button v-if="$vuetify.display.lg || $vuetify.display.xl" :disabled="progressLinear" @click="validateFields()"
                                                    class="card-form__button"
                                                    style="color: white; background-color: #7c00dc;">
                                                    Continuar
                                                </button>
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col cols="12"  md="12" lg="6" xl="6" class="">
                                        <div class="card-list" style="margin-top: 6vh;">
                                            <div class="card-item" v-bind:class="{ '-active': isCardFlipped }">
                                                <div class="card-item__side -front">
                                                    <div class="card-item__focus"
                                                        v-bind:class="{ '-active': focusElementStyle }"
                                                        v-bind:style="focusElementStyle" ref="focusElement"></div>
                                                    <div class="card-item__cover">
                                                        <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'"
                                                            class="card-item__bg">
                                                    </div>
                                                    <div class="card-item__wrapper">
                                                        <div class="card-item__top">
                                                            <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                                                                class="card-item__chip">
                                                            <!-- <div class="card-item__type">
                                                                <transition name="slide-fade-up">
                                                                    <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
                                                                        v-if="getCardType" v-bind:key="getCardType" alt=""
                                                                        class="card-item__typeImg">
                                                                </transition>
                                                            </div> -->
                                                        </div>
                                                        <label for="cardNumber" class="card-item__number" ref="cardNumber">
                                                            <template v-if="getCardType === 'amex'">
                                                                <span v-for="(n, $index) in amexCardMask" :key="$index">
                                                                    <transition name="slide-fade-up">
                                                                        <div class="card-item__numberItem"
                                                                            v-if="$index > 4 && $index < 14 && cardNumber.length > $index && n.trim() !== ''">
                                                                            *</div>
                                                                        <div class="card-item__numberItem"
                                                                            :class="{ '-active': n.trim() === '' }"
                                                                            :key="$index"
                                                                            v-else-if="cardNumber.length > $index">
                                                                            {{ cardNumber[$index] }}
                                                                        </div>
                                                                        <div class="card-item__numberItem"
                                                                            :class="{ '-active': n.trim() === '' }" v-else
                                                                            :key="$index + 1">{{ n }}</div>
                                                                    </transition>
                                                                </span>
                                                            </template>

                                                            <template v-else>
                                                                <span v-for="(n, $index) in otherCardMask" :key="$index">
                                                                    <transition name="slide-fade-up">
                                                                        <div class="card-item__numberItem"
                                                                            v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''">
                                                                            *</div>
                                                                        <div class="card-item__numberItem"
                                                                            :class="{ '-active': n.trim() === '' }"
                                                                            :key="$index"
                                                                            v-else-if="cardNumber.length > $index">
                                                                            {{ cardNumber[$index] }}
                                                                        </div>
                                                                        <div class="card-item__numberItem"
                                                                            :class="{ '-active': n.trim() === '' }" v-else
                                                                            :key="$index + 1">{{ n }}</div>
                                                                    </transition>
                                                                </span>
                                                            </template>
                                                        </label>
                                                        <div class="card-item__content">
                                                            <label for="cardName" class="card-item__info" ref="cardName">
                                                                <div class="card-item__holder">Titular</div>
                                                                <transition name="slide-fade-up">
                                                                    <div class="card-item__name" v-if="cardName.length"
                                                                        key="1">
                                                                        <transition-group name="slide-fade-right">
                                                                            <span class="card-item__nameItem"
                                                                                v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')"
                                                                                v-if="$index === $index"
                                                                                v-bind:key="$index + 1">{{ n }}</span>
                                                                        </transition-group>
                                                                    </div>
                                                                    <div class="card-item__name" v-else key="2">Nombre
                                                                    </div>
                                                                </transition>
                                                            </label>
                                                            <div class="card-item__date" ref="cardDate">
                                                                <label for="cardMonth" class="card-item__dateTitle"
                                                                    style="margin-bottom: 0; !important">Expira</label>
                                                                <label for="cardMonth" class="card-item__dateItem">
                                                                    <transition name="slide-fade-up">
                                                                        <span v-if="cardMonth" v-bind:key="cardMonth">{{
                                                                            cardMonth }}</span>
                                                                        <span v-else key="2">MM</span>
                                                                    </transition>
                                                                </label>
                                                                /
                                                                <label for="cardYear" class="card-item__dateItem">
                                                                    <transition name="slide-fade-up">
                                                                        <span v-if="cardYear" v-bind:key="cardYear">{{
                                                                            (cardYear) }}</span>
                                                                        <span v-else key="2">YY</span>
                                                                    </transition>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-item__side -back" style="margin-top: 0.5vh;">
                                                    <div class="card-item__cover">
                                                        <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'"
                                                            class="card-item__bg">
                                                    </div>
                                                    <div class="card-item__band"></div>
                                                    <div class="card-item__cvv">
                                                        <div class="card-item__cvvTitle">CVV</div>
                                                        <div class="card-item__cvvBand">
                                                            <span v-for="(n, $index) in cardCvv" :key="$index">
                                                                *
                                                            </span>
                                                        </div>
                                                        <!-- <div class="card-item__type">
                                                            <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
                                                                v-if="getCardType" class="card-item__typeImg">
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-3 ml-1">
                                                <input type="checkbox" id="demoCheckbox" name="checkbox" value="1"
                                                    class="mr-1" v-model="checkbox">
                                                <a :href="link_pdf" target="_blank" for="demoCheckbox"
                                                    style="text-decoration:none; color: #000000 !important; text-align: center;">Acepto haber
                                                    leído los
                                                    <strong>términos y condiciones
                                                        y la política de
                                                        privacidad</strong> para hacer este pago.</a>
                                            </div>
                                            <div style="margin-left: 10%; margin-right: 10%;"  v-if="!$vuetify.display.lg && !$vuetify.display.xl">
                                                <button :disabled="progressLinear" @click="validateFields()"
                                                    class="card-form__button"
                                                    style="color: white; background-color: #7c00dc;">
                                                    Continuar
                                                </button>
                                            </div>
                                            <!-- <div v-if="!$vuetify.breakpoint.lg || !$vuetify.breakpoint.xl" class="mt-4 mb-0" style="margin-left: 20%;margin-right: 20%;">
                                <v-progress-linear v-if="progressLinear" v-model="incrementValue" striped color="#7c00dc"
                                    height="20"></v-progress-linear>
                            </div> -->
                                            <!-- <div v-if="!$vuetify.breakpoint.lg || !$vuetify.breakpoint.xl" class="center container" style="text-align: center;">
                                        <v-alert v-model="alertCard" dense outlined color="purple" class="mt-3" closable>
                                            {{ messageCard }}
                                        </v-alert>
                                    </div> -->
                                            
                                        </div>

                                    </v-col>
                                </v-row>
                            </div>
                            <div v-if="$vuetify.display.lg || $vuetify.display.xl" class="mt-4 mb-0" style="margin-left: 20%;margin-right: 20%;">
                                <v-progress-linear  v-if="progressLinear" v-model="incrementValue" striped color="#7c00dc"
                                    height="20"></v-progress-linear>
                            </div>
                            <div v-if="$vuetify.display.lg || $vuetify.display.xl" class="center container" style="text-align: center;">
                                <v-alert v-model="alertCard" dense outlined color="purple" class="mt-3" closable>
                                    {{ messageCard }}
                                </v-alert>
                            </div>
                        
                            <!-- <div>
                                <v-btn class="mt-4 mb-0" @click="step = 1">
                                    Volver
                                </v-btn>
                            </div> -->
                        </div>
                        <div v-if="payWith === 'nequi'" style="margin: 2%; margin-left: 15%; margin-right: 15%;">
                            <h4 v-if="route?.package" style="text-align: left;">{{ route.package.price ?
                                `Total a pagar: $${this.total_price.toLocaleString('es-CO')}` : 'Sin precio' }}
                            </h4>
                          
                            <v-row no-gutters class="mt-0">
                                <v-col cols="12" xl="6" lg="6" md="6" style="text-align: left;">
                                    <v-text-field class="ml-1 mr-1" ref="company" :rules="[required]" label="Nombre titular"
                                        background-color="white" hide-details filled
                                        v-model="nequi_info.name"></v-text-field>
                                </v-col>
                                <v-col cols="12" xl="6" lg="6" md="6"  class="" style="text-align: right;">
                                    <v-text-field class="ml-1 mr-1" ref="company" :rules="[required]" v-on:keypress="isNumber($event)"
                                        label="Número nequi" background-color="white" :maxlength="10" hide-details filled
                                        v-model="nequi_info.phone_number"></v-text-field>
                                </v-col>
                            </v-row>
                            <div class="mt-3">
                                <input type="checkbox" id="demoCheckbox" name="checkbox" value="1" class="mr-1"
                                    v-model="checkbox">
                                <a :href="link_pdf" target="_blank" for="demoCheckbox"
                                    style="text-decoration:none; color: #000000 !important;">Acepto haber leído los
                                    <strong>términos y condiciones
                                        y la política de
                                        privacidad</strong> para hacer este pago.</a>
                            </div>
                            <div class="mt-4">
                                <div class="ml-2 d-flex" style="justify-content: center;">
                                    <v-btn class="ml-1 mr-1 mt-1" @click="validateFieldsNequi(nequi_info)"
                                        style=" background-color: #7c00dc; color: white;">
                                        Continuar
                                    </v-btn>
                                    <v-btn class="ml-1 mr-1 mt-1" @click="cancelStep2Nequi()">
                                        Cancelar
                                    </v-btn>
                                </div>

                            </div>
                            <div v-if="nequiLinear" class="mt-4 mb-0" style="margin-left: 20%;margin-right: 20%;">
                                <p>Por favor acepta la suscripción de nequi en tu celular</p>
                                <v-progress-linear v-model="incrementValue" striped color="#7c00dc"
                                    height="20"></v-progress-linear>
                            </div>
                            <div v-if="alertCard" class="center container mb-0" style="text-align: center;">
                                <v-alert v-model="alertCard" dense outlined color="purple" class="mb-0 mt-0" closable>
                                    {{ messageCard }}
                                </v-alert>
                            </div>
                        </div>
            </v-card>

            <v-card v-if="step === 3" style="box-shadow:none; padding: 10px; ">
                <div v-if="payWith === 'card'" style="overflow-y: scroll;">
                            <div v-if="pay_success === false">
                                <h4>Finalizar comprar</h4>
                                <div class="mt-4">
                                    <v-row no-gutters class="mt-0 mb-2">
                                        <v-col cols="12" md="12" lg="6" xl="6" >
                                            <v-row no-gutters class="mt-0">
                                                <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="ml-3" style="text-align: left;">
                                                    <p class="mt-0 mb-0"><strong>{{ 'Ruta a adquirir' }}</strong></p>
                                                </v-col>
                                                <v-col v-if="!$vuetify.display.xs" cols="4" class="" style="text-align: right;">
                                                    <p class="mt-0 mb-0"><strong>{{ 'Paquete' }}</strong></p>
                                                </v-col>
                                             
                                            </v-row>
                                            <v-row no-gutters class="mt-3">
                                                <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="ml-3" style="text-align: left;">
                                                    <p class="mt-0 mb-0">{{ route.route.title ? route.route.title : 'Sin nombre'
                                                    }}
                                                    </p>
                                                    <ul  v-if="route?.package" v-for="(item, index) in route.package.includes"
                                :key="index" class="mt-3">
                                                        <li>{{ item }}</li>
                                                    </ul>
                                                    <p v-else>
                                {{ route.route.description }}

                            </p>
                                                </v-col>
                                                <v-col v-if="$vuetify.display.xs" cols="12" class="ml-3 mt-3" style="text-align: left;">
                                        <p class="mt-0 mb-0"><strong>{{ 'Precio' }}</strong></p>
                                    </v-col>
                                    <v-col cols="12" v-if="$vuetify.display.xs" class="ml-3 mt-2" style="text-align: left;">
                                        <p class="mt-0 mb-0" >{{this.total_price ?
                                `$${this.total_price.toLocaleString('es-CO')}` : 'Sin precio' }}</p>
                            
                                    </v-col>


                                    <v-col cols="4" v-if="!$vuetify.display.xs" class="ml-3" style="text-align: right;">
                                        <p class="mt-0 mb-0" >{{ this.total_price ?
                                `$${this.total_price.toLocaleString('es-CO')}` : 'Sin precio' }}</p>
                   
                                    </v-col>
                                 
                                            </v-row>
                                        </v-col>
                                        <v-col cols="12" md="12" lg="6" xl="6" class="mt-3">
                                            <div class="card-list">
                                                <div class="card-item" v-bind:class="{ '-active': isCardFlipped }"
                                                    :style="$vuetify.display.xl ? 'margin-right: 1% !important;' : ''">
                                                    <div class="card-item__side -front" style="box-shadow: none;">
                                                        <div class="card-item__focus"
                                                            v-bind:class="{ '-active': focusElementStyle }"
                                                            v-bind:style="focusElementStyle" ref="focusElement"></div>
                                                        <div class="card-item__cover">
                                                            <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'"
                                                                class="card-item__bg">
                                                        </div>
                                                        <div class="card-item__wrapper">
                                                            <div class="card-item__top">
                                                                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                                                                    class="card-item__chip">
                                                                <!-- <div class="card-item__type">
                                                                <transition name="slide-fade-up">
                                                                    <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
                                                                        v-if="getCardType" v-bind:key="getCardType" alt=""
                                                                        class="card-item__typeImg">
                                                                </transition>
                                                            </div> -->
                                                            </div>
                                                            <label for="cardNumber" class="card-item__number"
                                                                ref="cardNumber">
                                                                <template v-if="getCardType === 'amex'">
                                                                    <span v-for="(n, $index) in amexCardMask" :key="$index">
                                                                        <transition name="slide-fade-up">
                                                                            <div class="card-item__numberItem"
                                                                                v-if="$index > 4 && $index < 14 && cardNumber.length > $index && n.trim() !== ''">
                                                                                *</div>
                                                                            <div class="card-item__numberItem"
                                                                                :class="{ '-active': n.trim() === '' }"
                                                                                :key="$index"
                                                                                v-else-if="cardNumber.length > $index">
                                                                                {{ cardNumber[$index] }}
                                                                            </div>
                                                                            <div class="card-item__numberItem"
                                                                                :class="{ '-active': n.trim() === '' }"
                                                                                v-else :key="$index + 1">{{ n }}</div>
                                                                        </transition>
                                                                    </span>
                                                                </template>

                                                                <template v-else>
                                                                    <span v-for="(n, $index) in otherCardMask"
                                                                        :key="$index">
                                                                        <transition name="slide-fade-up">
                                                                            <div class="card-item__numberItem"
                                                                                v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''">
                                                                                *</div>
                                                                            <div class="card-item__numberItem"
                                                                                :class="{ '-active': n.trim() === '' }"
                                                                                :key="$index"
                                                                                v-else-if="cardNumber.length > $index">
                                                                                {{ cardNumber[$index] }}
                                                                            </div>
                                                                            <div class="card-item__numberItem"
                                                                                :class="{ '-active': n.trim() === '' }"
                                                                                v-else :key="$index + 1">{{ n }}</div>
                                                                        </transition>
                                                                    </span>
                                                                </template>
                                                            </label>
                                                            <div class="card-item__content">
                                                                <label for="cardName" class="card-item__info"
                                                                    ref="cardName">
                                                                    <div class="card-item__holder">Titular</div>
                                                                    <transition name="slide-fade-up">
                                                                        <div class="card-item__name" v-if="cardName.length"
                                                                            key="1">
                                                                            <transition-group name="slide-fade-right">
                                                                                <span class="card-item__nameItem"
                                                                                    v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')"
                                                                                    v-if="$index === $index"
                                                                                    v-bind:key="$index + 1">{{ n }}</span>
                                                                            </transition-group>
                                                                        </div>
                                                                        <div class="card-item__name" v-else key="2">Nombre
                                                                        </div>
                                                                    </transition>
                                                                </label>
                                                                <div class="card-item__date" ref="cardDate">
                                                                    <label for="cardMonth" class="card-item__dateTitle"
                                                                        style="margin-bottom: 0; !important">Expira</label>
                                                                    <label for="cardMonth" class="card-item__dateItem">
                                                                        <transition name="slide-fade-up">
                                                                            <span v-if="cardMonth" v-bind:key="cardMonth">{{
                                                                                cardMonth }}</span>
                                                                            <span v-else key="2">MM</span>
                                                                        </transition>
                                                                    </label>
                                                                    /
                                                                    <label for="cardYear" class="card-item__dateItem">
                                                                        <transition name="slide-fade-up">
                                                                            <span v-if="cardYear" v-bind:key="cardYear">{{
                                                                                (cardYear) }}</span>
                                                                            <span v-else key="2">YY</span>
                                                                        </transition>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-item__side -back" style="margin-top: 0.5vh;">
                                                        <div class="card-item__cover">
                                                            <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'"
                                                                class="card-item__bg">
                                                        </div>
                                                        <div class="card-item__band"></div>
                                                        <div class="card-item__cvv">
                                                            <div class="card-item__cvvTitle">CVV</div>
                                                            <div class="card-item__cvvBand">
                                                                <span v-for="(n, $index) in cardCvv" :key="$index">
                                                                    *
                                                                </span>
                                                            </div>
                                                            <!-- <div class="card-item__type">
                                                            <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'"
                                                                v-if="getCardType" class="card-item__typeImg">
                                                        </div> -->
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="!$vuetify.display.xl && !$vuetify.display.lg" class="ml-2 mt-4 d-flex justify-content-around">
                                            <v-btn :disabled="incrementLinear" v-if="pay_card_existing === false"
                                                class="ml-1 mr-1" @click="payPlan()"
                                                style=" background-color: #7c00dc; color: white;">
                                                pagar
                                            </v-btn>
                                            <v-btn :disabled="incrementLinear" v-if="pay_card_existing === true"
                                                class="ml-1 mr-1" @click="payPlanWithPaymentSource(payment_source_company)"
                                                style=" background-color: #7c00dc; color: white;">
                                                pagar
                                            </v-btn>
                                            <!-- <v-btn v-if="pay_card_existing === true" class="ml-1 mr-1" @click="step = 1">
                                            Cancelar
                                        </v-btn> -->
                                            <v-btn  class="ml-1 mr-1" @click="cancelPay">
                                                Cancelar
                                            </v-btn>
                                        </div>
                                        <div v-if="!$vuetify.display.lg && !$vuetify.display.xl" class="mt-4 mb-0"
                                    style="margin-left: 20%;margin-right: 20%;">
                                    <v-progress-linear v-if="incrementLinear === true" v-model="incrementValue" striped color="#7c00dc"
                                        height="20"></v-progress-linear>
                                </div>
                                                </div>
                                       
                                            </v-col>
                                        
                                    </v-row>
                                    <div v-if="$vuetify.display.xl || $vuetify.display.lg" class="ml-2 mt-4 d-flex" style="justify-content: center;">
                                        <v-btn :disabled="incrementLinear" v-if="pay_card_existing === false"
                                            class="ml-1 mr-1" @click="payPlan()"
                                            style=" background-color: #7c00dc; color: white;">
                                            pagar
                                        </v-btn>
                                        <v-btn :disabled="incrementLinear" v-if="pay_card_existing === true"
                                            class="ml-1 mr-1" @click="payPlanWithPaymentSource(payment_source_company)"
                                            style=" background-color: #7c00dc; color: white;">
                                            pagar
                                        </v-btn>
                                        <!-- <v-btn v-if="pay_card_existing === true" class="ml-1 mr-1" @click="step = 1">
                                            Cancelar
                                        </v-btn> -->
                                        <v-btn  class="ml-1 mr-1" @click="cancelPay">
                                            Cancelar
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                            <!-- <div v-if="alertCard" class="center container mb-0" style="text-align: center;">
                                <v-alert v-model="alertCard" dense outlined color="purple" class="mb-0 mt-0" closable>
                                    {{ messageCard }}
                                </v-alert>
                            </div> -->
                            <div v-if="$vuetify.display.lg || $vuetify.display.xl" class="mt-4 mb-0"
                                style="margin-left: 20%;margin-right: 20%;">
                                <v-progress-linear v-if="incrementLinear === true" v-model="incrementValue" striped color="#7c00dc"
                                    height="20"></v-progress-linear>
                            </div>
                            <div v-if="pay_success === true">
                                 <div v-if="data_factura !== null" class="container-recibo mb-2" :style="$vuetify.display.xs ? 'margin: 0' : ''">
                                    <v-row no-gutters class="mt-0 mb-2 header-recibo">
                                        <v-col cols="12" xl="6" lg="6" md="12" :style="!$vuetify.display.xs ? 'text-align: left;' : 'text-align: center;'">
                                            <h3>RESERVA EXITOSA</h3>
                                        </v-col>
                                        <v-col cols="12" xl="6" lg="6" md="12" :style="!$vuetify.display.xs ? 'text-align: right;' : 'text-align: center;'">
                                            <h3>COP{{ this.total_price ?
                                `$${this.total_price.toLocaleString('es-CO')}` : 'Sin precio' }}</h3>
                                          
                                        </v-col>
                                    </v-row>
                                    <p style="text-align: center;"><strong>DETALLE FACTURA</strong></p>
                                    <v-row no-gutters class="body-recibo" :style="$vuetify.display.xl ? 'padding-left: 10%; padding-right: 10%;': ''">
                                        <v-col cols="12" md="12" lg="6" xl="6" style="text-align: center;">
                                            <h4 style="color:#ababab"><strong>FECHA</strong></h4>
                                            <p><strong>{{data_factura.fecha ? data_factura.fecha : 'Sin fecha'}}</strong></p>
                                        </v-col>
                                        <v-col cols="12" md="12" lg="6" xl="6" style="text-align: center">
                                            <h4 style="color:#ababab"><strong>REFERENCIA</strong></h4>
                                            <p><strong>{{data_factura.referencia ? data_factura.referencia : 'Sin referencia'}}</strong></p>

                                        </v-col>
                                        <v-col cols="12" md="12" lg="6" xl="6" class="mt-3" style="text-align: center;">
                                            <h4 style="color:#ababab"><strong>MÉTODO</strong></h4>
                                            <p><strong>{{data_factura.metodo ? data_factura.metodo : 'Sin método'}}</strong></p>

                                        </v-col>
                                        <v-col cols="12" md="12" lg="6" xl="6" class="mt-3" style="text-align: center">
                                            <h4 style="color:#ababab"><strong>ESTADO</strong></h4>
                                            <p><strong>{{data_factura.status ? data_factura.status : 'Sin estado'}}</strong></p>
                                        </v-col>
                                    </v-row>
                                 <hr class="mt-0 mb-0"/>
                                 <div class="" style="padding: 2%">
                                    <div class="summary-recibo">
                                     <div v-if="!$vuetify.display.xs && !$vuetify.display.sm" class="card-icon">
                                                <i class="fa-solid fa-receipt fa-xl"
                                                    style="color:  rgb(255 255 255)"></i>
                                            </div>
                                            <div class="ml-3">
                                                <p class="mb-0 mt-3">{{ route.route.title ? route.route.title : 'Sin nombre' }}</p>
                                            </div>
                                            <div v-if="!$vuetify.display.xs && !$vuetify.display.sm"  class="mr-3">
                                              
                                              <p class="mt-3 mb-0" v-if="route?.package">{{ this.total_price ?
                                `$${this.total_price.toLocaleString('es-CO')}` : 'Sin precio' }}</p>

                          
                                            </div>
                                    </div>
                                 </div>
                                </div>
                                <div class="d-flex" style="justify-content: center;">
                                  <v-btn class="mb-1 mt-3" @click="endPayment()">
                                    Cerrar
                                </v-btn>   
                                </div>
                                
                            </div>
                        </div>
                        <div v-if="payWith === 'nequi'">
                            <div v-if="pay_success === false">
                                <h4>Finalizar comprar</h4>
                                <div class="mt-4">
                                    <v-row no-gutters class="mt-0 mb-2 ml-2">
                                        <v-col cols="12">
                                            <v-row no-gutters class="mt-0">
                                                <v-col  cols="12" sm="4" md="4" lg="4" xl="4" class="ml-3" style="text-align: left;">
                                                    <p class="mt-0 mb-0"><strong>{{ 'Ruta a adquirir' }}</strong></p>
                                                </v-col>
                                                <v-col v-if="!$vuetify.display.xs" cols="4" class="" style="text-align: right;">
                                                    <p class="mt-0 mb-0"><strong>{{ 'Precio' }}</strong></p>
                                                </v-col>
                                             
                                            </v-row>
                                            <v-row no-gutters class="mt-3">
                                                <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="ml-3" style="text-align: left;">
                                                    <p class="mt-0 mb-0">{{ route.route.title ? route.route.title : 'Sin nombre'
                                                    }}
                                                    </p>
                                                    <ul  v-if="route?.package" v-for="(item, index) in route.package.includes"
                                :key="index" class="mt-3">
                                                        <li>{{ item }}</li>
                                                    </ul>
                                                    <p v-else>
                                {{ route.route.description }}

                            </p>
                                                </v-col>
                                                <v-col v-if="$vuetify.display.xs" cols="12" class="ml-3 mt-3" style="text-align: left;">
                                        <p class="mt-0 mb-0"><strong>{{ 'Precio' }}</strong></p>
                                    </v-col>
                                    <v-col cols="12" v-if="$vuetify.display.xs" class="ml-3 mt-2" style="text-align: left;">
                                        <p class="mt-0 mb-0" >{{ this.total_price ?
                                `$${this.total_price.toLocaleString('es-CO')}` : 'Sin precio' }}</p>
                           
                                    </v-col>


                                    <v-col cols="4" v-if="!$vuetify.display.xs" class="ml-3" style="text-align: right;">
                                        <p class="mt-0 mb-0" v-if="route?.package">{{ this.total_price ?
                                `$${this.total_price.toLocaleString('es-CO')}` : 'Sin precio' }}</p>
                          
                                    </v-col>
                                 
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <div class="ml-2 mt-4 d-flex" style="justify-content: center;">
                                        <v-btn :disabled="incrementLinear"
                                            class="ml-1 mr-1" @click="payPlanNequi()"
                                            style=" background-color: #7c00dc; color: white;">
                                            pagar
                                        </v-btn>
                                       
                                        <v-btn class="ml-1 mr-1" @click="cancelPay">
                                            Cancelar
                                        </v-btn>

                                    </div>
                                </div>
                            </div>
                            <div v-if="incrementLinear === true" class="mt-4 mb-0"
                                style="margin-left: 20%;margin-right: 20%;">
                                <v-progress-linear v-model="incrementValue" striped color="#7c00dc"
                                    height="20"></v-progress-linear>
                            </div>
                            <div v-if="pay_success === true">
                                <div v-if="data_factura !== null" class="container-recibo mb-2" :style="$vuetify.display.xs ? 'margin: 0' : ''">
                                    <v-row no-gutters class="mt-0 mb-2 header-recibo">
                                        <v-col cols="12" xl="6" lg="6" md="12" :style="!$vuetify.display.xs ? 'text-align: left;' : 'text-align: center;'">
                                            <h3>RESERVA EXITOSA</h3>

                                        </v-col>
                                        <v-col cols="12" xl="6" lg="6" md="12" :style="!$vuetify.display.xs ? 'text-align: right;' : 'text-align: center;'">
                                            <h3 v-if="route?.package">COP{{ this.total_price ?
                                `$${this.total_price.toLocaleString('es-CO')}` : 'Sin precio' }}</h3>
                                    
                                        </v-col>
                                    </v-row>
                                    <p style="text-align: center;"><strong>DETALLE FACTURA</strong></p>
                                    <v-row no-gutters class="body-recibo" :style="$vuetify.display.xl ? 'padding-left: 10%; padding-right: 10%;': ''">
                                        <v-col cols="12" md="12" lg="6" xl="6" style="text-align: center;">
                                            <h4 style="color:#ababab"><strong>FECHA</strong></h4>
                                            <p><strong>{{data_factura.fecha ? data_factura.fecha : 'Sin fecha'}}</strong></p>
                                        </v-col>
                                        <v-col cols="12" md="12" lg="6" xl="6" style="text-align: center">
                                            <h4 style="color:#ababab"><strong>REFERENCIA</strong></h4>
                                            <p><strong>{{data_factura.referencia ? data_factura.referencia : 'Sin referencia'}}</strong></p>
                                        </v-col>
                                        <v-col cols="12" md="12" lg="6" xl="6" class="mt-3" style="text-align: center;">
                                            <h4 style="color:#ababab"><strong>MÉTODO</strong></h4>
                                            <p><strong>{{data_factura.metodo ? data_factura.metodo : 'Sin método'}}</strong></p>
                                        </v-col>
                                        <v-col cols="12" md="12" lg="6" xl="6" class="mt-3" style="text-align: center">
                                            <h4 style="color:#ababab"><strong>ESTADO</strong></h4>
                                            <p><strong>{{data_factura.status ? data_factura.status : 'Sin estado'}}</strong></p>
                                        </v-col>
                                    </v-row>
                                 <hr class="mt-0 mb-0"/>
                                 <div class="" style="padding: 2%">
                                    <div class="summary-recibo">
                                     <div v-if="!$vuetify.display.xs && !$vuetify.display.sm" class="card-icon">
                                                <i class="fa-solid fa-receipt fa-xl"
                                                    style="color:  rgb(255 255 255)"></i>
                                            </div>
                                            <div class="ml-3">
                                                <p class="mb-0 mt-3">{{ route.route.title ? route.route.title : 'Sin nombre' }}</p>
                                            </div>
                                            <div v-if="!$vuetify.display.xs && !$vuetify.display.sm"  class="mr-3">
                                              
                                              <p class="mt-3 mb-0" >{{ this.total_price ?
                                `$${this.total_price.toLocaleString('es-CO')}` : 'Sin precio' }}</p>
                    
                                            </div>
                                    </div>
                                 </div>
                                </div>
                                <div class="d-flex" style="justify-content: center;">
<v-btn class="mb-1 mt-3" @click="endPayment()">
                                    Cerrar
                                </v-btn>
                                </div>
                                
                            </div>

                        </div>
            </v-card>

            <Dialog v-model:visible="dialog_declined"  modal
            header="Transacción rechazada" :style="$vuetify.display.xs ? { width: '100%' } : { width: '70%' }">
                <div class="container" >
                    <v-row no-gutters class="mt-3">
                        <v-col cols="12" md="12" lg="6" xl="6" class=""
                            style=" padding: 10px;">
                            <div class="card-methods" @click="this.$router.push('/')">
                                <div class="card-icon">
                                    <i class="fa-regular fa-credit-card  fa-xl" style="color:  rgb(255 255 255)"></i>
                                </div>
                                <div class="ml-3">
                                    <p class="mb-0 mt-1">{{ 'Cancelar pago' }}</p>
                                </div>
                                <div>
                                    <p></p>
                                </div>
                          

                            </div>
                        </v-col>
                        <v-col cols="12" md="12" lg="6" xl="6" class="" style=" padding: 10px;">
                            <div class="card-methods" @click="tryAgain()">
                                <div class="card-icon">
                                    <i class="fa-solid fa-cart-shopping fa-xl" style="color:  rgb(255 255 255)"></i>
                                </div>
                                <div class="ml-3">
                                    <p class="mb-0 mt-1">{{ 'Probar otro método de pago' }}</p>
                                </div>
                                <div>
                                    <p></p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                </Dialog>


        </div>
    </div>
</template>
  
<script>
import moment from 'moment'
import axios from "axios";
import httpServices from "../services/httpServices";

export default {
    name: "Prices",
    components: {},
    data() {
        return {
            httpService: new httpServices(),
            step: 1, //////////////1
            total_price: null,
            moment: moment,
            exist_card: false,
            exist_nequi: false,
            route: this.$store.state.route_to_buy,
            payWith: null, ///////null
            card_info: {},
            nequi_info: {},
            checkbox: null,
            link_pdf: null,
            pre_token: null,
            currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
            cardName: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",
            minCardYear: new Date().getFullYear(),
            amexCardMask: "###############",
            otherCardMask: "################",
            cardNumberTemp: "",
            isCardFlipped: false,
            focusElementStyle: null,
            isInputFocused: false,
            progressLinear: false,
            incrementValue: 1,
            incrementLinear: false,
            alertCard: false,
            messageCard: null,
            // data_company: this.$store.state.data_company,
            // base_url: process.env.VUE_APP_API_PAYMENT,
            token: null,
            id_fuente: null,
            pay_success: false, ////////false
            interval: null,
            // credit_card: this.$store.state.creditsCard,
            dialog_my_cards: false,
            pay_card_existing: false,
            payment_source_company: null,

            //NEQUI 
            token_nequi: null,
            nequiLinear: false,
            // old_nequi: this.$store.state.paymentNequi,
            dialog_my_nequis: false,
            payment_source_nequi: null,
            pay_nequi_existing: false,

            //Factura
            data_factura: null,

            //dialog_declined
            dialog_declined: false

        };
    },
    created() {
        try {
            if (this.$store.state.route_to_buy === null) {
                this.$router.push('/')
            }else{
                this.priceTotal(this.route)
            }
        } catch (error) {
            console.log("payment created ~ error:", error);
        }
    },
    mounted() {
        try {
            // this.cardNumberTemp = this.otherCardMask;
            // this.setCreditCard(this.$store.state.creditsCard)
            // this.setNumberNequi(this.$store.state.paymentNequi)
        } catch (error) {
            console.log("Payment.vue:448 ~ mounted ~ error:", error)
        }
    },
    computed: {
        getCardType() {
            let number = this.cardNumber;
            let re = new RegExp("^4");
            if (number.match(re) != null) return "visa";
            re = new RegExp("^(34|37)");
            if (number.match(re) != null) return "amex";
            re = new RegExp("^5[1-5]");
            if (number.match(re) != null) return "mastercard";
            re = new RegExp("^6011");
            if (number.match(re) != null) return "discover";
            re = new RegExp('^9792')
            if (number.match(re) != null) return 'troy'
            return "visa"; // default type
        },
        generateCardNumberMask() {
            return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
        },
        minCardMonth() {
            if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
            return 1;
        }
    },
    watch: {
        cardYear() {
            if (this.cardMonth < this.minCardMonth) {
                this.cardMonth = "";
            }
        }
    },

    methods: {
        async priceTotal(route) {
            console.log("🚀 ~ file: CarouselRutas.vue:557 ~ priceTotal ~ route:", route)
            try {
                let number_books
                let price
                if (route.more_books?.length > 0) {
                    number_books = route.more_books.length + 1
                } else {
                    number_books = 1
                }
                if (route?.package?.price) {
                    price = route.package.price
                } else {
                    price = route.route.price
                }
                let result = price * number_books
                this.total_price = result

            } catch (error) {
                console.log("priceTotal ~ error:", error)
            }
        },
        async createReserva(){
            try {
                const create_reserva = await this.httpService.postRequest('api/v1/clients/bookRoute', this.route);
                console.log("🚀 ~ file: Payment.vue:1020 ~ createReserva ~ create_reserva:", create_reserva)
                if(create_reserva.error){

                }else if(!create_reserva.error && !create_reserva.data){

                }else{

                }
            } catch (error) {
                console.log("createReserva ~ error:", error)
            }
        },
        async createNewNequi() {
            try {
                this.dialog_my_nequis = false
                const token_prefirmado = await axios.get('token_prefirmado?test=true', { baseURL: this.base_url });
                let data = token_prefirmado.data
                let token = data.data.token
                this.pre_token = token.acceptance_token
                this.link_pdf = token.permalink
                this.step = 2
                this.payWith = 'nequi'
                this.nequi_info = {}
            } catch (error) {
                console.log("createNewNequi ~ error:", error);
            }
        },
        selectNequi(nequi, index) {
            try {
                if (nequi !== null && index !== null) {
                    this.dialog_my_nequis = false
                    this.id_fuente = nequi.fuente_id
                    this.step = 3
                    this.payWith = 'nequi'
                }
            } catch (error) {
                console.log("selectNequi error:", error)
            }
        },
        async payPlanNequi() {
            try {
                if (this.id_fuente !== null) {
                    this.incrementLinear = true
                    this.incremetLinear();
                let price_normal = this.total_price
                    let price = price_normal + '00'
                    let amount = parseInt(price)
                    let email = this.route.client.email
                    let reference = moment().format()
                    let pay = {
                        "amount_in_cents": amount,
                        "currency": "COP",
                        "client_document": this.route.client.document,
                        "reference": email + reference,
                        "customer_email": email,
                        "payment_source_id": this.id_fuente.toString(),
                        "test": true,
                        "route": this.route.route
                    }
                    const create_pay = await this.httpService.postRequest('api/v1/payment/rec_pay', pay)
                    if (create_pay.error) {
                        this.incrementLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                    } else if (!create_pay.data) {
                        this.incrementLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                    } else {
                        const data = create_pay.data
                        let id_pay = data.id
                        if (data.status === 'PENDING') {
                            await this.payStatus(id_pay);
                        } else if (data.status === 'DECLINED') {
                            this.incrementLinear = false
                        } else {

                        }
                    }
                }
            } catch (error) {
                console.log("payPlanNequi ~ error:", error);
            }
        },
        validateFieldsNequi(nequi_info) {
            try {
                if (this.checkbox === true) {
                    let errors = []
                    if (!nequi_info.name || nequi_info.name === '') {
                        errors.push('nombre titular');
                    }
                    if (!nequi_info.phone_number || nequi_info.phone_number?.length < 10 || nequi_info.phone_number === '') {
                        errors.push('número');
                    }
                    if (errors.length > 0) {
                        this.nequiLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                        let string = ""
                        errors.forEach(error => {
                            string = string + `${error}, `
                        })
                        let message = 'Completa correctamente los campos ' + string
                        let messagetoshow = message.substring(0, message.length - 2);
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: messagetoshow, life: 6000 });
                    } else {
                        this.nequiLinear = true
                        this.incremetLinear();
                        this.registerNequi(nequi_info)
                    }
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Acepta los términos y condiciones', life: 5000 });
                }
            } catch (error) {
                console.log("validateFields ~ error:", error);
            }
        },
        cancelStep2Nequi() {
            try {
                this.step = 1
                this.nequiLinear = false
                clearInterval(this.interval)
                this.incrementValue = 0
                this.nequi_info = {}
                this.checkbox = null
            } catch (error) {
                console.log("cancelStep2Nequi ~ error:", error);
            }
        },
        async registerNequi(nequi) {
            try {
                const nequi_data = {
                    "name": nequi.name,
                    "phone_number": nequi.phone_number,
                    "test": true
                }
                
                const tokenization_nequi = await this.httpService.postRequest('api/v1/payment/nequi/tokenization', nequi_data)
                if (tokenization_nequi.error) {
                    this.nequiLinear = false
                    clearInterval(this.interval)
                    this.incrementValue = 0
                } else {
                    const data = tokenization_nequi.data
                    this.checkNequiStatus(data.id)
                }
            } catch (error) {
                console.log("registerNequi ~ error:", error)
            }
        },
        async checkNequiStatus(id) {
            try {
                if (id !== null) {
                    const nequi_data = {
                        "token": id,
                        "test": true
                    }
                    
                    const check_status = await this.httpService.postRequest('api/v1/payment/nequi/status', nequi_data)
                    if (check_status.error) {
                        this.nequiLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                    } else {
                        let status = check_status.data.status
                        if (status === 'PENDING') {
                            this.checkNequiStatus(id)
                        } else if (status === 'ERROR') {
                            this.nequiLinear = false
                            clearInterval(this.interval)
                            this.incrementValue = 0
                        } else if (status === 'APPROVED') {
                            console.log('Fuente pago nequi')
                            this.fuentePagoNequi(id, this.route.client)
                        }
                    }
                }
            } catch (error) {
                console.log("checkNequiStatus ~ error:", error)
            }
        },
        async fuentePagoNequi(id, client) {
            try {
                let fuente_pago = {
                    "type": "NEQUI",
                    "token": id,
                    "client_document": client.document,
                    "customer_email": client.email,
                    "app_id": "demo",
                    "acceptance_token": this.pre_token,
                    "test": true
                }
                
               
                const create_payment_source = await this.httpService.postRequest('api/v1/payment/nequi/fuente_pago', fuente_pago)
                if (create_payment_source.error) {
                    this.pre_token = null
                } else if (!create_payment_source.data) {
                    this.pre_token = null
                } else {
                    this.pre_token = null
                    let data = create_payment_source.data
                    if (data.status === "AVAILABLE") {
                        this.$store.dispatch('addNequi', data)
                        this.old_nequi = this.$store.state.paymentNequi
                        this.nequiLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                        this.id_fuente = data.fuente_id
                        this.step = 3
                    }
                }
            } catch (error) {
                console.log("fuentePagoNequi ~ error:", error);
            }
        },
        async payPlanWithPaymentSource(payment_source) {
            try {
                if (payment_source !== null) {
                    this.incrementLinear = true
                    this.incremetLinear()
                let price_normal = this.total_price
                    let price = price_normal + '00'
                    let amount = parseInt(price)
                    let email = this.route.client.email
                let reference = moment().format()
                    let pay = {
                        company_id: this.route.client.document,
                        reference:  email + reference,
                        amount_in_cents: amount,
                        customer_email: email,
                        "payment_source_id": payment_source.fuente_id.toString(),
                        "test": true,
                        "route": this.route.route
                    }
                    const create_pay = await  this.httpService.postRequest('api/v1/payment/rec_pay', pay)
                    if (create_pay.error) {
                        this.incrementLinear = false
                    } else if (!create_pay.data) {
                        this.incrementLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                    } else {
                        const data = create_pay.data
                        let id_pay = data.id
                        if (data.status === 'PENDING') {
                            await this.payStatus(id_pay);
                        } else {
                            this.incrementLinear = false
                            clearInterval(this.interval)
                        }
                    }
                }
            } catch (error) {
                console.log("payPlanWithPaymentSource ~ error:", error);
            }
        },
        async descountCredits() {
            try {
                let buy_plan = await this.makeRequestService.postRequest('api/v1/wallet/buyPlan', { plan_id: this.plan._id });
                if (buy_plan.error) {
                    console.log(buy_plan, 'Error al comprar plan');
                } else if (!buy_plan.error && !buy_plan.data) {
                    console.log(buy_plan, 'error null data null');
                } else {
                    this.$store.dispatch('updateTokens', buy_plan.data);
                    this.$store.dispatch('currentPlan', buy_plan.plan);
                }
            } catch (error) {
                console.log(" descountCredits ~ error:", error)
            }
        },
        selectCard(card, index) {
            try {
                if (card !== null && index !== null) {
                    let data_card = card.tdc_data
                    let string = '*****#######' + data_card.last_four
                    this.cardNumber = string
                    this.cardMonth = data_card?.exp_month ? data_card.exp_month : 'n/a'
                    this.cardYear = data_card.exp_year
                    this.cardName = data_card.card_holder
                    this.dialog_my_cards = false
                    this.pay_card_existing = true
                    this.payment_source_company = card
                    this.id_fuente = card.fuente_id
                }
            } catch (error) {
                console.log("selectCard ~ error:", error);
            }
        },
        showMyCards() {
            try {
                this.dialog_my_cards = true
            } catch (error) {
                console.log("showMyCards ~ error:", error);
            }
        },
        setCreditCard(cards) {
            try {
                if (cards?.length > 0) {
                    this.credit_card = cards
                    this.exist_card = true
                }
            } catch (error) {
                console.log("setCreditCard ~ error:", error)
            }
        },
        setNumberNequi(nequi) {
            try {
                if (nequi?.length > 0) {
                    this.old_nequi = nequi
                    this.exist_nequi = true
                }
            } catch (error) {
                console.log("setNumberNequi error", error)

            }
        },
        validateFields() {
            try {
                if (this.checkbox === true) {
                    let errors = []
                    this.progressLinear = true
                    this.incremetLinear()
                    if (this.cardNumber === "" || this.cardNumber.length < 14) {
                        errors.push('número tarjeta')
                    }
                    if (this.cardName === "" || this.cardName.length === 0) {
                        errors.push('nombre titular')
                    }
                    if (this.cardMonth === "" || this.cardMonth.length < 2) {
                        errors.push('mes')
                    }
                    if (this.cardYear === "" || this.cardYear.length < 2) {
                        errors.push('año')
                    }
                    if (this.cardCvv === "" || this.cardCvv.length < 3) {
                        errors.push('cvv')
                    }
                    if (errors.length > 0) {
                        this.progressLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                        let string = ""
                        errors.forEach(error => {
                            string = string + `${error}, `
                        })
                        let message = 'Faltan los campos ' + string
                        let messagetoshow = message.substring(0, message.length - 2);
                        this.messageCard = messagetoshow
                        this.alertCard = true
                        setTimeout(() => {
                            this.messageCard = null
                            this.alertCard = false
                        }, 5000)
                    } else {
                        let card = {
                            "number": this.cardNumber,
                            "exp_month": this.cardMonth, // Mes de expiración (como string de 2 dígitos) card.month
                            "exp_year": this.cardYear, // Año de expiración (como string de 2 dígitos) card.year
                            "cvc": this.cardCvv, // Código de seguridad (como string de 3 o 4 dígitos) card.cvc
                            "card_holder": this.cardName, // card.name
                            "test": true
                        }
                        let card_example = {
                            "number": "4242424242424242", // Número de tarjeta (como un string, sin espacios)
                            "exp_month": "06", // Mes de expiración (como string de 2 dígitos)
                            "exp_year": "29", // Año de expiración (como string de 2 dígitos)
                            "cvc": "123", // Código de seguridad (como string de 3 o 4 dígitos)
                            "card_holder": "Pedro Pérez",
                            "test": true
                        }
                        this.registerCard(card)
                    }
                } else {
                    this.messageCard = 'Acepta los términos y condiciones'
                    this.alertCard = true
                    setTimeout(() => {
                        this.messageCard = null
                        this.alertCard = false
                    }, 5000)
                }
            } catch (error) {
                console.log("validateFields ~ error:", error);
            }
        },
        flipCard(status) {
            this.isCardFlipped = status;
        },
        focusInput(e) {
            this.isInputFocused = true;
            let targetRef = e.target.dataset.ref;
            let target = this.$refs[targetRef];
            // this.focusElementStyle = {
            //     width: `${target.offsetWidth}px`,
            //     height: `${target.offsetHeight}px`,
            //     transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
            // }
        },
        blurInput() {
            let vm = this;
            setTimeout(() => {
                if (!vm.isInputFocused) {
                    vm.focusElementStyle = null;
                }
            }, 300);
            vm.isInputFocused = false;
        },
        required(v) {
            return !!v || 'Field is required'
        },
        hideCards() {
            try {
                this.dialog_my_cards = false
                this.step = 1
                this.payWith = null
            } catch (error) {
                console.log("hideCards ~ error:", error);
            }
        },
        async addNewCard() {
            try {
                if (!this.credit_card) {
                    this.createNewCard();
                } else {
                    this.dialog_my_cards = true
                    if (!this.pre_token || !this.link_pdf) {
                        const token_prefirmado = await axios.get('token_prefirmado?test=true', {
                            baseURL: this.base_url,
                        });
                        let data = token_prefirmado.data
                        let token = data.data.token
                        this.pre_token = token.acceptance_token
                        this.link_pdf = token.permalink
                    }
                    this.step = 3
                    this.payWith = 'card'
                }

            } catch (error) {
                console.log("addNewCard ~ error:", error)
            }
        },
        async createNewCard() {
            try {
                this.dialog_my_cards = false
                const token_prefirmado = await this.httpService.getRequest('api/v1/payment/token_prefirmado?test=true')
                if(token_prefirmado.error){
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: token_prefirmado.message, life: 4000 });
                }else{
                    let data = token_prefirmado.data
                    let token = data.token
                    this.pre_token = token.acceptance_token
                    this.link_pdf = token.permalink
                    this.step = 2
                    this.payWith = 'card'
                }
            } catch (error) {
                console.log("createNewCard ~ error:", error)
            }
        },
        async stepNequi() {
            try {
                    const token_prefirmado = await  this.httpService.getRequest('api/v1/payment/token_prefirmado?test=true');
                    if(token_prefirmado.error){
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: token_prefirmado.message, life: 4000 });
                }else{
                    let data = token_prefirmado.data
                    let token = data.token
                    this.pre_token = token.acceptance_token
                    this.link_pdf = token.permalink
                    this.step = 2
                    this.payWith = 'nequi'
                }
            } catch (error) {
                console.log("stepNequi ~ error:", error);
            }
        },
        async secondStep(payWith) {
            try {
                if (this.dialog_my_cards === false && this.exist_card === false) {
                    if (!this.pre_token || !this.link_pdf) {
                        const token_prefirmado = await axios.get('token_prefirmado?test=true', {
                            baseURL: this.base_url,
                        });

                        let data = token_prefirmado.data
                        let token = data.data.token
                        this.pre_token = token.acceptance_token
                        this.link_pdf = token.permalink
                    }
                    if (payWith === 'card') {
                        this.step = 2
                        this.payWith = payWith
                    } else if (payWith === 'nequi') {
                        this.step = 2
                        this.payWith = payWith
                    } else {
                    }
                }
            } catch (error) {
                console.log(" secondStep ~ error:", error);
            }
        },
        isNumber(e) {
            let char = String.fromCharCode(e.keyCode);
            if (/^\d+$/.test(char)) return true;
            else e.preventDefault();
        },
        async makeTransaction(card_data){
            try {
                console.log("makeTransaction ~ card_data:", card_data)
                let price_normal = this.total_price
                let price = price_normal + '00'
                let amount = parseInt(price)
                let email = this.route.client.email
                let reference = moment().format()

                let data = {
                    "test": true,
                    "id": card_data.id,
                    "token":  this.pre_token,
                    "created_at": moment().format(),
                    "amount_in_cents": amount,
                    "reference": email + reference,
                    "customer_email": email,
                    "currency": "COP",
                    "payment_method_type": "CARD",
                    "payment_method": {
                        "type": "CARD",
                        "extra": {
                            "name": card_data.card_holder,
                            "brand": card_data.brand,
                            "last_four": card_data.last_four,
                            "processor_response_code": "51" // Código de respuesta del procesador y/o emisor de la tarjeta
                        },
                        "installments": 2
                    },

                }
                console.log("🚀 ~ file: Payment.vue:1128 ~ makeTransaction ~ data:", data)
                const make_transaction = await this.httpService.postRequest('api/v1/payment/make_transaction', data)
            } catch (error) {
                console.log("makeTransaction ~ error:", error);
            }
        },
        async registerCard(card) {
            try {
                if (card.number !== null && card.cvc !== null) {
                    const create_tokenization = await this.httpService.postRequest('api/v1/payment/tokenization', card)
                    console.log("create_tokenization:", create_tokenization)
                    if (create_tokenization.error) {
                        this.progressLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                    } else if (create_tokenization.error === null && create_tokenization.data === null) {
                        this.progressLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                    } else {
                        const result = create_tokenization.data
                        const status = result.status
                        console.log("🚀 ~ file: Payment.vue:1134 ~ registerCard ~ status:", status)
                        const data = result.data
                        console.log("🚀 ~ file: Payment.vue:1136 ~ registerCard ~ data:", data)
                        if (status === 'CREATED' && data !== null) {
                            const { id, brand } = data;
                            // this.makeTransaction(data)
                            this.createFuentePago(id, this.route.client, this.pre_token, brand, 'CARD', true)
                        } else {
                            this.progressLinear = false
                            clearInterval(this.interval)
                            this.incrementValue = 0
                            this.messageCard = 'No fue posible tokenizar los datos'
                            this.alertCard = true
                            setTimeout(() => {
                                this.messageCard = null
                                this.alertCard = false
                            }, 4000)
                        }
                    }
                }
            } catch (error) {
                console.log("registerCard ~ error:", error);
            }
        },
        async createFuentePago(token, client, acceptance_token, brand, type, test) {
            try {
                let fuente_pago = {
                    "client_document": client.document,
                    "customer_email": client.email,
                    "type": type,
                    "token": token,
                    "app_id": "demo",
                    "brand": brand,
                    "acceptance_token": acceptance_token,
                    "test": test
                }
                console.log("🚀 ~ file: Payment.vue:1160 ~ createFuentePago ~ fuente_pago:", fuente_pago)
                const create_fuente_pago = await this.httpService.postRequest('api/v1/payment/fuente_pago', fuente_pago)
                console.log("🚀create_fuente_pago:", create_fuente_pago)
                if (create_fuente_pago.error) {
                    this.pre_token = null
                    this.progressLinear = false
                    clearInterval(this.interval)
                    this.incrementValue = 0
                } else {
                    const data = create_fuente_pago.data
                    this.pre_token = null
                    if (data.status === 'AVAILABLE') {
                        this.$store.dispatch('addCreditCard', data)
                        this.credit_card = this.$store.state.creditsCard
                        this.progressLinear = false
                        clearInterval(this.interval)
                        this.incrementValue = 0
                        this.step = 3
                        this.token = token
                        this.id_fuente = data.fuente_id
                    } else {
                        this.messageCard = 'No fue posible crear la fuente de pago, estado: ' + data.status ? data.status : 'no creada'
                        this.alertCard = true
                        setTimeout(() => {
                            this.messageCard = null
                            this.alertCard = false
                        }, 5000)
                    }
                }
            } catch (error) {
                console.log("createFuentePago ~ error:", error);
                if (error.response.data) {
                    let error = error.response.data.err[0]
                    console.log("🚀 ~ file: Payment.vue:1799 ~ createFuentePago ~ error:", error)
                }
            }
        },
        async incremetLinear() {
            try {
                this.interval = setInterval(() => {
                    if (this.incrementValue < 100) {
                        this.incrementValue = this.incrementValue + 1
                    } else {
                        this.incrementValue = 0
                    }
                }, 150)

            } catch (error) {
                console.log("incremetLinear ~ error:", error);

            }
        },
        async payPlan() {
            try {
                this.incrementLinear = true
                this.incremetLinear();
                let price_normal = this.total_price
                let price = price_normal + '00'
                let amount = parseInt(price)
                let email = this.route.client.email
                let reference = moment().format()
                let pay = {
                    "amount_in_cents": amount,
                    "currency": "COP",
                    "reference": email + reference,
                    "customer_email": this.route.client.email,
                    "client_document": this.route.client.document,
                    "payment_type": "CARD", //hardcode por ahora siempre card
                    "cuotas": 1,
                    "payment_source_id": this.id_fuente.toString(),
                    "test": true,
                    "route":  this.route.route
                }
                const create_pay = await this.httpService.postRequest('api/v1/payment/rec_pay', pay)
                if (create_pay.error) {
                    this.progressLinear = false
                } else if (!create_pay.data) {
                    this.progressLinear = false
                } else {
                    const data = create_pay.data
                    let id_pay = data.id
                    if (data.status === 'PENDING') {
                        await this.payStatus(id_pay);
                    } else if (data.status === 'DECLINED') {
                        this.progressLinear = false
                        //Manejar error de crear fuente de pago
                    } else {

                    }
                }
            } catch (error) {
                console.log("payPlan ~ error:", error);
            }
        },

        async payStatus(id) {
            try {
                if (id !== null) {
                    const body = {
                        "id": id,
                        "test": true,
                        "client_document":this.route.client.document,
                    }
                    const create_pay = await this.httpService.postRequest('api/v1/payment/pay_status', body)
                    if (create_pay.error) {
                        this.progressLinear = false
                    } else if (!create_pay.data) {
                        this.progressLinear = false
                    } else {
                        const data = create_pay.data
                        if (data.data_transaccion.status === 'APPROVED') {
                            this.createFactura(data)
                            this.pay_success = true
                            this.progressLinear = false
                            this.incrementLinear = false
                            clearInterval(this.interval)
                            this.incrementValue = 0
                            // this.descountCredits()
                        } else if (data.data_transaccion.status === 'PENDING') {
                            setTimeout(() => {
                                this.payStatus(id);
                            }, 2000);
                        } else if (data.data_transaccion.status === 'DECLINED') {
                            this.dialog_declined = true
                            this.progressLinear = false
                            this.incrementLinear = false
                            clearInterval(this.interval)
                            this.incrementValue = 0
                        } else {
                            this.dialog_declined = true
                        }
                    }
                }
            } catch (error) {
                console.log("payStatus ~ error:", error)
            }
        },
        createFactura(data) {
            try {
                if (data !== null) {
                    this.createReserva()
                    let date = data.data_transaccion?.created_at ? moment(data.data_transaccion.created_at).format('MMM DD YYYY') : moment().format('MMM DD YYYY')
                    let referencia = data.referencia
                    let metodo = this.payWith === 'card' ? 'Tarjeta' : this.payWith === 'nequi' ? 'Nequi' : 'n/a'
                    let status = data.data_transaccion?.status === 'APPROVED' ? 'Aprobado' : 'n/a'
                    let factura = {
                        fecha: date.toUpperCase(),
                        referencia: referencia,
                        metodo: metodo,
                        status: status
                    }
                    this.data_factura = factura
                }
            } catch (error) {
                console.log("createFactura ~ error:", error);
            }
        },
        endPayment() {
            try {
                this.pay_success = false
                this.data_factura = null
                this.$router.push('/')
            } catch (error) {
                console.log("endPayment ~ error:", error);
            }
        },
        tryAgain() {
            try {
                this.step = 1
                this.payWith = null
                this.pre_token = null
                this.link_pdf = null
                this.checkbox = null
                this.id_fuente = null
                this.pay_success = false
                this.dialog_declined = false
                this.cardName = ""
                this.cardNumber = ""
                this.cardMonth = ""
                this.cardYear = ""
                this.cardCvv = ""
                this.card_info = {}
                this.nequi_info = {}
            } catch (error) {
                console.log("tryAgain ~ error:", error);
            }
        },
        async deletePaymentSource(fuente_id) {
            try {
                if (fuente_id != null) {
                    let body = {
                        company_id: this.data_company._id,
                        fuente_id: fuente_id.toString()
                    }
                    const delete_payment = await axios.post('delete_payment', body, {
                        baseURL: this.base_url,
                    });
                    if (delete_payment.data.error) {

                    } else if (!delete_payment.data.data) {

                    } else {
                        let payment_source = delete_payment.data.data
                        let cards = payment_source.filter(source => source.type === 'CARD')
                        let nequi = payment_source.filter(source => source.type === 'NEQUI')
                        if (cards?.length > 0) {
                            this.$store.dispatch('setCreditsCards', cards)
                            this.credit_card = this.$store.state.creditsCard
                        }
                        if (nequi?.length > 0) {
                            this.$store.dispatch('setNequi', nequi)
                            this.old_nequi = this.$store.state.paymentNequi
                        }
                        this.cancelPay()
                    }
                }
            } catch (error) {
                console.log("deleteMetodo ~ error:", error);
            }
        },
        cancelPay() {
            try {
                this.step = 1
                this.pre_token = null
                this.link_pdf = null
                this.checkbox = null
                this.id_fuente = null
                this.pay_success = false
                this.dialog_declined = false
                this.cardName = ""
                this.cardNumber = ""
                this.cardMonth = ""
                this.cardYear = ""
                this.cardCvv = "",
                    this.card_info = {}
                this.nequi_info = {}
            } catch (error) {
                console.log("cancelPay ~ error:", error)
            }
        }
    }
};
</script>
  
  
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500,600,700|Source+Sans+Pro:400,600,700&display=swap");


body {
    background: #ddeefc;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
}




* {
    box-sizing: border-box;

    &:focus {
        outline: none;
    }
}

.back_icon1 {
    color: #7500c4;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 6px, rgba(0, 0, 0, 0.12) 0px 3px 6px !important;
    border-radius: 50px;
    width: 37px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -8px;
}

.header-recibo {
    background-color: rgb(0 86 147);
    padding: 3%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    color: white;
    font-family: 'Montserrat';
}

.body-recibo {
    padding-top: 2%;

}

.container-recibo {
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin-left: 20%;
    margin-right: 20%;
    font-family: 'Montserrat';
    margin-bottom: 10px;
}

.summary-recibo {
    background-color: #f7f7f7;
    display: flex;
    justify-content: space-between;
    padding: 1%;
    border-radius: 20px;
}

.wrapper {
    min-height: 100vh;
    display: flex;
    padding: 50px 15px;

    @media screen and (max-width: 700px),
    (max-height: 500px) {
        flex-wrap: wrap;
        flex-direction: column;
    }
}

.card-methods {
    border-style: solid;
    padding: 8px;
    border-width: 2px;
    border-radius: 35px;
    border-color: #dddddd;
    background-color: #f7f7f7;
    display: flex;
    justify-content: space-between;
}

.icon-methods {
    padding: 8px;
    border-width: 2px;
    border-radius: 35px;
    display: flex;
    justify-content: space-between;
}

.card-icon {
    border-style: solid;
    border-radius: 34px;
    border-width: 2px;
    padding: 8px 12px 12px 12px;
    border-color: #005693;
    margin: 4px;
    background-color: #005693;
}

.card-image-icon {
    padding: 5px;
    margin-top: -15px;
    margin-right: 5px;
}

.card-form {
    max-width: 570px;

    // margin: auto;
    width: 100%;

    @media screen and (max-width: 576px) {
        margin: 0 auto;
    }


    &__inner {
        background: #fff;
        // box-shadow: 3px 13px 30px 0px rgba(21, 34, 67, 0.2);
        box-shadow: 0 4px 14px 0 rgba(90, 116, 148, 0.4);
        border-radius: 10px;
        padding: 35px;
        // padding-top: 180px;

        @media screen and (max-width: 480px) {
            padding: 25px;
            // padding-top: 165px;
        }

        @media screen and (max-width: 360px) {
            padding: 15px;
            // padding-top: 165px;
        }
    }

    &__row {
        display: flex;
        align-items: flex-start;

        @media screen and (max-width: 480px) {
            flex-wrap: wrap;
        }
    }

    &__col {
        flex: auto;
        margin-right: 35px;

        &:last-child {
            margin-right: 0;
        }

        @media screen and (max-width: 480px) {
            margin-right: 0;
            flex: unset;
            width: 100%;
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &.-cvv {
            max-width: 150px;

            @media screen and (max-width: 480px) {
                max-width: initial;
            }
        }
    }

    &__group {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

        .card-input__input {
            flex: 1;
            margin-right: 15px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    &__button {
        width: 100%;
        height: 55px;
        background: #2364d2;
        border: none;
        border-radius: 5px;
        font-size: 22px;
        font-weight: 500;
        font-family: "Source Sans Pro", sans-serif;
        box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
        color: #fff;
        margin-top: 20px;
        cursor: pointer;

        @media screen and (max-width: 480px) {
            margin-top: 10px;
        }
    }
}

.card-item {
    max-width: 430px;
    height: 270px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 2;
    width: 100%;

    @media screen and (max-width: 480px) {
        max-width: 310px;
        height: 220px;
        width: 90%;
    }

    @media screen and (max-width: 360px) {
        height: 180px;
    }

    &.-active {
        .card-item__side {
            &.-front {
                transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg);
            }

            &.-back {
                transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg);
                // box-shadow: 0 20px 50px 0 rgba(81, 88, 206, 0.65);
            }
        }
    }

    &__focus {
        position: absolute;
        z-index: 3;
        border-radius: 5px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        opacity: 0;
        pointer-events: none;
        overflow: hidden;
        border: 2px solid rgba(255, 255, 255, 0.65);

        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: rgb(8, 20, 47);
            height: 100%;
            border-radius: 5px;
            filter: blur(25px);
            opacity: 0.5;
        }

        &.-active {
            opacity: 1;
        }
    }

    &__side {
        border-radius: 15px;
        overflow: hidden;
        // box-shadow: 3px 13px 30px 0px rgba(11, 19, 41, 0.5);
        box-shadow: 0 7px 19px 0 rgba(14, 42, 90, 0.55);
        transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
        transform-style: preserve-3d;
        transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        backface-visibility: hidden;
        height: 100%;

        &.-back {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg);
            z-index: 2;
            padding: 0;
            // background-color: #2364d2;
            // background-image: linear-gradient(
            //   43deg,
            //   #4158d0 0%,
            //   #8555c7 46%,
            //   #2364d2 100%
            // );
            height: 100%;

            .card-item__cover {
                transform: rotateY(-180deg)
            }
        }
    }

    &__bg {
        max-width: 100%;
        display: block;
        max-height: 100%;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    &__cover {
        height: 100%;
        background-color: #1c1d27;
        position: absolute;
        height: 100%;
        background-color: #1c1d27;
        left: 0;
        top: 0;
        width: 100%;
        border-radius: 15px;
        overflow: hidden;

        &:after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(6, 2, 29, 0.45);
        }
    }

    &__top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 40px;
        padding: 0 10px;

        @media screen and (max-width: 480px) {
            margin-bottom: 25px;
        }

        @media screen and (max-width: 360px) {
            margin-bottom: 15px;
        }
    }

    &__chip {
        width: 60px;

        @media screen and (max-width: 480px) {
            width: 50px;
        }

        @media screen and (max-width: 360px) {
            width: 40px;
        }
    }

    &__type {
        height: 45px;
        position: relative;
        display: flex;
        justify-content: flex-end;
        max-width: 100px;
        margin-left: auto;
        width: 100%;

        @media screen and (max-width: 480px) {
            height: 40px;
            max-width: 90px;
        }

        @media screen and (max-width: 360px) {
            height: 30px;
        }
    }

    &__typeImg {
        max-width: 100%;
        object-fit: contain;
        max-height: 100%;
        object-position: top right;
    }

    &__info {
        color: #fff;
        width: 100%;
        max-width: calc(100% - 85px);
        padding: 10px 15px;
        font-weight: 500;
        display: block;

        cursor: pointer;

        @media screen and (max-width: 480px) {
            padding: 10px;
        }
    }

    &__holder {
        opacity: 0.7;
        font-size: 13px;
        margin-bottom: 6px;

        @media screen and (max-width: 480px) {
            font-size: 12px;
            margin-bottom: 5px;
        }
    }

    &__wrapper {
        font-family: "Source Code Pro", monospace;
        padding: 25px 15px;
        position: relative;
        z-index: 4;
        height: 100%;
        text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8);
        user-select: none;

        @media screen and (max-width: 480px) {
            padding: 20px 10px;
        }
    }

    &__name {
        font-size: 18px;
        line-height: 1;
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: uppercase;

        @media screen and (max-width: 480px) {
            font-size: 16px;
        }
    }

    &__nameItem {
        display: inline-block;
        min-width: 8px;
        position: relative;
    }

    &__number {
        font-weight: 500;
        line-height: 1;
        color: #fff;
        font-size: 27px;
        margin-bottom: 35px;
        display: inline-block;
        padding: 10px 15px;
        cursor: pointer;

        @media screen and (max-width: 480px) {
            font-size: 21px;
            margin-bottom: 15px;
            padding: 10px 10px;
        }

        @media screen and (max-width: 360px) {
            font-size: 19px;
            margin-bottom: 10px;
            padding: 10px 10px;
        }
    }

    &__numberItem {
        width: 16px;
        display: inline-block;

        &.-active {
            width: 30px;
        }

        @media screen and (max-width: 480px) {
            width: 13px;

            &.-active {
                width: 16px;
            }
        }

        @media screen and (max-width: 360px) {
            width: 12px;

            &.-active {
                width: 8px;
            }
        }
    }

    &__content {
        color: #fff;
        display: flex;
        align-items: flex-start;
    }

    &__date {
        flex-wrap: wrap;
        font-size: 18px;
        margin-left: auto;
        padding: 10px;
        display: inline-flex;
        width: 80px;
        white-space: nowrap;
        flex-shrink: 0;
        cursor: pointer;

        @media screen and (max-width: 480px) {
            font-size: 16px;
        }
    }

    &__dateItem {
        position: relative;

        span {
            width: 22px;
            display: inline-block;
        }
    }

    &__dateTitle {
        opacity: 0.7;
        font-size: 13px;
        width: 100%;

        @media screen and (max-width: 480px) {
            font-size: 12px;
            padding-bottom: 5px;
        }
    }

    &__band {
        background: rgba(0, 0, 19, 0.8);
        width: 100%;
        height: 50px;
        margin-top: 30px;
        position: relative;
        z-index: 2;

        @media screen and (max-width: 480px) {
            margin-top: 20px;
        }

        @media screen and (max-width: 360px) {
            height: 40px;
            margin-top: 10px;
        }
    }

    &__cvv {
        text-align: right;
        position: relative;
        z-index: 2;
        padding: 15px;

        .card-item__type {
            opacity: 0.7;
        }

        @media screen and (max-width: 360px) {
            padding: 10px 15px;
        }
    }

    &__cvvTitle {
        padding-right: 10px;
        font-size: 15px;
        font-weight: 500;
        color: #fff;
        margin-bottom: 5px;
    }

    &__cvvBand {
        height: 45px;
        background: #fff;
        margin-bottom: 30px;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        color: #1a3b5d;
        font-size: 18px;
        border-radius: 4px;
        box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.35);

        @media screen and (max-width: 480px) {
            height: 40px;
            margin-bottom: 20px;
        }

        @media screen and (max-width: 360px) {
            margin-bottom: 15px;
        }
    }
}

.card-list {
    margin-bottom: -130px;

    @media screen and (max-width: 480px) {
        margin-bottom: -120px;
    }
}

.card-input {
    margin-bottom: 20px;

    &__label {
        font-size: 14px;

        font-weight: 500;
        color: #1a3b5d;
        width: 100%;
        display: block;
        user-select: none;
    }

    &__input {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        box-shadow: none;
        border: 1px solid #ced6e0;
        transition: all 0.3s ease-in-out;
        font-size: 18px;
        padding: 5px 15px;
        background: none;
        color: #1a3b5d;
        font-family: "Source Sans Pro", sans-serif;

        &:hover,
        &:focus {
            border-color: #3d9cff;
        }

        &:focus {
            box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
        }

        &.-select {
            -webkit-appearance: none;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC');
            background-size: 12px;
            background-position: 90% center;
            background-repeat: no-repeat;
            padding-right: 30px;
        }
    }
}

.slide-fade-up-enter-active {
    transition: all 0.25s ease-in-out;
    transition-delay: 0.1s;
    position: relative;
}

.slide-fade-up-leave-active {
    transition: all 0.25s ease-in-out;
    position: absolute;
}

.slide-fade-up-enter {
    opacity: 0;
    transform: translateY(15px);
    pointer-events: none;
}

.slide-fade-up-leave-to {
    opacity: 0;
    transform: translateY(-15px);
    pointer-events: none;
}

.slide-fade-right-enter-active {
    transition: all 0.25s ease-in-out;
    transition-delay: 0.1s;
    position: relative;
}

.slide-fade-right-leave-active {
    transition: all 0.25s ease-in-out;
    position: absolute;
}

.slide-fade-right-enter {
    opacity: 0;
    transform: translateX(10px) rotate(45deg);
    pointer-events: none;
}

.slide-fade-right-leave-to {
    opacity: 0;
    transform: translateX(-10px) rotate(45deg);
    pointer-events: none;
}



.github-btn {
    position: absolute;
    right: 40px;
    bottom: 50px;
    text-decoration: none;
    padding: 15px 25px;
    border-radius: 4px;
    box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65);
    background: #24292e;
    color: #fff;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 16px;
    text-align: center;
    transition: all .3s ease-in-out;

    @media screen and (min-width: 500px) {
        &:hover {
            transform: scale(1.1);
            box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
        }
    }

    @media screen and (max-width: 700px) {
        position: relative;
        bottom: auto;
        right: auto;
        margin-top: 20px;

        &:active {
            transform: scale(1.1);
            box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
        }
    }
}
</style>
  