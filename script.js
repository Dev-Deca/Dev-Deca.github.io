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




