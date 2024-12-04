<script lang="ts">
	import Button from './../../lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div>
	<Button href="/login/lichess">lichess</Button>
</div>
