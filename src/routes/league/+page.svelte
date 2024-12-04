<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Public leagues</h1>
<ul>
	{#each data.leagues as league}
		<li>
			<a href={`league/${league.id}`}>{league.name}</a>
		</li>
	{/each}
</ul>
