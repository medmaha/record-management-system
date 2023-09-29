<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	export let loading = false;
	export let submitForm: SubmitFunction = () => {};

	let managers: any[];
	let loadingData = true;

	async function retrieveData() {
		try {
			const response = await fetch('/create?query=staffs', {
				credentials: 'include',
				cache: 'force-cache',
				headers: {
					'Cache-Control': 'max-age=300'
				}
			});
			managers = await response.json();
			loadingData = false;
		} catch (error) {}
	}

	onMount(() => {
		retrieveData();
	});
</script>

<div class="max-w-[500px] mx-auto pt-16 form-wrapper">
	<form method="POST" class="form bg-white rounded-md shadow p-6 w-full" use:enhance={submitForm}>
		<div class="input-field flex items-center gap-2">
			<label class="label" id="name">
				<span>Branch Name </span>
				<input id="name" name="name" class="input" placeholder="name of the branch" />
			</label>
		</div>

		<div class="input-field flex items-center gap-2">
			<label class="label" id="city">
				<span> Branch Manager </span>
				{#if !loadingData}
					<select disabled={loading} class="input disabled:opacity-60 py-2" name="manager-id">
						<option value="N/A">------</option>
						{#each managers as manager}
							<option value={manager.id}>{manager.name}</option>
						{/each}
					</select>
				{:else}
					<div class="input inline-flex items-center justify-between px-2 opacity-70">
						<span class="py-1 animate-pulse duration-300">Loading ...</span>
						<span class="py-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								class="w-4 h-4 animate-spin fill-current"
							>
								<path
									d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
								/></svg
							>
						</span>
					</div>
				{/if}
			</label>
		</div>
		<div class="input-field flex items-center gap-2">
			<label class="label" id="address">
				<span>Branch Address </span>
				<input id="address" name="address" class="input" placeholder="location of the branch" />
			</label>
		</div>
		<div class="input-field flex items-center gap-2">
			<label class="label" id="region">
				<span>Branch Region</span>
				<select name="region" id="region" class="input py-2">
					{#each ['------', 'wcr', 'lrr', 'urr', 'nbr', 'crr', 'bjl'] as region}
						<option value={region.toUpperCase()}>
							{region.toUpperCase()}
						</option>
					{/each}
				</select>
			</label>
		</div>
		<div class="input-field flex items-center gap-2">
			<label class="label" id="telephone">
				<span>Branch Telephone</span>
				<input id="telephone" name="telephone" class="input" placeholder="branch telephone no." />
			</label>
		</div>
		<div class="flex w-full items-center justify-center pt-4">
			<button
				disabled={loading}
				formaction="?/createBranch"
				class="btn px-2 py-1 text-center text-lg max-w-[65%] w-full disabled:opacity-60"
			>
				{#if loading}
					<span class="inline-flex h-full items-center py-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							class="w-4 h-4 animate-spin fill-current"
						>
							<path
								d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
							/></svg
						>
					</span>
				{:else}
					<span> Add Branch </span>
				{/if}
			</button>
		</div>
	</form>
</div>
