<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData, ActionData } from './$types';
	import Company from './components/Company.svelte';
	import Account from './components/Account.svelte';

	export let form: ActionData;
	export let data: PageData;

	export let loading = false;

	const submitForm: SubmitFunction = ({ formElement }) => {
		loading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') formElement.reset();
			setTimeout(() => {
				form = null;
			}, 3500);
			await update({ reset: true });
			loading = false;
		};
	};
</script>

<div class="pt-4" />

<div class="relative">
	<div class="absolute top-0 left-0 w-full">
		{#if form && !form.field}
			<p
				class="max-w-[500px] mx-auto p-4 text-lg font-semibold w-max min-w-[200px] rounded bg-green-500 text-white"
			>
				{form.message}
			</p>
		{:else if form?.field}
			<p
				class="max-w-[500px] mx-auto p-4 text-lg font-semibold w-max min-w-[200px] rounded bg-red-500 text-white"
			>
				{form.message}
			</p>
		{/if}
	</div>
</div>

<h1 class="text-3xl font-bold text-center uppercase tracking-wide">
	{data.app?.name || 'Initialization'}
</h1>

{#if !data.app}
	<p class="text-sm max-w-[60ch] mx-auto font-semibold text-center pt-1">
		Prepare your organization or company by providing the fundamental data required for this system
		to operate effectively.
	</p>
{/if}
<div class="flex pt-10 items-center w-full max-w-[800px] mx-auto justify-center pb-6">
	{#if data.stage === 'setup'}
		<Company {submitForm} {loading} />
	{:else if data.stage === 'account'}
		<Account {loading} {submitForm} app={data.app} />
	{/if}
</div>

<style>
	/* Add custom styles here if needed */
</style>
