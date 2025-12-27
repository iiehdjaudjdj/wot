const wotSearchInput = document.getElementById('wotSearchInput');
const wotSearchBtn = document.getElementById('wotSearchBtn');
const wotLoading = document.getElementById('wotLoading');
const wotError = document.getElementById('wotError');
const wotErrorMessage = document.getElementById('wotErrorMessage');
const wotResults = document.getElementById('wotResults');
const wotThemeToggle = document.getElementById('wotThemeToggle');
const wotThemeIcon = document.getElementById('wotThemeIcon');
const wotBody = document.body;

const wotDomainName = document.getElementById('wotDomainName');
const wotNormalizedDomain = document.getElementById('wotNormalizedDomain');
const wotSafetyStatus = document.getElementById('wotSafetyStatus');
const wotSafetyIcon = document.getElementById('wotSafetyIcon');
const wotReputationFill = document.getElementById('wotReputationFill');
const wotReputationScore = document.getElementById('wotReputationScore');
const wotConfidenceScore = document.getElementById('wotConfidenceScore');
const wotChildReputationFill = document.getElementById('wotChildReputationFill');
const wotChildReputationScore = document.getElementById('wotChildReputationScore');
const wotChildConfidenceScore = document.getElementById('wotChildConfidenceScore');
const wotCategoriesSection = document.getElementById('wotCategoriesSection');
const wotCategoriesList = document.getElementById('wotCategoriesList');

let wotCurrentTheme = localStorage.getItem('wotTheme') || 'dark';

function wotApplyTheme(theme) {
    if (theme === 'light') {
        wotBody.classList.remove('wot-dark');
        wotBody.classList.add('wot-light');
        wotThemeIcon.className = 'bi bi-sun-fill';
        wotCurrentTheme = 'light';
    } else {
        wotBody.classList.remove('wot-light');
        wotBody.classList.add('wot-dark');
        wotThemeIcon.className = 'bi bi-moon-fill';
        wotCurrentTheme = 'dark';
    }
    localStorage.setItem('wotTheme', wotCurrentTheme);
}

function wotToggleTheme() {
    if (wotCurrentTheme === 'dark') {
        wotApplyTheme('light');
    } else {
        wotApplyTheme('dark');
    }
}

// get the domain name from the url
function wotExtractDomain(input) {
    let domain = input.trim().toLowerCase();
    
    if (domain.startsWith('http://') || domain.startsWith('https://')) {
        const url = new URL(domain);
        domain = url.hostname;
    } else if (domain.startsWith('www.')) {
        domain = domain.replace('www.', '');
    }
    
    domain = domain.replace(/^https?:\/\//, '');
    domain = domain.replace(/^www\./, '');
    domain = domain.split('/')[0];
    domain = domain.split('?')[0];
    
    return domain;
}

// check if the input is valid, remove the spaces
function wotValidateInput(input) {
    const trimmedInput = input.trim();
    
    if (trimmedInput === '') {
        return {
            valid: false,
            message: 'Please enter a domain or URL'
        };
    }
    
    if (trimmedInput.length < 3) {
        return {
            valid: false,
            message: 'Domain must be at least 3 characters'
        };
    }
    
    const invalidChars = /[<>{}[\]\\]/;
    if (invalidChars.test(trimmedInput)) {
        return {
            valid: false,
            message: 'Invalid characters in domain'
        };
    }
    
    const domain = wotExtractDomain(trimmedInput);
    
    if (!domain.includes('.')) {
        return {
            valid: false,
            message: 'Please enter a valid domain'
        };
    }
    
    return {
        valid: true,
        value: domain
    };
}

function wotShowLoading() {
    wotLoading.style.display = 'block';
    wotError.style.display = 'none';
    wotResults.style.display = 'none';
}

function wotHideLoading() {
    wotLoading.style.display = 'none';
}

function wotShowError(message) {
    wotErrorMessage.textContent = message;
    wotError.style.display = 'flex';
    wotResults.style.display = 'none';
    wotHideLoading();
}

function wotShowResults() {
    wotError.style.display = 'none';
    wotResults.style.display = 'block';
    wotHideLoading();
}

function wotAddLoadingState(button) {
    button.classList.add('loading');
    button.disabled = true;
}

function wotRemoveLoadingState(button) {
    setTimeout(function() {
        button.classList.remove('loading');
        button.disabled = false;
    }, 300);
}

// get the  data from the api
async function wotFetchData(domain) {
    const apiUrl = 'https://scorecard.api.mywot.com/v3/targets?t=' + encodeURIComponent(domain);
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-user-id': WOT_USER_ID,
                'x-api-key': WOT_API_KEY
            }
        });
        
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('Invalid API key. Please check your configuration.');
            } else if (response.status === 400) {
                throw new Error('Invalid request. Please check the domain name.');
            } else if (response.status === 429) {
                throw new Error('Request quota exceeded. Please try again later.');
            } else if (response.status === 500) {
                throw new Error('Server error. Please try again later.');
            } else {
                throw new Error('Failed to fetch reputation data. Please try again.');
            }
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message) {
            throw error;
        } else {
            throw new Error('Network error. Please check your internet connection.');
        }
    }
}

function wotGetStatusClass(status) {
    if (status === 'SAFE') {
        return 'safe';
    } else if (status === 'NOT_SAFE') {
        return 'not-safe';
    } else if (status === 'SUSPICIOUS') {
        return 'suspicious';
    } else {
        return 'unknown';
    }
}

function wotGetReputationClass(reputation) {
    if (reputation >= 70) {
        return 'high';
    } else if (reputation >= 40) {
        return 'medium';
    } else {
        return 'low';
    }
}

// display the  data on the screen
function wotDisplayData(data, originalDomain) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        wotShowError('No reputation data found for this domain.');
        return;
    }
    
    const domainData = data[0];
    
    if (!domainData) {
        wotShowError('No reputation data found for this domain.');
        return;
    }
    
    wotDomainName.textContent = originalDomain;
    wotNormalizedDomain.textContent = 'Normalized: ' + domainData.target;
    
    if (domainData.safety) {
        const safetyStatus = domainData.safety.status || 'UNKNOWN';
        const reputation = domainData.safety.reputations || 0;
        const confidence = domainData.safety.confidence || 0;
        
        wotSafetyStatus.textContent = safetyStatus.replace('_', ' ');
        wotSafetyStatus.className = 'wot-safety-status ' + wotGetStatusClass(safetyStatus);
        
        wotReputationFill.style.width = reputation + '%';
        wotReputationFill.className = 'wot-reputation-fill ' + wotGetReputationClass(reputation);
        
        wotReputationScore.textContent = 'Reputation: ' + reputation + '/100';
        wotConfidenceScore.textContent = 'Confidence: ' + confidence + '%';
    } else {
        wotSafetyStatus.textContent = 'UNKNOWN';
        wotSafetyStatus.className = 'wot-safety-status unknown';
        wotReputationFill.style.width = '0%';
        wotReputationScore.textContent = 'Reputation: N/A';
        wotConfidenceScore.textContent = 'Confidence: N/A';
    }
    
    if (domainData.childSafety) {
        const childReputation = domainData.childSafety.reputations || 0;
        const childConfidence = domainData.childSafety.confidence || 0;
        
        wotChildReputationFill.style.width = childReputation + '%';
        wotChildReputationFill.className = 'wot-reputation-fill ' + wotGetReputationClass(childReputation);
        
        wotChildReputationScore.textContent = 'Reputation: ' + childReputation + '/100';
        wotChildConfidenceScore.textContent = 'Confidence: ' + childConfidence + '%';
    } else {
        wotChildReputationFill.style.width = '0%';
        wotChildReputationScore.textContent = 'Reputation: N/A';
        wotChildConfidenceScore.textContent = 'Confidence: N/A';
    }
    
    if (domainData.categories && domainData.categories.length > 0) {
        wotCategoriesList.innerHTML = '';
        domainData.categories.forEach(function(category) {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'wot-category-item';
            categoryItem.textContent = category.name + ' (' + category.confidence + '%)';
            wotCategoriesList.appendChild(categoryItem);
        });
        wotCategoriesSection.style.display = 'block';
    } else {
        wotCategoriesSection.style.display = 'none';
    }
    
    wotShowResults();
}

//  function  check the input and call the api
async function wotHandleSearch() {
    const inputValue = wotSearchInput.value;
    const validation = wotValidateInput(inputValue);
    
    if (!validation.valid) {
        wotShowError(validation.message);
        return;
    }
    
    wotShowLoading();
    wotAddLoadingState(wotSearchBtn);
    
    try {
        const data = await wotFetchData(validation.value);
        wotDisplayData(data, validation.value);
    } catch (error) {
        wotShowError(error.message);
    } finally {
        wotRemoveLoadingState(wotSearchBtn);
    }
}

function wotHandleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        wotHandleSearch();
    }
}

wotSearchBtn.addEventListener('click', wotHandleSearch);
wotSearchInput.addEventListener('keypress', wotHandleSearchKeyPress);
wotThemeToggle.addEventListener('click', wotToggleTheme);

wotApplyTheme(wotCurrentTheme);

