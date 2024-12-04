<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import Nav from '@/components/custom/Nav.svelte';

	const { data }: { data: PageData } = $props();
</script>

<section class="grid h-96 place-content-center gap-8">
	<div class="space-y-2">
		<h1 class="text-balance text-center text-3xl font-bold md:text-5xl">
			Create and manage your chess league
		</h1>
		<p class="text-center text-lg text-muted-foreground">
			Join or create a league to play chess with your friends
		</p>
	</div>
	<div>
		<Button href="/league/new">Create League</Button>
	</div>
</section>
