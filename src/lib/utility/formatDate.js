export function formatDate(iso) {
	return new Date(iso).toLocaleDateString();
}
export function formatTime(isoString) {
	return new Date(isoString).toLocaleTimeString(undefined, {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true // Set to false if you want 24-hour format
	});
}
