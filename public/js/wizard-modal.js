/**
 * Step-by-Step Trip Wizard Popup Modal
 * One question at a time with instant option auto-advancement
 */

(function () {
  let currentStep = 1;
  const totalSteps = 6;

  let wizardFormData = {
    people: 2,
    groupType: 'couple',
    days: 3,
    landscapes: ['waterfalls', 'spiritual'],
    budget: 'budget',
    transport: 'cab',
    pickupLocation: 'Varanasi'
  };

  // Open the modal
  window.openTripWizardModal = function () {
    const modal = document.getElementById('trip-wizard-modal');
    if (!modal) return;

    currentStep = 1;
    updateStepView();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close the modal
  window.closeTripWizardModal = function () {
    const modal = document.getElementById('trip-wizard-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Navigate back to previous question
  window.wizardGoBack = function () {
    if (currentStep > 1) {
      currentStep--;
      updateStepView();
    }
  };

  // Update visible step, progress bar & back button
  function updateStepView() {
    // 1. Update Progress Fill & Badge
    const progressFill = document.getElementById('wizard-progress-fill');
    const stepBadge = document.getElementById('wizard-step-badge');
    const backBtn = document.getElementById('wizard-back-btn');

    if (progressFill) {
      const pct = (currentStep / totalSteps) * 100;
      progressFill.style.width = pct + '%';
    }

    if (stepBadge) {
      stepBadge.textContent = 'Question ' + currentStep + ' of ' + totalSteps;
    }

    if (backBtn) {
      if (currentStep > 1) {
        backBtn.classList.remove('hidden');
      } else {
        backBtn.classList.add('hidden');
      }
    }

    // 2. Show Active Step Pane
    for (let i = 1; i <= totalSteps; i++) {
      const pane = document.getElementById('wizard-step-' + i);
      if (pane) {
        if (i === currentStep) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      }
    }

    // Hide generating screen if resetting
    const genScreen = document.getElementById('wizard-generating-screen');
    if (genScreen) genScreen.classList.remove('active');
  }

  // Handle single option selection with auto-advancement
  window.handleWizardSelect = function (stepIndex, key, value, element) {
    // 1. Highlight clicked card
    const parentGrid = element.closest('.wizard-options-grid');
    if (parentGrid) {
      parentGrid.querySelectorAll('.wizard-option-card').forEach(function (card) {
        card.classList.remove('selected');
      });
    }
    element.classList.add('selected');

    // 2. Save choice
    if (key === 'groupType') {
      wizardFormData.groupType = value;
      if (value === 'single') wizardFormData.people = 1;
      else if (value === 'couple') wizardFormData.people = 2;
      else if (value === 'friends') wizardFormData.people = 4;
      else if (value === 'family') wizardFormData.people = 4;
    } else if (key === 'days') {
      wizardFormData.days = parseInt(value, 10);
    } else if (key === 'landscapes') {
      if (value === 'all') {
        wizardFormData.landscapes = ['waterfalls', 'spiritual', 'heritage', 'forests_fossils', 'adventure', 'ghats_culture'];
      } else if (value === 'spiritual') {
        wizardFormData.landscapes = ['spiritual', 'ghats_culture'];
      } else if (value === 'forts') {
        wizardFormData.landscapes = ['heritage'];
      } else {
        wizardFormData.landscapes = [value];
      }
    } else if (key === 'budget') {
      wizardFormData.budget = value;
    } else if (key === 'transport') {
      wizardFormData.transport = value;
    } else if (key === 'pickupLocation') {
      wizardFormData.pickupLocation = value;
    }

    // 3. Auto-advance to next question after 250ms feedback delay
    setTimeout(function () {
      if (stepIndex < totalSteps) {
        currentStep = stepIndex + 1;
        updateStepView();
      } else {
        // Last question completed: generate plan!
        finishAndGenerateItinerary();
      }
    }, 260);
  };

  // Final generation screen & redirect to /plan
  function finishAndGenerateItinerary() {
    // Hide all question panes
    for (let i = 1; i <= totalSteps; i++) {
      const pane = document.getElementById('wizard-step-' + i);
      if (pane) pane.classList.remove('active');
    }

    // Hide top navigation controls
    const navRow = document.querySelector('.wizard-modal-nav-row');
    if (navRow) navRow.style.display = 'none';

    // Show generating screen
    const genScreen = document.getElementById('wizard-generating-screen');
    if (genScreen) {
      genScreen.classList.add('active');

      // Populate summary pills
      const pillsContainer = document.getElementById('wizard-summary-pills');
      if (pillsContainer) {
        const groupLabel =
          wizardFormData.groupType === 'single' ? 'Solo Traveler' :
          wizardFormData.groupType === 'couple' ? 'Couple (2)' :
          wizardFormData.groupType === 'friends' ? 'Friends (4)' : 'Family (4+)';

        const daysLabel = wizardFormData.days + ' Days';
        const budgetLabel = wizardFormData.budget.toUpperCase() + ' Budget';
        const transportLabel =
          wizardFormData.transport === 'cab' ? 'Private Cab' :
          wizardFormData.transport === 'train' ? 'Train' : 'Bus & Transit';

        pillsContainer.innerHTML = `
          <span class="wizard-summary-pill">👥 ${groupLabel}</span>
          <span class="wizard-summary-pill">📅 ${daysLabel}</span>
          <span class="wizard-summary-pill">🪙 ${budgetLabel}</span>
          <span class="wizard-summary-pill">🚗 ${transportLabel}</span>
          <span class="wizard-summary-pill">📍 ${wizardFormData.pickupLocation}</span>
        `;
      }
    }

    // Save profile into localStorage
    try {
      const destLookup = {
        'mirzapur': {
          id: 'mirzapur',
          name: 'Mirzapur',
          tagline: 'Cascading Waterfalls, Vindhyavasini Shaktipeeth & Chunar Fort',
          image: '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
          images: [
            '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
            '/mirzapur/lakhaniya-dari/lakhaniya-dari-1.jpg',
            '/mirzapur/vindhyavasini/vindhyavasini-1.jpg',
            '/mirzapur/chunar-fort/chunar-fort-2.jpg'
          ],
          scores: { final: 96 },
          matchReasons: ['Premier Waterfall Circuit', 'Vindhya Range Natural Landscapes'],
          highlights: ['Lakhaniya Dari Falls', 'Wyndham Waterfall & Valley', 'Chunar Ancient Stone Fort']
        },
        'banaras': {
          id: 'banaras',
          name: 'Banaras (Varanasi)',
          tagline: 'Eternal Ghats, Sacred Temples & Classical Heritage',
          image: '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
          images: [
            '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
            '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple.jpg',
            '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi.jpg',
            '/varansi/Dhamek Stupa Sarnath, (Varanasi)/Dhamek Stupa Sarnath, (Varanasi).jpg'
          ],
          scores: { final: 98 },
          matchReasons: ['Sacred Ganga Aarti & Ghats', 'Kashi Vishwanath Jyotirlinga Corridor'],
          highlights: ['Dashashwamedh Ganga Aarti', 'Kashi Vishwanath Corridor', 'Sunrise Boat Cruise']
        },
        'allahabad': {
          id: 'allahabad',
          name: 'Prayagraj (Allahabad)',
          tagline: 'Triveni Sangam, Akbar Fort & Sacred Confluence',
          image: '/prayagraj/akbar-fort/akbar-fort-6.jpg',
          images: [
            '/prayagraj/akbar-fort/akbar-fort-6.jpg',
            '/prayagraj/anand-bhawan-museum/anand-bhawan-museum-1.jpg',
            '/prayagraj/khusro-bagh/khusro-bagh-1.jpg',
            '/prayagraj/bade-hanuman-mandir/bade-hanuman-mandir-1.jpg'
          ],
          scores: { final: 94 },
          matchReasons: ['Sacred Rivers Confluence', 'Colonial & Mughal Grandeur'],
          highlights: ['Triveni Sangam Holy Dip', 'Anand Bhawan Museum', 'Akbar Fort & Bade Hanuman Ji']
        },
        'sonbhadra': {
          id: 'sonbhadra',
          name: 'Sonbhadra',
          tagline: 'Prehistoric Fossils, Ancient Forts & Hidden Waterfalls',
          image: '/sonebhadra/fossils-park/fossils-park-1.jpg',
          images: [
            '/sonebhadra/fossils-park/fossils-park-1.jpg',
            '/sonebhadra/vijaygarh-fort/vijaygarh-fort-1.jpg',
            '/sonebhadra/mukkha-fall/mukkha-fall-1.jpg',
            '/sonebhadra/rihand-dam/rihand-dam-1.jpg'
          ],
          scores: { final: 92 },
          matchReasons: ['Prehistoric Salkhan Fossils', 'Pristine Wilderness & Reservoirs'],
          highlights: ['Salkhan 1.4B-Year Fossil Park', 'Historic Vijaygarh Fort', 'Rihand Dam & Govind Sagar Lake']
        },
        'lucknow': {
          id: 'lucknow',
          name: 'Lucknow',
          tagline: 'City of Nawabs, Grand Imambaras & Awadhi Heritage',
          image: '/lucknow/bara-imambara/bara-imambara-1.jpg',
          images: [
            '/lucknow/bara-imambara/bara-imambara-1.jpg',
            '/lucknow/rumi-darwaza/rumi-darwaza-1.jpg',
            '/lucknow/chota-imambada/chota-imambada-1.jpg',
            '/lucknow/ambedkar-memorial/ambedkar-memorial-1.jpg'
          ],
          scores: { final: 96 },
          matchReasons: ['Awadhi Architectural Wonders', 'Historic Parks & Culinary Culture'],
          highlights: ['Bara Imambara & Bhool Bhulaiya', 'Rumi Darwaza', 'Ambedkar Memorial Park']
        },
        'ayodhya': {
          id: 'ayodhya',
          name: 'Ayodhya',
          tagline: 'Sacred Dham of Shri Ram, Saryu Ghats & Ancient Heritage',
          image: '/ayodhya/ram-janmabhoomi/ram-janmabhoomi-1.jpg',
          images: [
            '/ayodhya/ram-janmabhoomi/ram-janmabhoomi-1.jpg',
            '/ayodhya/hanuman-garhi/hanuman-garhi-1.jpg',
            '/ayodhya/kanak-bhawan/kanak-bhawan-1.jpg',
            '/ayodhya/saryu-ghat/saryu-ghat-1.jpg'
          ],
          scores: { final: 98 },
          matchReasons: ['Supreme Ramayana Pilgrimage', 'Saryu Deepotsav & Ancient Temples'],
          highlights: ['Shree Ram Janmabhoomi Temple', 'Hanuman Garhi Mandir', 'Saryu Ghat Evening Aarti']
        },
        'mathura': {
          id: 'mathura',
          name: 'Mathura & Vrindavan',
          tagline: 'Birthplace of Lord Krishna, Marble Temples & Sacred Ghats',
          image: '/mathura/prem-mandir/prem-mandir-1.jpg',
          images: [
            '/mathura/prem-mandir/prem-mandir-1.jpg',
            '/mathura/krishna-janmasthan/krishna-janmasthan-1.jpg',
            '/mathura/banke-bihari-mandir/banke-bihari-mandir-1.jpg',
            '/mathura/vishram-ghat/vishram-ghat-1.jpg'
          ],
          scores: { final: 97 },
          matchReasons: ['Sacred Braj Bhoomi Circuit', 'Marble Shrines & Yamuna Aarti'],
          highlights: ['Shri Krishna Janmasthan', 'Prem Mandir Night Illumination', 'Vishram Ghat & Banke Bihari']
        }
      };

      const rawLoc = (wizardFormData.focusCity || wizardFormData.pickupLocation || 'banaras').toLowerCase();
      let startKey = 'banaras';
      if (rawLoc.includes('mirzapur')) startKey = 'mirzapur';
      else if (rawLoc.includes('prayagraj') || rawLoc.includes('allahabad')) startKey = 'allahabad';
      else if (rawLoc.includes('sonbhadra') || rawLoc.includes('sonebhadra')) startKey = 'sonbhadra';
      else if (rawLoc.includes('lucknow')) startKey = 'lucknow';
      else if (rawLoc.includes('ayodhya')) startKey = 'ayodhya';
      else if (rawLoc.includes('mathura')) startKey = 'mathura';
      const topPick = destLookup[startKey] || destLookup['banaras'];

      const allRanked = [
        topPick,
        destLookup['banaras'],
        destLookup['mirzapur'],
        destLookup['allahabad'],
        destLookup['sonbhadra']
      ].filter((item, index, self) => self.findIndex(d => d.id === item.id) === index);

      const profile = {
        id: 'up_trip_' + Date.now(),
        createdAt: new Date().toISOString(),
        formData: Object.assign({}, wizardFormData),
        topDestination: topPick,
        rankedDestinations: allRanked
      };

      localStorage.setItem('india_tourist_active_profile', JSON.stringify(profile));

      // Also append to history
      try {
        const histRaw = localStorage.getItem('india_tourist_profile_history');
        const history = histRaw ? JSON.parse(histRaw) : [];
        const updatedHistory = [profile, ...history.filter(p => p.id !== profile.id)].slice(0, 10);
        localStorage.setItem('india_tourist_profile_history', JSON.stringify(updatedHistory));
      } catch (hErr) {
        console.warn('History save notice:', hErr);
      }

      // Remove old cached plan to force recalculation with fresh parameters
      localStorage.removeItem('india_tourist_active_trip_plan');

      // Sync with Express backend if user is signed in
      const authToken = localStorage.getItem('india_tourist_auth_token');
      if (authToken) {
        fetch('/api/trips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken
          },
          body: JSON.stringify(profile),
          keepalive: true
        }).catch(function (syncErr) {
          console.warn('Cloud trip sync skipped:', syncErr);
        });
      }
    } catch (err) {
      console.error('Storage error:', err);
    }

    // Redirect to /plan after 950ms
    setTimeout(function () {
      window.location.href = '/plan';
    }, 950);
  }

  // Close on backdrop click or ESC key
  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('trip-wizard-modal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          window.closeTripWizardModal();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.closeTripWizardModal();
      }
    });

    // Auto-open modal if URL query has ?openWizard=true or ?plan=true (with optional city & place anchor)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const cityParam = (urlParams.get('city') || '').toLowerCase();
      const placeIdParam = urlParams.get('placeId') || '';
      const placeNameParam = urlParams.get('placeName') || '';
      const cityLabelParam = urlParams.get('cityLabel') || '';

      if (cityParam || placeNameParam) {
        wizardFormData.focusCity = cityParam;
        const cityMap = {
          varanasi: 'Varanasi',
          prayagraj: 'Prayagraj (Allahabad)',
          mirzapur: 'Mirzapur',
          sonbhadra: 'Sonbhadra',
          sonebhadra: 'Sonbhadra',
          lucknow: 'Lucknow',
          ayodhya: 'Ayodhya',
          mathura: 'Mathura'
        };
        if (cityMap[cityParam]) {
          wizardFormData.pickupLocation = cityMap[cityParam];
        }
        if (placeNameParam) {
          wizardFormData.selectedPlace = {
            id: placeIdParam,
            city: cityParam,
            name: placeNameParam
          };
          const anchor = document.getElementById('wizard-place-anchor');
          if (anchor) {
            anchor.textContent = '🚀 Planning Your Trip Around: ' + placeNameParam + (cityLabelParam ? ' (' + cityLabelParam + ')' : '');
            anchor.classList.add('active');
          }
        }
      }

      if (urlParams.get('openWizard') === 'true' || urlParams.get('plan') === 'true') {
        setTimeout(function () {
          window.openTripWizardModal();
        }, 300);
      }
    } catch (e) {
      console.warn('URL parse error:', e);
    }
  });
})();
