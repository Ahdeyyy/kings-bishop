<script lang="ts">
	import type { PageData } from './$types';

	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card';
	import { CalendarIcon, TrophyIcon, UsersIcon } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	let { data }: { data: PageData } = $props();
	const players = [
		{ name: 'rando', played: 5, wins: 3, draws: 1, losses: 1, points: 3.5 },
		{ name: 'rando', played: 5, wins: 3, draws: 1, losses: 1, points: 3.5 },
		{ name: 'rando', played: 5, wins: 3, draws: 1, losses: 1, points: 3.5 },
		{ name: 'rando', played: 5, wins: 3, draws: 1, losses: 1, points: 3.5 },
		{ name: 'rando', played: 5, wins: 3, draws: 1, losses: 1, points: 3.5 }
	];
</script>

<Card.Root class="mx-auto w-full md:w-2/3 ">
	<Card.Header>
		<Card.Title>{data.league?.name}</Card.Title>
		<Card.Description>{data.league?.description}</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-8">
		<section class="flex items-center gap-6">
			<p class="flex gap-4">
				<CalendarIcon />
				<span>Starts: 11/11/11</span>
			</p>
			<p class="flex gap-4">
				<UsersIcon />
				<span>{players.length} players</span>
			</p>
			<p class="rounded-md bg-secondary p-3">Round 5</p>
		</section>
		<section class="grid gap-6">
			<h3 class="flex gap-4">
				<TrophyIcon class="stroke-amber-300" />
				<span> Standings </span>
			</h3>
			<Table.Root>
				<Table.Caption>Current League Standings</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">Pos</Table.Head>
						<Table.Head>Name</Table.Head>
						<Table.Head>P</Table.Head>
						<Table.Head>W</Table.Head>
						<Table.Head>D</Table.Head>
						<Table.Head>L</Table.Head>
						<Table.Head class="text-right">Pts</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each players as player, idx}
						<Table.Row>
							<Table.Cell>{idx + 1}</Table.Cell>
							<Table.Cell class="font-medium">{player.name}</Table.Cell>
							<Table.Cell>{player.played}</Table.Cell>
							<Table.Cell>{player.wins}</Table.Cell>
							<Table.Cell>{player.draws}</Table.Cell>
							<Table.Cell>{player.losses}</Table.Cell>
							<Table.Cell class="text-right">{player.points}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</section>
		<section>
			<h3 class="flex gap-4">
				<UsersIcon />
				<span> Registered players </span>
			</h3>
			<ul class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
				{#each players as player}
					<li class="rounded-md bg-secondary p-2">
						<p>{player.name}</p>
					</li>
				{/each}
			</ul>
		</section>
	</Card.Content>
	<Card.Footer>
		<Button class="mx-auto w-2/3 md:w-1/3">Register</Button>
	</Card.Footer>
</Card.Root>
