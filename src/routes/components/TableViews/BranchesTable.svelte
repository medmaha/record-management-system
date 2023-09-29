<!-- create a html table -->
<script lang="ts">
	export let branches: any[];
	import { fade } from 'svelte/transition';
</script>

<div class="p-x">
	<table class="table-auto shadow bg-white table w-full">
		<thead>
			<th class="font-medium text-sm">No:</th>
			<th> Name </th>
			<th> Manager </th>
			<th> Address </th>
			<th> Region </th>
			<th> Telephone </th>
		</thead>
		<tbody>
			{#each branches as branch, i}
				<tr in:fade>
					<td class="font-medium text-sm">
						{i + 1}
					</td>
					<td>
						{branch.name}
					</td>
					<td>
						{branch.manager?.name || 'N/A'}
					</td>
					<td>
						{branch.address?.name || 'N/A'}
					</td>
					<td>
						{branch.address?.region || 'N/A'}
					</td>
					<td>
						{branch.telephone || 'N/A'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	table thead {
		background: rgb(226, 226, 226);
	}
	table th {
		text-align: left;
	}

	table th,
	table td {
		padding: 10px 12px;
	}
</style>
