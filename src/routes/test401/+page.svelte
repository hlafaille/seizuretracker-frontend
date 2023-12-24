<script>
	import { sendPostRequest } from '$lib/utils/requestHandler/requestSender';
	import { onMount } from 'svelte';

	onMount(async () => {
		await sendPostRequest('http://localhost:8080/v1/auth/test401', {}, true);
	});
</script>
