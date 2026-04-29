import { useEffect, useRef, useState } from 'react';

const VIDEO_SOURCES = ['/Lounge.mp4', '/Campus.mp4', '/Speakeasy.mp4', '/Tower.mp4'];

const VIDEO_POSTERS = {
  '/Lounge.mp4': '/Lounge-poster.jpg',
  '/Campus.mp4': '/Campus-poster.jpg',
  '/Speakeasy.mp4': '/Speakeasy-poster.jpg',
  '/Tower.mp4': '/Tower-poster.jpg',
};

const FADE_DURATION_MS = 1000;
const FADE_THRESHOLD_SECONDS = 1;

function buildUpcomingQueue(currentSource) {
  const currentIndex = VIDEO_SOURCES.indexOf(currentSource);

  if (currentIndex < 0) {
    return [...VIDEO_SOURCES];
  }

  return VIDEO_SOURCES.map((_, offset) => {
    return VIDEO_SOURCES[(currentIndex + offset + 1) % VIDEO_SOURCES.length];
  });
}

function playVideo(video) {
  if (!video) return;

  const playPromise = video.play();

  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {});
  }
}

export function WorldVideoPreview() {
  const [bufferSources, setBufferSources] = useState(() => [
    VIDEO_SOURCES[0],
    VIDEO_SOURCES[1],
  ]);
  const [activeBuffer, setActiveBuffer] = useState(0);

  const videoRefs = [useRef(null), useRef(null)];
  const queueRef = useRef(buildUpcomingQueue(VIDEO_SOURCES[0]));
  const activeBufferRef = useRef(activeBuffer);
  const bufferSourcesRef = useRef(bufferSources);
  const isTransitioningRef = useRef(false);
  const transitionTimeoutRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  activeBufferRef.current = activeBuffer;
  bufferSourcesRef.current = bufferSources;

  const advanceToNextVideo = () => {
    if (isTransitioningRef.current) {
      return;
    }

    const outgoingBuffer = activeBufferRef.current;
    const incomingBuffer = outgoingBuffer === 0 ? 1 : 0;
    const incomingVideo = videoRefs[incomingBuffer].current;
    const incomingSource = bufferSourcesRef.current[incomingBuffer];

    if (!incomingVideo || !incomingSource) {
      return;
    }

    isTransitioningRef.current = true;
    incomingVideo.currentTime = 0;
    playVideo(incomingVideo);
    setActiveBuffer(incomingBuffer);

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      queueRef.current.shift();

      if (queueRef.current.length === 0) {
        queueRef.current = buildUpcomingQueue(incomingSource);
      }

      const outgoingVideo = videoRefs[outgoingBuffer].current;

      if (outgoingVideo) {
        outgoingVideo.pause();
        outgoingVideo.currentTime = 0;
      }

      setBufferSources((currentSources) => {
        const nextSources = [...currentSources];
        nextSources[outgoingBuffer] = queueRef.current[0] ?? incomingSource;
        return nextSources;
      });

      isTransitioningRef.current = false;
      transitionTimeoutRef.current = null;
    }, prefersReducedMotionRef.current ? 0 : FADE_DURATION_MS);
  };

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleEnded = (event) => {
      if (event.currentTarget === videoRefs[activeBufferRef.current].current) {
        advanceToNextVideo();
      }
    };

    const handleTimeUpdate = (event) => {
      if (prefersReducedMotionRef.current) {
        return;
      }

      const currentVideo = event.currentTarget;

      if (!(currentVideo instanceof HTMLVideoElement)) {
        return;
      }

      if (currentVideo !== videoRefs[activeBufferRef.current].current || !Number.isFinite(currentVideo.duration)) {
        return;
      }

      if (currentVideo.duration - currentVideo.currentTime <= FADE_THRESHOLD_SECONDS) {
        advanceToNextVideo();
      }
    };

    for (const videoRef of videoRefs) {
      videoRef.current?.addEventListener('ended', handleEnded);
      videoRef.current?.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      for (const videoRef of videoRefs) {
        videoRef.current?.removeEventListener('ended', handleEnded);
        videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  useEffect(() => {
    const activeVideo = videoRefs[activeBufferRef.current].current;
    const hiddenVideo = videoRefs[activeBufferRef.current === 0 ? 1 : 0].current;

    playVideo(activeVideo);

    if (hiddenVideo && !isTransitioningRef.current) {
      hiddenVideo.pause();
      hiddenVideo.currentTime = 0;
      hiddenVideo.load();
    }
  }, [bufferSources]);

  return (
    <div className="mock-world-preview" aria-label="Hive3 world previews">
      {bufferSources.map((source, index) => (
        <video
          key={index}
          ref={videoRefs[index]}
          src={source}
          muted
          autoPlay
          playsInline
          preload="auto"
          loop={false}
          poster={VIDEO_POSTERS[source]}
          className={`mock-world-video${activeBuffer === index ? ' is-active' : ''}`}
        />
      ))}
    </div>
  );
}
