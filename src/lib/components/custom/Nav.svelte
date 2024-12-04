<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	const { isAuthenticated }: { isAuthenticated: boolean } = $props();
</script>

<nav
	class="sticky top-2 mx-auto mb-3 mt-3 w-fit bg-transparent shadow-lg shadow-primary-foreground backdrop-blur-lg md:left-1/2 md:-translate-x-1/2"
>
	<ul class="flex items-center justify-between gap-12 rounded-md px-3 py-2 ring-1 ring-primary/20">
		<li>
			<Button href="/" variant="ghost">KB</Button>
		</li>
		<li>
			<ul class="flex gap-6">
				<Button href="/league" variant="ghost">League</Button>
			</ul>
		</li>
		{#if isAuthenticated}
			<li>
				<ul class="flex gap-6">
					<Button href="/league/new" variant="ghost">New League</Button>
					<form method="post" action="/?/logout" use:enhance>
						<Button type="submit" variant="destructive">Logout</Button>
					</form>
				</ul>
			</li>
		{:else}
			<li class="self-end">
				<Button href="/login/lichess">Sign in</Button>
			</li>
		{/if}
	</ul>
</nav>
