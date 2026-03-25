export function TrailerModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="trailer-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Hive3 trailer"
      onClick={onClose}
    >
      <div className="trailer-modal" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="trailer-modal-close"
          aria-label="Close trailer"
          onClick={onClose}
        >
          ×
        </button>

        <video
          className="trailer-video"
          src="/hive 3 clip_2_with_endcard.mov"
          controls
          autoPlay
          playsInline
        >
          Your browser does not support the trailer video.
        </video>
      </div>
    </div>
  )
}
