import { JSX, type MemoExoticComponent, memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import { LineChartZoomDomainType } from '@/components/Charts';
import { MinusIcon } from '@/components/Icons/MinusIcon.jsx';
import { PlusIcon } from '@/components/Icons/PlusIcon.jsx';
import { ResetIcon } from '@/components/Icons/ResetIcon.jsx';
import { UnselectBlockIcon } from '@/components/Icons/UnselectBlockIcon.jsx';
import { calculateZoomDomain } from './helpers';
import { DEFAULT_ZOOM_FACTOR, MIN_ZOOM_FACTOR, ZOOM_FACTOR_SCALE } from './constants';
import styles from './Wrapper.module.scss';

type UseZoomHookResultType = {
  ZoomSection: MemoExoticComponent<() => JSX.Element>;
  zoom: ZoomGraphType;
};

type UseZoomHookParamsType = {
  disabled?: boolean;
  zoom?: LineChartZoomDomainType;
};

type ZoomGraphType = {
  selectorMode: boolean;
  zoomDomain: LineChartZoomDomainType;
  yZoomFactor: number;
  toggleSelectorMode: () => void;
  saveZoomDomain: (domain: LineChartZoomDomainType) => void;
  handleZoomReset: () => void;
};

type ZoomSettingsType = {
  selectorMode: boolean;
  zoomDomain: LineChartZoomDomainType;
  zoomFactor: number;
};

export function useZoom({
  zoom,
  disabled,
}: UseZoomHookParamsType): UseZoomHookResultType {
  const [{ selectorMode, zoomDomain, zoomFactor }, setSettings] =
    useState<ZoomSettingsType>({
      selectorMode: false,
      zoomDomain: zoom || [],
      zoomFactor: DEFAULT_ZOOM_FACTOR,
    });

  function updateSettings(setting: Partial<ZoomSettingsType>): void {
    setSettings((prev) => ({ ...prev, ...setting }));
  }

  const toggleSelectorMode = useCallback(() => {
    updateSettings({ selectorMode: !selectorMode });
  }, [selectorMode]);

  const saveZoomDomain = useCallback((domain: LineChartZoomDomainType) => {
    updateSettings({ zoomDomain: domain });
  }, []);

  const handleZoomIn = useCallback(() => {
    updateSettings({
      zoomFactor: Math.max(
        zoomFactor - zoomFactor * ZOOM_FACTOR_SCALE,
        MIN_ZOOM_FACTOR,
      ),
    });

    if (zoomDomain.length) {
      const domainX = {
        axisStart: zoomDomain[0]?.axisStart || 0,
        axisEnd: zoomDomain[0]?.axisEnd || 0,
      };

      const domainY = zoomDomain[1]
        ? calculateZoomDomain(
            zoomDomain[1].axisStart,
            zoomDomain[1].axisEnd,
            ZOOM_FACTOR_SCALE,
          )
        : { axisStart: 0, axisEnd: 0 };

      if (domainY) {
        updateSettings({zoomDomain: [domainX, domainY]});
      }
    }
  }, [zoomDomain, zoomFactor]);

  const handleZoomOut = useCallback(() => {
    updateSettings({
      zoomFactor: zoomFactor + zoomFactor * ZOOM_FACTOR_SCALE,
    });

    if (zoomDomain.length) {
      updateSettings({zoomDomain: [
        {
          axisStart: zoomDomain[0]?.axisStart || 0,
          axisEnd: zoomDomain[0]?.axisEnd || 0,
        },
        {
          axisStart: zoomDomain[1] ? zoomDomain[1].axisStart : 0,
          axisEnd: zoomDomain[1]
            ? zoomDomain[1].axisEnd + zoomDomain[1].axisEnd * ZOOM_FACTOR_SCALE
            : 0,
        },
      ]});
    }
  }, [zoomDomain, zoomFactor]);

  const handleZoomReset = useCallback(() => {
    if (zoomDomain.length > 0) {
      updateSettings({ zoomDomain: [], selectorMode: false });
    }

    updateSettings({ zoomFactor: DEFAULT_ZOOM_FACTOR, selectorMode: false });
  }, [zoomDomain.length]);

  const ZoomSection = memo(() => {
    return (
      <div className={styles['button-group']}>
        <button
          className={classNames(styles['button'], {[styles['button_selected']]: selectorMode})}
          disabled={disabled}
          onClick={toggleSelectorMode}
        >
          <UnselectBlockIcon className={styles['icon']} />
        </button>
        <button
          className={classNames(styles['button'], styles['button_zoom'])}
          onClick={handleZoomOut}
          disabled={selectorMode}
        >
          <MinusIcon className={styles['icon']} />
        </button>
        <button
          className={classNames(styles['button'], styles['button_zoom'])}
          onClick={handleZoomIn}
          disabled={selectorMode}
        >
          <PlusIcon className={styles['icon']} />
        </button>
        <button
          className={styles['button']}
          disabled={disabled}
          onClick={handleZoomReset}
        >
          <ResetIcon className={styles['icon']} />
        </button>
      </div>
    );
  });

  return {
    ZoomSection,
    zoom: {
      selectorMode,
      zoomDomain,
      yZoomFactor: zoomFactor,
      saveZoomDomain,
      toggleSelectorMode,
      handleZoomReset,
    },
  };
}
