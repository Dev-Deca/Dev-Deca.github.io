document.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;

    document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, img').forEach(function(el) {
        if (el.classList.contains('email-info')) {
            return;
        }
        
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        const distance = Math.sqrt((elX - x) ** 2 + (elY - y) ** 2);
        const maxDistance = 500; // 최대 효과 거리
        const brightness = Math.max(100 - (distance / maxDistance * 100), 50); // 최대 100, 최소 50

        if (el.tagName === 'IMG') {
            el.style.filter = `brightness(${brightness}%)`;
        } else {
            const originalColor = window.getComputedStyle(el).color;
            el.style.color = adjustBrightness(originalColor, brightness);
        }
    });
});

function adjustBrightness(color, brightness) {
    const rgb = color.match(/\d+/g);
    if (!rgb) return color;

    let [r, g, b] = rgb.map(Number);
    const maxBrightness = Math.max(r, g, b);

    if (maxBrightness > 0) {
        const multiplier = brightness / 100 * (255 / maxBrightness);
        r = Math.min(255, r * multiplier);
        g = Math.min(255, g * multiplier);
        b = Math.min(255, b * multiplier);
    }

    return `rgb(${r}, ${g}, ${b})`;
}



document.querySelector('.email-icon').addEventListener('click', function() {
    // 이메일 텍스트를 클립보드에 복사
    const email = this.innerText;
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = email;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // "Copied!" 메시지 표시
    const copiedMessage = document.querySelector('.copied-message');
    const rect = this.getBoundingClientRect();
    const offsetX = (rect.left + rect.right) / 2; // 요소의 중앙 X 좌표
    const offsetY = rect.top - 10; // 요소의 상단 Y 좌표에서 약간 위

    copiedMessage.style.left = `${offsetX}px`;
    copiedMessage.style.top = `${offsetY}px`;
    copiedMessage.style.display = 'block';

    // 몇 초 후 메시지 숨기기
    setTimeout(() => {
        copiedMessage.style.display = 'none';
    }, 2000);
});
