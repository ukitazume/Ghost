/*global CodeMirror*/
import mobileUtils from 'ghost/utils/mobile-utils';
import createTouchEditor from 'ghost/assets/lib/touch-editor';

var setupMobileCodeMirror,
    TouchEditor,
    init;

setupMobileCodeMirror = function setupMobileCodeMirror() {
    var noop = function () {},
        key;

    for (key in CodeMirror) {
        if (CodeMirror.hasOwnProperty(key)) {
            CodeMirror[key] = noop;
        }
    }

    CodeMirror.fromTextArea = function (el, options) {
        return new TouchEditor(el, options);
    };

    CodeMirror.keyMap = { basic: {} };
};

init = function init() {
    if (mobileUtils.hasTouchScreen()) {
        $('body').addClass('touch-editor');

        // make editor tabs touch-to-toggle in portrait mode
        $('.floatingheader').on('touchstart', function () {
            $('.entry-markdown').toggleClass('active');
            $('.entry-preview').toggleClass('active');
        });

        Ember.touchEditor = true;
        mobileUtils.initFastClick();
        TouchEditor = createTouchEditor();
        setupMobileCodeMirror();
    }
};

export default {
    createIfMobile: init
};
