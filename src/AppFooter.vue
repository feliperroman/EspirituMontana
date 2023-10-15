<template>
	<div class="layout-footer">
		
		<span class="font-medium ml-2" style="color: white;">Derechos reservados Espíritu de Montaña</span>
		<!-- <span class="font-medium ml-2">Derechos reservados Espíritu de Montaña</span><img alt="Logo" :src="footerImage()" height="20" class="mr-2" /> -->
	</div>
</template>

<script>
	export default {
		name: "AppFooter",
		methods: {
			footerImage() {
				return this.$appState.darkTheme ? 'images/2becommerce.webp' : 'images/2becommerce.webp';
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			}
		}
	}
</script>