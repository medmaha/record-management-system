<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData, ActionData } from './$types';
	import RolesCard from './components/RolesCard.svelte';
	import Heading from '../components/Heading.svelte';

	export let form: ActionData;
	export let data: PageData;

	const submitForm: SubmitFunction = ({ cancel, formData }) => {
		return async ({ update }) => {
			update({ reset: true });
			setTimeout(() => {
				form = null;
			}, 3500);
		};
	};
</script>

<Heading user={data.user} hideForm={true} />

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

<div class="flex pt-12 items-center w-full max-w-[800px] mx-auto justify-center">
	<form
		autoComplete="off"
		method="POST"
		action="?/register"
		class="form bg-white rounded-md border border-gray-100 block w-full p-6"
		use:enhance={submitForm}
	>
		<h2 class="text-2xl font-semibold text-center mb-4">Register New User</h2>

		<div class="grid grid-cols-2 gap-x-4">
			<div class="input-field">
				<label for="name" class="label">Full Name</label>
				<input type="text" id="name" name="name" required class="w-full input" autoComplete="off" />
			</div>
			<div class="input-field">
				<label for="username" class="label">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					required
					class="w-full input"
					autoComplete="off"
				/>
			</div>
			<div class="input-field">
				<label for="password" class="label">Password</label>
				<input
					type="password"
					id="password"
					required
					name="password"
					class="w-full input"
					autoComplete="off"
				/>
			</div>
			<div class="input-field">
				<label for="telephone" class="label">Phone Number</label>
				<input
					type="tel"
					id="telephone"
					required
					name="telephone"
					class="w-full input"
					autoComplete="off"
				/>
			</div>
		</div>

		<RolesCard />

		<div class="text-center w-full pt-4">
			<button
				type="submit"
				class="bg-sky-500 w-full max-w-[170px] text-white hover:bg-sky-600 px-4 py-2 rounded focus:outline-none"
				>Register</button
			>
		</div>
	</form>
</div>

<style>
	/* Add custom styles here if needed */
</style>
