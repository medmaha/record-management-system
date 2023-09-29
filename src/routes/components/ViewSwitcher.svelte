<script lang="ts">
	export let view = 'grid' as 'grid' | 'table';
	export let toggleView: (_view: typeof view) => void;
</script>

<div class="flex items-center justify-center gap-4 py-2 pb-4">
	<div class="flex items-center justify-center gap-4 w-max px-4 py-1 rounded-2xl bg-white shadow">
		<button
			on:click={() => toggleView('grid')}
			class={`${view === 'grid' ? 'text-sky-600' : 'text-gray-700'} w-6 h-6`}
			title="Grid View"
		>
			<svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
				><path
					d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"
				/></svg
			>
		</button>

		<button
			on:click={() => toggleView('table')}
			class={`${view === 'table' ? 'text-sky-600' : 'text-gray-700'} w-6 h-6`}
			title="Table View"
		>
			<svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
				><path
					d="M120-120v-720h720v720H120Zm80-480h560v-160H200v160Zm213 200h134v-120H413v120Zm0 200h134v-120H413v120ZM200-400h133v-120H200v120Zm427 0h133v-120H627v120ZM200-200h133v-120H200v120Zm427 0h133v-120H627v120Z"
				/></svg
			>
		</button>
	</div>
</div>

<style>
</style>
