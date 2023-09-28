<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Transfer from './Components/Transfer.svelte';
	import Branch from './Components/Branch.svelte';
	import Staff from './Components/Staff.svelte';

	import type { ActionData } from './$types';

	import { capitalize } from '$lib/text';

	export let form: ActionData;

	const models = ['staff', 'branch', 'transfer'];

	let model = models[Math.floor(Math.random() * models.length)];

	function changeModel(ev: any) {
		const payload = ev.currentTarget.value as typeof model;
		model = payload.toLowerCase();
	}

	let loading = false;

	function messageTimeout() {
		loading = false;
		setTimeout(() => (form = null), 3000);
	}

	const submitForm: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			await update();
			messageTimeout();
		};
	};
</script>

<div class="px-4 py-3 bg-white flex items-center justify-evenly border-b">
	<h3 class="text-xl font-semibold text-center tracking-wide">Add {capitalize(model)}</h3>

	<div class="inline-flex items-center gap-2">
		<p class="font-semibold pr-1">Model:</p>
		<select on:change={changeModel} class="input text-sm">
			{#each models as modelType}
				<option selected={modelType === model} value={capitalize(modelType)}
					>{capitalize(modelType)}</option
				>
			{/each}
		</select>
	</div>
</div>

<div class="relative">
	<div class="absolute top-0 left-0 w-full">
		{#if form?.success}
			<p
				class="max-w-[500px] mx-auto p-4 text-lg font-semibold w-max min-w-[200px] rounded bg-green-500 text-white"
			>
				{form.message}
			</p>
		{:else if form?.error}
			<p
				class="max-w-[500px] mx-auto p-4 text-lg font-semibold w-max min-w-[200px] rounded bg-red-500 text-white"
			>
				{form.message}
			</p>
		{/if}
	</div>
</div>

<div class="p-4">
	{#if model === 'staff'}
		<div class="block w-full" in:scale>
			<Staff {loading} {submitForm} />
		</div>
	{:else if model === 'branch'}
		<div class="block w-full" in:scale>
			<Branch {loading} {submitForm} />
		</div>
	{:else if model === 'transfer'}
		<div class="block w-full" in:scale>
			<Transfer {loading} {submitForm} />
		</div>
	{/if}
</div>
