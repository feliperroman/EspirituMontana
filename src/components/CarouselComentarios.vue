<template>
    <div class="card mt-0" style="background-color: black;">
        <h3 style="text-align: center; color: white;">Comentarios</h3>
        <Carousel :value="products" :numVisible="4" :numScroll="4" :responsiveOptions="responsiveOptions">
            <template #item="slotProps">
                <div class="border-1 surface-border border-round m-2 text-center py-5 px-3" style="color: white;
    border-radius: 20px !important;
    background-color: rgb(34 197 94);
    border: 0px solid rgb(93 120 0) !important;">
                    <div class="mb-3">
                        <img :src="slotProps.data.image" :alt="slotProps.data.name" class="w-4 shadow-2"
                            style="border-radius: 50%;" />
                    </div>
                    <div>
                        <div style="text-align: center; display: flex; justify-content: space-around;" class="mt-3 mb-0">
                        <Rating v-model="slotProps.data.rating" :cancel="false" />
                    </div>
                        <h4 class="mb-5 mt-0">{{ slotProps.data.name }} </h4>
                        <p class="mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                            repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
                            ratione quam perferendis esse, cupiditate neque
                            quas!
                        </p>
                    </div>
                  
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


onMounted(() => {
    products.value = [
        {
            id: '1000',
            code: 'f230gh0g3',
            name: 'Manuela Salazar',
            description: 'Manuela Salazar',
            image: '../../public/images/person1.png',
            price: '111.111.111',
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'Disponible',
            rating: 3,
            km: 51,
        },
        {
            id: '1100',
            code: 'f230hh0g3',
            name: 'Andrea Yepes',
            description: 'Andrea Yepes',
            image: '../../public/images/pic2.jpg',
            price: '222.222.222',
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'Pocos cupos',
            rating: 4,
            km: 11,
        },
        {
            id: '10',
            code: 'f230ff0g3',
            name: 'Juan Gonzales',
            description: 'Juan Gonzales',
            image: '../../public/images/pic3.jpg',
            price: '333.333.333',
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'Finalizada',
            rating: 1,
            km: 14,
        },
        {
            id: '1000',
            code: 'f230gh0g3',
            name: 'Manuela Salazar',
            description: 'Manuela Salazar',
            image: '../../public/images/pic3.jpg',
            price: '111.111.111',
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'Disponible',
            rating: 5,
            km: 51,
        }
    ]
})

const products = ref();
const value = ref();
const responsiveOptions = ref([
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
]);

const getSeverity = (status) => {
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
};

</script>