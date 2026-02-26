import { useState, useRef } from 'react';

interface AnimatedImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

/**
 * AnimatedImage – shows a ripple + scale-up animation when tapped/clicked.
 */
export const AnimatedImage = ({ src, alt, className = '', style, onClick }: AnimatedImageProps) => {
    const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);
    const [pressed, setPressed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPressed(true);
        setRipple({ x, y, id: Date.now() });
        setTimeout(() => setPressed(false), 300);
        setTimeout(() => setRipple(null), 600);
    };

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden cursor-pointer select-none transition-colors duration-500 ${!isLoaded ? 'skeleton' : 'bg-transparent'} ${className}`}
            style={style}
            onClick={(e) => {
                handleClick(e);
                onClick?.();
            }}
        >
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ease-out hover:scale-110 active:scale-95 ${pressed ? 'brightness-110' : 'brightness-100'} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
            />
            {ripple && (
                <span
                    key={ripple.id}
                    className="absolute pointer-events-none rounded-full bg-white/40 animate-ripple"
                    style={{
                        width: 80,
                        height: 80,
                        left: ripple.x - 40,
                        top: ripple.y - 40,
                    }}
                />
            )}
        </div>
    );
};
