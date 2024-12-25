<script lang="ts">
	import { Button, buttonVariants } from '@/components/ui/button';
	import type { PageData } from './$types';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	// import Fixture from './Fixture.svelte';

	let { data }: { data: PageData } = $props();
</script>

{#snippet player()}
	<article class="flex items-center gap-4">
		<p>name</p>
		<p>played</p>
		<p>won</p>
		<p>drawn</p>
		<p>lost</p>
		<p>points</p>
		<p>sb points</p>
		<div>
			<AlertDialog.Root>
				<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive' })}
					>Remove</AlertDialog.Trigger
				>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. This will remove user from the league.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action class={buttonVariants({ variant: 'destructive' })}
							>Remove</AlertDialog.Action
						>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	</article>
{/snippet}

<section>
	<h2 class="text-center text-lg">Players</h2>
	<ul>
		<li>{@render player()}</li>
	</ul>
</section>
