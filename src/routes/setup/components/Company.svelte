<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let loading = false;
	export let submitForm: SubmitFunction;
</script>

<form
	autoComplete="off"
	method="POST"
	action="?/setup"
	class="form bg-white rounded-md border border-gray-100 block w-full p-6"
	use:enhance={submitForm}
>
	<h2 class="text-2xl font-semibold text-center mb-4">Setup Organization</h2>

	<div class="grid pt-4 grid-cols-2 gap-x-4">
		<div class="input-field">
			<label for="name" class="label">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				required
				class="w-full input"
				autoComplete="off"
				placeholder="What's the name of org?"
			/>
		</div>

		<div class="input-field">
			<label for="telephone" class="label">Industry</label>
			<input
				type="text"
				id="industry"
				required
				name="industry"
				class="w-full input"
				autoComplete="off"
				placeholder="which industry does your org belong to?"
			/>
		</div>

		<div class="input-field">
			<label for="data-founded" class="label">Date Founded</label>
			<input
				type="date"
				id="data-founded"
				required
				name="date-founded"
				class="w-full input"
				placeholder="When Was Your Company Founded"
			/>
		</div>
		<div class="input-field">
			<label for="headquarters" class="label">Headquarters</label>
			<input
				type="text"
				id="headquarters"
				required
				name="headquarters"
				class="w-full input"
				placeholder="The HQ's address of your company"
			/>
		</div>
	</div>

	<div class="text-center w-full pt-4">
		<button
			disabled={loading}
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
				<span> Submit </span>
			{/if}
		</button>
	</div>
</form>
