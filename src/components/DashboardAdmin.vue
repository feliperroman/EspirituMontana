<template>
    <main>
        <div class="container">
            <div class="grid mt-6" style="text-align: center; justify-content: space-around;">
                <div class="mt-1 mb-1">
                    <Card style="width: 35em">
                        <template #header>
                            <!-- <img alt="user header" src="../../public/images/pedi2letter.png" width="120"/> -->
                        </template>
                        <template #title>Nuestra Visión</template>
                        <template #subtitle>Espiritu de Montaña</template>
                        <template #content>
                            <p>
                                Ser la empresa líder en viajes de ciclomontañismo y turismo responsable a nivel nacional,
                                reconocida por su compromiso con la exploración, promoción del turismo local y la economía
                                circular en las regiones del departamento y el país.
                            </p>
                        </template>
                        <template #footer>
                            <Button @click="$router.push('/quienesSomos')" label="Ver más" style="background-color: #005693; color: white" />
                        </template>
                    </Card>
                </div>
                <div class="mt-1 mb-1">
                    <Card style="width: 35em">
                        <template #header>
                            <!-- <img alt="user header" src="../../public/images/pedi2letter.png" width="120"/> -->
                        </template>
                        <template #title>Nuestra Misión</template>
                        <template #subtitle>Espiritu de Montaña</template>
                        <template #content>
                            <p>
                                En Espíritu de Montaña, nos dedicamos a fomentar la pasión por el ciclomontañismo y el
                                turismo responsable en Colombia. Nuestra misión es explorar, recorrer y promover las
                                maravillosas regiones de nuestro país...

                            </p>
                        </template>
                        <template #footer>
                            <Button @click="$router.push('/quienesSomos')"  label="Ver más" style="background-color: #005693; color:white" />
                        </template>
                    </Card>
                </div>
                <!-- <div class="mt-1 mb-1">
                    <Card style="width: 25em">
                        <template #header>
                       
                        </template>
                        <template #title> Nuestra Visión </template>
                        <template #subtitle> Card subtitle </template>
                        <template #content>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                                repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
                                ratione quam perferendis esse, cupiditate neque
                                quas!
                            </p>
                        </template>
                        <template #footer>
                            <Button label="Ver más" style="background-color: #005693;" />
                        </template>
                    </Card>
                </div> -->
            </div>
            <div class="mt-6">
            </div>
        </div>
    </main>
    <!-- <div class="layout-footer">
		
		
		<span class="font-medium ml-2">made rigth by</span><img alt="Logo" height="20" class="mr-2" />
	</div> -->
</template>

<script>
export default {
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

<style></style>