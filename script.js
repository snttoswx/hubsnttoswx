// Array de imagens de fundo (você pode adicionar mais URLs)
const backgroundImages = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2111&q=80',
    'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80',
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
];

// Elementos DOM
const backgroundContainer = document.getElementById('backgroundContainer');
const floatingElements = document.getElementById('floatingElements');
const audio = document.getElementById('backgroundMusic');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Estado da música
let isPlaying = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initBackground();
    createFloatingElements();
    initMusicPlayer();
    initStatusAnimation();
});

// Sistema de fundo dinâmico
function initBackground() {
    // Seleciona uma imagem aleatória
    const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    
    // Cria elementos do background
    const backgroundImage = document.createElement('img');
    backgroundImage.className = 'background-image';
    backgroundImage.src = randomImage;
    backgroundImage.alt = 'Background';
    
    const backgroundOverlay = document.createElement('div');
    backgroundOverlay.className = 'background-overlay';
    
    // Adiciona ao container
    backgroundContainer.appendChild(backgroundImage);
    backgroundContainer.appendChild(backgroundOverlay);
    
    // Pré-carrega as próximas imagens para transição suave
    preloadBackgroundImages();
}

function preloadBackgroundImages() {
    backgroundImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Elementos flutuantes
function createFloatingElements() {
    for (let i = 0; i < 25; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // Posição aleatória
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Animação única para cada elemento
        element.style.animationDelay = `${Math.random() * 20}s`;
        element.style.animationDuration = `${15 + Math.random() * 20}s`;
        
        // Tamanho e cor variados
        const size = Math.random() * 8 + 4;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Cores aleatórias baseadas no tema
        const colors = [
            'var(--primary)',
            'var(--accent)',
            'var(--success)',
            '#667fff',
            '#8b5cf6'
        ];
        element.style.background = colors[Math.floor(Math.random() * colors.length)];
        element.style.opacity = Math.random() * 0.6 + 0.2;
        
        floatingElements.appendChild(element);
    }
}

// Sistema de música
function initMusicPlayer() {
    // Tenta reproduzir automaticamente (pode ser bloqueado pelo navegador)
    audio.volume = 0.7;
    
    // Event listeners para os controles
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', previousTrack);
    nextBtn.addEventListener('click', nextTrack);
    
    // Atualiza o estado do botão quando a música termina
    audio.addEventListener('ended', function() {
        isPlaying = false;
        updatePlayButton();
    });
    
    // Lida com erro de carregamento de áudio
    audio.addEventListener('error', function(e) {
        console.error('Erro ao carregar áudio:', e);
        playBtn.disabled = true;
        playBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        playBtn.title = 'Erro ao carregar música';
    });
    
    // Tenta reproduzir quando o usuário interagir com a página
    document.addEventListener('click', function firstInteraction() {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                updatePlayButton();
            }).catch(e => {
                console.log('Reprodução automática bloqueada. Clique no botão play.');
            });
        }
        document.removeEventListener('click', firstInteraction);
    });
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play().then(() => {
            isPlaying = true;
        }).catch(e => {
            console.error('Erro ao reproduzir:', e);
            // Mostra alerta amigável
            showMusicError();
        });
    }
    updatePlayButton();
}

function updatePlayButton() {
    if (isPlaying) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playBtn.classList.add('active');
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.classList.remove('active');
    }
}

function previousTrack() {
    // Simula troca de música (você pode implementar uma playlist real)
    showNotification('⏮️ Música anterior');
}

function nextTrack() {
    // Simula troca de música (você pode implementar uma playlist real)
    showNotification('⏭️ Próxima música');
}

function showMusicError() {
    showNotification('🎵 Clique para permitir reprodução de áudio', 'info');
}

// Animação do status
function initStatusAnimation() {
    const statusElement = document.querySelector('.status');
    const statusMessages = [
        'Online',
        'Codando...',
        'Disponível',
        'Focado',
        'Criando'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        statusElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % statusMessages.length;
            statusElement.textContent = statusMessages[currentIndex];
            statusElement.style.opacity = '1';
        }, 300);
    }, 5000);
}

// Efeitos interativos
document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Efeito de clique no card
document.querySelector('.profile-card').addEventListener('click', function() {
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
        this.style.transform = 'translateY(-8px)';
    }, 150);
});

// Sistema de notificação
function showNotification(message, type = 'normal') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
        </div>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-primary);
        color: var(--text-primary);
        padding: 12px 20px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: var(--font-size-sm);
    `;
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Atualização dinâmica do background a cada 30 segundos (opcional)
setInterval(() => {
    const currentImage = backgroundContainer.querySelector('.background-image');
    const newImageUrl = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    
    if (currentImage.src !== newImageUrl) {
        currentImage.style.opacity = '0';
        
        setTimeout(() => {
            currentImage.src = newImageUrl;
            currentImage.style.opacity = '0.3';
        }, 1000);
    }
}, 30000);
