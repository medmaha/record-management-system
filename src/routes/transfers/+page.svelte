<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData, ActionData } from './$types';
	import StaffCard from '../components/StaffCard.svelte';
	import Heading from '../components/Heading.svelte';

	export let data: PageData;
	export let form: ActionData;

	let model = 'transfers';
	let cached = new Map();

	cached.set('transfers', data.transfers);
	cached.set('queries', []);

	$: current_snapshot = model;

	const submitForm: SubmitFunction = ({ action, formData }) => {
		return async ({ update, result }) => {
			await update({ reset: false });
			console.log(action);

			const query = formData.get('query') as string;
			const model = formData.get('model') as string;

			// white a code that change the current url address without reloading the browser

			window.history.pushState('', '', `?search=${query}&model=${model}`);
		};
	};

	if (form) console.log(form);
</script>

<Heading {model} user={data.user} {submitForm} hideModels={true} />

{#if !cached.get(current_snapshot)?.length}
	<div class="w-full h-[90dvh] flex items-center justify-center">
		<div class="p-10 bg-black bg-opacity-20 text-center rounded-2xl">
			<p class="text-center font-semibold pb-2 text-xl tracking-wide">Found no transfer record</p>
			{#if ['hr', 'superuser'].includes(data.user?.role?.toLowerCase())}
				<a
					href={`/create?model=transfer`}
					class="btn p-2 px-4 text-gray-800 text-sm font-bold inline-block mt-4"
				>
					+ Create transfer
				</a>
			{/if}
		</div>
	</div>
{:else}
	<div class="p-4">
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each cached.get(current_snapshot) as staff}
				<StaffCard {staff} />
			{/each}
		</div>
	</div>
{/if}
