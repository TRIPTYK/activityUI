(function(window,$) {
	function basicUI(){

		function init(){

			$('.tab header >a').on('click', tpkTab);

		};

		function tpkTab(e){
			e.preventDefault();
			var target = $(this).attr('href').slice(1);
			$(this).parent().parent().find('#contentTab >div').hide();
			$(".tab-"+target).show();
		}

		var that = {};
		that.init = init;
		return that;
	}

	window.triptyk = window.triptyk || {};
	window.triptyk.basicUI = basicUI().init;

	triptyk.basicUI();

})(window,jQuery);