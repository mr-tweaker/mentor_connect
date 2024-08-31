// Sample team member data (in a real application, this would come from a backend)
const teamMembers = [
    {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        bio: "With over 15 years in tech and a passion for mentorship, Sarah founded MentorConnect to make expert guidance accessible to all.",
        image: "https://example.com/sarah-johnson.jpg"
    },
    {
        name: "Michael Chen",
        role: "CTO",
        bio: "A veteran software engineer, Michael ensures MentorConnect's platform is robust, scalable, and user-friendly.",
        image: "https://example.com/michael-chen.jpg"
    },
    {
        name: "Emily Rodriguez",
        role: "Head of Mentor Relations",
        bio: "Emily's background in HR and coaching helps her curate our exceptional mentor network and ensure quality connections.",
        image: "https://example.com/emily-rodriguez.jpg"
    },
    {
        name: "David Okafor",
        role: "Lead UX Designer",
        bio: "David combines his design expertise and user empathy to create intuitive, engaging experiences on MentorConnect.",
        image: "https://example.com/david-okafor.jpg"
    }
];

// Function to create team member cards
function createTeamMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'team-member';
    card.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <div class="team-member-info">
            <h3>${member.name}</h3>
            <p><strong>${member.role}</strong></p>
            <p>${member.bio}</p>
        </div>
    `;
    return card;
}

// Function to display team member cards
function displayTeamMembers() {
    const teamGrid = document.querySelector('.team-grid');
    teamMembers.forEach(member => {
        teamGrid.appendChild(createTeamMemberCard(member));
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', displayTeamMembers);