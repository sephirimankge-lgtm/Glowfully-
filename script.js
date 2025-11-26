// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i data-feather="arrow-up"></i>';
    backToTopButton.className = 'fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all opacity-0 invisible';
    backToTopButton.id = 'back-to-top';
    document.body.appendChild(backToTopButton);
    
    feather.replace();
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

//Review

document.addEventListener('DOMContentLoaded', function() {
    // Initialize star rating
    const starRatingContainer = document.getElementById('starRating');
    let selectedRating = 0;
    
    // Create 5 stars
    for (let i = 5; i >= 1; i--) {
        const star = document.createElement('span');
        star.className = 'star cursor-pointer';
        star.innerHTML = '<i data-feather="star" class="w-8 h-8 text-gray-300 hover:text-yellow-400 transition-colors duration-200" data-rating="' + i + '"></i>';
        star.addEventListener('click', () => {
            selectedRating = i;
            updateStars();
        });
        starRatingContainer.appendChild(star);
    }
    
    function updateStars() {
        const stars = starRatingContainer.querySelectorAll('i[data-feather="star"]');
        stars.forEach(star => {
            const rating = parseInt(star.getAttribute('data-rating'));
            if (rating <= selectedRating) {
                star.classList.remove('text-gray-300');
                star.classList.add('text-yellow-400');
            } else {
                star.classList.remove('text-yellow-400');
                star.classList.add('text-gray-300');
            }
        });
    }
    
    // Form submission
    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviewsContainer');
    const loadingReviews = document.getElementById('loadingReviews');
    
    // Mock data for recent reviews
    const oldReviews = [
        {
            name: "Joy M",
            rating: 5,
            review: "Glowfully came into my life when I needed it most. The candles and coaching sessions helped me slow down and reconnect with myself.",
            date: "2025-05-15",
            anonymous: false
        },
        {
            name: "Nadia P",
            rating: 5,
            review: "Tshepo's wellness coaching helped me build consistency with food and exercise. I feel lighter — physically and mentally.",
            date: "2025-05-10",
            anonymous: false
        }
    ];
    
    // Load mock reviews
    setTimeout(() => {
        loadingReviews.remove();
        oldReviews.forEach(review => {
            addReviewToDOM(review);
        });
    }, 1000);
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const reviewText = document.getElementById('review').value;
        const isAnonymous = document.getElementById('anonymous').checked;
        
        if (!reviewText) {
            alert('Please write your review before submitting.');
            return;
        }
        
        //if (selectedRating === 0) {
            //alert('Please select a rating before submitting.');
            //return;
        //}
        
        const newReview = {
            name: isAnonymous ? 'Anonymous' : (name || 'Anonymous'),
            rating: selectedRating,
            review: reviewText,
            date: new Date().toISOString().split('T')[0],
            anonymous: isAnonymous
        };
        
        // Add to DOM
        addReviewToDOM(newReview);
        
        // Reset form
        reviewForm.reset();
        selectedRating = 0;
        updateStars();
        
        // Scroll to the new review
        reviewsContainer.firstElementChild.scrollIntoView({ behavior: 'smooth' });
    });
    
    function addReviewToDOM(review) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card bg-white p-6 rounded-lg shadow-sm border border-gray-100';
        
        // Create stars for the review
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += `<i data-feather="star" class="w-5 h-5 ${i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}"></i>`;
        }
        
        reviewCard.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="font-semibold text-gray-800">${review.name}</h3>
                    <div class="flex items-center mt-1">
                        ${starsHTML}
                    </div>
                </div>
                <span class="text-sm text-gray-500">${review.date}</span>
            </div>
            <p class="text-gray-700">${review.review}</p>
        `;
        
        reviewsContainer.prepend(reviewCard);
        reviewsContainer.appendChild(reviewCard);

        
        feather.replace();
    }
});

//Login

document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Create user object
            const user = {
                email,
                password,
                rememberMe,
                provider: 'email',
                lastLogin: new Date().toISOString()
            };
            
            // Store user data
            if (rememberMe) {
                localStorage.setItem('userCredentials', JSON.stringify({ email, password }));
            } else {
                localStorage.removeItem('userCredentials');
            }
            
            // Store current session
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect to dashboard (simulated)
            console.log('User signed in:', user);
            window.location.href = 'home.html';
        });
    }
    
    // Check for remembered credentials
    const rememberedCredentials = localStorage.getItem('userCredentials');
    if (rememberedCredentials) {
        const { email, password } = JSON.parse(rememberedCredentials);
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;
        document.getElementById('remember-me').checked = true;
    }
});

// Form validation for sign up page
if (document.querySelector('#signup-form')) {
    document.querySelector('#signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Here you would typically send the data to your server
        alert('Account created successfully! Redirecting to login...');
        window.location.href = 'login.html';
    });
}

// Form validation for forgot password page
if (document.querySelector('#forgot-password-form')) {
    document.querySelector('#forgot-password-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the reset email
        alert('Password reset link sent to your email!');
    });
}