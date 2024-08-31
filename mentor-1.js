// Firebase configuration (make sure this matches your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAG9wMvTJ235A27QsW7iX3qD0ah8K8All0",
    authDomain: "unified-mentor.firebaseapp.com",
    projectId: "unified-mentor",
    storageBucket: "unified-mentor.appspot.com",
    messagingSenderId: "900432080474",
    appId: "1:900432080474:web:d6bec2fd13a4e9e3f1f263",
    measurementId: "G-JY7F1FDL2L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to get mentor ID from URL parameter
function getMentorIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Function to populate mentor profile
function populateMentorProfile(mentorId) {
    console.log("Fetching mentor with ID:", mentorId);
    db.collection('mentors').doc(mentorId).get()
        .then((doc) => {
            if (doc.exists) {
                const mentor = doc.data();
                console.log("Mentor data:", mentor);

                document.title = `MentorConnect - ${mentor.name || 'Mentor'}'s Profile`;
                document.getElementById('mentor-image').src = mentor.image || '';
                document.getElementById('mentor-image').alt = `${mentor.name || 'Mentor'}'s profile picture`;
                document.getElementById('mentor-name').textContent = mentor.name || 'Name not available';
                document.getElementById('mentor-expertise').textContent = mentor.expertise || 'Expertise not available';
                document.getElementById('mentor-bio').textContent = mentor.bio || 'Bio not available';

                const experienceList = document.getElementById('mentor-experience');
                if (mentor.experience && Array.isArray(mentor.experience)) {
                    experienceList.innerHTML = ''; // Clear existing content
                    mentor.experience.forEach(exp => {
                        const li = document.createElement('li');
                        li.textContent = exp;
                        experienceList.appendChild(li);
                    });
                } else {
                    console.warn("Experience data is missing or not an array");
                    experienceList.innerHTML = '<li>No experience data available</li>';
                }

                const skillsList = document.getElementById('mentor-skills');
                if (mentor.skills && Array.isArray(mentor.skills)) {
                    skillsList.innerHTML = ''; // Clear existing content
                    mentor.skills.forEach(skill => {
                        const li = document.createElement('li');
                        li.textContent = skill;
                        skillsList.appendChild(li);
                    });
                } else {
                    console.warn("Skills data is missing or not an array");
                    skillsList.innerHTML = '<li>No skills data available</li>';
                }

                const educationList = document.getElementById('mentor-education');
                if (mentor.education && Array.isArray(mentor.education)) {
                    educationList.innerHTML = ''; // Clear existing content
                    mentor.education.forEach(edu => {
                        const li = document.createElement('li');
                        li.textContent = edu;
                        educationList.appendChild(li);
                    });
                } else {
                    console.warn("Education data is missing or not an array");
                    educationList.innerHTML = '<li>No education data available</li>';
                }

                document.getElementById('mentor-contact').textContent = mentor.contact ? `Email: ${mentor.contact}` : 'Contact information not available';
            } else {
                console.error('Mentor not found');
                document.getElementById('mentor-profile').innerHTML = '<p>Mentor profile not found.</p>';
            }
        })
        .catch((error) => {
            console.error("Error getting mentor document:", error);
            document.getElementById('mentor-profile').innerHTML = '<p>Error loading mentor profile. Please try again later.</p>';
        });
}

// Function to handle scheduling (placeholder)
function scheduleMeeting() {
    alert('Scheduling functionality will be implemented here.');
}

// Event listener for scheduling button
document.getElementById('schedule-meeting').addEventListener('click', scheduleMeeting);

// Initialize the page
const mentorId = getMentorIdFromUrl();
if (mentorId) {
    populateMentorProfile(mentorId);
} else {
    console.error('No mentor ID provided in the URL');
    document.getElementById('mentor-profile').innerHTML = '<p>Error: No mentor ID provided.</p>';
}