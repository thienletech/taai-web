import { useMediaQuery, useTheme } from '@mui/material';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import * as React from 'react';
import { Theme } from '@mui/material';
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  HoverTooltip,
  strokeDashTypes,
  SingleTooltip,
} from 'react-financial-charts';
import { formatNumber } from '@/utils.ts/common';
import { defaultFormatters, defaultLocale } from '@/utils.ts/locale';

export interface IOHLCData {
  readonly close: number;
  readonly date: Date;
  readonly high: number;
  readonly low: number;
  readonly open: number;
  readonly volume: number;
}

interface StockChartProps {
  readonly data: IOHLCData[];
  readonly height: number;
  readonly dateTimeFormat?: string;
  readonly width: number;
  readonly ratio: number;
  readonly predictionDate: Date;
  readonly ticker: string;
  readonly theme: Theme;
  readonly smMatch: boolean;
  readonly onReset: () => void;
}

class TickerBaseChart extends React.Component<StockChartProps> {
  private readonly margin = { left: 10, right: 48, top: 10, bottom: 30 };

  public render() {
    const xScaleProvider = discontinuousTimeScaleProviderBuilder()
      .setLocale(defaultLocale, defaultFormatters)
      .inputDateAccessor((d: IOHLCData) => d.date);

    const { data: initialData, height, ratio, width, predictionDate } = this.props;

    const elder = elderRay();
    const ema12Line = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d: any, c: any) => {
        d.ema12 = c;
      })
      .accessor((d: any) => d.ema12);

    const ema26Line = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d: any, c: any) => {
        d.ema26 = c;
      })
      .accessor((d: any) => d.ema26);
    const calculatedData = elder(ema26Line(ema12Line(initialData)));

    const { margin } = this;

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max + 5];
    const gridHeight = height - margin.top - margin.bottom;

    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight];
    const chartHeight = gridHeight;

    const ohlcvAssessor = (d: any) => {
      return d;
    };

    const theme = this.props.theme;

    const dateFormat = timeFormat('%Y-%m-%d');

    // Price lines
    const historyLine = {
      accessor: (d: any) => (d.date > predictionDate ? null : d.close),
      strokeStyle: theme.palette.grey[800],
    };

    const predictionLine: any = {
      accessor: (d: any) => {
        return d.date >= predictionDate ? d.close : null;
      },
      strokeStyle: '#c242f5',
      strokeDasharray: 'ShortDash',
      strokeWidth: 2,
    };

    // Mouse
    const mouseCoordination: any = {
      priceFormat: this.formatNumber1,
    };

    // Axis
    const yAxis: any = {
      priceFormat: this.formatNumber1,
    };

    // Indicator
    const yEdgeIndicator = {
      assessor: (data: IOHLCData) => {
        return data.close;
      },
      priceFormat: this.formatNumber1,
    };

    // Crosshair cursor
    const crosshairCursor = {
      strokeStyle: theme.palette.grey[500],
    };

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName='Data'
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart id={2} height={barChartHeight} origin={barChartOrigin} yExtents={this.barChartExtents}>
          <BarSeries fillStyle={this.volumeColor} yAccessor={this.volumeSeries} />
        </Chart>

        <Chart id={3} height={chartHeight} yExtents={this.candleChartExtents}>
          <XAxis showTicks={false} showTickLabel={true} tickLabelFill={theme.palette.text.primary} />
          <YAxis tickFormat={yAxis.priceFormat} tickLabelFill={theme.palette.text.primary} />

          <LineSeries yAccessor={historyLine.accessor} strokeStyle={historyLine.strokeStyle} />
          <CurrentCoordinate yAccessor={historyLine.accessor} fillStyle={historyLine.strokeStyle} />

          <LineSeries
            yAccessor={predictionLine.accessor}
            strokeStyle={predictionLine.strokeStyle}
            strokeDasharray={predictionLine.strokeDasharray}
            strokeWidth={predictionLine.strokeWidth}
          />
          <CurrentCoordinate yAccessor={predictionLine.accessor} fillStyle={predictionLine.strokeStyle} />

          <LineSeries yAccessor={ema26Line.accessor()} strokeStyle={ema26Line.stroke()} />
          <CurrentCoordinate yAccessor={ema26Line.accessor()} fillStyle={ema26Line.stroke()} />

          <LineSeries yAccessor={ema12Line.accessor()} strokeStyle={ema12Line.stroke()} />
          <CurrentCoordinate yAccessor={ema12Line.accessor()} fillStyle={ema12Line.stroke()} />

          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={mouseCoordination.priceFormat}
            fill={theme.palette.secondary.main}
          />

          <EdgeIndicator
            itemType='last'
            rectWidth={margin.right}
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            displayFormat={yEdgeIndicator.priceFormat}
            yAccessor={yEdgeIndicator.assessor}
          />
          <OHLCTooltip
            origin={[8, 16]}
            labelFill={theme.palette.text.primary}
            textFill={this.openCloseColor}
            fontSize={this.props.smMatch ? 16 : 12}
            accessor={(data) => {
              if (data.date >= predictionDate) {
                return {
                  close: data.close,
                };
              } else {
                return {
                  ...data,
                };
              }
            }}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            textFill={theme.palette.text.primary}
            options={[
              {
                yAccessor: ema26Line.accessor(),
                type: 'EMA',
                stroke: ema26Line.stroke(),
                windowSize: ema26Line.options().windowSize,
              },
              {
                yAccessor: ema12Line.accessor(),
                type: 'EMA',
                stroke: ema12Line.stroke(),
                windowSize: ema12Line.options().windowSize,
              },
            ]}
          />

          <HoverTooltip
            yAccessor={ohlcvAssessor}
            tooltip={{
              content: ({ currentItem, xAccessor }) => {
                let y = [];
                if (currentItem.open) {
                  y.push({
                    label: 'O',
                    value: this.formatNumber1(currentItem.open),
                  });
                }
                if (currentItem.high) {
                  y.push({
                    label: 'H',
                    value: this.formatNumber1(currentItem.high),
                  });
                }
                if (currentItem.low) {
                  y.push({
                    label: 'L',
                    value: this.formatNumber1(currentItem.low),
                  });
                }
                if (currentItem.close) {
                  y.push({
                    label: currentItem.date >= predictionDate ? 'C*' : 'C',
                    value: this.formatNumber1(currentItem.close),
                  });
                }
                if (currentItem.volume) {
                  y.push({
                    label: 'V',
                    value: this.formatNumber0(currentItem.volume),
                  });
                }
                return {
                  x: dateFormat(xAccessor(currentItem)),
                  y: y,
                };
              },
            }}
          />

          <ZoomButtons onReset={this.props.onReset} />
        </Chart>
        <CrossHairCursor strokeStyle={crosshairCursor.strokeStyle} />
      </ChartCanvas>
    );
  }

  private readonly barChartExtents = (data: IOHLCData) => {
    return data.volume;
  };

  private readonly candleChartExtents = (data: IOHLCData) => {
    return [data.high, data.low];
  };

  private readonly volumeColor = (data: IOHLCData) => {
    return (data?.close ?? 0) >= (data?.open ?? 0) ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)';
  };

  private readonly volumeSeries = (data: IOHLCData) => {
    return data.volume;
  };

  private readonly openCloseColor = (data: IOHLCData) => {
    return (data?.close ?? 0) >= (data?.open ?? 0) ? '#26a69a' : '#ef5350';
  };

  private readonly formatNumber0 = (v: number) => formatNumber(v, 0);

  private readonly formatNumber1 = (v: number) => formatNumber(v, 1);
}

export default withDeviceRatio()(TickerBaseChart);
