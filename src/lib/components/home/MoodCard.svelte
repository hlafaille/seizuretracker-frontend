<script lang="ts">
	import Card from '$lib/components/tk/cards/Card.svelte';
	import Button from '$lib/components/tk/buttons/Button.svelte';
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