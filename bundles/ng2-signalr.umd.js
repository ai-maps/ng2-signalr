(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/Subject'), require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', 'rxjs/Subject', '@angular/core'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['ng2-signalr'] = global.ng['ng2-signalr'] || {}),global.rxjs_Subject,global.ng.core));
}(this, (function (exports,rxjs_Subject,_angular_core) { 'use strict';

var __extends = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BroadcastEventListener = (function (_super) {
    __extends(BroadcastEventListener, _super);
    /**
     * @param {?} event
     */
    function BroadcastEventListener(event) {
        _super.call(this);
        this.event = event;
        if (event == null || event === '') {
            throw new Error('Failed to create BroadcastEventListener. Argument \'event\' can not be empty');
        }
    }
    return BroadcastEventListener;
}(rxjs_Subject.Subject));

var SignalRConnectionMock = (function () {
    /**
     * @param {?} _mockErrors$
     * @param {?} _mockStatus$
     * @param {?} _listeners
     */
    function SignalRConnectionMock(_mockErrors$, _mockStatus$, _listeners) {
        this._mockErrors$ = _mockErrors$;
        this._mockStatus$ = _mockStatus$;
        this._listeners = _listeners;
    }
    Object.defineProperty(SignalRConnectionMock.prototype, "errors", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mockErrors$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMock.prototype, "status", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mockStatus$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMock.prototype, "id", {
        /**
         * @return {?}
         */
        get: function () {
            return 'xxxxxxxx-xxxx-xxxx-xxxxxxxxx';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SignalRConnectionMock.prototype.stop = function () {
    };
    /**
     * @return {?}
     */
    SignalRConnectionMock.prototype.start = function () {
        return Promise.resolve(null); // TODO: implement
    };
    /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    SignalRConnectionMock.prototype.invoke = function (method) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        return Promise.resolve(null);
    };
    /**
     * @param {?} listener
     * @return {?}
     */
    SignalRConnectionMock.prototype.listen = function (listener) {
        this._listeners[listener.event] = listener;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SignalRConnectionMock.prototype.listenFor = function (event) {
        var /** @type {?} */ listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    };
    return SignalRConnectionMock;
}());

var SignalRConnectionMockManager = (function () {
    function SignalRConnectionMockManager() {
        this._errors$ = new rxjs_Subject.Subject();
        this._status$ = new rxjs_Subject.Subject();
        this._listeners = {};
        this._object = new SignalRConnectionMock(this._errors$, this._status$, this._listeners);
    }
    Object.defineProperty(SignalRConnectionMockManager.prototype, "mock", {
        /**
         * @return {?}
         */
        get: function () {
            return this._object;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMockManager.prototype, "errors$", {
        /**
         * @return {?}
         */
        get: function () {
            return this._errors$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMockManager.prototype, "status$", {
        /**
         * @return {?}
         */
        get: function () {
            return this._status$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMockManager.prototype, "listeners", {
        /**
         * @return {?}
         */
        get: function () {
            return this._listeners;
        },
        enumerable: true,
        configurable: true
    });
    return SignalRConnectionMockManager;
}());

var ConnectionStatus = (function () {
    /**
     * @param {?} value
     */
    function ConnectionStatus(value) {
        if (value == null || value < 0) {
            throw new Error("Failed to create ConnectionStatus. Argument 'name' can not be null or empty.");
        }
        this._value = value;
    }
    Object.defineProperty(ConnectionStatus.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatus.prototype, "name", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatus.names[Number.parseInt(this._value.toString())];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectionStatus.prototype.toString = function () {
        return this.name;
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ConnectionStatus.prototype.equals = function (other) {
        if (other == null) {
            return false;
        }
        return this._value === other.value;
    };
    ConnectionStatus.names = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];
    return ConnectionStatus;
}());

var ConnectionStatuses = (function () {
    function ConnectionStatuses() {
    }
    Object.defineProperty(ConnectionStatuses, "connecting", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatuses.statuses[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "connected", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatuses.statuses[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "reconnecting", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatuses.statuses[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "disconnected", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatuses.statuses[3];
        },
        enumerable: true,
        configurable: true
    });
    ConnectionStatuses.statuses = [
        new ConnectionStatus(0),
        new ConnectionStatus(1),
        new ConnectionStatus(2),
        new ConnectionStatus(4)
    ];
    return ConnectionStatuses;
}());

var SignalRConnection = (function () {
    /**
     * @param {?} jConnection
     * @param {?} jProxy
     * @param {?} zone
     * @param {?} configuration
     */
    function SignalRConnection(jConnection, jProxy, zone, configuration) {
        this._jProxy = jProxy;
        this._jConnection = jConnection;
        this._zone = zone;
        this._errors = this.wireUpErrorsAsObservable();
        this._status = this.wireUpStatusEventsAsObservable();
        this._configuration = configuration;
    }
    Object.defineProperty(SignalRConnection.prototype, "errors", {
        /**
         * @return {?}
         */
        get: function () {
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnection.prototype, "status", {
        /**
         * @return {?}
         */
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SignalRConnection.prototype.start = function () {
        var _this = this;
        var /** @type {?} */ jTransports = this.convertTransports(this._configuration.transport);
        var /** @type {?} */ $promise = new Promise(function (resolve, reject) {
            _this._jConnection
                .start({
                jsonp: _this._configuration.jsonp,
                transport: jTransports,
                withCredentials: _this._configuration.withCredentials,
            })
                .done(function () {
                console.log('Connection established, ID: ' + _this._jConnection.id);
                console.log('Connection established, Transport: ' + _this._jConnection.transport.name);
                resolve(_this);
            })
                .fail(function (error) {
                console.log('Could not connect');
                reject('Failed to connect. Error: ' + error.message); // ex: Error during negotiation request.
            });
        });
        return $promise;
    };
    /**
     * @return {?}
     */
    SignalRConnection.prototype.stop = function () {
        this._jConnection.stop();
    };
    Object.defineProperty(SignalRConnection.prototype, "id", {
        /**
         * @return {?}
         */
        get: function () {
            return this._jConnection.id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    SignalRConnection.prototype.invoke = function (method) {
        var _this = this;
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        if (method == null) {
            throw new Error('SignalRConnection: Failed to invoke. Argument \'method\' can not be null');
        }
        this.log("SignalRConnection. Start invoking '" + method + "'...");
        var /** @type {?} */ $promise = new Promise(function (resolve, reject) {
            (_a = _this._jProxy).invoke.apply(_a, [method].concat(parameters))
                .done(function (result) {
                _this.log("'" + method + "' invoked succesfully. Resolving promise...");
                resolve(result);
                _this.log("Promise resolved.");
            })
                .fail(function (err) {
                console.log("Invoking '" + method + "' failed. Rejecting promise...");
                reject(err);
                console.log("Promise rejected.");
            });
            var _a;
        });
        return $promise;
    };
    /**
     * @param {?} listener
     * @return {?}
     */
    SignalRConnection.prototype.listen = function (listener) {
        var _this = this;
        if (listener == null) {
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        }
        this.log("SignalRConnection: Starting to listen to server event with name " + listener.event);
        this._jProxy.on(listener.event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _this._zone.run(function () {
                var /** @type {?} */ casted = null;
                if (args.length === 1) {
                    casted = (args[0]);
                }
                else if (args.length > 1) {
                    casted = (args);
                }
                _this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(casted);
                _this.log('listener next() called.');
            });
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SignalRConnection.prototype.listenFor = function (event) {
        if (event == null || event === '') {
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        }
        var /** @type {?} */ listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    };
    /**
     * @param {?} transports
     * @return {?}
     */
    SignalRConnection.prototype.convertTransports = function (transports) {
        if (transports instanceof Array) {
            return transports.map(function (t) { return t.name; });
        }
        return transports.name;
    };
    /**
     * @return {?}
     */
    SignalRConnection.prototype.wireUpErrorsAsObservable = function () {
        var /** @type {?} */ sError = new rxjs_Subject.Subject();
        this._jConnection.error(function (error) {
            //this._zone.run(() => {  /*errors don't need to run in a  zone*/
            sError.next(error);
            //});
        });
        return sError;
    };
    /**
     * @return {?}
     */
    SignalRConnection.prototype.wireUpStatusEventsAsObservable = function () {
        var _this = this;
        var /** @type {?} */ sStatus = new rxjs_Subject.Subject();
        // aggregate all signalr connection status handlers into 1 observable.
        // handler wire up, for signalr connection status callback.
        this._jConnection.stateChanged(function (change) {
            _this._zone.run(function () {
                sStatus.next(new ConnectionStatus(change.newState));
            });
        });
        return sStatus;
    };
    /**
     * @param {?} listener
     * @param {...?} args
     * @return {?}
     */
    SignalRConnection.prototype.onBroadcastEventReceived = function (listener) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
        var /** @type {?} */ casted = null;
        if (args.length > 0) {
            casted = (args[0]);
        }
        this._zone.run(function () {
            listener.next(casted);
        });
        this.log('listener next() called.');
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    SignalRConnection.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (this._jConnection.logging === false) {
            return;
        }
        console.log(args.join(', '));
    };
    return SignalRConnection;
}());

var ConnectionTransport = (function () {
    /**
     * @param {?} name
     */
    function ConnectionTransport(name) {
        if (name == null || name === "") {
            throw new Error("Failed to create ConnectionTransport. Argument 'name' can not be null or empty.");
        }
        this._name = name;
    }
    Object.defineProperty(ConnectionTransport.prototype, "name", {
        /**
         * @return {?}
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectionTransport.prototype.toString = function () {
        return this._name;
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ConnectionTransport.prototype.equals = function (other) {
        if (other == null) {
            return false;
        }
        return this._name === other.name;
    };
    return ConnectionTransport;
}());

var ConnectionTransports = (function () {
    function ConnectionTransports() {
    }
    Object.defineProperty(ConnectionTransports, "foreverFrame", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionTransports.transports[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "longPolling", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionTransports.transports[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "serverSentEvents", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionTransports.transports[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "webSockets", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionTransports.transports[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "auto", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionTransports.transports[4];
        },
        enumerable: true,
        configurable: true
    });
    ConnectionTransports.transports = [
        new ConnectionTransport("foreverFrame"),
        new ConnectionTransport("longPolling"),
        new ConnectionTransport("serverSentEvents"),
        new ConnectionTransport("webSockets"),
        new ConnectionTransport("auto"),
    ];
    return ConnectionTransports;
}());

var SignalRConfiguration = (function () {
    function SignalRConfiguration() {
        this.hubName = null;
        this.logging = false;
        this.qs = null;
        this.url = null;
        this.jsonp = false;
        this.withCredentials = false;
        this.transport = ConnectionTransports.auto;
    }
    return SignalRConfiguration;
}());

var SignalR = (function () {
    /**
     * @param {?} configuration
     * @param {?} zone
     * @param {?} jHubConnectionFn
     */
    function SignalR(configuration, zone, jHubConnectionFn) {
        this._configuration = configuration;
        this._zone = zone;
        this._jHubConnectionFn = jHubConnectionFn;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    SignalR.prototype.createConnection = function (options) {
        var /** @type {?} */ status;
        var /** @type {?} */ configuration = this.merge(options ? options : {});
        try {
            var /** @type {?} */ serializedQs = JSON.stringify(configuration.qs);
            var /** @type {?} */ serializedTransport = JSON.stringify(configuration.transport);
            if (configuration.logging) {
                console.log("Creating connecting with...");
                console.log("configuration:[url: '" + configuration.url + "'] ...");
                console.log("configuration:[hubName: '" + configuration.hubName + "'] ...");
                console.log("configuration:[qs: '" + serializedQs + "'] ...");
                console.log("configuration:[transport: '" + serializedTransport + "'] ...");
            }
        }
        catch (err) { }
        // create connection object
        var /** @type {?} */ jConnection = this._jHubConnectionFn(configuration.url);
        jConnection.logging = configuration.logging;
        jConnection.qs = configuration.qs;
        // create a proxy
        var /** @type {?} */ jProxy = jConnection.createHubProxy(configuration.hubName);
        // !!! important. We need to register at least one function otherwise server callbacks will not work.
        jProxy.on('noOp', function () { });
        var /** @type {?} */ hubConnection = new SignalRConnection(jConnection, jProxy, this._zone, configuration);
        return hubConnection;
    };
    /**
     * @param {?=} options
     * @return {?}
     */
    SignalR.prototype.connect = function (options) {
        return this.createConnection(options).start();
    };
    /**
     * @param {?} overrides
     * @return {?}
     */
    SignalR.prototype.merge = function (overrides) {
        var /** @type {?} */ merged = new SignalRConfiguration();
        merged.hubName = overrides.hubName || this._configuration.hubName;
        merged.url = overrides.url || this._configuration.url;
        merged.qs = overrides.qs || this._configuration.qs;
        merged.logging = this._configuration.logging;
        merged.jsonp = overrides.jsonp || this._configuration.jsonp;
        merged.withCredentials = overrides.withCredentials || this._configuration.withCredentials;
        merged.transport = overrides.transport || this._configuration.transport;
        return merged;
    };
    SignalR.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    SignalR.ctorParameters = function () { return [
        { type: SignalRConfiguration, },
        { type: _angular_core.NgZone, },
        { type: Function, },
    ]; };
    return SignalR;
}());

var SIGNALR_CONFIGURATION = new _angular_core.OpaqueToken('SIGNALR_CONFIGURATION');
/**
 * @param {?} configuration
 * @param {?} zone
 * @return {?}
 */
function createSignalr(configuration, zone) {
    var /** @type {?} */ jConnectionFn = getJConnectionFn();
    return new SignalR(configuration, zone, jConnectionFn);
}
/**
 * @return {?}
 */
function getJConnectionFn() {
    var /** @type {?} */ jQuery = getJquery();
    var /** @type {?} */ hubConnectionFn = ((window)).jQuery.hubConnection;
    if (hubConnectionFn == null) {
        throw new Error('Signalr failed to initialize. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
    }
    return hubConnectionFn;
}
/**
 * @return {?}
 */
function getJquery() {
    var /** @type {?} */ jQuery = ((window)).jQuery;
    if (jQuery == null) {
        throw new Error('Signalr failed to initialize. Script \'jquery.js\' is missing. Please make sure to include jquery script.');
    }
    return jQuery;
}
var SignalRModule = (function () {
    function SignalRModule() {
    }
    /**
     * @param {?} getSignalRConfiguration
     * @return {?}
     */
    SignalRModule.forRoot = function (getSignalRConfiguration) {
        return {
            ngModule: SignalRModule,
            providers: [
                {
                    provide: SIGNALR_CONFIGURATION,
                    useFactory: getSignalRConfiguration
                },
                {
                    deps: [SIGNALR_CONFIGURATION, _angular_core.NgZone],
                    provide: SignalR,
                    useFactory: (createSignalr)
                }
            ],
        };
    };
    /**
     * @return {?}
     */
    SignalRModule.forChild = function () {
        throw new Error("forChild method not implemented");
    };
    SignalRModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    providers: [{
                            provide: SignalR,
                            useValue: SignalR
                        }]
                },] },
    ];
    /** @nocollapse */
    SignalRModule.ctorParameters = function () { return []; };
    return SignalRModule;
}());

/**
 * Angular library starter.
 * Build a library compatible with Angular, AoT compilation & Tree shaking.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/ng2-signalr
 */
/**
 * Entry point for all public APIs of the package.
 */

exports.SignalRConnectionMock = SignalRConnectionMock;
exports.SignalRConnectionMockManager = SignalRConnectionMockManager;
exports.ConnectionStatus = ConnectionStatus;
exports.ConnectionStatuses = ConnectionStatuses;
exports.BroadcastEventListener = BroadcastEventListener;
exports.SignalRConnection = SignalRConnection;
exports.ConnectionTransport = ConnectionTransport;
exports.ConnectionTransports = ConnectionTransports;
exports.SignalR = SignalR;
exports.SignalRConfiguration = SignalRConfiguration;
exports.SignalRModule = SignalRModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
