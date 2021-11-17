/*----------------------------------------
@name: Window Scroll
@description: Window Scroll
----------------------------------------
*/

const WindowScroll = (() => {
  let _lastScrollTop = 0;
  let _delta = 4;
  let _headerHeight = $('.header').height() / 2;

  // --- handleHeaderScroll
  const handleHeaderScroll = () => {

    // --- _scrollTop
    const _scrollTop = $(window).scrollTop();

    // --- Make sure they scroll more than _delta
    if (Math.abs(_lastScrollTop - _scrollTop) <= _delta) {
      return;
    }

    if (_scrollTop > 32) {
      $('body').addClass('on-scroll');
    } else {
      $('body').removeClass('on-scroll');
    }

    // --- Scroll Down
    if (_scrollTop > _lastScrollTop && _scrollTop > _headerHeight) {
      if (!$('.show-navigation').length) {
        $('body').addClass('scroll-down');
      }
    } else {
      // --- Scroll Up
      if (_scrollTop + $(window).height() < $(document).height()) {
        $('body').removeClass('scroll-down');
      }
    }
    _lastScrollTop = _scrollTop;
  }

  // --- handleScroll
  const handleScroll = () => {
    let _didScroll;

    $(window).scroll(() => {
      _didScroll = true;
      setInterval(() => {
        if (_didScroll) {
          if ($('.header').length) {
            handleHeaderScroll();
          }
          _didScroll = false;
        }
      }, 200);
    });
  }


  // --- init
  const init = () => {
    handleScroll();
    if ($('.header').length) {
      handleHeaderScroll();
    }
  }

  // --- return
  return {
    init
  }

})();

export default WindowScroll;
