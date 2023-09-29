<!-- create a html table -->
<script lang="ts">
	import { fade } from 'svelte/transition';
	export let staffs: any[];
</script>

<div class="p-x">
	<table class="table-auto shadow bg-white table w-full">
		<thead>
			<th class="font-medium text-sm">No:</th>
			<th> Name </th>
			<th> Position </th>
			<th> Department </th>
			<th> Address </th>
			<th> Telephone </th>
		</thead>
		<tbody>
			{#each staffs as staff, i}
				<tr in:fade>
					<td class="font-medium text-sm">
						{i + 1}
					</td>
					<td>
						{staff.name}
					</td>
					<td>
						{staff.position || 'N/A'}
					</td>
					<td>
						{staff.department || 'N/A'}
					</td>
					<td>
						{staff.address?.name ? staff.address.name : 'N/A'}
					</td>
					<td>
						{staff.telephone || 'N/A'}
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
