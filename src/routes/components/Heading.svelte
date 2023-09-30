<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/text';
	import LogoutCard from './LogoutCard.svelte';

	export let user: any = {};
	export let model: string = '';
	export let placeholder = 'Search ' + model;
	export let updateModel: any = () => {};
	export let submitForm: any = () => {};

	export let hideForm = false;
	export let hideProfile = false;
	export let hideLogout = false;
	export let hideModels = false;
	export let showLogin = false;
	export let showHeading = '';

	const models = ['staff', 'branch', 'transfer'];

	function pluralize(text: string) {
		if (text.endsWith('s')) return text + 'es';

		if (['y'].includes(text.at(-1) || '')) return text.slice(0, text.length - 1) + 'ies';

		if (['h'].includes(text.at(-1) || '')) return text + 'es';

		return text + 's';
	}

	let logout = false;
	function askLogout() {
		logout = !logout;
	}

	let searchDialog: HTMLDialogElement;
</script>

<div class="relative">
	<div
		class="px-4 py-3 bg-white flex items-center justify-between border-b sticky w-full top-0 gap-4"
	>
		{#if showHeading}
			<h1 class="text-lg font-bold text-center px-4">{showHeading || 'SRM System'}</h1>
		{/if}
		{#if !hideForm}
			<div class="inline-flex items-center gap-4 w-full">
				<form
					use:enhance={submitForm}
					action="?/query"
					method="POST"
					class="w-full max-w-[400px] block relative group"
				>
					<input
						on:focus={() => searchDialog?.show()}
						on:blur={() => searchDialog?.close()}
						type="text"
						class="input w-full outline-gray-400 py-0.5 pl-6"
						name="query"
						placeholder={pluralize(placeholder)}
						formaction="?/query"
					/>
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

				{#if !hideModels}
					<div class="inline-flex items-center gap-2">
						<p class="font-semibold pr-1">Model:</p>
						<select
							class="input text-sm p-1"
							on:change={(ev) => {
								updateModel(ev.currentTarget.value.toLowerCase());
							}}
						>
							{#each models as _model}
								<option value={capitalize(String(_model))}
									>{pluralize(capitalize(String(_model)))}</option
								>
							{/each}
						</select>
					</div>
				{/if}
			</div>
		{/if}

		<div class="inline-flex items-center gap-4 xl:gap-6 xl:flex-1 justify-end">
			{#if !hideProfile}
				<a href={`/account/${user.username}`} class="w-max inline-flex items-center gap-1">
					<img
						src="manager-default.jpg"
						alt="managers avatar"
						width="30"
						height="30"
						class="rounded-full border"
					/>
					<p
						class="font-semibold capitalize text-sm md:text-base truncate hidden sm:inline-block w-full"
					>
						{user.name}
					</p>
					<!-- <p class="font-semibold capitalize text-sm truncate sm:hidden inline-block w-full">
						{user.name?.split(' ')[2] || user.name?.split(' ')[1]}
					</p> -->
				</a>
			{/if}
			{#if !hideLogout}
				<div class="md:pl-4">
					<form on:submit|preventDefault={() => {}}>
						<button
							formaction="/logout"
							on:click={askLogout}
							class="transition inline-block font-semibold active rounded px-3 py-1 bg-red-500 w-full bg-opacity-70 text-white hover:bg-opacity-90"
							>Logout</button
						>
					</form>
				</div>
			{/if}
			{#if showLogin}
				<div class="md:pl-4">
					<a
						href="/login"
						class="transition inline-block font-semibold active rounded px-3 py-1 bg-sky-500 w-full bg-opacity-60 text-white hover:bg-opacity-80"
						>Login</a
					>
				</div>
			{/if}
		</div>
	</div>
	<!-- <dialog
		open={false}
		bind:this={searchDialog}
		class="left-1 pr-2 top-[102%] w-max flex justify-start p-0 bg-transparent"
	>
		<div
			class="p-10 space-y-2 w-full max-w-[600px] bg-white border-2 shadow border-t-0 rounded-b-lg"
		>
			<p class="text-sm-font-semibold text-gray-900">
				<b class=""> #notimplemented </b>
			</p>
			<h2 class="text-xl font-bold text-gray-700 pt-10">Searching for {model}</h2>
			<p class="text-sm-font-semibold text-gray-900 pb-6">
				This feature is currently under construction.
			</p>
		</div>
	</dialog> -->
</div>

<LogoutCard open={logout} onClose={askLogout} />
