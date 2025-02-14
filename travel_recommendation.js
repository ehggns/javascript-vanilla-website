/**
 * Store the default index content at page load
 */
const defaultIndexContent = document.querySelector('#index .container').innerHTML;

/**
 * Fetch data from the JSON file and store it globally for later use
 */
fetch('travel_recommendation.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched data:", data);
    travelData = data;
  })
  .catch(error => {
    console.error("Error fetching travel recommendations:", error);
  });

/**
 * Add event listener for the search button in the navbar
 */
document.querySelector('.nav-right button[type="submit"]').addEventListener(
    'click', (event) => {
      event.preventDefault();

      const keyword = document.querySelector('.nav-right input[type="text"]')
        .value.trim().toLowerCase();

      let results = [];
      if(keyword === 'beach'){
        results = travelData && travelData.beaches ? travelData.beaches : [];
      } else if(keyword === 'temple'){
        results = travelData && travelData.temples ? travelData.temples : [];
      } else if(keyword === 'country'){
        results = travelData && travelData.countries ? travelData.countries : [];
      } else {
        console.log("Keyword not recognized. Please enter beach, temple, or country.");
        return;
      }

      displayResults(results, keyword);
    });

/**
 * Add event listener for the clear button in the navbar
 */
document.querySelector('.nav-right button[type="reset"]').addEventListener(
  'click', (event) => {
    event.preventDefault();
    clearResults();
});

/**
 * Display recommendations in the container as cards
 * @param {Array} results - The array of results to display
 * @param {string} keyword - The keyword used for the search
 */
function displayResults(results, keyword) {
  document.getElementById('about-us').style.display = 'none';
  document.getElementById('contact-us').style.display = 'none';
  document.getElementById('index').style.display = 'block';

  const container = document.querySelector('.container');
  container.innerHTML = `<h2>Recommendations for ${keyword}</h2>
    <div class="card-container"></div>`;

  const cardContainer = container.querySelector('.card-container');

  if (keyword === 'country' || keyword === 'countries') {
    results.slice(0, 2).forEach(country => {
      if (country.cities && country.cities.length > 0) {
        const city = country.cities[0];
        cardContainer.innerHTML += `
          <div class="card">
            <img src="${city.imageUrl}" alt="${city.name}" class="card-img">
            <div class="card-body">
              <h3 class="card-title">${city.name}</h3>
              <p class="card-text">${city.description}</p>
            </div>
          </div>
        `;
      }
    });
  } else {
    results.slice(0, 2).forEach(item => {
      cardContainer.innerHTML += `
        <div class="card">
          <img src="${item.imageUrl}" alt="${item.name}" class="card-img">
          <div class="card-body">
            <h3 class="card-title">${item.name}</h3>
            <p class="card-text">${item.description}</p>
          </div>
        </div>
      `;
    });
  }

  container.scrollIntoView();
}

/**
 * Clear the search results, reset the search input, and restore the home page
 */
function clearResults() {
  const container = document.querySelector('.container');
  container.innerHTML = defaultIndexContent;

  document.querySelector('.nav-right input[type="text"]').value = '';

  showIndex();
}

/**
 * Show the index section and hide other sections
 */
function showIndex() {
  const indexContainer = document.querySelector('#index .container');
  indexContainer.innerHTML = defaultIndexContent;

  document.getElementById('contact-us').style.display = 'none';
  document.getElementById('about-us').style.display = 'none';

  document.getElementById('index').style.display = 'block';
  document.querySelector('.container').style.display = 'block';
  document.getElementById('index').scrollIntoView();
}

/**
 * Show the about-us section and hide other sections
 */
function showAboutUs() {
  document.getElementById('index').style.display = 'none';
  document.getElementById('contact-us').style.display = 'none';

  document.getElementById('about-us').style.display = 'block';
  document.querySelector('.container').style.display = 'block';
  document.getElementById('about-us').scrollIntoView();
}

/**
 * Show the contact-us section and hide other sections
 */
function showContactUs() {
  document.getElementById('index').style.display = 'none';
  document.getElementById('about-us').style.display = 'none';

  document.getElementById('contact-us').style.display = 'block';
  document.querySelector('.container').style.display = 'block';
  document.getElementById('contact-us').scrollIntoView();
}