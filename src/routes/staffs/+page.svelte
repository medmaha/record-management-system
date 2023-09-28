<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData, ActionData } from './$types';
	import StaffCard from '../components/StaffCard.svelte';
	import Heading from '../components/Heading.svelte';

	export let data: PageData;
	export let form: ActionData;

	let model = 'staff';
	let cached = new Map();

	cached.set('staff', data.staffs);
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

<div class="p-4">
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each cached.get(current_snapshot) as staff}
			<StaffCard {staff} />
		{/each}
	</div>
</div>
