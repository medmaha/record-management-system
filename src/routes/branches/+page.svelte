<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData, ActionData } from './$types';
	import BranchesTable from '../components/TableViews/BranchesTable.svelte';
	import BranchCard from '../components/BranchCard.svelte';
	import Heading from '../components/Heading.svelte';
	import ViewSwitcher from '../components/ViewSwitcher.svelte';
	import { fade } from 'svelte/transition';

	export let data: PageData;
	export let form: ActionData;

	let model = 'branches';
	let cached = new Map();

	cached.set('branches', data.branches);
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

	let view = 'grid' as 'grid' | 'table';

	const toggleView = (_view: typeof view) => {
		view = _view;
	};
</script>

<Heading {model} user={data.user} {submitForm} hideModels={true} placeholder="Search branches..." />

<ViewSwitcher {view} {toggleView} />

{#if view === 'table'}
	<div class="p-4 pt-0">
		<BranchesTable branches={cached.get(current_snapshot)} />
	</div>
{:else if !cached.get(current_snapshot)?.length}
	<div class="w-full h-[90dvh] flex items-center justify-center">
		<div class="p-10 bg-black bg-opacity-20 text-center rounded-2xl">
			<p class="text-center font-semibold pb-2 text-xl tracking-wide">Found no branch record</p>
			{#if ['hr', 'superuser'].includes(data.user?.role?.toLowerCase())}
				<a
					href={`/create?model=branch`}
					class="btn p-2 px-4 text-gray-800 text-sm font-bold inline-block mt-4"
				>
					+ Create branch
				</a>
			{/if}
		</div>
	</div>
{:else}
	<div class="p-4 pt-0">
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each cached.get(current_snapshot) as branch}
				<div class="" in:fade>
					<BranchCard {branch} />
				</div>
			{/each}
		</div>
	</div>
{/if}
