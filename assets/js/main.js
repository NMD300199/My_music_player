const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.fa-random');
const repeatBtn = $('.fa-redo');
const songBtn = $$('.song');
const playList = $('.playlist');


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Xuân thì',
            singer: 'Hà Anh Tuấn',
            path: './assets/music/(Lyric Video) - XUÂN THÌ - HÀ ANH TUẤN.mp3',
            image: './assets/img/xuan-thi.jpg'
        },
        {
            name: 'Gửi em',
            singer: 'Hoa Vinh',
            path: './assets/music/GuiEm-HoaVinh-7197165.mp3',
            image: './assets/img/gui-em.jpg'
        },
        {
            name: 'Tháng mấy anh nhớ em',
            singer: 'Hà Anh Tuấn',
            path: './assets/music/THÁNG MẤY EM NHỚ ANH - Bùi Anh Tuấn -lụi tim- khán giả trong Live Concert HOA.mp3',
            image: './assets/img/thang-may.jpg'
        },
        {
            name: 'Yêu một người sao buồn đến thế',
            singer: 'Noo Phước Thịnh',
            path: './assets/music/Yêu Một Người Sao Buồn Đến Thế - Noo Phước Thịnh ( Lyrics ).mp3',
            image: './assets/img/yeu-mọt-nguoi.jpg'
        },
        {
            name: 'Tệ thật anh nhớ em',
            singer: 'Thanh Hưng',
            path: './assets/music/Tệ Thật, Anh Nhớ Em - Thanh Hưng - Official Lyric Video.mp3',
            image: './assets/img/artworks-CzXvlZG9cqkpcRqq-n918Wg-t500x500.jpg'
        },
        {
            name: 'Cô đơn sẽ tốt hơn',
            singer: 'Lương Gia Hưng',
            path: './assets/music/Cô Đơn Sẽ Tốt Hơn - Lương Gia Hùng [LYRIC VIDEO] #CDSTH.mp3',
            image: './assets/img/maxresdefault.jpg'
        },
        {
            name: 'Sao ta ngược lối',
            singer: 'Đình Dũng',
            path: './assets/music/Sao ta ngược lối - Đình Dũng - Video Lyric.mp3',
            image: './assets/img/stnl.jpg'
        },
        {
            name: 'Chẳng gì đẹp đẽ trên đời mãi',
            singer: 'Khang Việt',
            path: './assets/music/Chẳng Gì Đẹp Đẽ Trên Đời Mãi - Khang Việt - Official Music Video.mp3',
            image: './assets/img/cgđtdm.jpg'
        },
        {
            name: 'Anh sẽ ổn thôi',
            singer: 'Vương Anh Tú',
            path: './assets/music/ANH SẼ ỔN THÔI - VƯƠNG ANH TÚ - VIDEO LYRICS - NHẠC BUỒN NHẤT.mp3',
            image: './assets/img/asot.jpg'
        },
        {
            name: 'Quên một người từng yêu',
            singer: 'Châu Khải Phong',
            path: './assets/music/Quên Một Người Từng Yêu - Châu Khải Phong [LYRIC VIDEO].mp3',
            image: './assets/img/q1nty.jpg'
        },
        {
            name: 'Ai chung tình được mãi',
            singer: 'Trung Quân Cover',
            path: './assets/music/AI CHUNG TÌNH ĐƯỢC MÃI @Đinh Tùng Huy - TRUNG QUÂN COVER - In the Moonlight 2022.mp3',
            image: './assets/img/20f645cbdffa5f37dba8bf7b61e599c6.jpg'
        },
        {
            name: 'Tìm được nhau khó thế nào',
            singer: 'Anh Tú',
            path: './assets/music/Tìm Được Nhau Khó Thế Nào - Anh Tú x Bùi Công Nam - Lyric Video - OST CHÌA KHÓA TRĂM TỶ.mp3',
            image: './assets/img/tdnktn.jpg'
        }
    ],

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        });
        playList.innerHTML = htmls.join('');
    },

    handleEvent: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý CD rotated
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, //10s
            iterations: Infinity, //Vô hạn
        });

        cdThumbAnimate.pause();
        
        // Xử lý phóng to/thu nhỏ
        document.onscroll = function() {
            const scroll = document.documentElement.scrollTop || window.scrollY;
            const newCdWidth = cdWidth - scroll;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // Xử lý khi play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // Khi bài hát được play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };

        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };

        audio.ontimeupdate = function() {
            if (audio.duration) {
                progress.value = Math.floor(audio.currentTime/audio.duration *100);
            }
        };

        // Xử lý khi tua 
        progress.onchange = function() {
            const seekTime = progress.value*audio.duration/100;
            audio.currentTime = seekTime;
        };

        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            _this.render();
            audio.play();
            _this.scrollToActiveSong();
        };

        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            _this.render();
            audio.play();

        };

        // khi xử lý bật tắt random
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom;
            e.target.classList.toggle("active", _this.isRandom);
        }

        // Bật tắt repeat
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat;
            e.target.classList.toggle("active", _this.isRepeat);
        }

        // Repeat khi audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                _this.repeatSong();
            } else {
                if (_this.isRandom) {
                    _this.playRandomSong();
                    _this.render();
                } else {
                    _this.nextSong();
                    _this.render();
                }
            }
            audio.play();
        }

        // Click play music 
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                // Xử lý khi click vào song
                if (songNode) {
                    _this.currentIndex = Number(songNode.getAttribute('data-index'));
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        }
            
    },

    scrollToActiveSong: function() {
        setTimeout( () => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 300)
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        };
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        };
        this.loadCurrentSong();
    },

    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    repeatSong: function() {
        this.currentIndex;
        this.loadCurrentSong();
    },

    start: function() {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe/xử lý cac sự kiện (DOM Event)
        this.handleEvent();

        // Tải thông tin bài đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();
    }
};

app.start()

