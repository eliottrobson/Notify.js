/*!
 * Notify.js
 * Notify.js is a sleek and powerful toast generator built on CSS3 for a smooth,
 * dependency free customizable experience.
 *
 * @version 1.0.1
 * @author Eliott Robson, https://eliottrobson.me
 * @link https://github.com/eliottrobson/notify.js
 */
var Notify = (function () {
    function Notify() {
    }
    Notify.info = function (message, options) {
        return this.create("info", message, options);
    };
    Notify.success = function (message, options) {
        return this.create("success", message, options);
    };
    Notify.warning = function (message, options) {
        return this.create("warning", message, options);
    };
    Notify.error = function (message, options) {
        return this.create("error", message, options);
    };
    Notify.create = function (type, message, options) {
        if (!this.container) {
            this.container = document.createElement("div");
            this.container.id = "notify-container";
            document.body.appendChild(this.container);
        }
        var defaults = {
            sticky: this.sticky,
            lifespan: this.lifespan
        };
        var settings = {
            type: type,
            message: message,
            options: Object.assign({}, defaults, options)
        };
        return new Notify.Notification(settings);
    };
    return Notify;
}());
Notify.animation = 300;
Notify.sticky = false;
Notify.lifespan = 3000;
(function (Notify) {
    var Notification = (function () {
        function Notification(settings) {
            var _this = this;
            this.stuck = false;
            this.closing = false;
            this.notification = document.createElement("div");
            this.notification.className = "notify-notification notify-" + settings.type;
            this.notification.innerText = settings.message;
            if (settings.options.sticky) {
                this.sticky();
            }
            var push = Notify.container.children.length > 0 ? 2 : 1;
            if (!this.stuck) {
                this.timer = setTimeout(function () {
                    _this.close();
                }, (Notify.animation * push) + settings.options.lifespan);
            }
            Notify.container.appendChild(this.notification);
        }
        Notification.prototype.sticky = function () {
            var _this = this;
            if (this.stuck)
                return;
            this.notification.className += " notify-sticky";
            this.closeButton = document.createElement("div");
            this.closeButton.className = "notify-close";
            this.closeButton.addEventListener("click", function (event) {
                _this.close();
            });
            this.notification.appendChild(this.closeButton);
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.stuck = true;
            return this;
        };
        Notification.prototype.close = function () {
            var _this = this;
            if (this.closing)
                return;
            var actions = ["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"];
            actions.forEach(function (action) {
                _this.notification.addEventListener(action, function (event) {
                    var element = event.target;
                    element.parentElement.removeChild(element);
                });
            });
            this.notification.className += " notify-exit";
            this.closing = true;
            return this;
        };
        return Notification;
    }());
    Notify.Notification = Notification;
})(Notify || (Notify = {}));
if (typeof Object.assign !== "function") {
    Object.assign = function (target, varArgs) {
        "use strict";
        if (target == null) {
            throw new TypeError("Cannot convert undefined or null to object");
        }
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
            if (nextSource != null) {
                for (var nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}
