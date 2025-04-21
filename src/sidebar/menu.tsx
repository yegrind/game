import React, { useState, useEffect, useRef } from "react";
import { MenuButton } from "./menu-button";
import "./menu.css";

// Menu item icons
import dosDiskIcon from "../../images/win98/dos-disk.png";
import shutdownIcon from "../../images/win98/shutdown.png";
import aboutIcon from "../../images/win98/help-book.png";
import documentsIcon from "../../images/win98/documents.png";
import emulatorIcon from "../../images/win98/emulation.png";
import settingsIcon from "../../images/win98/settings.png";

interface MenuProps {
  onDosDiskClick: () => void;
  onEmulatorClick: () => void;
  onDocumentationClick: () => void;
  onAboutClick: () => void;
  onSettingsClick: () => void;
  onShutdownClick: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  onDosDiskClick,
  onEmulatorClick,
  onDocumentationClick,
  onAboutClick,
  onSettingsClick,
  onShutdownClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set mounted state after a short delay to ensure proper transitions
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    // Add event listener to close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timer);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };

  return (
    <div
      className={`menu-container ${isMounted ? "menu-mounted" : "menu-hidden"}`}
      ref={menuRef}
    >
      <MenuButton onClick={toggleMenu} isActive={isOpen} />

      {isOpen && (
        <div className="menu-popup">
          <div
            className="menu-item"
            onClick={() => handleMenuItemClick(onDosDiskClick)}
          >
            <div className="menu-icon">
              <img src={dosDiskIcon} alt="DOS Disk" className="win98-icon" />
            </div>
            <div className="menu-text">DOS Disk</div>
          </div>

          <div
            className="menu-item"
            onClick={() => handleMenuItemClick(onEmulatorClick)}
          >
            <div className="menu-icon">
              <img src={emulatorIcon} alt="Emulator" className="win98-icon" />
            </div>
            <div className="menu-text">Emulator</div>
          </div>

          <div
            className="menu-item"
            onClick={() => handleMenuItemClick(onDocumentationClick)}
          >
            <div className="menu-icon">
              <img
                src={documentsIcon}
                alt="Documentation"
                className="win98-icon"
              />
            </div>
            <div className="menu-text">Documentation</div>
          </div>

          <div
            className="menu-item"
            onClick={() => handleMenuItemClick(onSettingsClick)}
          >
            <div className="menu-icon">
              <img src={settingsIcon} alt="Settings" className="win98-icon" />
            </div>
            <div className="menu-text">Settings</div>
          </div>

          <div
            className="menu-item"
            onClick={() => handleMenuItemClick(onAboutClick)}
          >
            <div className="menu-icon">
              <img src={aboutIcon} alt="About" className="win98-icon" />
            </div>
            <div className="menu-text">About</div>
          </div>

          <div
            className="menu-item shutdown-item"
            onClick={() => handleMenuItemClick(onShutdownClick)}
          >
            <div className="menu-icon">
              <img src={shutdownIcon} alt="Shutdown" className="win98-icon" />
            </div>
            <div className="menu-text">Shut Down</div>
          </div>
        </div>
      )}
    </div>
  );
};
