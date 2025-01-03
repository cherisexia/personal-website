// script.js

document.addEventListener('DOMContentLoaded', () => {
    const courseForm = document.getElementById('course-form');
    const courseList = document.getElementById('course-list');

    // Load courses from localStorage
    let courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Function to render courses
    function renderCourses() {
        courseList.innerHTML = '';
        courses.forEach((course, index) => {
            const li = document.createElement('li');
            li.className = 'course-item';

            li.innerHTML = `
                <div class="course-details">
                    <a href="${course.url}" target="_blank">${course.name}</a>
                    <div class="progress-container">
                        <div class="progress-bar" data-index="${index}">
                            <div class="progress" style="width: ${course.progress}%;" data-index="${index}"></div>
                        </div>
                        <span>${course.progress}%</span>
                    </div>
                </div>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            courseList.appendChild(li);
        });
    }

    // Initial render
    renderCourses();

    // Add Course
    courseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('course-name').value.trim();
        const url = document.getElementById('course-url').value.trim();

        if (name && url) {
            // Validate URL
            try {
                new URL(url);
            } catch (_) {
                alert('Please enter a valid URL.');
                return;
            }

            courses.push({ name, url, progress: 0 });
            localStorage.setItem('courses', JSON.stringify(courses));
            renderCourses();
            courseForm.reset();
        }
    });

    // Delete Course
    courseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            if (confirm(`Are you sure you want to delete "${courses[index].name}"?`)) {
                courses.splice(index, 1);
                localStorage.setItem('courses', JSON.stringify(courses));
                renderCourses();
            }
        }
    });

    // Editable Progress Bar
    courseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('progress-bar') || e.target.classList.contains('progress')) {
            const index = e.target.getAttribute('data-index');
            const currentProgress = courses[index].progress;
            const newProgress = prompt('Enter new progress percentage (0-100):', currentProgress);
            if (newProgress !== null) {
                const progressValue = parseInt(newProgress);
                if (!isNaN(progressValue) && progressValue >= 0 && progressValue <= 100) {
                    courses[index].progress = progressValue;
                    localStorage.setItem('courses', JSON.stringify(courses));
                    renderCourses();
                } else {
                    alert('Please enter a valid number between 0 and 100.');
                }
            }
        }
    });
});
