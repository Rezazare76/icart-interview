import { memo, FC, useState } from "react";
import LiquidFillGauge from "react-liquid-gauge";
import { interpolateRgb } from "d3-interpolate";
import { color } from "d3-color";
import LiquidGaugeProps from "./type";
import { formatPersianNumber } from "utils/utility";
export const LiquidGauge: FC<LiquidGaugeProps> = memo(
  ({ percent, colors, count }) => {
    const [value] = useState(percent);
    const radius = 100;
    const interpolate = interpolateRgb(colors.start, colors.end);
    const fillColor = interpolate(value / 100);
    const gradientStops = [
      {
        key: "0%",
        stopColor: color(fillColor)?.darker(0.5).toString(),
        stopOpacity: 1,
        offset: "0%",
      },
      {
        key: "50%",
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: "50%",
      },
      {
        key: "100%",
        stopColor: color(fillColor)?.brighter(0.5).toString(),
        stopOpacity: 0.5,
        offset: "100%",
      },
    ];
    const transparentFillColor = color(fillColor)
      ?.copy({ opacity: 0.5 })
      .toString();

    return (
      <div>
        <LiquidFillGauge
          style={{ margin: "0 auto" }}
          width={radius * 2}
          height={radius * 2}
          value={value}
          percent="%"
          textSize={0.5}
          textOffsetX={0}
          textOffsetY={0}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          textRenderer={(props: any) => {
            const value = Math.round(props.value);
            const radius = Math.min(props.height / 2, props.width / 2);
            const textPixels = (props.textSize * radius) / 2;
            const valueStyle = {
              fontSize: textPixels,
            };
            const percentStyle = {
              fontSize: textPixels * 0.6,
            };

            return (
              // <tspan>
              //   <tspan className="value" style={valueStyle}>
              //     {value}
              //   </tspan>
              //   <tspan style={percentStyle}>{props.percent}</tspan>
              // </tspan>
              <tspan>
                <tspan className="value" style={valueStyle}>
                  {formatPersianNumber(5000000 - (count || 0))}
                </tspan>
                <tspan style={percentStyle}>ریال</tspan>
              </tspan>
            );
          }}
          riseAnimation
          waveAnimation
          waveFrequency={1}
          waveAmplitude={8}
          gradient
          gradientStops={gradientStops}
          circleStyle={{
            fill: transparentFillColor,
          }}
          waveStyle={{
            fill: fillColor,
          }}
          textStyle={{
            fill: color("#444")?.toString(),
            fontFamily: "iranYekanRegular",
          }}
          waveTextStyle={{
            fill: color("#fff")?.toString(),
            fontFamily: "iranYekanRegular",
          }}
        />
      </div>
    );
  }
);
LiquidGauge.displayName = "LiquidGauge";
