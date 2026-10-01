import React, { useState } from 'react';

export default function ImageCard({
  src,
  alt = 'Navratri Garba Celebration',
  className = '',
  imgClassName = '',
  fallbackGradient = 'linear-gradient(135deg, #1f0533 0%, #db2777 50%, #facc15 100%)',
  overlay = true,
  children,
}) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: hasError ? fallbackGradient : undefined,
      }}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-6 text-center text-white/90">
          <div className="space-y-2">
            <span className="text-3xl block">✨</span>
            <p className="font-heading font-semibold text-sm">{alt}</p>
          </div>
        </div>
      )}

      {overlay && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-t from-festival-dark/80 via-transparent to-transparent pointer-events-none" />
      )}

      {children && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
}
