const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
let isDropdownOpen = false;

// Toggle dropdown when clicking the language button
languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('active');
    isDropdownOpen = !isDropdownOpen;
});

// Close dropdown when clicking anywhere else on the screen
window.addEventListener('click', () => {
    if (isDropdownOpen) {
        languageDropdown.classList.remove('active');
        isDropdownOpen = false;
    }
});

// Handle language option clicks
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Get language code from data attribute
        const lang = this.getAttribute('data-lang');

        // Set language (your translation logic)
        setLanguage(lang);

        // Update active class
        document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');

        // Update button text to language code (EN or HR)
        document.querySelector('#languageBtn span').textContent = lang.toUpperCase();

        // Close dropdown
        languageDropdown.classList.remove('active');
        isDropdownOpen = false;

        // Save to localStorage (optional)
        localStorage.setItem('lang', lang);
    });
});


//Prevent dropdown from closing when clicking inside it
//languageDropdown.addEventListener('click', (e) => {
//    e.stopPropagation();
//});

// Modal functionality
const joinButtons = ['heroJoinBtn', 'calculatorJoinBtn', 'joinFromModalBtn'];
const signupModal = document.getElementById('signupModal');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
const signupForm = document.getElementById('signupForm');

// Add event listeners to all join buttons
joinButtons.forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener('click', () => {
            signupModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});

// Close singup modal
closeModal.addEventListener('click', () => {
    signupModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close success modal
function closeSuccess() {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeSuccessModal.addEventListener('click', closeSuccess);
closeSuccessModalBtn.addEventListener('click', closeSuccess);

// Form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        email: document.getElementById('email').value,
        carModel: document.getElementById('carModel').value,
        carYearInput: document.getElementById('carYearInput').value,
        locationInput: document.getElementById('locationInput').value,
    };

    fetch('submit_form.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        if (result.status === 'success') {
            signupModal.classList.remove('active');
            successModal.classList.add('active');
            signupForm.reset();
        } else {
            alert(result.message);
        }
    })
    .catch(() => alert('Došlo je do greške, pokušajte ponovno.'));
});


// Earnings calculator functionality
const carTypeSelect = document.getElementById('carType');
const carYearSelect = document.getElementById('carYear');
const locationSelect = document.getElementById('location');
const daysAvailable = document.getElementById('daysAvailable');
const daysValue = document.getElementById('daysValue');
const dailyRate = document.getElementById('dailyRate');

const monthlyEarnings = document.getElementById('monthlyEarnings');
const serviceFee = document.getElementById('serviceFee');
const monthlyPayout = document.getElementById('monthlyPayout');

// Car type pricing based on Turo's model
const carTypePrices = {
    economy: { base: 40, locationMultiplier: 1.0 },
    compact: { base: 55, locationMultiplier: 1.1 },
    midsize: { base: 70, locationMultiplier: 1.2 },
    premium: { base: 100, locationMultiplier: 1.3 },
    suv: { base: 86, locationMultiplier: 1.4 },
    luxury: { base: 160, locationMultiplier: 1.5 }
};

// Location multipliers
const locationMultipliers = {
    zagreb: 1.3,
    split: 1.4,
    dubrovnik: 1.5,
    rijeka: 1.2,
    zadar: 1.2,
    other: 1.1
};

// Year depreciation (newer cars get higher rates)
function getYearMultiplier(year) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    return Math.max(0.6, 1 - (age * 0.03));
}

// Update calculator when inputs change
function updateCalculator() {
    const carType = carTypeSelect.value;
    const year = parseInt(carYearSelect.value);
    const location = locationSelect.value;
    const days = parseInt(daysAvailable.value);
    
    // Calculate base rate
    const baseRate = carTypePrices[carType].base;
    const locationMult = locationMultipliers[location];
    const yearMult = getYearMultiplier(year);
    
    // Calculate final daily rate
    const finalDailyRate = Math.round(baseRate * locationMult * yearMult);
    
    // Calculate earnings
    const monthlyEarningsVal = finalDailyRate * days;
    const serviceFeeVal = monthlyEarningsVal * 0.22;
    const monthlyPayoutVal = monthlyEarningsVal - serviceFeeVal;
    
    // Update UI
    daysValue.textContent = `${days} dana`;
    dailyRate.textContent = `€${finalDailyRate}`;
    monthlyEarnings.textContent = `€${monthlyEarningsVal}`;
    serviceFee.textContent = `€${serviceFeeVal.toFixed(2)}`;
    monthlyPayout.textContent = `€${monthlyPayoutVal.toFixed(2)}`;
}

// Event listeners for calculator inputs
carTypeSelect.addEventListener('change', updateCalculator);
carYearSelect.addEventListener('change', updateCalculator);
locationSelect.addEventListener('change', updateCalculator);
daysAvailable.addEventListener('input', function() {
    daysValue.textContent = `${this.value} dana`;
    updateCalculator();
});

// Initialize calculator
updateCalculator();

// How It Works Modal functionality
const howItWorksModal = document.getElementById('howItWorksModal');
const howItWorksBtn = document.getElementById('howItWorksBtn');
const closeHowItWorksModal = document.getElementById('closeHowItWorksModal');

// Open How It Works modal
howItWorksBtn.addEventListener('click', (e) => {
    e.preventDefault();
    howItWorksModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Close How It Works modal
closeHowItWorksModal.addEventListener('click', () => {
    howItWorksModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// About Us Modal functionality
const aboutUsModal = document.getElementById('aboutUsModal');
const aboutUsBtn = document.getElementById('aboutUsBtn');
const closeAboutUsModal = document.getElementById('closeAboutUsModal');

// Open About Us modal
aboutUsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    aboutUsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Close About Us modal
closeAboutUsModal.addEventListener('click', () => {
    aboutUsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    // Close signupModal when clicking outside or on the overlay
    if (e.target === signupModal || e.target.classList.contains('modal-overlay')) {
        signupModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close successModal when clicking outside or on the overlay
    if (e.target === successModal || e.target.classList.contains('modal-overlay')) {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close howItWorksModal when clicking outside
    if (e.target === howItWorksModal) {
        howItWorksModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close aboutUsModal when clicking outside
    if (e.target === aboutUsModal) {
        aboutUsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

const translations = {
  en: {
    // Header & Navigation
    brand: "UseMyCar",
    nav_about: "About Us",
    nav_how: "How It Works",
    nav_contact: "Contact",
    nav_email: "info@use-my-car.com",
    nav_location: "Split, Croatia",

    // Hero Section
    headline: "Rent your car and earn!",
    hero_line1: "Does your car sit unused 95% of the time?",
    hero_line2: "Join our platform and turn it into passive income.",
    hero_button: "<i class='fas fa-car mr-2'></i> I'm interested",

    // Popular Locations Section
    locations_headline: "Where in Croatia is your car needed?",
    location_coast: "Coastal cities",
    location_coast_desc: "<span class='font-bold text-[#4095ce]'>Dalmatia, Istria, Kvarner</span> – Tourists need cars to explore the Croatian coast and <span class='font-bold text-[#4095ce]'>islands</span>. High demand from May to September.",
    location_small: "Small towns",
    location_small_desc: "<span class='font-bold text-[#4095ce]'>Towns without rent-a-car agencies</span> – Visitors and locals often have to rent cars in bigger cities to reach their destinations.",
    location_big: "Big cities",
    location_big_desc: "<span class='font-bold text-[#4095ce]'>Zagreb</span> – Business travelers and locals need cars for short trips. Constant demand throughout the year.",

    // Features Section
    features_headline: "What does <span class='font-bold text-[#4095ce]'>UseMyCar</span> offer you?",
    feature_income: "Extra income",
    feature_income_desc: "The average car owner in Croatia can earn <span class='font-bold text-[#4095ce]'>€2,000 to €5,000</span> per year while the car sits unused.",
    feature_protection: "Full protection",
    feature_protection_desc: "Every rental is <span class='font-bold text-[#4095ce]'>insured</span>. Your car is in safe hands.",
    feature_control: "Full control",
    feature_control_desc: "You decide who, when, and at what price can rent your car. <span class='font-bold text-[#4095ce]'>No obligation</span> – just income.",

    // Calculator Section
    calc_headline: "Calculate your potential earnings",
    calc_car_data: "Your car details",
    calc_location_label: "Where is your car located?",
    calc_location_other: "Other cities",
    calc_type_label: "Car type",
    calc_type_economy: "Economy (e.g. VW Polo, Fiat 500)",
    calc_type_compact: "Compact (e.g. VW Golf, Ford Focus)",
    calc_type_midsize: "Midsize (e.g. VW Passat, Audi A4)",
    calc_type_premium: "Premium (e.g. BMW 5 Series, Mercedes E-Class)",
    calc_type_suv: "SUV (e.g. VW Tiguan, Audi Q5)",
    calc_type_luxury: "Luxury (e.g. Porsche 911, Mercedes S-Class)",
    calc_year_label: "Year of manufacture",
    calc_year_other: "Other",
    calc_days_label: "How many days per month can you rent your car?",
    calc_days_5: "5 days",
    calc_days_15: "15 days",
    calc_days_30: "30 days",
    calc_earnings_headline: "Estimated earnings",
    calc_daily_rate: "Average daily rate:",
    calc_daily_rate_note: "Based on similar cars in your area",
    calc_monthly_earnings: "Monthly earnings:",
    calc_service_fee: "Service fee & insurance:",
    calc_monthly_payout: "Your estimated monthly payout:",
    calc_join_button: "Sign up",

    // Signup Modal
    signup_title: "Sign up for UseMyCar",
    signup_info: "<strong>Important:</strong> We are currently developing the platform and collecting interested car owners. As soon as we are ready, we will contact you with details.",
    signup_email_label: "Your email address*",
    signup_car_model_label: "Car model*",
    signup_car_model_placeholder: "e.g. VW Golf 7",
    signup_car_year_label: "Year of manufacture*",
    signup_car_year_placeholder: "e.g. 2018",
    signup_location_label: "Where is your car located?*",
    signup_location_placeholder: "e.g. Split",
    signup_submit: "Submit application",
    signup_privacy: "Your data is safe. We never share your information with third parties.",

    // Success Modal
    success_title: "Thank you for signing up!",
    success_text: "You have successfully signed up for UseMyCar. We will contact you as soon as we are ready to launch.",
    success_close: "Close",

    // Footer
    footer_text: "We are building the future of car sharing in Croatia. Join us today!",

    // About Us Modal
    about_title: "About Us",
    about_intro: "UseMyCar is a startup from Split developing an innovative car sharing platform for Croatia. Our mission is to enable car owners to earn from their vehicles while not using them, and to provide users with an affordable and flexible alternative to traditional rent-a-car services.",
    about_vision_title: "Our Vision",
    about_vision: "We want to transform the way people use cars in Croatia, reduce the number of unused vehicles on the roads, and provide an economical transport solution for everyone.",
    about_team_title: "Our Team",
    about_team: "We consist of young, ambitious professionals from Split with experience in technology, business, and the automotive industry. We combine local knowledge with global sharing trends.",
    about_why_title: "Why us?",
    about_why: "We understand the specifics of the Croatian market and the needs of local users. Our platform is tailored to Croatian conditions and laws, with special insurance for car sharing.",

    // How It Works Modal
    how_title: "How does UseMyCar work?",
    how_step1_title: "1. Registration",
    how_step1: "Sign up on our platform and enter your car details (make, model, year, location, rental price).",
    how_step2_title: "2. Approval",
    how_step2: "Our team will review your application and approve your car for sharing.",
    how_step3_title: "3. Setup",
    how_step3: "You decide when your car will be available for booking – simply set dates in the calendar on the platform.",
    how_step4_title: "4. Booking",
    how_step4: "When a user books your car, you will receive a notification with rental details.",
    how_step5_title: "5. Car preparation",
    how_step5: "Prepare your car for the user (clean, full tank, documentation).",
    how_step6_title: "6. Handover",
    how_step6: "Hand over the keys to the user at the agreed location.",
    how_step7_title: "7. Payout",
    how_step7: "After the rental ends, the money will be transfered to your account.",
  },

  // Croatian (optional, for reference)
  hr: {
    // Header & Navigation
    brand: "UseMyCar",
    nav_about: "O nama",
    nav_how: "Kako funkcionira",
    nav_contact: "Kontakt",
    nav_email: "info@use-my-car.com",
    nav_location: "Split, Hrvatska",

    // Hero Section
    headline: "Iznajmi svoj auto i zaradi!",
    hero_line1: "Vaš automobil stoji neiskorišten 95% vremena?",
    hero_line2: "Pridružite se našoj platformi i pretvorite ga u pasivni prihod.",
    hero_button: "<i class='fas fa-car mr-2'></i> Zanima me",

    // Popular Locations Section
    locations_headline: "Gdje u Hrvatskoj je vaš automobil potreban?",
    location_coast: "Obalni gradovi",
    location_coast_desc: "<span class='font-bold text-[#4095ce]'>Dalmacija, Istra, Kvarner</span> - Turistima su potrebni automobili za istraživanje hrvatske obale i <span class='font-bold text-[#4095ce]'>otoka</span>. Velika potražnja od svibnja do rujna.",
    location_small: "Manja naselja",
    location_small_desc: "<span class='font-bold text-[#4095ce]'>Naselja bez rent-a-car agencija</span> - Posjetitelji i mještani često moraju iznajmiti automobile u većim gradovima kako bi stigli do željenih destinacija.",
    location_big: "Veliki gradovi",
    location_big_desc: "<span class='font-bold text-[#4095ce]'>Zagreb</span> - Poslovnim putnicima i lokalnim stanovnicima potrebni su automobili za kratka putovanja. Stalna potražnja tijekom cijele godine.",

    // Features Section
    features_headline: "Što Vam pruža <span class='font-bold text-[#4095ce]'>UseMyCar</span>?",
    feature_income: "Dodatni prihodi",
    feature_income_desc: "Prosječni vlasnik automobila u Hrvatskoj može zaraditi <span class='font-bold text-[#4095ce]'>2.000 do 5.000 €</span> godišnje dok automobil stoji neiskorišten.",
    feature_protection: "Potpuna zaštita",
    feature_protection_desc: "Svaki najam je <span class='font-bold text-[#4095ce]'>osiguran</span>. Vaš automobil je u sigurnim rukama.",
    feature_control: "Potpuna kontrola",
    feature_control_desc: "Vi odlučujete tko, kada i po kojoj cijeni može iznajmiti vaš automobil. <span class='font-bold text-[#4095ce]'>Nema obveze</span> - samo zarada.",

    // Calculator Section
    calc_headline: "Izračunajte svoju potencijalnu zaradu",
    calc_car_data: "Podaci o vašem automobilu",
    calc_location_label: "Gdje se nalazi vaš automobil?",
    calc_location_other: "Ostali gradovi",
    calc_type_label: "Tip automobila",
    calc_type_economy: "Ekonomični (npr. VW Polo, Fiat 500)",
    calc_type_compact: "Kompaktni (npr. VW Golf, Ford Focus)",
    calc_type_midsize: "Srednja klasa (npr. VW Passat, Audi A4)",
    calc_type_premium: "Premium (npr. BMW 5 serija, Mercedes E klasa)",
    calc_type_suv: "SUV (npr. VW Tiguan, Audi Q5)",
    calc_type_luxury: "Luksuzni (npr. Porsche 911, Mercedes S klasa)",
    calc_year_label: "Godina proizvodnje",
    calc_year_other: "Drugo",
    calc_days_label: "Koliko dana mjesečno možete iznajmiti svoj automobil?",
    calc_days_5: "5 dana",
    calc_days_15: "15 dana",
    calc_days_30: "30 dana",
    calc_earnings_headline: "Procijenjena zarada",
    calc_daily_rate: "Prosječna dnevna cijena:",
    calc_daily_rate_note: "Na temelju sličnih automobila u vašem području",
    calc_monthly_earnings: "Mjesečna zarada:",
    calc_service_fee: "Naknada i osiguranje:",
    calc_monthly_payout: "Vaša procijenjena mjesečna isplata:",
    calc_join_button: "Prijavi se",

    // Signup Modal
    signup_title: "Prijava za UseMyCar",
    signup_info: "<strong>Važno:</strong> Trenutno razvijamo platformu i prikupljamo zainteresirane vlasnike automobila. Čim budemo spremni, kontaktirat ćemo vas s detaljima.",
    signup_email_label: "Vaša email adresa*",
    signup_car_model_label: "Model automobila*",
    signup_car_model_placeholder: "npr. VW Golf 7",
    signup_car_year_label: "Godina proizvodnje*",
    signup_car_year_placeholder: "npr. 2018",
    signup_location_label: "Gdje se nalazi vaš automobil?*",
    signup_location_placeholder: "npr. Split",
    signup_submit: "Pošaljite prijavu",
    signup_privacy: "Vaši podaci su sigurni. Nikada ne dijelimo vaše podatke s trećim stranama.",

    // Success Modal
    success_title: "Hvala na prijavi!",
    success_text: "Uspješno ste se prijavili za UseMyCar. Kontaktirat ćemo vas čim budemo spremni za pokretanje.",
    success_close: "Zatvori",

    // Footer
    footer_text: "Gradimo budućnost dijeljenja automobila u Hrvatskoj. Pridružite nam se danas!",

    // About Us Modal
    about_title: "O nama",
    about_intro: "UseMyCar je startup iz Splita koji razvija inovativnu car sharing platformu za Hrvatsku. Naša misija je omogućiti vlasnicima automobila da zarade na svom vozilu dok ga ne koriste, dok korisnicima pružamo pristupačnu i fleksibilnu alternativu tradicionalnim rent-a-car uslugama.",
    about_vision_title: "Naša vizija",
    about_vision: "Želimo transformirati način na koji ljudi koriste automobile u Hrvatskoj, smanjiti broj neiskorištenih vozila na cestama i pružiti ekonomično rješenje za prijevoz svima.",
    about_team_title: "Naš tim",
    about_team: "Sastojimo se od mladih, ambicioznih profesionalaca iz Splita s iskustvom u tehnologiji, poslovanju i automobilskoj industriji. Kombiniramo lokalno znanje s globalnim trendovima u dijeljenju resursa.",
    about_why_title: "Zašto baš mi?",
    about_why: "Razumijemo specifičnosti hrvatskog tržišta i potrebe lokalnih korisnika. Naša platforma je prilagođena hrvatskim uvjetima i zakonima, s posebnim osiguranjem za car sharing.",

    // How It Works Modal
    how_title: "Kako funkcionira UseMyCar?",
    how_step1_title: "1. Registracija",
    how_step1: "Prijavite se na našu platformu i unesete podatke o svom automobilu (marka, model, godina, lokacija, cijena najma).",
    how_step2_title: "2. Odobrenje",
    how_step2: "Naš tim će pregledati vašu prijavu i odobriti vaš automobil za dijeljenje.",
    how_step3_title: "3. Postavljanje",
    how_step3: "Vi sami određujete kada će vaš automobil biti dostupan za rezervaciju – jednostavno postavite termine u kalendaru na platformi.",
    how_step4_title: "4. Zakazivanje",
    how_step4: "Kada korisnik rezervira vaš automobil, primit ćete obavijest s detaljima najma.",
    how_step5_title: "5. Priprema automobila",
    how_step5: "Pripremite automobil za korisnika (čistoća, puno gorivo, dokumentacija).",
    how_step6_title: "6. Predaja",
    how_step6: "Predajte ključeve korisniku na dogovorenoj lokaciji.",
    how_step7_title: "7. Isplata",
    how_step7: "Nakon završetka najma, novac će vam biti isplaćen na vaš račun.",
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

// Add event listeners to your language options
document.querySelectorAll('.language-option').forEach(option => {
  option.addEventListener('click', function(e) {
    e.preventDefault();
    const lang = this.textContent.trim().toLowerCase().startsWith('english') ? 'en' : 'hr';
    setLanguage(lang);
  });
});


//Join button click listeners
document.getElementById('heroJoinBtn')?.addEventListener('click', function() {
  gtag('event', 'click_hero_join', {
    button_id: 'heroJoinBtn'
  });
});
document.getElementById('calculatorJoinBtn')?.addEventListener('click', function() {
  gtag('event', 'click_calculator_join', {
    button_id: 'calculatorJoinBtn'
  });
});

//AboutUs and HowItWorks modals click listeners
document.getElementById('aboutUsBtn')?.addEventListener('click', function() {
  gtag('event', 'open_modal', {
    modal_id: 'aboutUsModal'
  });
});
document.getElementById('howItWorksBtn')?.addEventListener('click', function() {
  gtag('event', 'open_modal', {
    modal_id: 'howItWorksModal'
  });
});

//eMail link listener
document.querySelectorAll('a[href="mailto:info@use-my-car.com"]').forEach(function(link) {
  link.addEventListener('click', function() {
    gtag('event', 'click_email', {
      email: 'info@use-my-car.com'
    });
  });
});

//Insurance windows listener
window.addEventListener('DOMContentLoaded', function() {
  // Drugi div s klasom bg-white bg-opacity-90 (indeks 1)
  var protectionDiv = document.querySelectorAll('.bg-white.bg-opacity-90')[1];
  if(protectionDiv) {
    protectionDiv.addEventListener('click', function() {
      gtag('event', 'click_protection_div', {
        section: 'potpuna_zastita'
      });
    });
  }
});

//Calculator interactions listeners
document.getElementById('location')?.addEventListener('change', function(e) {
  gtag('event', 'calculator_input', {
    field: 'location',
    value: e.target.value
  });
});
document.getElementById('carType')?.addEventListener('change', function(e) {
  gtag('event', 'calculator_input', {
    field: 'carType',
    value: e.target.value
  });
});
document.getElementById('carYear')?.addEventListener('change', function(e) {
  gtag('event', 'calculator_input', {
    field: 'carYear',
    value: e.target.value
  });
});

//When the mouse is up, take the value
const daysAvailableInput = document.getElementById('daysAvailable');

const sendCalculatorInputEvent = (e) => {
  gtag('event', 'calculator_input', {
    field: 'daysAvailable',
    value: e.target.value
  });
};

daysAvailableInput.addEventListener('mouseup', sendCalculatorInputEvent);
daysAvailableInput.addEventListener('touchend', sendCalculatorInputEvent);


//Form event listeners

document.getElementById('email')?.addEventListener('blur', function(e) {
  gtag('event', 'form_field_filled', {
    field_name: 'email'
    // Nemoj slati vrijednost emaila zbog PII pravila!
  });
});

document.getElementById('carModel')?.addEventListener('blur', function(e) {
  gtag('event', 'form_field_filled', {
    field_name: 'carModel'
    // Nemoj slati vrijednost modela ako sadrži osobne podatke!
  });
});

document.getElementById('carYearInput')?.addEventListener('blur', function(e) {
  gtag('event', 'form_field_filled', {
    field_name: 'carYearInput'
  });
});

document.getElementById('locationInput')?.addEventListener('blur', function(e) {
  gtag('event', 'form_field_filled', {
    field_name: 'locationInput'
  });
});

//Key event - submit
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
  gtag('event', 'form_submit', {
    form_id: 'signupForm'
  });
});