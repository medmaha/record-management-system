<script lang="ts">
	export let user: any;
	export let isMe = false;
</script>

<a
	href={`/users/${user.id}`}
	class="block relative overflow-hidden hover:scale-[1.01] card cursor-pointer shadow outline outline-2 hover:shadow-md hover:outline-2 hover:outline-sky-100 transition p-4 bg-white rounded-md outline-gray-100"
>
	<div class="absolute -right-1 top-0 w-1.5 h-full block bg-sky-300" />

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
			<div class="flex-1 space-y-2">
				<div class="flex w-full justify-between gap-4">
					<div class="space-y-1">
						<p class="font-semibold leading-none">
							<span>
								{isMe ? 'Me.' : user.name}
							</span>
						</p>
						<p class="text-sm leading-none">@{user.username}</p>
					</div>

					<div class="text-xs font-semibold inline-flex items-center gap-0.5 truncate">
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
						<b class="truncate">
							{user.role}
						</b>
					</div>
				</div>
				<div class="w-max flex items-center gap-1">
					<p class="text-xs inline-flex items-center gap-2">
						<span>Tel</span>
						<span class="font-light">{user.phone || 'N/A'}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</a>
