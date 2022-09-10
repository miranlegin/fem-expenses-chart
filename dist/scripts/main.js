async function getItems() {
  const url = 'scripts/data.json';
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const d = new Date();
const today = d.toLocaleString('default', { weekday: 'short' });
const todayLowercase = today.toLowerCase();

async function renderItems() {
  const items = await getItems();
  let html = '';

  items.forEach((item) => {
    let currentDay;
    currentDay = item.day === todayLowercase ? 'active' : '';

    let htmlSegment = `
    <li data-today="${currentDay}">
        <div class="chart-column" style="height: ${item.amount * 3}px"></div>
        <div class="chart-day">${item.day}</div>
        <div class="chart-amount">$${item.amount}</div>
    </li>
    `;
    html += htmlSegment;
  });

  let container = document.querySelector('.chart');
  container.innerHTML = html;
}

renderItems();
