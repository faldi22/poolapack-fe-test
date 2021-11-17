/* ------------------------------------------------------------------------------
@name: Dashboard
@description: Dashboard
--------------------------------------------------------------------------------- */

const Dashboard = (() => {

  // - handleDashboard
  const handleDashboardTabbing = () => {
    $('.js-transaction-tab .transaction__nav__btn').on('click', (e) => {
      // window.alert('tes');
      const _this = $(e.currentTarget);
      if(!_this.parents('.transaction__nav__item').hasClass('transaction__nav__item--active')) {
        const _id = _this.attr('data-target');

        $('.transaction__nav__item').removeClass('transaction__nav__item--active');
        $('.transaction__pane').removeClass('transaction__pane--active');
        _this.parents('.transaction__nav__item').addClass('transaction__nav__item--active');
        $(_id).addClass('transaction__pane--active');
      }
    })
  }

  // handleDateRangePicker
  const handleDateRangePicker = () => {
    if($('.js-date-range-picker').length){
      $('.js-date-range-picker').daterangepicker();
    }
  }

  // - init
  const init = () => {
    handleDashboardTabbing();
    handleDateRangePicker();
  }

  return {
    init
  }

})();

export default Dashboard
