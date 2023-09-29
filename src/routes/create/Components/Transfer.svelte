<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	export let loading = false;
	export let submitForm: SubmitFunction = () => {};

	let branches: any[];
	let managers: any[];
	let loadingData = true;

	async function retrieveData() {
		try {
			const response2 = await fetch('/create?query=staffs', {
				credentials: 'include',
				cache: 'force-cache',
				headers: {
					'Cache-Control': 'max-age=300'
				}
			});
			const response1 = await fetch('/create?query=branches', {
				credentials: 'include',
				cache: 'force-cache',
				headers: {
					'Cache-Control': 'max-age=300'
				}
			});

			managers = await response2.json();
			branches = await response1.json();

			loadingData = false;
		} catch (error: any) {
			alert(error.message);
		}
	}

	onMount(() => {
		retrieveData();
	});

	let from_branch = { name: '', id: '' };

	function handleManagerChange(ev: any) {
		const manager_id = ev.currentTarget.value as string;
		const manager_data = managers.find((manager: any) => String(manager.id) === manager_id);

		const manager_branch = branches.find((branch: any) => branch.id === manager_data.branchId);

		if (manager_branch) {
			from_branch = manager_branch;
		} else {
			from_branch = { name: 'N/A', id: 'N/A' };
		}
	}
</script>

<div class="max-w-[500px] mx-auto pt-16 form-wrapper">
	<form method="POST" class="form bg-white rounded-md shadow p-6 w-full" use:enhance={submitForm}>
		<div class="input-field flex items-center gap-2">
			<label class="label" id="manager_id">
				<span>Manager </span>
				{#if !loadingData}
					<select
						disabled={loading}
						class="input disabled:opacity-60 py-2"
						id="manager_id"
						name="staff-id"
						on:change={handleManagerChange}
					>
						<option value="------">------</option>
						{#each managers as manager}
							<option value={manager.id}>{manager.name} </option>
						{/each}
					</select>
				{:else}
					<div class="input inline-flex items-center justify-between px-2 opacity-70">
						<span class="py-2 animate-pulse duration-300">Loading ...</span>
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
			<label class="label">
				<span>From Branch</span>
				<input
					disabled={true}
					class="input disabled:opacity-50 pointer-events-none"
					placeholder="manager's current branch"
					value={from_branch.name}
				/>
				<input type="hidden" name="from-branch-id" value={from_branch.id} />
			</label>
		</div>
		<div class="input-field flex items-center gap-2">
			<label class="label" id="manager_id">
				<span>To Branch </span>
				{#if !loadingData}
					<select
						disabled={loading}
						class="input disabled:opacity-60 py-2"
						id="manager_id"
						name="to-branch-id"
					>
						<option value="------">------</option>
						{#each branches as branch}
							<option value={branch.id}
								>{branch.name}
								<span class="text-xs pl-4" title="Company ID">CID:{branch.id}</span>
							</option>
						{/each}
					</select>
				{:else}
					<div class="input inline-flex items-center justify-between px-2 opacity-70">
						<span class="py-2 animate-pulse duration-300">Loading ...</span>
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
			<label class="label" id="remarks">
				<span>Remark </span>
				<textarea
					name="remarks"
					id="remarks"
					class="input min-h-[80px] resize-none overflow-y-auto p-2"
					placeholder="add some remarks to this transfer..."
				/>
			</label>
		</div>

		<span class="flex w-full items-center justify-center pt-4">
			<button
				disabled={loading}
				formaction="?/createTransfer"
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
					<span> Create Transfer </span>
				{/if}
			</button>
		</span>
	</form>
</div>
