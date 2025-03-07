function __$styleInject(css) {
    if (!css) return;

    if (typeof window == 'undefined') return;
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');

    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

import React, { forwardRef, useState, useRef, useCallback, useEffect, useImperativeHandle, memo, useMemo } from 'react';
import AntModal from 'antd/es/modal';
import AntUpload from 'antd/es/upload';
import LocaleReceiver from 'antd/es/locale-provider/LocaleReceiver';
import AntSlider from 'antd/es/slider';
import Cropper from 'react-easy-crop';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var PREFIX = 'img-crop';
var INIT_ZOOM = 1;
var ZOOM_STEP = 0.1;
var INIT_ROTATE = 0;
var ROTATE_STEP = 1;
var MIN_ROTATE = -180;
var MAX_ROTATE = 180;

var EasyCrop = forwardRef(function (props, ref) {
    var cropperRef = props.cropperRef, image = props.image, aspect = props.aspect, shape = props.shape, grid = props.grid, zoom = props.zoom, rotate = props.rotate, minZoom = props.minZoom, maxZoom = props.maxZoom, cropperProps = props.cropperProps;
    var _a = useState({ x: 0, y: 0 }), crop = _a[0], onCropChange = _a[1];
    var _b = useState({ width: 0, height: 0 }), cropSize = _b[0], setCropSize = _b[1];
    var _c = useState(INIT_ZOOM), zoomVal = _c[0], setZoomVal = _c[1];
    var _d = useState(INIT_ROTATE), rotateVal = _d[0], setRotateVal = _d[1];
    var cropPixelsRef = useRef({ width: 0, height: 0, x: 0, y: 0 });
    var _e = useState({ width: 0, height: 0 }), mediaSizeNew = _e[0], setMediaSizeNew = _e[1];
    var onMediaLoaded = useCallback(function (mediaSize) {
        var width = mediaSize.width, height = mediaSize.height;
        setMediaSizeNew(mediaSize);
        var ratioWidth = height * aspect;
        if (width > ratioWidth) {
            setCropSize({ width: ratioWidth, height: height });
        }
        else {
            setCropSize({ width: width, height: width / aspect });
        }
    }, [aspect]);
    useEffect(function () {
        onMediaLoaded(mediaSizeNew);
    }, [aspect]);
    var onCropComplete = useCallback(function (croppedArea, croppedAreaPixels) {
        cropPixelsRef.current = croppedAreaPixels;
    }, []);
    useImperativeHandle(ref, function () { return ({
        rotateVal: rotateVal,
        setZoomVal: setZoomVal,
        setRotateVal: setRotateVal,
        cropPixelsRef: cropPixelsRef
    }); }, [rotateVal]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Cropper, __assign({}, cropperProps, { ref: cropperRef, image: image, crop: crop, cropSize: cropSize, onCropChange: onCropChange, aspect: aspect, cropShape: shape, showGrid: grid, zoomWithScroll: zoom, zoom: zoomVal, rotation: rotateVal, onZoomChange: setZoomVal, onRotationChange: setRotateVal, minZoom: minZoom, maxZoom: maxZoom, onMediaLoaded: onMediaLoaded, onCropComplete: onCropComplete, classes: { containerClassName: "".concat(PREFIX, "-container"), mediaClassName: "".concat(PREFIX, "-media") } })),
        zoom && (React.createElement("section", { className: "".concat(PREFIX, "-control ").concat(PREFIX, "-control-zoom") },
            React.createElement("button", { onClick: function () { return setZoomVal(zoomVal - ZOOM_STEP); }, disabled: zoomVal - ZOOM_STEP < minZoom }, "\uFF0D"),
            React.createElement(AntSlider, { min: minZoom, max: maxZoom, step: ZOOM_STEP, value: zoomVal, onChange: setZoomVal }),
            React.createElement("button", { onClick: function () { return setZoomVal(zoomVal + ZOOM_STEP); }, disabled: zoomVal + ZOOM_STEP > maxZoom }, "\uFF0B"))),
        rotate && (React.createElement("section", { className: "".concat(PREFIX, "-control ").concat(PREFIX, "-control-rotate") },
            React.createElement("button", { onClick: function () { return setRotateVal(rotateVal - ROTATE_STEP); }, disabled: rotateVal === MIN_ROTATE }, "\u21BA"),
            React.createElement(AntSlider, { min: MIN_ROTATE, max: MAX_ROTATE, step: ROTATE_STEP, value: rotateVal, onChange: setRotateVal }),
            React.createElement("button", { onClick: function () { return setRotateVal(rotateVal + ROTATE_STEP); }, disabled: rotateVal === MAX_ROTATE }, "\u21BB")))));
});
var EasyCrop$1 = memo(EasyCrop, function (_a, _b) {
    var prevImage = _a.image, prevAspect = _a.aspect;
    var image = _b.image, aspect = _b.aspect;
    return prevImage === image && prevAspect === aspect;
});

__$styleInject(".img-crop-modal .img-crop-container {\n  position: relative;\n  width: 100%;\n  height: 40vh;\n}\n.img-crop-modal .img-crop-control {\n  display: flex;\n  align-items: center;\n  width: 60%;\n  margin-left: auto;\n  margin-right: auto;\n}\n.img-crop-modal .img-crop-control:first-of-type {\n  margin-top: 16px;\n}\n.img-crop-modal .img-crop-control:last-of-type {\n  margin-bottom: -8px;\n}\n.img-crop-modal .img-crop-control button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 34px;\n  height: 34px;\n  padding: 0;\n  font-style: normal;\n  background: transparent;\n  border: 0;\n  outline: 0;\n  cursor: pointer;\n}\n.img-crop-modal .img-crop-control button[disabled] {\n  cursor: default;\n}\n.img-crop-modal .img-crop-control button + div:only-of-type {\n  flex: 1;\n  margin: 0 8px;\n}\n.img-crop-modal .img-crop-control-zoom button {\n  font-size: 18px;\n}\n.img-crop-modal .img-crop-control-rotate button {\n  font-size: 16px;\n}\n.img-crop-modal .img-crop-control-rotate button:first-of-type {\n  transform: rotate(-20deg);\n}\n.img-crop-modal .img-crop-control-rotate button:last-of-type {\n  transform: rotate(20deg);\n}\n");

var ImgCrop = forwardRef(function (props, ref) {
    var _a = props.aspect, aspect = _a === void 0 ? 1 : _a, _b = props.shape, shape = _b === void 0 ? 'rect' : _b, _c = props.grid, grid = _c === void 0 ? false : _c, _d = props.quality, quality = _d === void 0 ? 0.4 : _d, _e = props.fillColor, fillColor = _e === void 0 ? 'white' : _e, _f = props.zoom, zoom = _f === void 0 ? true : _f, _g = props.rotate, rotate = _g === void 0 ? false : _g, _h = props.minZoom, minZoom = _h === void 0 ? 1 : _h, _j = props.maxZoom, maxZoom = _j === void 0 ? 3 : _j, modalTitle = props.modalTitle, modalWidth = props.modalWidth, modalOk = props.modalOk, modalCancel = props.modalCancel, modalMaskTransitionName = props.modalMaskTransitionName, modalTransitionName = props.modalTransitionName, onModalOk = props.onModalOk, onModalCancel = props.onModalCancel, beforeCrop = props.beforeCrop, onUploadFail = props.onUploadFail, cropperProps = props.cropperProps, children = props.children, modalChildren = props.modalChildren, existingImageUrl = props.existingImageUrl, _k = props.onFinalCrop, onFinalCrop = _k === void 0 ? function () { } : _k;
    var cb = useRef({});
    cb.current.onModalOk = onModalOk;
    cb.current.onModalCancel = onModalCancel;
    cb.current.beforeCrop = beforeCrop;
    cb.current.onUploadFail = onUploadFail;
    /**
     * Upload
     */
    var _l = useState(''), image = _l[0], setImage = _l[1];
    var fileRef = useRef();
    var beforeUploadRef = useRef();
    var resolveRef = useRef();
    var rejectRef = useRef();
    useEffect(function () {
        if (existingImageUrl) {
            setImage(existingImageUrl);
        }
    }, [existingImageUrl]);
    var uploadComponent = useMemo(function () {
        var upload = Array.isArray(children) ? children[0] : children;
        var _a = upload.props, beforeUpload = _a.beforeUpload, accept = _a.accept, restUploadProps = __rest(_a, ["beforeUpload", "accept"]);
        beforeUploadRef.current = beforeUpload;
        return __assign(__assign({}, upload), { props: __assign(__assign({}, restUploadProps), { accept: accept || 'image/*', beforeUpload: function (file, fileList) {
                    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                        var shouldCrop, reader;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!cb.current.beforeCrop) return [3 /*break*/, 2];
                                    return [4 /*yield*/, cb.current.beforeCrop(file, fileList)];
                                case 1:
                                    shouldCrop = _a.sent();
                                    if (!shouldCrop)
                                        return [2 /*return*/, reject()];
                                    _a.label = 2;
                                case 2:
                                    fileRef.current = file;
                                    resolveRef.current = function (newFile) {
                                        var _a, _b;
                                        (_b = (_a = cb.current).onModalOk) === null || _b === void 0 ? void 0 : _b.call(_a, newFile);
                                        resolve(newFile);
                                    };
                                    rejectRef.current = function (uploadErr) {
                                        var _a, _b;
                                        (_b = (_a = cb.current).onUploadFail) === null || _b === void 0 ? void 0 : _b.call(_a, uploadErr);
                                        reject();
                                    };
                                    reader = new FileReader();
                                    reader.addEventListener('load', function () {
                                        if (typeof reader.result === 'string') {
                                            setImage(reader.result);
                                        }
                                    });
                                    reader.readAsDataURL(file);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                } }) });
    }, [children]);
    /**
     * Crop
     */
    var easyCropRef = useRef({});
    /**
     * Modal
     */
    var modalProps = useMemo(function () {
        var obj = {
            width: modalWidth,
            okText: modalOk,
            cancelText: modalCancel,
            maskTransitionName: modalMaskTransitionName,
            transitionName: modalTransitionName
        };
        Object.keys(obj).forEach(function (key) {
            if (!obj[key])
                delete obj[key];
        });
        return obj;
    }, [modalCancel, modalMaskTransitionName, modalOk, modalTransitionName, modalWidth]);
    var onClose = function () {
        setImage('');
        easyCropRef.current.setZoomVal(INIT_ZOOM);
        easyCropRef.current.setRotateVal(INIT_ROTATE);
    };
    var onCancel = useCallback(function () {
        var _a, _b;
        (_b = (_a = cb.current).onModalCancel) === null || _b === void 0 ? void 0 : _b.call(_a);
        onClose();
    }, []);
    var onOk = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var canvas, ctx, imgSource, _a, cropWidth, cropHeight, cropX, cropY, imgWidth, imgHeight, angle, sine, cosine, squareWidth, squareHeight, squareHalfWidth, squareHalfHeight, imgX, imgY, imgData, _b, type, name, uid;
        return __generator(this, function (_c) {
            onClose();
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            imgSource = document.querySelector(".".concat(PREFIX, "-media"));
            _a = easyCropRef.current.cropPixelsRef.current, cropWidth = _a.width, cropHeight = _a.height, cropX = _a.x, cropY = _a.y;
            if (existingImageUrl) {
                onFinalCrop({
                    width: cropWidth,
                    height: cropHeight,
                    x: cropX,
                    y: cropY,
                    url: existingImageUrl,
                    shape: shape
                });
                return [2 /*return*/];
            }
            if (rotate && easyCropRef.current.rotateVal !== INIT_ROTATE) {
                imgWidth = imgSource.naturalWidth, imgHeight = imgSource.naturalHeight;
                angle = easyCropRef.current.rotateVal * (Math.PI / 180);
                sine = Math.abs(Math.sin(angle));
                cosine = Math.abs(Math.cos(angle));
                squareWidth = imgWidth * cosine + imgHeight * sine;
                squareHeight = imgHeight * cosine + imgWidth * sine;
                canvas.width = squareWidth;
                canvas.height = squareHeight;
                ctx.fillStyle = fillColor;
                ctx.fillRect(0, 0, squareWidth, squareHeight);
                squareHalfWidth = squareWidth / 2;
                squareHalfHeight = squareHeight / 2;
                ctx.translate(squareHalfWidth, squareHalfHeight);
                ctx.rotate(angle);
                ctx.translate(-squareHalfWidth, -squareHalfHeight);
                imgX = (squareWidth - imgWidth) / 2;
                imgY = (squareHeight - imgHeight) / 2;
                ctx.drawImage(imgSource, 0, 0, imgWidth, imgHeight, imgX, imgY, imgWidth, imgHeight);
                imgData = ctx.getImageData(0, 0, squareWidth, squareHeight);
                canvas.width = cropWidth;
                canvas.height = cropHeight;
                ctx.putImageData(imgData, -cropX, -cropY);
            }
            else {
                canvas.width = cropWidth;
                canvas.height = cropHeight;
                ctx.fillStyle = fillColor;
                ctx.fillRect(0, 0, cropWidth, cropHeight);
                ctx.drawImage(imgSource, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
            }
            _b = fileRef.current, type = _b.type, name = _b.name, uid = _b.uid;
            canvas.toBlob(function (blob) { return __awaiter(void 0, void 0, void 0, function () {
                var newFile, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newFile = Object.assign(new File([blob], name, { type: type }), { uid: uid });
                            if (!beforeUploadRef.current) {
                                return [2 /*return*/, resolveRef.current(newFile)];
                            }
                            return [4 /*yield*/, beforeUploadRef.current(newFile, [newFile])];
                        case 1:
                            result = _a.sent();
                            if (result === true) {
                                return [2 /*return*/, resolveRef.current(newFile)];
                            }
                            if (result === false) {
                                return [2 /*return*/, rejectRef.current(new Error('beforeUpload return false'))];
                            }
                            delete newFile[AntUpload.LIST_IGNORE];
                            if (result === AntUpload.LIST_IGNORE) {
                                Object.defineProperty(newFile, AntUpload.LIST_IGNORE, {
                                    value: true,
                                    configurable: true
                                });
                                return [2 /*return*/, rejectRef.current(new Error('beforeUpload return LIST_IGNORE'))];
                            }
                            if (typeof result === 'object' && result !== null) {
                                return [2 /*return*/, resolveRef.current(result)];
                            }
                            return [2 /*return*/];
                    }
                });
            }); }, type, quality);
            return [2 /*return*/];
        });
    }); }, [existingImageUrl, rotate, quality, onFinalCrop, shape, fillColor]);
    var getComponent = function (titleOfModal) { return (React.createElement(React.Fragment, null,
        uploadComponent,
        image && (React.createElement(AntModal, __assign({ visible: true, wrapClassName: "".concat(PREFIX, "-modal"), title: titleOfModal, onOk: onOk, onCancel: onCancel, maskClosable: false, destroyOnClose: true }, modalProps),
            modalChildren,
            React.createElement(EasyCrop$1, { ref: easyCropRef, cropperRef: ref, image: image, aspect: aspect, shape: shape, grid: grid, zoom: zoom, rotate: rotate, minZoom: minZoom, maxZoom: maxZoom, cropperProps: cropperProps }))))); };
    if (modalTitle)
        return getComponent(modalTitle);
    return (React.createElement(LocaleReceiver, null, function (locale, code) { return getComponent(code === 'zh-cn' ? '编辑图片' : 'Edit image'); }));
});

export { ImgCrop as default };
