(function(MODULE, undefined) {

	MODULE.Home = function(el) {
		this.init(el);
	};

	MODULE.Home.prototype = (function() {
		var _getVideoConfig = function(el) {
			if(el) {
				return {
					url: el.dataset["url"],
					title: el.dataset["title"]
				}
			}
		},
		_attachEvents = function($controls, vc) {
			$controls.addEventListener("click", function(e) {
				var action = e.target.dataset.action;
				vc[action] && typeof vc[action] === "function" && vc[action]();
			});
		};
		return {
			init: function(el) {
				var that = this,
				els = el.querySelectorAll("video");
				els.forEach(function(o,i,a) {
					var config = _getVideoConfig(o);

					if(config) {
						that.vc = new MODULE.VideoController(o, config);
					}
				});

				_attachEvents(el.querySelector(".js-vp_controls"), that.vc)
			}
		}
	}())

}(VideoPlayer))