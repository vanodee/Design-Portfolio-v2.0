"use client";

import { useEffect } from "react";

export default function TallyContactForm() {
  useEffect(() => {
    const scriptSrc = "https://tally.so/widgets/embed.js";

    // If already loaded, just initialize
    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
      // @ts-ignore
      if (typeof Tally !== "undefined") Tally.loadEmbeds();
      return;
    }

    // Otherwise, load it
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.onload = () => {
      // @ts-ignore
      if (typeof Tally !== "undefined") Tally.loadEmbeds();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/embed/444OBY?hideTitle=1&transparentBackground=1&dynamicHeight=1"
      loading="lazy"
      width="100%"
      height="100"
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="Let's Connect"
    ></iframe>
  );
}
