import { useT } from "../i18n";

export function HelpModalContent() {
  const t = useT();

  return (
    <div className="help-modal-content">
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: "hsl(var(--p, #570df8))" }}
      >
        Getting Started Guide
      </h2>

      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          How to Start the Game
        </h3>
        <ol className="list-decimal pl-6 mb-6 space-y-3">
          <li>
            Press{" "}
            <span
              className="font-mono px-1"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              Esc
            </span>{" "}
            to access the menu. Menu items are navigated with the up/down arrows
            on your keyboard. Press{" "}
            <span
              className="font-mono px-1"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              Enter
            </span>{" "}
            to select an item in the menu.
          </li>
          <li>
            Select "New Game" and press{" "}
            <span
              className="font-mono px-1"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              Enter
            </span>
            .
          </li>
          <li>
            Select the episode, I recommend starting with "Knee-Deep in the
            Dead".
          </li>
          <li>
            Select the skill level, I recommend starting with "I'm Too Young to
            Die".
          </li>
        </ol>
      </section>

      <section className="mt-6">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "hsl(var(--p, #570df8))" }}
        >
          Basic Controls
        </h3>
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
                  W or ↑
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
                  S or ↓
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
                  A or ←
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
                  D or →
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
                  Ctrl or LMB
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
                  Space
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
                  Alt or RMB
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
                  Shift
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
    </div>
  );
}
