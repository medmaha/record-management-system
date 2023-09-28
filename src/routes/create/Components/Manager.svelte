<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let loading = false;
	export let submitForm: SubmitFunction = () => {};
</script>

<div class="max-w-[500px] mx-auto pt-16 form-wrapper">
	<form method="POST" class="form bg-white rounded-md shadow p-6 w-full" use:enhance={submitForm}>
		<div class="input-field input-field flex items-center gap-2">
			<label class="label" id="name">
				<span>Manager Name </span>
				<input id="name" required name="name" class="input" placeholder="name of this manager" />
			</label>
		</div>
		<div class="input-field input-field flex items-center gap-2">
			<label class="label" id="gender">
				<span>Manager Gender</span>
				<select required name="gender" id="gender" class="input py-2">
					{#each ['------', 'male', 'female'] as region}
						<option value={region.toUpperCase()}>
							{region.toUpperCase()}
						</option>
					{/each}
				</select>
			</label>
		</div>
		<div class="input-field flex items-center gap-2">
			<label class="label" id="address">
				<span>Manager Address </span>
				<input
					id="address"
					required
					name="address"
					class="input"
					placeholder="address of this manager"
				/>
			</label>
		</div>
		<div class="input-field flex items-center gap-2">
			<label class="label" id="region">
				<span>Manager Region</span>
				<select required name="region" id="region" class="input py-2">
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
				<span>Phone Number</span>
				<input
					required
					type="tel"
					id="telephone"
					class="input"
					name="telephone"
					placeholder="manager's phone number"
				/>
			</label>
		</div>
		<span class="flex w-full items-center justify-center pt-4">
			<button
				disabled={loading}
				formaction="?/createManager"
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
					<span> Add Manager </span>
				{/if}
			</button>
		</span>
	</form>
</div>
