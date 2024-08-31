// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sample mentor data (in a real application, this would come from a backend)
const mentors = [
    { id: 1, name: "Jane Doe", expertise: "Web Development", bio: "10 years of experience in full-stack development." },
    { id: 2, name: "John Smith", expertise: "Data Science", bio: "AI researcher with a focus on machine learning." },
    { id: 3, name: "Alice Johnson", expertise: "UX Design", bio: "Passionate about creating intuitive user experiences." },
    // Add more mentor objects as needed
];

// Function to create mentor cards
function createMentorCard(mentor) {
    const card = document.createElement('div');
    card.className = 'mentor-card';
    card.innerHTML = `
        <h3>${mentor.name}</h3>
        <p><strong>Expertise:</strong> ${mentor.expertise}</p>
        <p>${mentor.bio}</p>
        <button onclick="showMentorDetails(${mentor.id})">View Profile</button>
    `;
    return card;
}

// Function to display mentor cards
function displayMentors(mentors) {
    const mentorGrid = document.querySelector('.mentor-grid');
    mentorGrid.innerHTML = '';
    mentors.forEach(mentor => {
        mentorGrid.appendChild(createMentorCard(mentor));
    });
}

// Function to filter mentors
function filterMentors(expertise) {
    return mentors.filter(mentor => 
        mentor.expertise.toLowerCase().includes(expertise.toLowerCase())
    );
}

// Event listener for mentor search
document.getElementById('mentor-search').addEventListener('input', function(e) {
    const filteredMentors = filterMentors(e.target.value);
    displayMentors(filteredMentors);
});

// Function to show mentor details (simulated modal)
function showMentorDetails(mentorId) {
    const mentor = mentors.find(m => m.id === mentorId);
    alert(`Mentor Details:\nName: ${mentor.name}\nExpertise: ${mentor.expertise}\nBio: ${mentor.bio}`);
    // In a real application, you would open a modal here instead of using alert
}

// Initialize the page
displayMentors(mentors);

// Form submission (prevent default and show a thank you message)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});