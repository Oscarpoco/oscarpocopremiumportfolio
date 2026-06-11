import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const CV_PATH = "/oscarkylpoco.pdf";

function readThemeColors() {
    const style = getComputedStyle(document.documentElement);
    return {
        fg: style.getPropertyValue("--primary").trim() || "#0d9488",
        bg: style.getPropertyValue("--bg-secondary").trim() || "#ffffff",
    };
}

export default function ResumeQrCode({ darkMode }) {
    const [colors, setColors] = useState(() =>
        typeof document !== "undefined"
            ? readThemeColors()
            : { fg: "#0d9488", bg: "#ffffff" }
    );
    const cvUrl =
        typeof window !== "undefined"
            ? new URL(CV_PATH, window.location.origin).href
            : CV_PATH;

    useEffect(() => {
        setColors(readThemeColors());

        const root = document.documentElement;
        const observer = new MutationObserver(() => {
            setColors(readThemeColors());
        });

        observer.observe(root, {
            attributes: true,
            attributeFilter: ["class", "data-theme-palette", "data-theme-mode"],
        });

        return () => observer.disconnect();
    }, [darkMode]);

    return (
        <QRCode
            value={cvUrl}
            size={288}
            level="M"
            fgColor={colors.fg}
            bgColor={colors.bg}
            className="qrcode-code"
            title="Scan to download Oscar Kylpoco resume"
        />
    );
}
