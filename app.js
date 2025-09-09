// Simple caffeine tracker for coffee beverages
(function () {
	const LIMIT = 400;
	let total = 0;

	const totalEl = document.getElementById('totalMg');
	const progressEl = document.getElementById('progress');
	const messageEl = document.getElementById('message');

	function updateUI() {
		totalEl.textContent = total;
		const pct = Math.min(100, Math.round((total / LIMIT) * 100));
		progressEl.style.width = pct + '%';
		progressEl.setAttribute('aria-valuenow', String(total));

		// Visual messages and color changes
		if (total === 0) {
			messageEl.textContent = "You're good — stay hydrated!";
			progressEl.className = 'progress';
		} else if (total < LIMIT * 0.5) {
			messageEl.textContent = 'Light — well within the limit.';
			progressEl.className = 'progress green';
		} else if (total < LIMIT * 0.85) {
			messageEl.textContent = 'Caution — approaching the limit.';
			progressEl.className = 'progress orange';
		} else if (total <= LIMIT) {
			messageEl.textContent = 'Almost there — consider slowing down.';
			progressEl.className = 'progress orange';
		} else {
			messageEl.textContent = 'Over the recommended daily limit! Please be careful.';
			progressEl.className = 'progress red';
		}
	}

	function addDrink(mg) {
		total += mg;
		// Keep total as integer
		total = Math.round(total);
		updateUI();
	}

	function reset() {
		total = 0;
		updateUI();
	}

	// Attach handlers
	document.getElementById('espresso').addEventListener('click', () => addDrink(60));
	document.getElementById('americano').addEventListener('click', () => addDrink(150));
	document.getElementById('cappuccino').addEventListener('click', () => addDrink(80));
	document.getElementById('reset').addEventListener('click', reset);

	// Initialize
	updateUI();
})();
