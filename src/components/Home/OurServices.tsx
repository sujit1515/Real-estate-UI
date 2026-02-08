"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef, useMemo } from "react"

export default function ScrollHorizontal() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Calculate the correct horizontal scroll distance
    const totalDistance = useMemo(() => {
        // We need to move from first item centered to last item centered
        // Subtract one item width because we start with first item centered
        return (items.length - 1) * (ITEM_WIDTH + GAP)
    }, [])

    const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

    return (
        <div id="example">
            <section className="intro-section ">
                <div className="intro-content">
                    <h1 className="impact">Our Services</h1>
                    <p className="subtitle">
                        Your complete real estate solution partner
                    </p>
                    <div className="services-tagline">
                        Buy • Sell • Rent • Renovate • Design
                    </div>
                </div>
            </section>

            <div ref={containerRef} className="scroll-container">
                <div className="sticky-wrapper">
                    <div className="gallery-start-position"></div>
                    <motion.div className="gallery" style={{ x }}>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="gallery-item"
                                style={
                                    {
                                        "--item-color": item.color,
                                        "--item-image": `url(${item.image})`,
                                    } as React.CSSProperties
                                }
                            >
                                <div className="item-content">
                                    <span className="item-number">0{item.id}</span>
                                    <h2>{item.label}</h2>
                                    <p className="item-description">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <section className="outro-sectionc bg-[#1a1a2e]">
                <div className="outro-content">
                    <h2 className="outro-title">Ready to Begin Your Journey?</h2>
                    <p className="outro-description">
                        Contact us today for personalized assistance with all your real estate needs.
                    </p>
                    <button className="outro-button">
                        Get Free Consultation
                    </button>
                </div>
            </section>

            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
    return (
        <style>{`
            body {
                overflow-x: hidden;
                background: #1a1a2e;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            #example {
                height: auto;
                overflow: visible;
            }

            /* Intro Section Styles */
            .intro-section {
                height: 60vh;
                min-height: 500px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 40px 20px;
                background: linear-gradient(135deg, #1a1a2e 0%, #2a1b69 100%);
                position: relative;
                overflow: hidden;
            }

            .intro-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.5), transparent);
            }

            .intro-content {
                max-width: 800px;
                margin: 0 auto;
                position: relative;
                z-index: 2;
            }

            .impact {
                font-size: clamp(42px, 8vw, 82px);
                color: #ffffff;
                margin: 0 0 20px 0;
                text-transform: uppercase;
                font-weight: 800;
                letter-spacing: -1px;
                line-height: 1.1;
                text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            .subtitle {
                font-size: clamp(18px, 3vw, 24px);
                color: rgba(255, 255, 255, 0.85);
                margin-bottom: 30px;
                line-height: 1.6;
                font-weight: 300;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .services-tagline {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
                font-size: 18px;
                color: rgba(255, 255, 255, 0.7);
                font-weight: 500;
            }

            .services-tagline::before,
            .services-tagline::after {
                content: '✦';
                color: #7c3aed;
                font-size: 20px;
            }

            .scroll-container {
                height: 300vh; /* Reduced from potentially too large */
                position: relative;
                background: #1a1a2e;
            }

            .sticky-wrapper {
                position: sticky;
                top: 0;
                height: 100vh;
                width: 100%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                overflow: visible;
            }

            .gallery-start-position {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: ${ITEM_WIDTH}px;
                height: 1px;
                visibility: hidden;
            }

            .gallery {
                display: flex;
                gap: ${GAP}px;
                will-change: transform;
                position: absolute;
                left: 50%;
                transform: translateX(-${ITEM_WIDTH/2}px); /* Start with first item centered */
            }

            .gallery-item {
                flex-shrink: 0;
                width: ${ITEM_WIDTH}px;
                height: 500px;
                border-radius: 20px;
                position: relative;
                overflow: hidden;
                background-image: var(--item-image);
                background-size: cover;
                background-position: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                transition: transform 0.3s ease;
            }

            .gallery-item:hover {
                transform: scale(1.02);
            }

            .gallery-item::before {
                content: "";
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    to bottom,
                    transparent 40%,
                    rgba(0, 0, 0, 0.8)
                );
            }

            .item-content {
                position: absolute;
                bottom: 40px;
                left: 40px;
                right: 40px;
                z-index: 1;
            }

            .item-number {
                font-size: 14px;
                color: var(--item-color);
                font-family: "Azeret Mono", monospace;
                display: block;
                margin-bottom: 10px;
                font-weight: 600;
                letter-spacing: 1px;
            }

            .gallery-item h2 {
                font-size: 32px;
                font-weight: 700;
                color: #ffffff;
                margin: 0 0 15px 0;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            }

            .item-description {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.5;
                margin: 0;
            }

            .outro-section {
                height: 70vh;
                min-height: 500px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%);
                padding: 60px 20px;
            }

            .outro-content {
                text-align: center;
                max-width: 600px;
                margin: 0 auto;
            }

            .outro-title {
                font-size: clamp(36px, 6vw, 56px);
                color: #ffffff;
                margin-bottom: 24px;
                font-weight: 700;
                line-height: 1.2;
            }

            .outro-description {
                font-size: clamp(16px, 2vw, 20px);
                color: rgba(255, 255, 255, 0.8);
                line-height: 1.6;
                margin-bottom: 40px;
            }

            .outro-button {
                background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
                color: white;
                border: none;
                padding: 18px 48px;
                font-size: 18px;
                font-weight: 600;
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }

            .outro-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(124, 58, 237, 0.4);
            }

            @media (max-width: 768px) {
                .intro-section {
                    height: 50vh;
                    min-height: 400px;
                    padding: 30px 20px;
                }

                .impact {
                    font-size: 36px;
                    margin-bottom: 15px;
                }

                .subtitle {
                    font-size: 16px;
                    margin-bottom: 20px;
                }

                .services-tagline {
                    font-size: 14px;
                    gap: 10px;
                }

                .gallery-start-position {
                    width: 280px;
                }

                .gallery {
                    gap: 15px;
                    transform: translateX(-${280/2}px);
                }

                .gallery-item {
                    width: 280px;
                    height: 400px;
                    border-radius: 16px;
                }

                .item-content {
                    bottom: 25px;
                    left: 25px;
                    right: 25px;
                }

                .gallery-item h2 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }

                .item-description {
                    font-size: 14px;
                }

                .outro-section {
                    height: 60vh;
                    min-height: 400px;
                    padding: 40px 20px;
                }

                .outro-title {
                    font-size: 28px;
                }

                .outro-description {
                    font-size: 16px;
                }

                .outro-button {
                    padding: 16px 36px;
                    font-size: 16px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .gallery {
                    transform: none !important;
                }
                .gallery-item:hover {
                    transform: none;
                }
                .outro-button:hover {
                    transform: none;
                }
                .scroll-container {
                    height: auto;
                }
                .sticky-wrapper {
                    position: relative;
                    height: auto;
                    width: 100%;
                    overflow-x: auto;
                    padding: 50px 0;
                }
            }
        `}</style>
    )
}

/**
 * ==============   Data   ================
 */

const items = [
    { 
        id: 1, 
        color: "#ff0088", 
        label: "Buy", 
        image: "/Images/buying-house.webp",
        description: "Find your dream home with our expert guidance"
    },
    { 
        id: 2, 
        color: "#dd00ee", 
        label: "Rent", 
        image: "/Images/home-rent.avif",
        description: "Premium rental properties with flexible terms"
    },
    { 
        id: 3, 
        color: "#9911ff", 
        label: "Sell", 
        image: "/Images/Home-sale.jpg",
        description: "Get the best price for your property"
    },
    { 
        id: 4, 
        color: "#0d63f8", 
        label: "Renovation", 
        image: "/Images/home-renovation.jpg",
        description: "Transform your space with our renovation experts"
    },
    { 
        id: 5, 
        color: "#0cdcf7", 
        label: "Interior", 
        image: "/Images/Home-intereir.webp",
        description: "Custom interior designs for every style"
    },
]

const ITEM_WIDTH = 400
const GAP = 30