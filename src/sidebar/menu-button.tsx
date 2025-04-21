import { useState, useEffect } from "preact/hooks";
import { useDispatch, useSelector, useStore } from "react-redux";
import { State, Store } from "../store";
import { uiSlice } from "../store/ui";
import { browserSetFullScreen } from "../host/fullscreen";
import "./menu.css";

// Add global window property declarations
declare global {
  interface Window {
    openHelpModal?: () => void;
    openSettingsModal?: () => void;
    showExitMessage?: () => void;
    ci?: any;
    emulatorStarted?: boolean;
    gameRunning?: boolean;
  }
}

export function MenuButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const store = useStore() as Store;
  const fullScreen = useSelector((state: State) => state.ui.fullScreen);

  // Toggle menu open/closed
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuOpen &&
      (e.target as HTMLElement).closest(".menu-container") === null
    ) {
      setMenuOpen(false);
    }
  };

  // Add/remove event listener when menu opens/closes
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Help button handler
  const handleHelpClick = () => {
    if (window.openHelpModal) {
      window.openHelpModal();
    }
    setMenuOpen(false);
  };

  // Fullscreen button handler
  const handleFullscreenClick = () => {
    browserSetFullScreen(!fullScreen, store);
    setMenuOpen(false);
  };

  // Settings button handler
  const handleSettingsClick = () => {
    if (window.openSettingsModal) {
      window.openSettingsModal();
    }
    setMenuOpen(false);
  };

  // Shutdown button handler
  const handleShutdownClick = () => {
    try {
      // Attempt to call window.close() directly
      window.close();

      // If we're still here, try alternative methods
      // Show the exit message if it exists
      if (window.showExitMessage) {
        window.showExitMessage();
      }

      // If we have access to the exit message element directly
      const exitMessage = document.getElementById("exit-message");
      if (exitMessage) {
        exitMessage.style.display = "block";
      }
    } catch (e) {
      console.error("Failed to close window:", e);
    }
    setMenuOpen(false);
  };

  return (
    <div class="menu-container">
      <button onClick={toggleMenu} class="start-button" title="Start">
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

      {menuOpen && (
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
