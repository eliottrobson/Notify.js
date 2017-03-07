/*!
 * Notify.js
 * Notify.js is a sleek and powerful toast generator built on CSS3 for a smooth,
 * dependency free customizable experience.
 *
 * @version 1.0.1
 * @author Eliott Robson, https://eliottrobson.me
 * @link https://github.com/eliottrobson/notify.js
 */

type INotifyType = "info" | "success" | "warning" | "error";

interface INotifyOptions {
    sticky?: boolean;
    lifespan?: number;
}

interface INotifySettings {
    type: INotifyType;
    message: string;
    options: INotifyOptions;
}

class Notify {
    public static animation: number = 300;
    public static container: HTMLDivElement;

    public static sticky: boolean = false;
    public static lifespan: number = 3000;

    static info(message: string, options?: INotifyOptions) {
        return this.create("info", message, options);
    }

    static success(message: string, options?: INotifyOptions) {
        return this.create("success", message, options);
    }

    static warning(message: string, options?: INotifyOptions) {
        return this.create("warning", message, options);
    }

    static error(message: string, options?: INotifyOptions) {
        return this.create("error", message, options);
    }

    private static create(type: INotifyType, message: string, options?: INotifyOptions) {
        if (!this.container) {
            this.container = document.createElement("div");
            this.container.id = "notify-container";

            document.body.appendChild(this.container);
        }

        let defaults: INotifyOptions = {
            sticky: this.sticky,
            lifespan: this.lifespan
        };

        let settings = {
            type,
            message,
            options: Object.assign({}, defaults, options)
        };

        return new Notify.Notification(settings);
    }
}

namespace Notify {
    export class Notification {
        private notification: HTMLDivElement;
        private closeButton: HTMLDivElement;
        private timer: number;

        private stuck = false;
        private closing = false;

        constructor(settings: INotifySettings) {
            this.notification = document.createElement("div");
            this.notification.className = `notify-notification notify-${settings.type}`;
            this.notification.innerText = settings.message;

            if (settings.options.sticky) {
                this.sticky();
            }

            let push = Notify.container.children.length > 0 ? 2 : 1;

            if (!this.stuck) {
                this.timer = setTimeout(() => {
                    this.close();
                }, (Notify.animation * push) + settings.options.lifespan);
            }

            Notify.container.appendChild(this.notification);
        }

        sticky() {
            if (this.stuck) return;

            this.notification.className += ` notify-sticky`;

            this.closeButton = document.createElement("div");
            this.closeButton.className = "notify-close";

            this.closeButton.addEventListener("click", event => {
                this.close();
            });

            this.notification.appendChild(this.closeButton);

            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.stuck = true;

            return this;
        }

        close() {
            if (this.closing) return;

            let actions = ["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"];

            actions.forEach(action => {
                this.notification.addEventListener(action, event => {
                    let element = <HTMLDivElement> event.target;
                    element.parentElement.removeChild(element);
                });
            });

            this.notification.className += " notify-exit";

            this.closing = true;

            return this;
        }
    }
}

// Polyfill
declare interface ObjectConstructor {
    assign(...objects: Object[]): Object;
}

if (typeof Object.assign !== "function") {
    Object.assign = function(target, varArgs) { // .length of function is 2
        "use strict";
        if (target == null) { // TypeError if undefined or null
            throw new TypeError("Cannot convert undefined or null to object");
        }

        let to = Object(target);

        for (let index = 1; index < arguments.length; index++) {
            let nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
                for (let nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }

        return to;
    };
}
