<script lang="ts">
	import Card from '$lib/components/tk/cards/Card.svelte';
	import Button from '$lib/components/tk/buttons/Button.svelte';
	import { sendPostRequest } from '$lib/utils/requestHandler/requestSender';

	/**
	 * todo add an onMount & GET call to check if it's been X amount of time since last survey entry
	 */

	/**
	 * PROPS
	 */
	export let errorMessage: string | null = null;
	export let isLoading: boolean = false;

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
	 * Sets
	 * @param mood
	 */
	async function doMoodSurveyEntrySubmission(mood: MoodSurveyAllowedMoods) {
	}

</script>

<Card title="How are you feeling?" subtitle="We'll generate a graph soon.">
	<div class="grid grid-cols-4 gap-2">
		<Button id="moodSurveyBadButton" text="Bad" />
		<Button id="moodSurveyConfusedButton" text="Confused" />
		<Button id="moodSurveyMehButton" text="Meh" />
		<Button id="moodSurveyGoodButton" text="Good" />
	</div>
</Card>


<style lang="postcss"></style>