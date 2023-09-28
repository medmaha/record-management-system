<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import type { LayoutData } from '../$types';

	import LogoutCard from './LogoutCard.svelte';
	import { scale } from 'svelte/transition';

	export let data: LayoutData;

	afterNavigate((navigator) => {
		currentRoute = navigator.to?.url.pathname || '';
	});

	onDestroy(() => {
		currentRoute = '';
	});

	let collapsed = false;
	let logout = false;
	let currentRoute = '';

	let showMoreLinkDialog = false;

	function handleOuterClick({ currentTarget }: any) {
		showMoreLinkDialog = !showMoreLinkDialog;

		if (showMoreLinkDialog)
			document.addEventListener('click', (ev: any) => {
				const target = ev.target as HTMLElement;
				if (target?.dataset?.route === '/more') return;
				if (target?.id === 'moreLinks') return;
				if (target?.closest('#moreLinks')) return;
				if (target?.querySelector('#moreLinks')) return;
				showMoreLinkDialog = false;
			});
		else
			document.removeEventListener('click', (ev: any) => {
				const target = ev.target as HTMLElement;
				if (target.dataset?.route === '/more') return;
				showMoreLinkDialog = false;
			});
	}

	function askLogout() {
		logout = !logout;
	}

	const links = [
		{
			name: 'Home',
			route: '/'
		},
		{
			name: 'Staffs',
			route: '/staffs'
		},
		{
			name: 'Branches',
			route: '/branches'
		},
		{
			name: 'Promotions',
			route: '/promotions'
		},
		{
			name: 'Transfer Records',
			route: '/transfers'
		}
	];
</script>

<LogoutCard open={logout} onClose={askLogout} />

<aside class={`sticky top-0 h-[100dvh] border-r z-30`}>
	<div
		class={`h-full ${
			collapsed ? 'w-max' : 'absolute w-[260px] border-r'
		}  top-0 left-0 bg-white md:bg-transparent md:static`}
	>
		{#if collapsed}
			<div class="block w-max px-1 py-2">
				<button
					on:click={() => (collapsed = !collapsed)}
					class="p-0:5 opacity-80 hover:opacity-100 inline-flex items-center justify-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						class="fill-current"
						viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /></svg
					>
				</button>
			</div>
		{:else}
			<nav class="h-full flex flex-col w-full pb-8">
				<h1 class="text-lg font-bold text-center py-3 px-4">{data.app.name || 'SRM System'}</h1>
				<div class="block px-4" />
				<ul class="flex-1 flex flex-col pt-4 gap-2 space-y-2 px-2">
					{#each links as link}
						<li class="inline-block w-full">
							<a
								data-route={link.route}
								href={link.route}
								class={`${
									link.route === currentRoute ? 'active' : ''
								} link inline-block font-semibold rounded px-2 py-1 bg-sky-500 w-full bg-opacity-0 hover:bg-opacity-30`}
								>{link.name}</a
							>
						</li>
					{/each}
					<li class="inline-block w-full">
						<button
							data-route="/more"
							on:click={handleOuterClick}
							class={`${
								'/more' === currentRoute ? 'active pr-5' : ''
							} link inline-block text-left font-semibold rounded px-2 py-1 bg-sky-500 w-full bg-opacity-0 hover:bg-opacity-30`}
							>More...
							<dialog
								id="moreLinks"
								open={showMoreLinkDialog}
								transition:scale
								class="left-10 mt-2 open:z-30 origin-top w-max bg-white p-4 rounded-r-lg rounded-bl-lg focus:outline-none border border-gray-200 shadow"
							>
								<ul class="flex flex-col gap-2 w-[200px] font-medium">
									<li class="inline-block w-full">
										<a
											href="/"
											class="link inline-flex justify-between items-center rounded px-2 py-1 bg-sky-500 w-full bg-opacity-0 hover:bg-opacity-20"
										>
											<span>System Users</span>
											<span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="fill-current"
													width="17"
													height="17"
													viewBox="0 0 18 18"
													><path
														d="M6 8c1.11 0 2-.9 2-2s-.89-2-2-2c-1.1 0-2 .9-2 2s.9 2 2 2zm6 0c1.11 0 2-.9 2-2s-.89-2-2-2c-1.11 0-2 .9-2 2s.9 2 2 2zM6 9.2c-1.67 0-5 .83-5 2.5V13h10v-1.3c0-1.67-3.33-2.5-5-2.5zm6 0c-.25 0-.54.02-.84.06.79.6 1.34 1.4 1.34 2.44V13H17v-1.3c0-1.67-3.33-2.5-5-2.5z"
													/></svg
												>
											</span>
										</a>
									</li>
									<li class="inline-block w-full">
										<a
											href="/"
											class="link inline-flex justify-between items-center rounded px-2 py-1 bg-sky-500 w-full bg-opacity-0 hover:bg-opacity-20"
										>
											<span>Settings</span>
											<span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="fill-current"
													width="16"
													height="16"
													viewBox="0 0 48 48"
													><path
														d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97L29 4.84c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97L9.9 10.1c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31C9.06 22.69 9 23.34 9 24s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zM24 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
													/></svg
												>
											</span>
										</a>
									</li>
								</ul>
							</dialog>
						</button>
					</li>
				</ul>
				<ul class="flex-1 flex flex-col justify-end items-center gap-4 px-4">
					{#if ['Superuser', 'HR'].includes(data.auth.role)}
						<li class="inline-block w-full">
							<a
								href="/create"
								class="transition inline-flex items-center justify-between font-semibold active rounded-md px-3 py-1 outline-2 outline outline-sky-400 w-full bg-transparent hover:outline-1 hover:bg-opacity-90 text-sky-500 hover:bg-sky-500 hover:text-white"
							>
								<span> Create </span>
								<span>
									<svg
										class="fill-current"
										xmlns="http://www.w3.org/2000/svg"
										height="18"
										viewBox="0 -960 960 960"
										width="18"
										><path
											d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
										/></svg
									>
								</span>
							</a>
						</li>
					{/if}
					{#if ['HR'].includes(data.auth.role)}
						<li class="inline-block w-full">
							<a
								href="/register"
								class="transition inline-flex items-center justify-between font-semibold active rounded-md px-3 py-1 bg-sky-500 w-full bg-opacity-70 text-white hover:bg-opacity-90"
							>
								<span> Register User</span>
								<span>
									<svg
										class="fill-current"
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 18 18"
										><path
											d="M10 8c1.66 0 2.99-1.34 2.99-3S11.66 2 10 2 7 3.34 7 5s1.34 3 3 3zm-6 2V8h2V6H4V4H2v2H0v2h2v2h2zm6 0c-2.33 0-7 1.17-7 3.5V16h14v-2.5c0-2.33-4.67-3.5-7-3.5z"
										/></svg
									>
								</span>
							</a>
						</li>
					{/if}
					<li class="inline-block w-full">
						<form on:submit|preventDefault={() => {}}>
							<button
								on:click={askLogout}
								formaction="/logout"
								class="transition inline-flex items-center justify-between font-semibold active rounded-md px-3 py-1 bg-red-500 w-full bg-opacity-70 text-white hover:bg-opacity-90"
							>
								<span> Logout </span>

								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="fill-current"
										height="18"
										viewBox="0 -960 960 960"
										width="18"
										><path
											d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
										/></svg
									>
								</span>
							</button>
						</form>
					</li>
				</ul>
			</nav>
		{/if}
		<div class="trianglek absolute left-full top-[50%] translate-y-[-50%]" />
		<div
			class="absolute z-10 left-full h-[50px] min-w-[10px] text-white top-[50%] translate-y-[-50%] translate-x-[-20%] flex items-center justify-center w-max"
		>
			<button
				on:click={() => (collapsed = !collapsed)}
				class={`inline-block h-full transition-[transform] duration-[400ms] ${
					collapsed ? 'rotate-[180deg] pl-0.5' : 'rotate-0'
				}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					class="fill-current"
					viewBox="0 0 24 24"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" /></svg
				>
			</button>
		</div>
	</div>
</aside>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.triangle {
		width: 10px;
		height: 50px;
		@apply bg-sky-300 rounded-r-md;
	}
	.link {
		@apply border-b-2 border-transparent transition-[border,color];
	}
	.link.active {
		@apply border-opacity-30 border-sky-500 text-sky-500 w-max min-w-[60px] rounded-none pl-[2px] ml-2 rounded-r-lg;
	}
	.link.active:hover {
		@apply text-sky-500 bg-transparent;
	}
</style>
