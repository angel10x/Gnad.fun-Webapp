import { } from 'react';
import { useChartStore } from '../../store/chartStore';
import classNames from 'classnames';

const TIMEFRAMES = ['1m', '5m', '15m', '1h', '6h', '12h', '1D', '5D', '1M', '6M', '1Y', 'All'];


export default function Toolbar() {
    const { timeframe, setTimeframe } = useChartStore();

    return (
        <div className="sticky top-0 z-20 bg-transparent">
            <div className="flex items-center gap-2 p-2">
                <div className="flex-1 flex items-center gap-2">
                    {TIMEFRAMES.map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={classNames('text-xs px-3 py-1.5 rounded font-medium transition', {
                                'bg-white/10 text-white': timeframe === tf,
                                'text-white/60 hover:text-white': timeframe !== tf,
                            })}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
