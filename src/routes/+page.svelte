<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { EventHandler } from 'svelte/elements';
	import BranchCard from './components/BranchCard.svelte';
	import StaffCard from './components/StaffCard.svelte';
	import Heading from './components/Heading.svelte';

	export let data: PageData;
	export let form: ActionData;

	let model = data.model || 'staff';
	let cached = new Map();

	cached.set('staff', data.staffs);
	cached.set('branch', data.branches);

	const updateModel = (value: string) => {
		model = value;

		window.history.pushState('', '', `?model=${model}`);
	};

	const submitForm: SubmitFunction = ({ action, formData }) => {
		return async ({ update, result }) => {
			await update({ reset: false });
			const query = formData.get('query') as string;
			const model = formData.get('model') as string;

			window.history.pushState('', '', `?search=${query}&model=${model}`);
		};
	};

	if (form) console.log(form?.query);
</script>

<Heading {model} user={data.user} {submitForm} {updateModel} />

{#if !cached.get(model)?.length}
	<div class="w-full h-[90dvh] flex items-center justify-center -z-20">
		<div class="p-10 bg-black bg-opacity-20 text-center rounded-2xl">
			<p class="text-center font-semibold pb-2 text-xl tracking-wide">
				Found no {model} record
			</p>
			{#if ['hr', 'superuser'].includes(data.user?.role?.toLowerCase() || '')}
				<a
					href={`/create?model=${model}`}
					class="btn p-2 px-4 text-gray-800 text-sm font-bold inline-block mt-4"
				>
					+ Create {model}
				</a>
			{/if}
		</div>
	</div>
{:else}
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
		{#each cached.get(model) as object, i}
			{#if model === 'branch'}
				<BranchCard branch={object} />
			{:else if model === 'staff'}
				<StaffCard staff={object} />
			{/if}
		{/each}
	</div>
{/if}
