import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
    const [isHovered, setIsHovered] = useState(false);

    const phoneNumber = "6385467340"; // Replace with actual number
    const message = encodeURIComponent("Hello, I recently submitted a project inquiry and would like to discuss it further.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-end gap-3">
            {/* Tooltip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white text-black px-4 py-2 rounded-xl shadow-lg border border-gray-100 text-sm font-medium tracking-wide whitespace-nowrap"
                    >
                        Need a Quick Follow-Up?
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Button */}
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center bg-black/90 backdrop-blur-md text-white rounded-full p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 hover:shadow-[0_8px_40px_rgba(37,211,102,0.3)] transition-all duration-300"
            >
                {/* Soft glow effect */}
                <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <svg
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="text-[#25D366]"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>

                    <div className="overflow-hidden">
                        <AnimatePresence initial={false}>
                            {isHovered && (
                                <motion.span
                                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                                    animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="block font-semibold text-white whitespace-nowrap pr-2"
                                >
                                    Chat With Our Team
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.a>
        </div>
    );
}
