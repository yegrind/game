import { useState, useEffect, useRef } from "preact/hooks";
import { createContext } from "preact";
import { useDispatch, useSelector } from "react-redux";
import { MenuButton } from "./sidebar/menu-button";
import { State } from "./store";
import { uiSlice } from "./store/ui";
import { Window } from "./window/window";
import { useT } from "./i18n";
import { Modal } from "./components/modal";
import { HelpModalContent } from "./components/help-modal";
import { SettingsModalContent } from "./components/settings-modal";
import clippyImage from "./public/images/help/clippy.webp";

export interface ModalState {
  isHelpOpen: boolean;
  isSettingsOpen: boolean;
}

// Create context for clippy visibility
export const ClippyContext = createContext({
  isClippyVisible: true,
  hideClippy: () => {},
});

// Clippy helper component to guide users to the help menu
interface ClippyHelperProps {
  isVisible: boolean;
  onDismiss: () => void;
}

function ClippyHelper({ isVisible, onDismiss }: ClippyHelperProps) {
  useEffect(() => {
    // Auto-hide after 20 seconds
    const timer = setTimeout(() => {
      onDismiss();
    }, 20000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  // Dismiss Clippy when clicked
  const handleDismiss = () => {
    onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-[10000] bottom-14 left-14"
      onClick={handleDismiss}
      style={{
        cursor: "pointer",
      }}
    >
      {/* Classic Office assistant speech bubble */}
      <div
        className="relative mb-2 p-3 bg-white rounded-lg shadow-lg"
        style={{
          maxWidth: "220px",
          border: "1px solid #888",
          background: "linear-gradient(to bottom, #fffceb, #fffefd)",
        }}
      >
        <p className="text-black text-sm font-medium">
          Click <b>Start→Help</b> to learn how to play!
        </p>
      </div>

      {/* Clippy image with rocking animation */}
      <img
        src={clippyImage}
        alt="Clippy helper"
        className="w-20 h-20 object-contain"
        style={{
          animation: "rockingMotion 2.5s ease-in-out infinite",
          transformOrigin: "bottom center",
        }}
      />

      <style>{`
        @keyframes rockingMotion {
          0% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
          100% { transform: rotate(-3deg); }
        }
      `}</style>
    </div>
  );
}

let currentWideScreen = uiSlice.getInitialState().wideScreen;
export function Ui() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hidden = useSelector((state: State) => state.ui.hidden);
  const theme = useSelector((state: State) => state.ui.theme);
  const dispatch = useDispatch();

  // Clippy visibility state
  const [clippyVisible, setClippyVisible] = useState(true);
  const hideClippy = () => setClippyVisible(false);

  // Modal state
  const [modalState, setModalState] = useState<ModalState>({
    isHelpOpen: false,
    isSettingsOpen: false,
  });

  // Modal handler functions
  const openHelpModal = () => {
    setModalState((prev) => ({ ...prev, isHelpOpen: true }));
  };

  const closeHelpModal = () => {
    setModalState((prev) => ({ ...prev, isHelpOpen: false }));
  };

  const openSettingsModal = () => {
    setModalState((prev) => ({ ...prev, isSettingsOpen: true }));
  };

  const closeSettingsModal = () => {
    setModalState((prev) => ({ ...prev, isSettingsOpen: false }));
  };

  // Make modal functions available globally
  useEffect(() => {
    window.openHelpModal = openHelpModal;
    window.openSettingsModal = openSettingsModal;

    return () => {
      delete window.openHelpModal;
      delete window.openSettingsModal;
    };
  }, []);

  useEffect(() => {
    if (hidden || rootRef === null || rootRef.current === null) {
      return;
    }

    const root = rootRef.current;
    function onResize() {
      const size = root.getBoundingClientRect().width;
      const wide = size > 640;
      if (wide !== currentWideScreen) {
        currentWideScreen = wide;
        dispatch(uiSlice.actions.setWideScreen(currentWideScreen));
      }
    }

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(root);
    window.addEventListener("resize", onResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [hidden, rootRef, dispatch]);

  if (hidden) {
    return null;
  }

  return (
    <ClippyContext.Provider
      value={{ isClippyVisible: clippyVisible, hideClippy }}
    >
      <div ref={rootRef} class="w-full h-full relative" data-theme={theme}>
        <Window />
        <MenuButton />
        <ClippyHelper isVisible={clippyVisible} onDismiss={hideClippy} />
        <Toast />
        <UpdateWsWarning />

        {/* Modals */}
        <Modal
          isOpen={modalState.isHelpOpen}
          onClose={closeHelpModal}
          title="Help"
          width="700px"
        >
          <HelpModalContent />
        </Modal>

        <Modal
          isOpen={modalState.isSettingsOpen}
          onClose={closeSettingsModal}
          title="Settings"
          width="500px"
        >
          <SettingsModalContent />
        </Modal>
      </div>
    </ClippyContext.Provider>
  );
}

// Add TypeScript definition
declare global {
  interface Window {
    openHelpModal?: () => void;
    openSettingsModal?: () => void;
  }
}

function Toast() {
  const toast = useSelector((state: State) => state.ui.toast);
  const intent = useSelector((state: State) => state.ui.toastIntent);
  const intentClass = intent === "panic" ? "error" : intent;

  if (toast === null) {
    return null;
  }

  let path = (
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  );

  if (intent === "warning") {
    path = (
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374
                    1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697
                    16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    );
  }

  if (intent === "error" || intent === "panic") {
    path = (
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    );
  }

  return (
    <div class="absolute right-10 bottom-10">
      <div
        class={
          "alert alert-" + intentClass + " text-" + intentClass + "-content"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          class="shrink-0 w-6 h-6"
        >
          {path}
        </svg>
        <span class="break-words">{toast}</span>
      </div>
    </div>
  );
}

function UpdateWsWarning() {
  const updateWsWarning = useSelector(
    (state: State) => state.ui.updateWsWarning
  );
  const t = useT();
  const dispatch = useDispatch();

  if (!updateWsWarning) {
    return null;
  }

  function fix() {
    window.open("https://dos.zone/download/", "_blank");
    dispatch(uiSlice.actions.updateWsWarning(false));
  }

  function close() {
    dispatch(uiSlice.actions.updateWsWarning(false));
  }

  return (
    <div class="absolute left-20 right-10 top-10 flex justify-center">
      <div class="alert w-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-error"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217
                    3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898
                    0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <span>{t("ws_outdated")}</span>
        <div>
          <button class="btn btn-sm btn-primary mr-2" onClick={fix}>
            {t("update")}
          </button>
          <button class="btn btn-sm" onClick={close}>
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
