import { useT } from "../i18n";
import { useSelector } from "react-redux";
import { State } from "../store";
import mobileTopButtonsImg from "../public/images/help/mobileTopButtons.png";
import mobileBottomButtonsImg from "../public/images/help/mobileBottomButtons.png";

// Mobile device detection based on the existing code in the project
const isMobileDevice = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(
  navigator.appVersion
);

export function HelpModalContent() {
  const t = useT();
  // Access mobile controls state from Redux store
  const mobileControls = useSelector(
    (state: State) => state.dos.mobileControls
  );

  // Determine if we should show mobile help (either mobile controls enabled or mobile device)
  const showMobileHelp = mobileControls || isMobileDevice;

  // Common main title
  const MainTitle = () => (
    <h1
      className="text-2xl font-bold mb-4"
      style={{ color: "hsl(var(--p, #570df8))" }}
    >
      How to Play Ye's Grind
    </h1>
  );

  // Mobile version of the help content
  const MobileHelpContent = () => (
    <>
      <MainTitle />
      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          Top Mobile Controls
        </h3>
        <img
          src={mobileTopButtonsImg}
          alt="Mobile top control buttons"
          className="w-full rounded-lg mb-4 shadow-md"
        />
      </section>

      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          Bottom Mobile Controls
        </h3>
        <img
          src={mobileBottomButtonsImg}
          alt="Mobile bottom control buttons"
          className="w-full rounded-lg mb-4 shadow-md"
        />
      </section>

      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          How to operate in-game menu
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>Use Escape key to access in-game menu.</li>
          <li>Use up/down arrows to make menu selection.</li>
          <li>Select the menu option.</li>
        </ul>
      </section>
    </>
  );

  // Desktop version of the help content
  const DesktopHelpContent = () => (
    <>
      <MainTitle />

      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          How to operate in-game menu
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>Use Escape key to access in-game menu.</li>
          <li>Use up/down arrows to make menu selection.</li>
          <li>Press Enter to select an item in the menu.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          How to play your first game (easy)
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>Select "New Game" on the in-game menu.</li>
          <li>Select "Knee-Deep in the Dead" as the episode.</li>
          <li>Select "I'm Too Young to Die" skill level.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          Cheat codes
        </h3>
        Unlock the ultimate edge with these slick shortcuts, because why grind when you can flex?
        <br />
        <br />
        <div className="overflow-x-auto">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid rgba(100,149,237,0.6)",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <th
                  style={{
                    padding: "10px 16px",
                    textAlign: "left",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  Cheat Code
                </th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  idkfa
                </td>
                <td style={{ padding: "8px 16px" }}>All weapons, ammo, keys and full armor</td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  iddqd
                </td>
                <td style={{ padding: "8px 16px" }}>God mode - makes you invincible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          Keyboard Controls
        </h3>
        These are the default controls unless you remap them in options -&gt;
        setup -&gt; key bindings.
        <br />
        <br />
        <div className="overflow-x-auto">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid rgba(100,149,237,0.6)",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <th
                  style={{
                    padding: "10px 16px",
                    textAlign: "left",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  Key
                </th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  arrow up (↑)
                </td>
                <td style={{ padding: "8px 16px" }}>Move forward</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  arrow down (↓)
                </td>
                <td style={{ padding: "8px 16px" }}>Move backward</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  arrow left (←)
                </td>
                <td style={{ padding: "8px 16px" }}>Turn left</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  arrow right (→)
                </td>
                <td style={{ padding: "8px 16px" }}>Turn right</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  'z' or left-mouse-button
                </td>
                <td style={{ padding: "8px 16px" }}>Fire weapon</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  Spacebar or right-mouse-button
                </td>
                <td style={{ padding: "8px 16px" }}>Open/Use</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  Alt (Windows) or Option (Mac) + arrow left/right
                </td>
                <td style={{ padding: "8px 16px" }}>Strafe</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  Shift + arrow keys
                </td>
                <td style={{ padding: "8px 16px" }}>Run</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  1-8
                </td>
                <td style={{ padding: "8px 16px" }}>Select weapon</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid rgba(100,149,237,0.6)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  Tab
                </td>
                <td style={{ padding: "8px 16px" }}>Show automap</td>
              </tr>
              <tr
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <td
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(100,149,237,0.6)",
                  }}
                >
                  Esc
                </td>
                <td style={{ padding: "8px 16px" }}>Access menu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          Using the mouse for moving player (instead of arrow keys)
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            Click on the game window to lock the mouse, so it stays in the game
            window.
          </li>
          <li>
            Mouse movements now control the movement of the player, forward,
            backward, left, right.
          </li>
          <li>Press Escape twice to unlock the mouse.</li>
          <li>
            Note that keyboard arrows will still work when mouse is locked, in
            case you are kind of a spaz.
          </li>
        </ul>
      </section>
    </>
  );

  return (
    <div className="help-modal-content">
      {showMobileHelp ? <MobileHelpContent /> : <DesktopHelpContent />}
    </div>
  );
}
