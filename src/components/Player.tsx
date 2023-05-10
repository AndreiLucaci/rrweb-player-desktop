import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { eventWithTime } from "@rrweb/types";
import { Replayer } from "rrweb";

export type PlayerProps = {
  events: eventWithTime[];
};

export const Player = forwardRef((props: PlayerProps, ref) => {
  useEffect(() => {
    console.log(props.events.length);
  }, [props.events]);

  const [player, setPlayer] = useState<Replayer>();

  useImperativeHandle(ref, () => ({
    destroy: () => player?.destroy(),
  }));

  useEffect(() => {
    if (props.events.length > 2) {
      setPlayer(
        new Replayer(props.events, {
          root: document.getElementById("player") as HTMLElement,
          skipInactive: false,
          showWarning: false,
        })
      );
    }
  }, [props.events]);

  useEffect(() => {
    player?.play();
  }, [player]);

  return <div id="player"></div>;
});

export default Player;
