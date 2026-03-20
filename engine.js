// --- AUTHENTICATION / LEAD GATE LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const authGate = document.getElementById('authGate');
    const loginForm = document.getElementById('loginForm');
    
    // Check if user already signed in
    const savedEmail = localStorage.getItem('lockin_user_email');
    
    if (savedEmail) {
        authGate.classList.add('hidden'); 
    } else {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('emailInput').value.trim();
            const submitBtn = loginForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            if (email) {
                // Show loading state
                submitBtn.innerHTML = '<i class="ph ph-spinner-gap animate-spin text-xl"></i> Locking In...';
                
                try {
                    // PASTE YOUR FORMSPREE URL HERE
                    await fetch('https://formspree.io/f/xdawjpee', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: email })
                    });

                    // Save locally so they don't have to login again tomorrow
                    localStorage.setItem('lockin_user_email', email);
                    
                    // Smoothly unlock the app
                    authGate.style.opacity = '0';
                    setTimeout(() => {
                        authGate.classList.add('hidden');
                    }, 300);
                    
                } catch (error) {
                    console.error("Database Error:", error);
                    submitBtn.innerHTML = 'Network Error. Try Again.';
                    setTimeout(() => { submitBtn.innerHTML = originalText; }, 2000);
                }
            }
        });
    }
});

// ... (The rest of your core time, habits, and camera logic stays exactly the same below this!) ...