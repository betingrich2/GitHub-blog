// Function to show the loading spinner
function showLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

// Add event listener to header links
document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        showLoadingSpinner();
    });
});

// Hide the loading spinner when the page fully loads
window.addEventListener('load', hideLoadingSpinner);

// Fetch top rated GitHub repositories using GitHub API
async function fetchTopRepos() {
    const response = await fetch('https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc');
    const data = await response.json();

    const repoList = document.getElementById('repo-list');
    data.items.slice(0, 5).forEach(repo => {
        const repoItem = document.createElement('div');
        repoItem.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></h3>
            <p>⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}</p>
        `;
        repoList.appendChild(repoItem);
    });
}

// Call the function to fetch top repos on page load
window.addEventListener('load', fetchTopRepos);
