<script lang="ts">
	let roles = ['Staff', 'Superuser', 'HR']; // Define available roles

	let roleCapabilities = {
		Staff: 'Basic staff role with read-only access to view company data.',
		Superuser:
			'Superuser role with read and write access to manage and supervise staff, as well as view company data.',
		HR: 'Human Resources role with read and write access to HR functions, including employee management and data access.'
	} as any;

	let selectedRole = 'Staff';
</script>

<div class="mb-4">
	<label for="role" class="block text-gray-600">Role</label>
	<div class="flex justify-between gap-4 items-center">
		{#each roles as role (role)}
			<div
				class={`role ${
					role === selectedRole ? 'active' : ''
				} bg-white transition relative cursor-pointer outline outline-1 outline-gray-200 rounded shadow-md w-max p-4 hover:outline-sky-500`}
			>
				<label class="cursor-pointer">
					<input type="radio" name="role" value={role} bind:group={selectedRole} class="hidden" />
					<div class="text-center">
						<div class="text-lg font-semibold">{role}</div>
						<p class="text-sm text-gray-500 mt-2 max-w-[35ch]">{roleCapabilities[role]}</p>
					</div>
				</label>

				{#if role === selectedRole}
					<div class="text-sky-500 absolute top-2 right-2 block">
						<svg
							width="18"
							height="18"
							class="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							><path
								d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
							/></svg
						>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.role.active {
		outline-width: 2px;
		outline-offset: 5px;
	}
	.role.active:not(:hover) {
		outline-color: skyblue;
	}
</style>
