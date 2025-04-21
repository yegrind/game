import {
  MirroredControls,
  MobileControls,
  MouseCapture,
  SystemCursor,
  PauseCheckbox,
} from "./dos-option-checkbox";
import {
  ImageRenderingSelect,
  RenderAspectSelect,
  ThemeSelect,
} from "./dos-option-select";
import {
  MouseSensitiviySlider,
  ScaleControlsSlider,
  VolumeSlider,
} from "./dos-option-slider";

export function SettingsModalContent() {
  return (
    <div
      className="settings-modal-content"
      style={{ color: "hsl(var(--bc, #a6adba))" }}
    >
      <div
        className="settings-container"
        style={{ display: "grid", gap: "16px" }}
      >
        <div className="setting-section" style={{ padding: "8px 0" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "hsl(var(--p, #570df8))",
            }}
          >
            Game Options
          </h3>
          <div style={{ display: "grid", gap: "12px" }}>
            <PauseCheckbox />
            <SystemCursor />
            <MouseCapture />
          </div>
        </div>

        <div className="setting-section" style={{ padding: "8px 0" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "hsl(var(--p, #570df8))",
            }}
          >
            Control Options
          </h3>
          <div style={{ display: "grid", gap: "12px" }}>
            <MobileControls />
            <MirroredControls />
            <ScaleControlsSlider />
            <MouseSensitiviySlider />
            <VolumeSlider />
          </div>
        </div>

        <div className="setting-section" style={{ padding: "8px 0" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "hsl(var(--p, #570df8))",
            }}
          >
            Display Options
          </h3>
          <div style={{ display: "grid", gap: "16px" }}>
            <RenderAspectSelect multiline={true} />
            <ImageRenderingSelect multiline={true} />
            <ThemeSelect multiline={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
