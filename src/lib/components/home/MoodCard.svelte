<script lang="ts">
	import Card from '$lib/components/tk/cards/Card.svelte';
	import Button from '$lib/components/tk/buttons/Button.svelte';
	import { REQUEST_FACTORY } from '$lib/utils/GlobalConstant';
	import { Request } from '$lib/utils/requesthandler/Request.js';
	import { MoodSurveyAllowedMoods } from '$lib/dto/moodsurvey/MoodSurveyAllowedMoods';
	import { writable, type Writable } from 'svelte/store';
	import type { CreateMoodSurveyEntryResponse } from '$lib/dto/moodsurvey/CreateMoodSurveyEntryResponse';
	import type { CreateMoodSurveyEntryRequest } from '$lib/dto/moodsurvey/CreateMoodSurveyEntryRequest';

	/**
	 * todo add an onMount & GET call to check if it's been X amount of time since last survey entry
	 */

	/**
	 * PROPS
	 */
	let errorMessage: Writable<string | undefined> = writable(undefined);
	let inFlight: Writable<boolean> = writable(false);

	/**
	 * Sends an API request to create a new Mood Survey entry.
	 * @param mood
	 */
	async function doMoodSurveyEntrySubmission(mood: MoodSurveyAllowedMoods) {
		let requestPayload: CreateMoodSurveyEntryRequest = {
			currentMood: mood
		};
		let request: Request<CreateMoodSurveyEntryResponse> = REQUEST_FACTORY.buildPostRequest(
			'/moodSurvey',
			true,
			requestPayload,
			errorMessage,
			inFlight
		);
		let responsePayload: CreateMoodSurveyEntryResponse = await request.doRequest();
	}

</script>

<Card title="How are you feeling?" subtitle="We'll generate a graph soon.">
    <div class="grid grid-cols-4 gap-2">
        <Button id="moodSurveyBadButton" text="Bad"
                on:click={async function() {await doMoodSurveyEntrySubmission(MoodSurveyAllowedMoods.BAD)}} />
        <Button id="moodSurveyConfusedButton" text="Confused"
                on:click={async function() {await doMoodSurveyEntrySubmission(MoodSurveyAllowedMoods.CONFUSED)}} />
        <Button id="moodSurveyMehButton" text="Meh"
                on:click={async function() {await doMoodSurveyEntrySubmission(MoodSurveyAllowedMoods.MEH)}} />
        <Button id="moodSurveyGoodButton" text="Good"
                on:click={async function() {await doMoodSurveyEntrySubmission(MoodSurveyAllowedMoods.GOOD)}} />
    </div>
</Card>


<style lang="postcss"></style>