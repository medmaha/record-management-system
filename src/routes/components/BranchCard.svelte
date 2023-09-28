<script lang="ts">
	import { fade } from 'svelte/transition';

	export let branch: any;

	function getGenderPrefix(manager: any) {
		if (!manager) return '';

		if (manager.gender.toLowerCase() === 'male') return 'Mr. ';
		return 'Mrs. ';
	}
</script>

<a
	href={`/companies/${branch.id}`}
	class="block relative overflow-hidden hover:scale-[1.01] card cursor-pointer shadow outline outline-2 hover:shadow-md hover:outline-2 hover:outline-sky-100 transition p-4 bg-white rounded-md outline-gray-100"
>
	<div in:fade class="absolute top-0 -left-1 h-full w-1.5 block bg-sky-300" />

	<div class="flex justify-center gap-3">
		<div class="flex-1 flex items-center gap-3">
			<div class="w-max">
				<img
					src={`/branch-default.jpg`}
					class="rounded-full border"
					alt="company icon"
					width="35px"
					height="35px"
				/>
			</div>
			<div class="w-max">
				<p class="text-sm font-semibold leading-none">{branch.name}</p>
				<p class="text-xs inline-flex items-center gap-1">
					<span class="uppercase">{branch.address?.region || 'N/A'}</span>
					<span class="uppercase font-light">-</span>
					<span class="inline-block font-light flex-1 truncate"
						>{branch.address?.name || 'N/A'}</span
					>
				</p>
				<div class="w-max flex items-center gap-1">
					<p class="text-xs inline-flex items-center gap-2">
						<span>Tel</span>
						<span class="font-light">{branch.telephone || 'N/A'}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="flex items-center justify-between gap-3 mt-2 pt-2">
		<div class="">
			<p class="text-xs line-clamp-1 inline-flex items-center gap-1">
				<span class="text-sky-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="fill-current"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						><path
							d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
						/></svg
					>
				</span>
				{branch.address.name || 'N/A'}
			</p>
		</div>
		<div class="w-max inline-flex items-center gap-1">
			<img
				src={`/manager-default.jpg`}
				class="rounded-full border"
				alt="company icon"
				width="25px"
				height="25px"
			/>
			<span class="inline-block font-semibold text-xs">
				{getGenderPrefix(branch.manager)}
				{branch.manager?.name?.split(' ').at(-1)}
			</span>
		</div>
	</div>
</a>
