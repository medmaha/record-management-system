<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import SideNav from './components/SideNav.svelte';

	export let data: LayoutData;
</script>

<div class={`grid ${data.auth ? 'grid-cols-[auto,1fr] ' : ''} min-h-[100vh]`}>
	{#if data.auth}
		<SideNav {data} />
	{/if}

	<div class="main">
		<main class="relative">
			<slot />
		</main>
	</div>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.main {
		background-color: inherit;
		background-image: radial-gradient(rgba(182, 182, 182, 0.34) 1px, transparent 1px);
		background-size: 20px 20px;
		min-height: 99dvh;
		width: 100%;
	}
</style>
