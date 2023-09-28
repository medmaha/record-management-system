<script lang="ts">
	export let open: boolean = false;
	export let onClose: () => void;

	let dialog: HTMLDialogElement;

	$: if (open) {
		dialog.showModal();
	}

	function closeModal() {
		dialog.close();
		onClose();
	}
</script>

<dialog bind:this={dialog} class="group bg-transparent">
	<div
		class="w-full mx-auto p-6 bg-white transition rounded-lg shadow-lg _scale-0 group-open:scale-100 max-w-[350px]"
	>
		<div class="space-y-1 block w-full h-full">
			<h1 class="text-2xl font-semibold text-center tracking-wider">LOGOUT</h1>
			<div class="mb-2">
				<p class="text-gray-700 pt-2 text-center max-w-[40ch]">
					<b>Note:</b> You'll need your credentials to log back in to your account
				</p>
			</div>
			<div class="w-full flex justify-evenly items-center gap-6 pt-6">
				<form on:submit|preventDefault={() => {}}>
					<button
						on:click={closeModal}
						class="text-gray-700 bg-transparent border py-1 px-4 rounded-md hover:bg-gray-200 transition"
					>
						No cancel
					</button>
				</form>
				<form method="get">
					<button
						formaction="/logout"
						class="btn bg-red-500 focus:bg-red-500 py-1 px-2 bg-opacity-80 hover:bg-opacity-100"
					>
						Yes logout
					</button>
				</form>
			</div>
		</div>
	</div>
</dialog>
