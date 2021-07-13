import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo
} from "react";
import {
  Button
} from '@material-ui/core'
import { WaveSurfer, WaveForm, Region } from "wavesurfer-react";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import peaks from './peaks'

/**
 * @param min
 * @param max
 * @returns {*}
 */
function generateNum(min, max) {
  return Math.random() * (max - min + 1) + min;
}

/**
 * @param distance
 * @param min
 * @param max
 * @returns {([*, *]|[*, *])|*[]}
 */
function generateTwoNumsWithDistance(distance, min, max) {
  const num1 = generateNum(min, max);
  const num2 = generateNum(min, max);
  // if num2 - num1 < 10
  if (num2 - num1 >= 10) {
    return [num1, num2];
  }
  return generateTwoNumsWithDistance(distance, min, max);
}

const AudioTrimmer = () => {
  const [timelineVis, setTimelineVis] = useState(true);
  const [audioContext, setAudioContext] = useState(null);
  const SAMPLE_RATE = 3000
    useEffect(() => {
       setAudioContext(new AudioContext({sampleRate: SAMPLE_RATE}));
    }, [setAudioContext]);

  const plugins = useMemo(() => {
    return [
      {
        plugin: RegionsPlugin,
        options: { dragSelection: true }
      },
      timelineVis && {
        plugin: TimelinePlugin,
        options: {
          container: "#timeline"
        }
      }
    ].filter(Boolean);
  }, [timelineVis]);

  const toggleTimeline = useCallback(() => {
    setTimelineVis(!timelineVis);
  }, [timelineVis]);

  const [regions, setRegions] = useState([]);

  // use regions ref to pass it inside useCallback
  // so it will use always the most fresh version of regions list
  const regionsRef = useRef(regions);

  useEffect(() => {
    regionsRef.current = regions;
  }, [regions]);

  const regionCreatedHandler = useCallback(
    region => {
      console.log("region-created --> region:", region);

      if (region.data.systemRegionId) return;

      setRegions([
        ...regionsRef.current,
        { ...region, data: { ...region.data, systemRegionId: -1 } }
      ]);
    },
    [regionsRef]
  );

  const wavesurferRef = useRef();
  const handleWSMount = useCallback(
    waveSurfer => {
      wavesurferRef.current = waveSurfer;
      if (wavesurferRef.current) {
        console.log(peaks)
        wavesurferRef.current.load("https://clubhouse-audio.s3.amazonaws.com/hujie/0cc6abf3-935b-4519-9c03-aefb788359fb.mp3", peaks);

        wavesurferRef.current.on("region-created", regionCreatedHandler);

        wavesurferRef.current.on("ready", () => {
          console.log("WaveSurfer is ready");
        });

        wavesurferRef.current.on("region-removed", region => {
          console.log("region-removed --> ", region);
        });

        wavesurferRef.current.on("loading", data => {
          console.log("loading --> ", data);
        });

        if (window) {
          window.surferidze = wavesurferRef.current;
        }
      }
    },
    [regionCreatedHandler]
  );

  const removeLastRegion = useCallback(() => {
    let nextRegions = [...regions];

    nextRegions.pop();

    setRegions(nextRegions);
  }, [regions]);

  const play = useCallback(() => {
    wavesurferRef.current.playPause();
  }, []);

  const handleRegionUpdate = useCallback((region, smth) => {
    console.log("region-update-end --> region:", region);
    console.log(smth);
  }, []);

  return (
    <div className="App">
      <WaveSurfer audioContext={audioContext} plugins={plugins} onMount={handleWSMount}>
        <WaveForm id="waveform">
          {regions.map(regionProps => (
            <Region
              onUpdateEnd={handleRegionUpdate}
              key={regionProps.id}
              {...regionProps}
            />
          ))}
        </WaveForm>
        <div id="timeline" />
      </WaveSurfer>
      <div>
        <Button onClick={play}>Play / Pause</Button>
        <Button onClick={removeLastRegion}>Remove last region</Button>

      </div>
    </div>
  );
}


export default AudioTrimmer 
