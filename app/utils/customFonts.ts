import localFont from "next/font/local";

const FontPrompt = localFont({
  src: [{ path: "../font/NotoSansThai-Medium.ttf" }],
  variable: "--font-prompt",
});

export default FontPrompt;
