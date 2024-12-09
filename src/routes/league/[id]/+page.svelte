<script lang="ts">
	import type { PageData } from './$types';

	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card';
	import { CalendarIcon, TrophyIcon, UsersIcon } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	import { enhance } from '$app/forms';
	let { data }: { data: PageData } = $props();
	const startDate = data.league?.startDate?.toLocaleDateString();
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
				<span>Starts: {startDate}</span>
			</p>
			<p class="flex gap-4">
				<UsersIcon />
				<span>{data.players.length} player(s)</span>
			</p>
			<!-- <p class="rounded-md bg-secondary p-3">Round 5</p> -->
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
					{#each data.players as player, idx}
						<Table.Row>
							<Table.Cell>{idx + 1}</Table.Cell>
							<Table.Cell class="font-medium">{player.user.username}</Table.Cell>
							<Table.Cell>{player.played}</Table.Cell>
							<Table.Cell>{player.won}</Table.Cell>
							<Table.Cell>{player.drawn}</Table.Cell>
							<Table.Cell>{player.lost}</Table.Cell>
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
				{#each data.players as player}
					<li class="rounded-md bg-secondary p-3">
						<p>{player.user.username}</p>
					</li>
				{/each}
			</ul>
		</section>
	</Card.Content>
	<Card.Footer>
		{#if data.isRegistered}
			<div class="mx-auto flex gap-6">
				<Button size="lg" variant="secondary" disabled>Registered</Button>
				<form action="?/unregister" method="post">
					<Button size="lg" variant="destructive" type="submit">Unregister</Button>
				</form>
			</div>
		{:else}
			<form method="POST" action="?/register" class="mx-auto" use:enhance>
				<Button size="lg" formaction="?/register" type="submit">Register</Button>
			</form>
		{/if}
	</Card.Footer>
</Card.Root>
