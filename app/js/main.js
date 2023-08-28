(function () {

  // Слайдер в сервисах
  const swiper = new Swiper('.services__swiper', {
    slidesPerView: 1,
    spaceBetween: 25,
    navigation: {
      prevEl: '.services__prev',
      nextEl: '.services__next',
    },
    breakpoints: {
      700: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      },
    }
  });
  swiper.onAny(swiperSlideIsChanged);
  function swiperSlideIsChanged() {
    const slides = document.querySelectorAll('.services__slide')
    const targetSlide = document.querySelector('.services .swiper-slide-active')

    for (let slide of slides) {
      const activeSlide = slide.closest('.services__slide--active')
      if (activeSlide) {
        activeSlide.classList.remove('services__slide--active')
      }
    }

    let currentSlide = targetSlide
    for (let i = 0; i < swiper.params.slidesPerView; i++) {
      if (!currentSlide) return
      currentSlide.classList.add('services__slide--active')
      currentSlide = currentSlide.nextElementSibling
    }
  }
  // Выбор языка
  document.addEventListener('click', function (e) {
    const target = e.target.closest('.select__btn')
    if (!target) return
    const dropdown = target.closest('.select').querySelector('.select__dropdown')

    target.closest('.select').classList.toggle('select--active')
    let top = target.offsetHeight + 5
    let left = target.offsetWidth / 2 - dropdown.offsetWidth / 2

    if (
      dropdown.getBoundingClientRect().top >
      document.documentElement.clientHeight - dropdown.offsetHeight
    ) {
      top = - dropdown.offsetHeight - 5
    }

    dropdown.style.top = top + 'px'
    dropdown.style.left = left + 'px'
  })
  document.addEventListener('click', function (e) {
    const target = e.target.closest('li.select__item')
    if (!target) return

    let targetSelect = target.closest('.select')
    let targetAttr = target.dataset.selectItem
    let selectedOption = targetSelect.querySelector(`.${targetAttr}`)

    top.location = selectedOption.value
  })

  // Липкий хедер
  document.addEventListener('scroll', headerTopIsFollow)
  document.addEventListener('DOMContentLoaded', headerTopIsFollow)
  document.addEventListener('scroll', burgerBtnIsFollow)
  document.addEventListener('DOMContentLoaded', burgerBtnIsFollow)

  function headerTopIsFollow() {
    const headerTop = document.querySelector('.header__top')
    if (window.pageYOffset > 10) {
      headerTop.classList.add('header__top--follow')
    } else {
      headerTop.classList.remove('header__top--follow')
    }
  }
  function burgerBtnIsFollow() {
    if (window.pageYOffset > 10 && !burgerMenu.closest('.header__menu--show')) {
      burgerBtn.classList.add('burger--follow')
    } else {
      burgerBtn.classList.remove('burger--follow')
    }
  }

  // Бургер меню
  const burgerBtn = document.querySelector('.burger')
  const burgerMenu = document.querySelector('.header__menu')
  burgerBtn.onclick = (e) => {
    e.preventDefault()
    burgerBtn.classList.toggle('burger--active')
    burgerMenu.classList.toggle('header__menu--show')
    if (window.pageYOffset > 10) {
      burgerBtn.classList.toggle('burger--follow')
    }
  }

  // Плавный скрол
  SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 600,
    // Размер шага в пикселях 
    stepSize: 75,

    // Дополнительные настройки:

    // Ускорение 
    accelerationDelta: 30,
    // Максимальное ускорение
    accelerationMax: 2,

    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
  })

  // Плавное перемещение по якорям
  const smoothScrollToAnchor = (e) => {
    const target = e.target.closest('a')
    if (!target) return
    e.preventDefault()
    
    if (burgerMenu.closest('.header__menu--show')) {
      burgerBtn.classList.remove('burger--active')
      burgerMenu.classList.remove('header__menu--show')
    }

    const headerTopHeight = 45
    const id = target.getAttribute('href')
    const top = document.querySelector(id).getBoundingClientRect().top - headerTopHeight + window.pageYOffset

    window.scrollTo({
      top: top,
      behavior: 'smooth'
    })
  }
  const nav = document.querySelector('.header__nav')
  const logos = document.querySelectorAll('.logo')

  for (let logo of logos) {
    logo.addEventListener('click', smoothScrollToAnchor)
  }
  nav.addEventListener('click', smoothScrollToAnchor)

})()