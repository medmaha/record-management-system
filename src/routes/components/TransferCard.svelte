<script lang="ts">
	import { fade } from 'svelte/transition';

	export let transfer: any;
</script>

<a
	href={`/transfers/${transfer.id}`}
	class="block relative overflow-hidden hover:scale-[1.01] card cursor-pointer shadow outline outline-2 hover:shadow-md hover:outline-2 hover:outline-sky-100 transition p-4 bg-white rounded-md outline-gray-100"
>
	<div in:fade class="absolute left-0 -top-1 w-full h-1.5 block bg-sky-300" />

	<div class="flex justify-center gap-3">
		<div class="flex-1 flex gap-3">
			<div class="w-max">
				<img
					src={`/manager-default.jpg`}
					class="rounded-full border"
					alt="company icon"
					width="35px"
					height="35px"
				/>
			</div>
			<div class="w-max">
				<p class="text-sm font-semibold leading-none">{transfer.name}</p>
				<p class="text-xs inline-flex items-center gap-1">
					<span>{transfer.position}</span>
					{#if transfer.department}
						<span class="uppercase font-light">-</span>
						<span class="inline-block font-light flex-1 truncate">{transfer.department}</span>
					{/if}
				</p>
				<div class="w-max flex items-center gap-1">
					<p class="text-xs inline-flex items-center gap-2">
						<span>Tel</span>
						<span class="font-light">{transfer.telephone || 'N/A'}</span>
					</p>
				</div>
			</div>
		</div>
		<!-- <div class="">
			<p class="text-xs font-semibold inline-flex items-center gap-0.5 truncate">
				<span class="text-sky-200">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						><path
							d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
						/></svg
					>
				</span>
				<span class="truncate">
					{manager.branch?.name}
				</span>
			</p>
		</div> -->
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
				{transfer.address?.name || 'N/A'}
			</p>
		</div>
		<div class="w-max flex items-center gap-1">
			<p>
				<span class="text-sm font-medium capitalize">{transfer.gender}</span>
			</p>
		</div>
	</div>
</a>
