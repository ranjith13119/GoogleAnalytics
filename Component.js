//Load the Google Analytics library
(function (i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function () {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o), m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

sap.ui.define([
	"sap/ui/core/Component"
], function (Component) {
	"use strict";

	return Component.extend("gaportalplugin.Component", {

		init: function () {
			//Pull the Google Analytics tracking ID from the target mapping configuration
			var sAppID = this.getComponentData().config.GA_App

			//Make sure a tracking ID is maintained
			if (sAppID) {
				//Initalize the tracker
				ga('create', sAppID, 'auto');

				//Called after the plugin is loaded
				ga('send', 'pageview', {
					'page': location.pathname + this.cleanHash(location.hash)
				});

				//Called when the hash is changed
				$(window).hashchange(function () {
					ga('send', 'pageview', {
						'page': location.pathname + this.cleanHash(location.hash)
					});
				}.bind(this));
			}
		},

		cleanHash: function (sHash) {
			//Remove Guids and numbers from the hash to provide clean data
			//TODO:Remove everything between single quotes
			return sHash.replace(/((\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1})|(\d)/g,
				"");
		}

	});
});
/*sap.ui.define([
	"sap/ui/core/Component",
	"sap/m/Button",
	"sap/m/Bar",
	"sap/m/MessageToast"
], function (Component, Button, Bar, MessageToast) {

	return Component.extend("gaportalplugin.Component", {

		metadata: {
			"manifest": "json"
		},

		init: function () {
			var rendererPromise = this._getRenderer();

rendererPromise.then(function (oRenderer) {
	oRenderer.setFooterControl("sap.m.Bar", {
		id: "myFooter",
		contentLeft: [new Button({
			text: "Important Information",
			press: function () {
				MessageToast.show("This SAP Fiori Launchpad has been extended to improve your experience");
			}
		})]
	});
});

},
_getRenderer: function () {
var that = this,
oDeferred = new jQuery.Deferred(),
oRenderer;

that._oShellContainer = jQuery.sap.getObject("sap.ushell.Container");
if (!that._oShellContainer) {
oDeferred.reject(
	"Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");
} else {
oRenderer = that._oShellContainer.getRenderer();
if (oRenderer) {
	oDeferred.resolve(oRenderer);
} else {
	// renderer not initialized yet, listen to rendererCreated event
	that._onRendererCreated = function (oEvent) {
		oRenderer = oEvent.getParameter("renderer");
		if (oRenderer) {
			oDeferred.resolve(oRenderer);
		} else {
			oDeferred.reject("Illegal state: shell renderer not available after recieving 'rendererLoaded' event.");
		}
	};
	that._oShellContainer.attachRendererCreatedEvent(that._onRendererCreated);
}
}
return oDeferred.promise();
}
});
}); * /