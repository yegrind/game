import { useEffect, useRef } from "preact/hooks";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: any;
  width?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = "500px",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when Escape key is pressed
  useEffect(() => {
    function handleEscKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  // Prevent click propagation inside modal
  const handleContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  // When modal opens, prevent body scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        className="modal-container"
        onClick={handleContentClick}
        style={{
          width: width,
          maxWidth: "90%",
          maxHeight: "90vh",
          backgroundColor: "hsl(var(--b3, #2a303c))",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "hsl(var(--b2, #1d232a))",
            color: "hsl(var(--bc, #a6adba))",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "30px",
              height: "30px",
              borderRadius: "4px",
              color: "hsl(var(--bc, #a6adba))",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div
          className="modal-body"
          style={{
            padding: "16px",
            overflowY: "auto",
            maxHeight: "calc(90vh - 60px)" /* 60px for header */,
            backgroundColor: "hsl(var(--b3, #2a303c))",
            color: "hsl(var(--bc, #a6adba))",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
