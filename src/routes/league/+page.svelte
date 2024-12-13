<script lang="ts">
	import { Button } from '@/components/ui/button';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="text-center text-2xl font-semibold">Public leagues</h1>
<ul>
	{#each data.leagues as league}
		<li class="p-2">
			<Button variant="link" href={`league/${league.id}`}>
				{league.name}
			</Button>
		</li>
	{/each}
</ul>
