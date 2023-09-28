<script lang="ts">
	import { enhance } from '$app/forms';
	import { redirect, type SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	export let loading = false;
	export let form: ActionData;

	const submitForm: SubmitFunction = ({ formElement }) => {
		loading = true;
		return async ({ result, update }) => {
			loading = false;
			formElement.reset();
			await update({ reset: true });
			setTimeout(() => {
				form = { username: form?.username } as any;
				if (result.type === 'success') return redirect(301, '/');
			}, 5000);
		};
	};
</script>

<div class="relative">
	<div class="absolute top-0 left-0 w-full">
		{#if form?.error}
			<p
				class="max-w-[500px] rounded-2xl mx-auto p-4 font-semibold w-max min-w-[200px] bg-red-500 text-white"
			>
				{form.message}
			</p>
		{/if}
	</div>
</div>

<div class="max-w-[400px] mx-auto pt-16 form-wrapper">
	<form method="POST" class="form bg-white rounded-md shadow p-6 w-full" use:enhance={submitForm}>
		<h2 class="text-xl font-semibold pb-4 text-center">Sign in to your Account</h2>
		<div class="input-field flex items-center gap-2">
			<label id="username" class="label">
				<span>Username </span>
				{#if form?.username}
					<input
						id="username"
						required
						name="username"
						class="input"
						value={form.username}
						placeholder="your account username"
					/>
				{:else}
					<input
						id="username"
						required
						name="username"
						class="input"
						placeholder="your account username"
					/>{/if}
			</label>
		</div>
		<div class="flex items-center gap-2 input-field">
			<label id="password" class="label">
				<span>Password </span>
				<input
					type="password"
					id="password"
					required
					name="password"
					class="input"
					placeholder="your account password"
				/>
			</label>
		</div>
		<div class="flex w-full items-center justify-center pt-4">
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
					<span> Sign In </span>
				{/if}
			</button>
		</div>
	</form>
</div>
