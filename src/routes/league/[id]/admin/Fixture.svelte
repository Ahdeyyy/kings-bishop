<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { Separator } from '@/components/ui/separator';
	import { LinkIcon } from 'lucide-svelte';
	type result = 'w' | 'b' | 't';
	type FixtureProps = {
		whiteUsername: string;
		blackUsername: string;
		matchUrl: string;
		result: result;
	};
</script>

<article
	class="flex w-fit items-center gap-4 rounded-md px-3 py-1 shadow-md ring-1 ring-secondary md:w-full md:justify-between"
>
	<div class="flex md:w-1/3 md:justify-between md:gap-6">
		<div class="flex items-center gap-4">
			<div class="size-4 rounded bg-white shadow-md ring-2 ring-secondary"></div>
			<p>white</p>
			<p>1/2</p>
			<Separator orientation="vertical" />
			<p>1/2</p>
			<p>black</p>
			<div class="size-4 rounded bg-black shadow-md ring-2 ring-secondary"></div>
		</div>
	</div>
	<div class="flex items-center gap-2">
		<LinkIcon size={16} />
		<Button variant="link">url to match</Button>
	</div>
	<!-- <div class="flex items-center gap-4">
		<p class="max-w-24 text-balance">-</p>
		<Button variant="default">Arbitrate</Button>
	</div> -->
</article>
