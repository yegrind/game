import { useState, useEffect, useRef } from "preact/hooks";
import { useDispatch, useSelector, useStore } from "react-redux";
import { State, Store } from "../store";
import { uiSlice } from "../store/ui";
import { browserSetFullScreen } from "../host/fullscreen";
import "./menu.css";

// Define interface for MenuButton props
interface MenuButtonProps {
  onClick?: () => void;
  isActive?: boolean;
}

// Define window.props interface
declare global {
  interface Window {
    openHelpModal?: () => void;
    openSettingsModal?: () => void;
    props?: {
      stop?: () => void;
      getVersion?: () => string;
      [key: string]: any;
    };
    showExitMessage?: () => void;
    ci?: any;
    emulatorStarted?: boolean;
    gameRunning?: boolean;
  }
}

// Preload gradient background
const preloadGradient = () => {
  // Create an element to preload the gradient
  const preloadEl = document.createElement("div");
  preloadEl.style.position = "absolute";
  preloadEl.style.opacity = "0.01";
  preloadEl.style.pointerEvents = "none";
  preloadEl.style.background =
    "linear-gradient(to bottom, #aebcce 0%, #8399b8 100%), linear-gradient(to bottom, #c9d5e2 0%, #94aac9 100%)";
  preloadEl.style.backgroundSize = "100% 50%, 100% 50%";
  preloadEl.style.backgroundPosition = "top, bottom";
  preloadEl.style.width = "2px";
  preloadEl.style.height = "2px";
  document.body.appendChild(preloadEl);

  // Create an image for Windows logo preloading
  const preloadWinLogo = document.createElement("div");
  preloadWinLogo.style.position = "absolute";
  preloadWinLogo.style.opacity = "0.01";
  preloadWinLogo.style.pointerEvents = "none";
  preloadWinLogo.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1" height="1">
      <rect x="1" y="1" width="10" height="10" fill="#ff0000" />
      <rect x="13" y="1" width="10" height="10" fill="#00ff00" />
      <rect x="1" y="13" width="10" height="10" fill="#0000ff" />
      <rect x="13" y="13" width="10" height="10" fill="#ffff00" />
    </svg>
  `;
  document.body.appendChild(preloadWinLogo);

  // Remove after a short time
  setTimeout(() => {
    document.body.removeChild(preloadEl);
    document.body.removeChild(preloadWinLogo);
  }, 1500);

  return true;
};

// Create a single instance of the preload flag
let gradientPreloaded = false;

export function MenuButton({ onClick, isActive }: MenuButtonProps = {}) {
  const [menuOpen, setMenuOpen] = useState(isActive || false);
  const [buttonReady, setButtonReady] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const store = useStore() as Store;
  const fullScreen = useSelector((state: State) => state.ui.fullScreen);

  // Update menuOpen state when isActive prop changes
  useEffect(() => {
    if (isActive !== undefined) {
      setMenuOpen(isActive);
    }
  }, [isActive]);

  // Ensure proper button initialization
  useEffect(() => {
    // Only preload once across all instances
    if (!gradientPreloaded) {
      gradientPreloaded = preloadGradient();
    }

    // Initial styling before the timer completes
    if (buttonRef.current) {
      // Set explicit initial styles to prevent flashing
      buttonRef.current.style.opacity = "0";
      buttonRef.current.style.visibility = "hidden";
      buttonRef.current.style.background =
        "linear-gradient(to bottom, #aebcce 0%, #8399b8 100%)";
    }

    // Multi-stage initialization for more reliable rendering
    // Stage 1: Short delay for initial style application
    const initialTimer = setTimeout(() => {
      if (buttonRef.current) {
        // Force repaint of background gradient
        const currentDisplay = buttonRef.current.style.display;
        buttonRef.current.style.display = "none";
        void buttonRef.current.offsetHeight; // Trigger reflow
        buttonRef.current.style.display = currentDisplay || "flex";
      }
    }, 50);

    // Stage 2: Main initialization with longer delay
    const mainTimer = setTimeout(() => {
      setButtonReady(true);

      // Apply final visibility after state is updated
      if (buttonRef.current) {
        requestAnimationFrame(() => {
          if (buttonRef.current) {
            buttonRef.current.style.visibility = "visible";
            buttonRef.current.style.opacity = "1";
          }
        });
      }
    }, 200); // Increased from 150ms to 200ms for reliability

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  // Toggle menu open/closed
  const toggleMenu = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);

    // Call provided onClick handler if available
    if (onClick) {
      onClick();
    }
  };

  // Close menu when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuOpen &&
      (e.target as HTMLElement).closest(".menu-container") === null
    ) {
      setMenuOpen(false);

      // Call provided onClick handler to sync parent state if available
      if (onClick && isActive) {
        onClick();
      }
    }
  };

  // Add/remove event listener when menu opens/closes
  useEffect(() => {
    // Only handle click outside events if we're controlling our own state
    if (isActive === undefined && menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, isActive]);

  // Help button handler
  const handleHelpClick = () => {
    if (window.openHelpModal) {
      window.openHelpModal();
    }
    setMenuOpen(false);

    // Call provided onClick handler to sync parent state if available
    if (onClick && isActive) {
      onClick();
    }
  };

  // Fullscreen button handler
  const handleFullscreenClick = () => {
    browserSetFullScreen(!fullScreen, store);
    setMenuOpen(false);

    // Call provided onClick handler to sync parent state if available
    if (onClick && isActive) {
      onClick();
    }
  };

  // Settings button handler
  const handleSettingsClick = () => {
    if (window.openSettingsModal) {
      window.openSettingsModal();
    }
    setMenuOpen(false);

    // Call provided onClick handler to sync parent state if available
    if (onClick && isActive) {
      onClick();
    }
  };

  // Shutdown button handler
  const handleShutdownClick = () => {
    try {
      // Try to stop the emulator if props is available
      if (window.props && typeof window.props.stop === "function") {
        try {
          console.log("Stopping emulator with props.stop()");
          window.props.stop();
        } catch (e) {
          console.error("Error stopping emulator:", e);
        }
      }

      // If we have showExitMessage function available, use it
      if (window.showExitMessage) {
        window.showExitMessage();
        setMenuOpen(false);

        // Call provided onClick handler to sync parent state if available
        if (onClick && isActive) {
          onClick();
        }
        return;
      }

      // Fallbacks if showExitMessage is not available

      // Attempt to call window.close() directly
      window.close();

      // If we have access to the exit message element directly
      const exitMessage = document.getElementById("exit-message");
      if (exitMessage) {
        exitMessage.style.display = "block";
      }
    } catch (e) {
      console.error("Failed to close window:", e);
    }
    setMenuOpen(false);

    // Call provided onClick handler to sync parent state if available
    if (onClick && isActive) {
      onClick();
    }
  };

  // Use isActive prop if provided, otherwise use internal state
  const showMenu = isActive !== undefined ? isActive : menuOpen;

  return (
    <div class="menu-container">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        class={`start-button ${buttonReady ? "menu-mounted" : "menu-hidden"}`}
        title="Start"
        style={{
          opacity: 0, // Start completely hidden
          visibility: "hidden", // Ensure initially hidden
          background: "linear-gradient(to bottom, #aebcce 0%, #8399b8 100%)",
          transition: "opacity 0.3s ease", // Smoother transition
        }}
      >
        <svg
          class="windows-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <rect x="1" y="1" width="10" height="10" fill="#ff0000" />
          <rect x="13" y="1" width="10" height="10" fill="#00ff00" />
          <rect x="1" y="13" width="10" height="10" fill="#0000ff" />
          <rect x="13" y="13" width="10" height="10" fill="#ffff00" />
        </svg>
        <span>Start</span>
      </button>

      {showMenu && (
        <div class="menu-popup">
          <div class="menu-item" onClick={handleHelpClick}>
            <div class="menu-icon">
              <div class="win98-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
            </div>
            <div class="menu-text">Help</div>
          </div>
          <div class="menu-item" onClick={handleFullscreenClick}>
            <div class="menu-icon">
              <div class="win98-icon">
                {!fullScreen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="square"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="0"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="square"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                )}
              </div>
            </div>
            <div class="menu-text">Fullscreen</div>
          </div>
          <div class="menu-item" onClick={handleSettingsClick}>
            <div class="menu-icon">
              <div class="win98-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="square"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
            </div>
            <div class="menu-text">Settings</div>
          </div>
          <div class="menu-item shutdown-item" onClick={handleShutdownClick}>
            <div class="menu-icon">
              <div class="win98-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                  <line x1="12" y1="2" x2="12" y2="12"></line>
                </svg>
              </div>
            </div>
            <div class="menu-text">Shut Down</div>
          </div>
        </div>
      )}
    </div>
  );
}
