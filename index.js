(function () {
    'use strict';

    var DEVICE = {
        ID: {
            VENDOR: 0x2123,
            PRODUCT: 0x1010
        },

        CMD: {
            UP: 0x02,
            DOWN: 0x01,
            LEFT: 0x04,
            RIGHT: 0x08,
            FIRE: 0x10,
            STOP: 0x20
        }
    };

    var usb = require('usb/usb.js');

    var launcher = usb.findByIds(DEVICE.ID.VENDOR, DEVICE.ID.PRODUCT);

    if (launcher === undefined) {
        throw 'Launcher not found - make sure your Thunder Missile Launcher is plugged in to a USB port';
    }

    launcher.open();

    var launcherInterface = launcher.interfaces[0];
    if (launcherInterface.isKernelDriverActive()) {
        launcherInterface.detachKernelDriver();
    }
    launcherInterface.claim();
    process.on('exit', exit);

    function signal(cmd) {
        launcher.controlTransfer(0x21, 0x09, 0x0, 0x0, new Buffer([0x02, cmd, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
    }

    function exit() {
        launcherInterface.release(function () {
            launcherInterface.attachkernalDriver();
            launcher.close();
        });
    }

    var controller = {};

    controller.up = controller.u = function () {
        signal(DEVICE.CMD.UP);
    };

    controller.down = controller.d = function () {
        signal(DEVICE.CMD.DOWN);
    };

    controller.left = controller.l = function () {
        signal(DEVICE.CMD.LEFT);
    };

    controller.right = controller.r = function () {
        signal(DEVICE.CMD.RIGHT);
    };

    controller.stop = controller.s = function () {
        signal(DEVICE.CMD.STOP);
    };

    controller.fire = controller.f = function () {
        signal(DEVICE.CMD.FIRE);
    };

    module.exports = controller;
})();