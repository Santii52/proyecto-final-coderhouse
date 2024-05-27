const url = 'https://streaming-availability.p.rapidapi.com/shows/search/filters?country=%3CREQUIRED%3E&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=movie';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cd417f0d1emsh54a298f04c63a40p1c7e34jsneb5ece4bf8cb',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}