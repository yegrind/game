import { useEffect, useRef, useState } from "preact/hooks";
import { useDispatch, useSelector } from "react-redux";
import { Frame } from "./frame/frame";
import { SideBar } from "./sidebar/sidebar";
import { State } from "./store";
import { uiSlice } from "./store/ui";
import { Window } from "./window/window";
import { useT } from "./i18n";

// Component for temporary help prompt pointing to the sidebar help button
function HelpPrompt() {
    const [hasBeenClicked, setHasBeenClicked] = useState(false); // Default to false to show initially
    const [isVisible, setIsVisible] = useState(false);
    const [sidebarHelpPosition, setSidebarHelpPosition] = useState(165); // Higher initial position
    
    // Function to find and set the help button position
    const updateHelpButtonPosition = () => {
        // Look for either the custom-pulse class or any help button
        const helpButton = document.querySelector('[title="Getting Started - Click for help"]');
        if (helpButton) {
            const rect = helpButton.getBoundingClientRect();
            // Use the center of the button, account for the marginTop (80px)
            setSidebarHelpPosition(rect.top + rect.height/2);
        }
    };
    
    // Show the prompt after a short delay
    useEffect(() => {
        const timer = setTimeout(() => {
            updateHelpButtonPosition();
            setIsVisible(true);
        }, 1500); // Show after 1.5 seconds
        
        return () => clearTimeout(timer);
    }, []);
    
    // Update position on resize
    useEffect(() => {
        if (isVisible && !hasBeenClicked) {
            const handleResize = () => {
                updateHelpButtonPosition();
            };
            
            window.addEventListener('resize', handleResize);
            
            // Check position again after DOM may have settled
            const positionCheck = setTimeout(updateHelpButtonPosition, 500);
            
            return () => {
                window.removeEventListener('resize', handleResize);
                clearTimeout(positionCheck);
            };
        }
    }, [isVisible, hasBeenClicked]);
    
    // Listen for help button clicks
    useEffect(() => {
        const handleHelpClick = () => {
            setHasBeenClicked(true);
            setIsVisible(false);
        };
        
        // Use a custom event to communicate between components
        window.addEventListener("helpButtonClicked", handleHelpClick);
        
        return () => {
            window.removeEventListener("helpButtonClicked", handleHelpClick);
        };
    }, []);
    
    // Close the prompt when clicked
    const handleClose = () => {
        setIsVisible(false);
    };
    
    if (hasBeenClicked || !isVisible) return null;
    
    return (
        <div 
            class="fixed left-16 z-50 animate-fadeIn max-w-xs sm:max-w-sm"
            style={{ top: `${sidebarHelpPosition}px`, transform: 'translateY(-50%)', marginTop: '0px' }}
        >
            <div class="bg-blue-500 text-white p-3 rounded-lg shadow-lg relative">
                {/* Close button */}
                <button 
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    onClick={handleClose}
                >
                    ×
                </button>
                
                {/* Content */}
                <div class="font-bold mb-1">New to Kanye's Quest?</div>
                <p class="text-sm">Click this button to learn how to play.</p>
                
                {/* Arrow pointing left */}
                <div class="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 flex">
                    <svg width="14" height="20" viewBox="0 0 14 20" fill="#3b82f6">
                        <path d="M0 10L14 0V20Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

let currentWideScreen = uiSlice.getInitialState().wideScreen;
export function Ui() {
    const rootRef = useRef<HTMLDivElement>(null);
    const hidden = useSelector((state: State) => state.ui.hidden);
    const theme = useSelector((state: State) => state.ui.theme);
    const dispatch = useDispatch();

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

    return <div
        ref={rootRef}
        class="w-full h-full relative"
        data-theme={theme}>
        <Window />
        <Frame />
        <SideBar />
        <Toast />
        <UpdateWsWarning />
        <HelpPrompt />
    </div>;
};

function Toast() {
    const toast = useSelector((state: State) => state.ui.toast);
    const intent = useSelector((state: State) => state.ui.toastIntent);
    const intentClass = intent === "panic" ? "error" : intent;

    if (toast === null) {
        return null;
    }

    let path = <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>;

    if (intent === "warning") {
        path = <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374
                    1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697
                    16.126ZM12 15.75h.007v.008H12v-.008Z" />;
    }

    if (intent === "error" || intent === "panic") {
        path = <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />;
    }

    return <div class="absolute right-10 bottom-10">
        <div class={ "alert alert-" + intentClass + " text-" + intentClass + "-content" }>
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                class="shrink-0 w-6 h-6">
                {path}
            </svg>
            <span class="break-words">{toast}</span>
        </div>
    </div>;
}

function UpdateWsWarning() {
    const updateWsWarning = useSelector((state: State) => state.ui.updateWsWarning);
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

    return <div class="absolute left-20 right-10 top-10 flex justify-center">
        <div class="alert w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-6 text-error">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217
                    3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898
                    0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <span>{t("ws_outdated")}</span>
            <div>
                <button class="btn btn-sm btn-primary mr-2" onClick={fix}>{t("update")}</button>
                <button class="btn btn-sm" onClick={close}>{t("close")}</button>
            </div>
        </div>
    </div>;
}
