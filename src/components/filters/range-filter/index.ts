import './style.scss';

import FilterTemplate from '../filter-template';
import { RangeFiltersType } from '..';

type RangeCallback = (form: string, to: string, filterId: RangeFiltersType) => void;

interface IRange {
  min: number;
  max: number;
}

class RangeFilter extends FilterTemplate {
  private prefix: string;
  private filterId: RangeFiltersType;
  private controls: HTMLElement;
  private valuesBox: HTMLElement;
  private range: IRange;
  private slider1: HTMLInputElement;
  private slider2: HTMLInputElement;
  private fixedPoint: number;

  constructor(
    title: string,
    filterId: RangeFiltersType,
    range: IRange,
    rangeFilterHandler: RangeCallback,
    prefix?: string,
    fixedPoint?: number
  ) {
    super(title, 'range-filter');

    this.filterId = filterId;
    this.range = range;
    this.prefix = prefix ?? '';
    this.fixedPoint = fixedPoint ?? 0;

    this.valuesBox = document.createElement('div');
    this.valuesBox.className = 'range-filter__values';
    this.controls = document.createElement('div');
    this.controls.className = 'range-filter__controls';

    this.slider1 = this.createRangeSlider(this.range.min, this.range.max, this.range.min);
    this.slider2 = this.createRangeSlider(this.range.min, this.range.max, this.range.max);
    this.addListeners(rangeFilterHandler);
  }

  private updateValues(fromValue?: string, toValue?: string): void {
    if (!fromValue || !toValue) {
      this.valuesBox.innerText = 'Not found';
    } else {
      let numFrom = parseFloat(fromValue);
      let numTo = parseFloat(toValue);

      if (numFrom === numTo) {
        this.valuesBox.innerText = `${this.prefix}${numFrom.toFixed(this.fixedPoint)}`;
      } else {
        if (numFrom > numTo) [numTo, numFrom] = [numFrom, numTo];
        const from = `${this.prefix}${numFrom.toFixed(this.fixedPoint)}`;
        const to = `${this.prefix}${numTo.toFixed(this.fixedPoint)}`;
        this.valuesBox.innerText = `${from} ⟷ ${to}`;
      }
    }
  }

  private addListeners(rangeFilterHandler: RangeCallback) {
    this.slider1.oninput = () => this.updateValues(this.slider1.value, this.slider2.value);
    this.slider2.oninput = () => this.updateValues(this.slider1.value, this.slider2.value);
    this.slider1.onchange = () =>
      rangeFilterHandler(this.slider1.value, this.slider2.value, this.filterId);
    this.slider2.onchange = () =>
      rangeFilterHandler(this.slider1.value, this.slider2.value, this.filterId);
    this.updateValues(this.slider1.value, this.slider2.value);
  }

  private createRangeSlider(min: number, max: number, value: number): HTMLInputElement {
    const rangeSlider = document.createElement('input');
    rangeSlider.type = 'range';
    rangeSlider.min = min.toString();
    rangeSlider.max = max.toString();
    rangeSlider.value = value.toString();
    return rangeSlider;
  }

  public update(range: string[] | null): void {
    if (range === null) {
      this.slider1.value = this.range.min.toString();
      this.slider2.value = this.range.max.toString();
      this.updateValues();
    } else {
      const [from, to] = range;
      this.slider1.value = from;
      this.slider2.value = to;
      this.updateValues(from, to);
    }
  }

  public render(): HTMLElement {
    this.controls.append(this.slider1);
    this.controls.append(this.slider2);

    const wrapper = document.createElement('div');
    wrapper.className = 'range-filter__wrapper';
    wrapper.append(this.valuesBox);
    wrapper.append(this.controls);

    this.container.append(this.createTitle());
    this.container.append(wrapper);
    return this.container;
  }
}

export default RangeFilter;
