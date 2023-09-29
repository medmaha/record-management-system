<script lang="ts">
	import Heading from '../components/Heading.svelte';

	// import { PageData } from './$types';

	import UserCard from './Components/UserCard.svelte';

	export let data: any;

	function submitForm() {}
	function updateModel() {}
</script>

<Heading model="user" user={data.auth} {submitForm} {updateModel} hideModels={true} />

{#if !data.users?.length}
	<div class="w-full h-[90dvh] flex items-center justify-center -z-20">
		<div class="p-10 bg-black bg-opacity-20 text-center rounded-2xl">
			<p class="text-center font-semibold pb-2 text-xl tracking-wide">Found no users record</p>
			{#if ['hr', 'superuser'].includes(data.user?.role?.toLowerCase() || '')}
				<a
					href={`/register`}
					class="btn p-2 px-4 text-gray-800 text-sm font-bold inline-block mt-4"
				>
					+ Create User
				</a>
			{/if}
		</div>
	</div>
{:else}
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
		{#each data.users as user}
			<UserCard {user} isMe={String(user.id) === String(data.auth.id)}/>
		{/each}
	</div>
{/if}
<!-- <div class="p-10 space-y-2">
	<p class="text-sm-font-semibold text-gray-900">
		<b class=""> #notimplemented </b>
	</p>
	<h2 class="text-xl font-bold text-gray-700 pt-10">Users</h2>
	<p class="text-sm-font-semibold text-gray-900">This page is currently under construction.</p>

	<div class="pt-8">
		<pre><code>{JSON.stringify(data.users, null, 2)}</code></pre>
	</div>
</div> -->
