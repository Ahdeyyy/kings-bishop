<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner/index';
	import Nav from '@/components/custom/Nav.svelte';
	import type { LayoutData } from './$types';
	import '../app.css';
	import type { Snippet } from 'svelte';
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Nav isAuthenticated={data.isAuth} />
<Toaster />
<div class="relative">
	<main class="container mx-auto mt-6 px-6">
		{@render children()}
	</main>
</div>
