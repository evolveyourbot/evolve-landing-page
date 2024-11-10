document.addEventListener('DOMContentLoaded', () => {
    const terminalText = document.querySelector('.terminal');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '█';
    
    const messages = [
        'INITIALIZING CONSULTATION PROTOCOL...',
        'SELECT INTEGRATION PATH:',
        '> PERCEPTION & COMPUTER VISION',
        '> PATH PLANNING & NAVIGATION',
        '> ADVANCED CONTROLS',
        '> LARGE LANGUAGE MODELS',
        '> END-TO-END LEARNING',
        'AWAITING INPUT...'
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    function typeWriter() {
        if (messageIndex < messages.length) {
            if (charIndex < messages[messageIndex].length) {
                terminalText.innerHTML = messages[messageIndex].substring(0, charIndex + 1) + cursor.textContent;
                charIndex++;
                setTimeout(typeWriter, 25);
            } else {
                setTimeout(() => {
                    charIndex = 0;
                    messageIndex++;
                    typeWriter();
                }, messageIndex === 0 ? 500 : 250);
            }
        } else {
            showMLOptions();
        }
    }

    function showMLOptions() {
        const options = [
            {
                text: 'INTEGRATE_PLANNING()',
                desc: 'Advanced path planning solutions',
                subject: 'Robot Path Planning Integration',
                details: '- RRT/RRT* Implementation\n- Trajectory Optimization\n- Dynamic Obstacle Avoidance\n- Multi-Agent Planning'
            },
            {
                text: 'INTEGRATE_LLM()',
                desc: 'Language models for robotics',
                subject: 'Robot LLM Integration',
                details: '- Natural Language Commands\n- Context-Aware Decision Making\n- Human-Robot Interaction\n- Task Planning'
            },
            {
                text: 'INTEGRATE_PERCEPTION()',
                desc: 'Computer vision and sensor fusion',
                subject: 'Robot Perception Integration',
                details: '- Object Detection\n- Semantic Segmentation\n- Multi-Modal Fusion\n- 3D Scene Understanding'
            },
            {
                text: 'INTEGRATE_LEARNING()',
                desc: 'End-to-end learning for robotics',
                subject: 'Robot Learning Integration',
                details: '- Reinforcement Learning\n- Imitation Learning\n- Behavior Cloning\n- Learning from Demonstration'
            }
        ];

        const optionsHTML = options.map(opt => `
            <a href="mailto:evolveyourbot@gmail.com?subject=${encodeURIComponent(opt.subject)}" 
               class="ml-option">
                <span class="option-text">> ${opt.text}</span>
                <span class="option-desc">${opt.desc}</span>
                <div class="option-details">
                    ${opt.details.split('\n').map(detail => `<span>${detail}</span>`).join('')}
                </div>
            </a>
        `).join('');

        terminalText.innerHTML += `
            <div class="ml-options-container">
                ${optionsHTML}
            </div>
        `;
    }
    
    typeWriter();
});

// Add cursor trail
const cursor = {
    x: 0,
    y: 0,
    trail: []
};

document.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    addTrailPoint(cursor.x, cursor.y);
});

function addTrailPoint(x, y) {
    const point = document.createElement('div');
    point.className = 'cursor-trail';
    point.style.left = x + 'px';
    point.style.top = y + 'px';
    document.body.appendChild(point);
    cursor.trail.push(point);
    
    if (cursor.trail.length > 20) {
        const oldestPoint = cursor.trail.shift();
        oldestPoint.remove();
    }
    
    setTimeout(() => {
        point.remove();
        cursor.trail = cursor.trail.filter(p => p !== point);
    }, 500);
}