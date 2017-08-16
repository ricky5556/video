(function(MODULE) {
	MODULE.VideoController = function(el, config) {
		this.init(el, config);
	};

	MODULE.VideoController.prototype = (function() {
		var _defaults = {
			url: "",
			title: "Sample Video Title"
		};
		return {
			init: function(el, config) {
				var that = this;
				that.$el = el;
				that.opts = Object.assign({}, _defaults, config);

				if(Hls.isSupported()) {
			        that.player = that.$el;
			        that.hls = new Hls();
			        that.hls.loadSource(that.opts.url);
			        that.hls.attachMedia(that.player);
			        that.hls.on(Hls.Events.MANIFEST_PARSED,function() {
					    document.getElementsByClassName("js-video_loader")[0].style.display = "none";
					    that.hlsLevels = that.hls.levels;

					});
			    }

			},
			play: function() {
				this.onBeforeMediaPlay();
				this.player.play();
				this.onAfterMediaPlay();

			},
			pause: function() {
				this.player.pause();
				console.log(this.hls.currentLevel);
			},
			onBeforeMediaPlay: function() {
				// trigger before media begins to play
			},
			onAfterMediaPlay: function() {
				// trigger after media begins to play
			},
			getLevels: function(level) {
				var that = this,
					container = document.getElementsByClassName("level_cont")[0];

				container.innerHTML = "";
				this.hlsLevels.forEach(function(item, i) {
					var str = "<span class='level_item' data-level=" + i +"> " + item.name + " </span> ";
					container.insertAdjacentHTML('beforeend', str)
				});

				container.addEventListener("click", function(e) {
					var level = e.target.dataset.level;

					level = level ? parseInt(level, 10) : that.hls.currentLevel;
					that.setLevel(level);
					//vc[action] && typeof vc[action] === "function" && vc[action]();
				});

			},
			setLevel: function(level) {
				var that = this;
				if(this.hls.currentLevel !== level) {
					this.hls.currentLevel = level;
				}
			},
			setNextLevel: function(level) {
				if(this.hls.nextLevel && this.hls.nextLevel !== level) {
					this.hls.nextLevel = level;
				}
			}
		}
	}());
}(VideoPlayer));