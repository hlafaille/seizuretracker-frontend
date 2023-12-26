<script lang="ts">
	import FlexCenterContainer from '$lib/components/tk/containers/FlexCenterContainer.svelte';
	import Card from '$lib/components/tk/cards/Card.svelte';
	import NavBar from '$lib/components/tk/nav/NavBar.svelte';
	import NavBarDrawerListItem from '$lib/components/tk/nav/NavBarDrawerListItem.svelte';
	import MoodCard from '$lib/components/home/MoodCard.svelte';

	/** ENUMS */
	enum NavBarDrawerListPages {
		HOME = 'HOME',
		LOG_DASHBOARD = 'LOG_DASHBOARD',
		MEDICATION = 'MEDICATION'
	}

	/** PROPS */
	let isDrawerActive: boolean = false;
	let currentPage: NavBarDrawerListPages = NavBarDrawerListPages.HOME;

	function setCurrentPage(page: NavBarDrawerListPages) {
		currentPage = page;
		isDrawerActive = false;
	}
</script>

<NavBar bind:isDrawerActive>
	<NavBarDrawerListItem id="home" text="Home" on:click={() => setCurrentPage(NavBarDrawerListPages.HOME)} />
	<NavBarDrawerListItem
		id="logDashboard"
		text="Log Dashboard"
		on:click={() => setCurrentPage(NavBarDrawerListPages.LOG_DASHBOARD)}
	/>
	<NavBarDrawerListItem
		id="medication"
		text="Medication"
		on:click={() => setCurrentPage(NavBarDrawerListPages.MEDICATION)}
	/>
</NavBar>
<FlexCenterContainer>
	<div class="p-2">
		{#if currentPage === NavBarDrawerListPages.HOME}
			<MoodCard />
		{:else if currentPage === NavBarDrawerListPages.LOG_DASHBOARD}
			<Card title="Log Dashboard"></Card>
		{:else if currentPage === NavBarDrawerListPages.MEDICATION}
			<Card title="Medication"></Card>
		{/if}
	</div>
</FlexCenterContainer>

<style></style>
