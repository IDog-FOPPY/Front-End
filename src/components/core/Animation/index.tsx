import React, { useEffect, useState, useRef, ReactNode } from "react";
import type { LottiePlayer } from "lottie-web";

export interface AnimationProps {
  destroy?: boolean;
  path?: string;
  loop?: boolean | number;
  autoplay?: boolean;
  className?: string;
  style?: object;
  name?: string;
  delay?: boolean;
  delayTrigger?: boolean;
  onDestroy?: () => void;
}

export default function Animation(props: AnimationProps) {
  const {
    destroy = false,
    path,
    className,
    style,
    name = "",
    delay = false,
    delayTrigger = false,
    onDestroy,
    ...restProps
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    let loading = true;

    import("lottie-web").then((Lottie) => {
      if (loading) {
        setLottie(Lottie.default);
      }
    });

    return () => {
      loading = false;
    };
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        ...restProps,
        container: ref.current,
        renderer: "svg",
        path,
        name,
      });

      if (delay) {
        animation.addEventListener("DOMLoaded", () => {
          animation.stop();
        });
      }

      if (destroy) {
        animation.addEventListener("complete", () => {
          onDestroy && onDestroy();
          animation.destroy();
        });
      }

      return () => animation.destroy();
    }

    return () => {};
  }, [lottie]);

  useEffect(() => {
    if (delayTrigger && delay) {
      lottie?.play(name);
    }
  }, [delayTrigger]);

  return <div className={className} style={style} ref={ref} />;
}
