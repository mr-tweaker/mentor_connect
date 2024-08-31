// Sample mentor data (fallback if Firebase fails)
const fallbackMentors = [
    { id: 1, name: "Jane Doe", expertise: "Web Development", bio: "10 years of experience in full-stack development.", image: "https://img.freepik.com/premium-photo/professional-people-young-happy-redhead-woman-smiling-camera-cross-arms-chest-confident-standing-office-blouse-white-background_908985-7144.jpg?w=1380" },
    { id: 2, name: "John Smith", expertise: "Data Science", bio: "AI researcher with a focus on machine learning.", image: "https://burst.shopifycdn.com/photos/professional-man-portrait.jpg" },
    { id: 3, name: "Alice Johnson", expertise: "UX Design", bio: "Passionate about creating intuitive user experiences.", image: "https://preview.redd.it/k7dicmp4heh21.jpg?width=1080&crop=smart&auto=webp&s=868200f2d2492d018e48d037a719c1a2b627d970" },
];

// Update the createMentorCard function to include a delete button
function createMentorCard(mentor) {
    const card = document.createElement('div');
    card.className = 'mentor-card';
    card.innerHTML = `
        <img src="${mentor.image}" alt="${mentor.name}">
        <h3>${mentor.name}</h3>
        <p><strong>Expertise:</strong> ${mentor.expertise}</p>
        <p>${mentor.bio.substring(0, 100)}${mentor.bio.length > 100 ? '...' : ''}</p>
        <button onclick="window.location.href='mentor-1.html?id=${mentor.id}'">View Profile</button>
        <button onclick="deleteMentor('${mentor.id}')">Delete Mentor</button>
    `;
    return card;
}

// Function to delete a mentor from Firebase
function deleteMentor(mentorId) {
    db.collection('mentors').doc(mentorId).delete()
        .then(() => {
            console.log("Mentor successfully deleted!");
            fetchMentors(); // Refresh the mentor list
        })
        .catch((error) => {
            console.error("Error removing mentor: ", error);
        });
}

// Function to display mentor cards
function displayMentors(mentors) {
    const mentorGrid = document.querySelector('.mentor-grid');
    mentorGrid.innerHTML = '';
    mentors.forEach(mentor => {
        mentorGrid.appendChild(createMentorCard(mentor));
    });
}

// Function to fetch mentors from Firebase
function fetchMentors() {
    db.collection('mentors').get()
        .then((querySnapshot) => {
            const mentors = [];
            querySnapshot.forEach((doc) => {
                mentors.push({ id: doc.id, ...doc.data() });
            });
            displayMentors(mentors);
        })
        .catch((error) => {
            console.log("Error getting documents from Firebase: ", error);
            displayMentors(fallbackMentors);
        });
}

// Function to filter mentors
function filterMentors() {
    const searchTerm = document.getElementById('mentor-search').value.toLowerCase();
    const expertise = document.getElementById('expertise-filter').value.toLowerCase();
    
    db.collection('mentors').get()
        .then((querySnapshot) => {
            const filteredMentors = [];
            querySnapshot.forEach((doc) => {
                const mentor = { id: doc.id, ...doc.data() };
                if ((mentor.name.toLowerCase().includes(searchTerm) || 
                     mentor.expertise.toLowerCase().includes(searchTerm)) &&
                    (expertise === '' || mentor.expertise.toLowerCase() === expertise)) {
                    filteredMentors.push(mentor);
                }
            });
            displayMentors(filteredMentors);
        })
        .catch((error) => {
            console.log("Error filtering documents from Firebase: ", error);
            const filteredFallbackMentors = fallbackMentors.filter(mentor => 
                (mentor.name.toLowerCase().includes(searchTerm) || 
                 mentor.expertise.toLowerCase().includes(searchTerm)) &&
                (expertise === '' || mentor.expertise.toLowerCase() === expertise)
            );
            displayMentors(filteredFallbackMentors);
        });
}

// Event listeners for search and filter
document.getElementById('mentor-search').addEventListener('input', filterMentors);
document.getElementById('expertise-filter').addEventListener('change', filterMentors);

// Initialize the page
fetchMentors();

// Make addMentor function global
window.addMentor = function(mentor) {
    db.collection('mentors').add(mentor)
        .then((docRef) => {
            console.log("Mentor added successfully with ID: ", docRef.id);
            fetchMentors(); // Refresh the mentor list
        })
        .catch((error) => {
            console.error("Error adding mentor: ", error);
        });
}

// Function to check if Firebase is initialized
window.isFirebaseInitialized = function() {
    if (firebase.apps.length) {
        console.log("Firebase is initialized and ready to use.");
        return true;
    } else {
        console.error("Firebase is not initialized. Make sure you have included the Firebase SDK and your configuration file.");
        return false;
    }
}

// Sample Code to execute the addMentor() function in the console window.

// addMentor({
//     name: "New Mentor",
//     expertise: "Machine Learning",
//     bio: "Expert in machine learning and AI with 5 years of industry experience.",
//     image: "https://example.com/mentor-image.jpg"
// });