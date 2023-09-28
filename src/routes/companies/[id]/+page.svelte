<script lang="ts">
	import { capitalize } from '../../../lib/text';
	import type { PageData } from './$types';

	export let data: PageData;

	const company = data.company;

	let model = 'branches';
	let models = ['branches', 'managers', 'transfers'];
</script>

<div class="px-4 py-3 bg-white flex items-center gap-4 justify-between border-b">
	<div class="w-max">
		<button class="flex items-center gap-2 opacity-75 hover:opacity-100" title="Go Back">
			<span class="text-current">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" /></svg
				>
			</span>
			<span class="text-sm"> Back </span>
		</button>
	</div>
	<div class="flex-">
		<form action="" class="flex items-center gap-4 relative group w-full">
			<span class="inline-block w-full flex-1 max-w-[300px]">
				<input
					type="text"
					class="input w-full outline-gray-400 py-0.5 pl-6"
					name="query"
					placeholder={`search ${model}`}
				/>
			</span>
			<span class="inline-flex items-center gap-1 w-max">
				<p class="font-semibold pr-1 text-sm">Model:</p>
				<select class="input text-sm py-[2px] text-xm">
					{#each models as _model}
						<option value={capitalize(String(_model))}>{_model}</option>
					{/each}
				</select>
			</span>
			<input type="hidden" name="model" value={model} />
			<span
				class="absolute top-0 left-0 w-5 h-full inline-flex items-center justify-center text-gray-400 group-focus-within:text-sky-500"
			>
				<svg
					class="fill-current"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					><path
						d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
					/></svg
				>
			</span>
		</form>
	</div>

	<div class="inline-flex items-center gap-2 w-max">
		<p class="font-semibold text-lg pr-1">{company.name}</p>
	</div>
</div>

<div class="p-4">
	<h1>Company ID: {company.id}</h1>
</div>

<style>
</style>
