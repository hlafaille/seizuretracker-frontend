<script lang="ts">
	import Card from '$lib/components/tk/cards/Card.svelte';
	import Button from '$lib/components/tk/buttons/Button.svelte';
	import { REQUEST_FACTORY } from '$lib/utils/GlobalConstant';
	import { HttpMethod } from '$lib/utils/requesthandler/HttpMethod';
	import { Request } from '$lib/utils/requesthandler/Request.js';
	import type { RequestStatePropContext } from '$lib/utils/requesthandler/RequestStatePropContext';

	/**
	 * todo add an onMount & GET call to check if it's been X amount of time since last survey entry
	 */

	/**
	 * PROPS
	 */
	export let errorMessage: string | null = null;
	export let inFlight: boolean = false;

	/**
	 * ENUMS
	 */
	enum MoodSurveyAllowedMoods {
		BAD = 'BAD',
		CONFUSED = 'CONFUSED',
		MEH = 'MEH',
		GOOD = 'GOOD'
	}

	/**
	 * Sends an API request to create a new Mood Survey entry.
	 * @param mood
	 */
	async function doMoodSurveyEntrySubmission(mood: MoodSurveyAllowedMoods) {
		let request: Request = REQUEST_FACTORY.buildPostRequest('/moodSurvey', true, null);
		let context: RequestStatePropContext = {
			'errorMessageProp': errorMessage,
			'inFlightProp': inFlight
		};
		let response: Response = await request.doRequest(context);
	}

</script>

<Card title="How are you feeling?" subtitle="We'll generate a graph soon.">
    <div class="grid grid-cols-4 gap-2">
        <Button id="moodSurveyBadButton" text="Bad" on:click={await doMoodSurveyEntrySubmission(MoodSurveyAllowedMoods.BAD)}/>
        <Button id="moodSurveyConfusedButton" text="Confused" />
        <Button id="moodSurveyMehButton" text="Meh" />
        <Button id="moodSurveyGoodButton" text="Good" />
    </div>
</Card>


<style lang="postcss"></style>