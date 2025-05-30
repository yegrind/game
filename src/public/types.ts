export type DosEvent = "emu-ready" | "ci-ready" | "bnd-play" | "open-key" | "fullscreen-change";
export type ImageRendering = "pixelated" | "smooth";
export type RenderBackend = "webgl" | "canvas";
export type RenderAspect = "AsIs" | "1/1" | "5/4" | "4/3" | "16/10" | "16/9" | "Fit";


export type InitBundleEntry = Uint8Array;
export interface InitFileEntry {
    path: string;
    contents: Uint8Array;
}
export type InitFsEntry = InitBundleEntry | InitFileEntry;
export type InitFs = InitFsEntry | InitFsEntry[];

export interface NamedHost {
    name: string,
    host: string,
}

export interface DosOptions {
    url: string,
    dosboxConf: string,
    jsdosConf: any,
    initFs: InitFs,
    background: string,
    pathPrefix: string,
    theme: "light" | "dark" | "cupcake" | "bumblebee" | "emerald" | "corporate" |
    "synthwave" | "retro" | "cyberpunk" | "valentine" | "halloween" | "garden" |
    "forest" | "aqua" | "lofi" | "pastel" | "fantasy" | "wireframe" | "black" |
    "luxury" | "dracula" | "cmyk" | "autumn" | "business" | "acid" | "lemonade" |
    "night" | "coffee" | "winter",
    lang: "ru" | "en",
    backend: "dosbox" | "dosboxX",
    backendLocked: boolean,
    backendHardware: ((backend: "dosbox" | "dosboxX", sockdriveNative: boolean) => Promise<string | null>),
    workerThread: boolean,
    mouseCapture: boolean,
    onEvent: (event: DosEvent, arg?: any /* CommandInterface | boolean */) => void,
    ipx: NamedHost[],
    ipxBackend: string,
    room: string,
    fullScreen: boolean,
    sockdriveBackend: NamedHost,
    autoStart: boolean,
    kiosk: boolean,
    imageRendering: ImageRendering,
    renderBackend: RenderBackend,
    renderAspect: RenderAspect,
    noNetworking: boolean,
    noCloud: boolean,
    cloudSaves: boolean,
    scaleControls: number,
    mouseSensitivity: number,
    noCursor: boolean,
    softKeyboardLayout: string[] | string[][][],
    softKeyboardSymbols: {[key: string]: string}[],
    volume: number,
    key: string,
    softFullscreen: boolean,
}

export interface DosProps {
    getVersion(): [string, string];
    getToken(): string | null;

    setTheme(theme: DosOptions["theme"]): void;
    setLang(lang: DosOptions["lang"]): void;
    setBackend(backend: DosOptions["backend"]): void;
    setBackendLocked(locked: boolean): void;
    setWorkerThread(capture: DosOptions["workerThread"]): void;
    setMouseCapture(capture: DosOptions["mouseCapture"]): void;
    setIpx(ipx: DosOptions["ipx"]): void;
    setIpxBackend(backend: string): void;
    setRoom(room: DosOptions["room"]): void;
    setFrame(frame: "network"): void;
    setBackground(background: string | null): void;
    setFullScreen(fullScreen: boolean): void;
    setAutoStart(autoStart: boolean): void;
    setKiosk(kiosk: boolean): void;
    setImageRendering(rendering: ImageRendering): void;
    setRenderBackend(backend: RenderBackend): void;
    setRenderAspect(aspect: RenderAspect): void;
    setNoNetworking(noNetworking: boolean): void;
    setNoCloud(noCloud: boolean): void;
    setCloudSaves(cloudSaves: boolean): void;
    setPaused(pause: boolean): void;
    setScaleControls(scaleControls: number): void;
    setMouseSensitivity(mouseSensitivity: number): void;
    setNoCursor(noCursor: boolean): void;
    setSoftKeyboardLayout(layout: string[] | string[][][]): void;
    setSoftKeyboardSymbols(symbols: {[key: string]: string}[]): void;
    setVolume(volume: number): void;
    setKey(key: string | null): void;
    setSoftFullscreen(softFullscreen: boolean): void;

    save(): Promise<boolean>;
    stop(): Promise<void>;
}

export type DosFn = (element: HTMLDivElement, options: Partial<DosOptions>) => DosProps;

// declare const Dos: DosFn;
