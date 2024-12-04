<script lang="ts">
	import type { PageData } from './$types';

	import * as Card from '$lib/components/ui/card';
	import { TrophyIcon, UsersIcon } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	let { data }: { data: PageData } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{data.league?.name}</Card.Title>
		<Card.Description>{data.league?.description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<h3 class="flex gap-4">
			<TrophyIcon class="stroke-amber-300" />
			<span> Standings </span>
		</h3>
		<h3 class="flex gap-4">
			<UsersIcon />
			<span> Registered players </span>
		</h3>
	</Card.Content>
	<Card.Footer>
		<div></div>
		<Button>Register</Button>
	</Card.Footer>
</Card.Root>
