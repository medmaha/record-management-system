<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-10 space-y-2">
	<p class="text-sm-font-semibold text-gray-900">
		<b class=""> #notimplemented </b>
	</p>
	<h2 class="text-xl font-bold text-gray-700 pt-10">{data.branch.name} Branch</h2>
	<p class="text-sm-font-semibold text-gray-900">This page is currently under construction.</p>

	<div class="pt-8">
		<pre><code>{JSON.stringify(data.branch, null, 2)}</code></pre>
	</div>
</div>
