
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
 
const header = document.querySelector("header");

// --------------StickyNavbar----------------
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);  
   
};

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

// --------------Reveal Animation----------------
let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcaseInfo", {deplay: 300});
sr.reveal(".showcaseImage", {origin: "top",deplay: 300});

 // -------------- Music ----------------

const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const services = $('.services')
const nextBtn = $('.btn-next')
const servicesGird = $('.servicesGird')
const servicesCard = $('.servicesCard')

const appMusic =  {
  currentIndex: 0,
  isPlaying : false,
  songs: [
    {
        name: 'abcdef',
        path: '/assets/song/abcd.mp3',
        icon: '<i class="fa-solid fa-spa"></i>'
    },
    {
        name: 'SLANDER',
        path: '/assets/song/SLANDER.mp3',
        icon: '<i class="fa-solid fa-spaghetti-monster-flying"></i>'
    },
    {
        name: 'take me to church',
        path: '/assets/song/take me to church.mp3',
        icon: '<i class="fa-solid fa-seedling"></i>'
    }],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="servicesCard ${index === this.currentIndex ? 'active' : ''}" data-index="${index}" >
            ${song.icon}
            </div>
            `
        });
        servicesGird.innerHTML = htmls.join('');
    },
  defineProperties: function() {
    Object.defineProperty(this, 'currentSong', {
        get: function() {
            return this.songs[this.currentIndex]
        }
    })
  },
  loadCurrentSong: function() {
      audio.src = this.currentSong.path
  },
  nextSong: function() {
      this.currentIndex++
      if (this.currentIndex >= this.songs.length) {
          this.currentIndex = 0
      }
      this.loadCurrentSong()
  },
  handleEvents: function () {
    const _this = this
    playBtn.onclick = function() {
        if (_this.isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
    },// khi song dc play
    audio.onplay = function() {
      _this.isPlaying = true
      services.classList.add('playing')
     
    },
    //khi song dc pause 
    audio.onpause = function() {
        _this.isPlaying = false
        services.classList.remove('playing')
      
    },
    // xu ly end song
    // audio.onended = function() {
    //   // end khi on repeat va random
    //   nextBtn.click()
    // }
    //xu ly next song
    nextBtn.onclick = function() {
      _this.nextSong()
      _this.render()
      audio.play()
    }
    //xu ly click vao list song
    servicesGird.onclick = function(e) {
      const songNode = e.target.closest('.servicesCard:not(.active)')
        if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index)
            _this.loadCurrentSong()
            _this.render()
            audio.play()
        } else {
          audio.pause()
        }
    }  
  
  },
  start: function() {
    this.defineProperties() 
    // lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvents()

    // Tải thông tin bài hát đầu khi UI chạy ứng dụng
    this.loadCurrentSong()
    //render playlist
    this.render()
  }
}
appMusic.start()

 // -------------- SKILLS ----------------

 const firstSkill = $('.skill:first-child')
 const skCounters = $$('.counter span')
 const progressBars = $$('.skills svg circle')

 window.addEventListener('scroll', () => {
  if(!skillsPlayed) skillsCounter();
 })

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;
  
  if(window.innerHeight >= (topPosition + el.offsetHeight) ) return true;
  return false
}

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;

  if(currentNum <maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() =>{
      updateCount(num, maxNum);
    }, 12)
  }
}

let skillsPlayed = false;

function skillsCounter() {
  if(!hasReached(firstSkill)) return;
  skillsPlayed = true;

  skCounters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    
    let strokeValue = 427 -427 * (target / 100)
    progressBars[i].style.setProperty("--target", strokeValue)
    
    setTimeout(() =>{
      updateCount(counter, target)
    }, 1000)
  
  })

  
  progressBars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"));
 }