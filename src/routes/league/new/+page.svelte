<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { UsersIcon, ClockIcon } from 'lucide-svelte';
	import { Input } from '@/components/ui/input';
	import { Checkbox } from '@/components/ui/checkbox';
	import { Button } from '@/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { toast } from 'svelte-sonner';
	import { Textarea } from '@/components/ui/textarea';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let isPublic = $state(false);
	let timeControl = $state('');
	if (form) {
		console.log(form);
		if (form.success) toast.success('League created successfully');
		if (form.success === false)
			toast.error('An error occurred', {
				description: form?.message || "We couldn't create the league"
			});
	}

	let dateValue = $state<DateValue | undefined>();
	let dateContentRef = $state<HTMLElement | null>(null);
</script>

<Card.Root class="mx-auto w-full md:w-2/3">
	<Card.Header>
		<Card.Title>Create New League</Card.Title>
		<Card.Description>Set up your league's details and preferences</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			name="league-form"
			action=""
			method="post"
			id="league-form"
			class="mx-auto flex flex-col gap-6 p-2 md:w-9/12"
		>
			<fieldset>
				<label>
					<span class="mb-2">League Name</span>
					<Input name="name" placeholder="Enter league name" type="text" />
				</label>
			</fieldset>

			<fieldset>
				<label>
					<span class="mb-2">League Description</span>
					<Textarea name="description" placeholder="Enter league description" />
				</label>
			</fieldset>

			<fieldset>
				<label>
					<p class="mb-2 flex items-center gap-4">
						<ClockIcon size={20} />
						<span> Time control </span>
					</p>
					<Select.Root bind:value={timeControl} type="single" name="time-control">
						<Select.Trigger>
							{timeControl || 'Select time control'}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="15+10">15+10</Select.Item>
							<Select.Item value="10+0">10+0</Select.Item>
							<Select.Item value="10+5">10+5</Select.Item>
							<Select.Item value="3+0">3+0</Select.Item>
							<Select.Item value="3+2">3+2</Select.Item>
						</Select.Content>
					</Select.Root>
				</label>
			</fieldset>

			{#if form?.success === false}
				<p class="text-sm text-red-500">{form.message}</p>
			{/if}

			<fieldset>
				<input type="date" name="start-date" bind:value={dateValue} hidden id="start-date" />
				<label>
					<p class="mb-2 flex items-center gap-4">
						<CalendarIcon size={20} />
						<span>Start Date</span>
					</p>
					<Popover.Root>
						<Popover.Trigger
							class={cn(
								buttonVariants({
									variant: 'outline',
									class: 'w-[280px] justify-start text-left font-normal'
								}),
								!dateValue && 'text-muted-foreground'
							)}
						>
							<CalendarIcon />
							{dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : 'Pick a date'}
						</Popover.Trigger>
						<Popover.Content bind:ref={dateContentRef} class="w-auto p-0">
							<Calendar type="single" bind:value={dateValue} />
						</Popover.Content>
					</Popover.Root>
				</label>
			</fieldset>
			<fieldset>
				<label class="flex items-center gap-4">
					<UsersIcon size={20} />
					<span>Public League</span>
					<Checkbox name="public" bind:checked={isPublic} />
				</label>
			</fieldset>
		</form>
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Button form="league-form" type="submit">Submit</Button>
	</Card.Footer>
</Card.Root>
