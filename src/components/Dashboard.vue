<template>
    <main>
        <div class="container">
            <!-- <h1 style="text-align: center;">Hola estoy desde la vista dashboard</h1> -->
            <CarouselRutas></CarouselRutas>


            <div class="mt-5 container mb-0 ">
                <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                        <div class="card">
                            <h3 style="text-align: center; ">Instagram</h3>

                            <div class="card mb-0" style=" border-style: solid; min-height: 45vh;">
                                <v-row>
                                    <v-col v-for="img of 6" cols="4">
                                        <div class="card mt-1 mb-1" style=" border-style: solid; min-height: 20vh;">

                                        </div>
                                    </v-col>
                                </v-row>

                            </div>
                        </div>


                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                        <div class="card ml-1 mr-1">
                            <h3 style="text-align: center; ">Nuestros videos</h3>

                            <v-row>
                                <v-col cols="6">
                                    <!-- <div class="ml-1 mr-1">
                                        <iframe src="https://www.youtube.com/embed/eso9SBGL71o?si=1yzvLow6pSYP-nBe"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen></iframe>
                                    </div> -->
                                </v-col>
                                <!-- <v-col cols="6">
                                    <div class="ml-1 mr-1">
                                        <iframe src="https://www.youtube.com/embed/eso9SBGL71o?si=1yzvLow6pSYP-nBe"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen></iframe>
                                    </div>
                                </v-col> -->
                                <!-- <v-col cols="6">
                                    <div class="ml-1 mr-1">
                                        <iframe src="https://www.youtube.com/embed/eso9SBGL71o?si=1yzvLow6pSYP-nBe"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen></iframe>
                                    </div>
                                </v-col>
                                <v-col cols="6">
                                    <div class="ml-1 mr-1">
                                        <iframe src="https://www.youtube.com/embed/eso9SBGL71o?si=1yzvLow6pSYP-nBe"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen></iframe>
                                    </div>
                                </v-col> -->

                            </v-row>
                        </div>


                    </v-col>
                </v-row>

            </div>

            <div class="mt-6" id="carousel_setion">
                <CarouselComentarios></CarouselComentarios>
            </div>
            <v-row class="mt-5  mb-0 " no-gutters>
                <v-col cols="12">
                    <div class="card " style="background-color: black; ">
                        <div class="d-flex justify-content-around">
                            <div class="mt-2" style="color: white">
                                <h3 style="text-transform: uppercase"> Nuestra Visión</h3>
                                <h6 class="mt-0">Espiritu de Montaña</h6>
                                <div class="py-4">
                                    <p>
                                        En Espíritu de Montaña, nos dedicamos a fomentar la pasión por el
                                            ciclomontañismo y el turismo
                                            responsable en Colombia. Nuestra misión es explorar, recorrer y promover las
                                            maravillosas
                                            regiones de nuestro país, generando un impacto positivo en las comunidades
                                            locales, su economía
                                            y medio ambiente.
                                    </p>
                                    <Button @click="$router.push('/quienesSomos').then(()=>  $router.go(0))" class="mt-5" label="Ver más"
                                        style="background-color: rgb(34, 197, 94); color: white; border: 0px;" />
                                </div>
                            </div>
                            <div>
                                <img alt="user header" src="../../public/images/paisaje.jpg" style="object-fit: cover; width: 89vh;border-radius: 20px;" />
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12">
                    <div class="card " style="background-color: black; ">
                        <div class="d-flex justify-content-around">
                            <div>
                                <img alt="user header" src="../../public/images/paisaje.jpg" style="object-fit: cover; width: 89vh;border-radius: 20px;" />
                            </div>
                            <div class="mt-2 text-right" style="color: white">
                                <h3 style="text-transform: uppercase"> Nuestra Visión</h3>
                                <h6 class="mt-0">Espiritu de Montaña</h6>
                                <div class="py-4">
                                    <p>
                                        Ser la empresa líder en viajes de ciclomontañismo y turismo responsable a nivel
                                        nacional,
                                        reconocida por su compromiso con la exploración, promoción del turismo local y la
                                        economía
                                        circular en las regiones del departamento y el país.
                                    </p>
                                    <Button @click="$router.push('/quienesSomos')" class="mt-5" label="Ver más"
                                        style="background-color: rgb(34, 197, 94); color: white; border: 0px;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
    </main>
    <!-- <div class="layout-footer">
		
		
		<span class="font-medium ml-2">made rigth by</span><img alt="Logo" height="20" class="mr-2" />
	</div> -->
</template>

<script>
import CarouselRutas from './CarouselRutas.vue';
import CarouselComentarios from './CarouselComentarios.vue';
export default {
    components: { CarouselRutas, CarouselComentarios },
    data() {
        return {
            card: [
                {
                    header: 'Nuestra Visión',
                    description: 'Ser la empresa líder en viajes de ciclomontañismo y turismo responsable a nivel nacional,reconocida por su compromiso con la exploración, promoción del turismo local y la economía circular en las regiones del departamento y el país'
                }
            ]

        }
    }
}
</script>

<style>
.feed {
    margin-top: 140px;
    margin-left: 240px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.feed__item {
    margin: 0 8px 40px 8px;
}

.feed__item__thumbnail {
    width: 360px;
    height: 202px;
    background-color: grey;
}

.feed__item__info {
    display: flex;
    font-size: 14px;
    color: rgb(96, 96, 96);
}

.feed__item__info h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;
    color: rgb(3, 3, 3);
}

.feed__item__info a {
    text-decoration: none;
    color: unset;
}

.feed__item__info p {
    margin: 0;
}

.feed__item__info__avatar {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background-color: grey;
    margin: 12px 12px 0 0;
}

.feed__section {
    border-top: 3px solid lightgrey;
    border-bottom: 3px solid lightgrey;
    margin: 24px 35px 48px;
}

.feed__section h2 {
    margin-left: 8px;
}

.feed__section__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>