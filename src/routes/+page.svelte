<script lang="ts">
	import NavBar from '$lib/components/nav/NavBar.svelte';
	import NavBarDrawerListItem from '$lib/components/nav/NavBarDrawerListItem.svelte';
</script>

<NavBar>
	<NavBarDrawerListItem id="home" text="Home" url="/"></NavBarDrawerListItem>
	<NavBarDrawerListItem id="logDashboard" text="Log Dashboard" url="/logDasboard"></NavBarDrawerListItem>
</NavBar>

<style></style>
