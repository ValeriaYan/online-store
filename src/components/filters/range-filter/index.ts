import './style.scss';

import FilterTemplate from '../filter-template';
import { RangeFiltersType } from '..';

type RangeCallback = (form: string, to: string, filterId: RangeFiltersType) => void;

interface IRange {
  min: number;
  max: number;
}

class RangeFilter extends FilterTemplate {
  private filterId: RangeFiltersType;
  private wrapper: HTMLElement;
  private valuesBox: HTMLElement;
  private range: IRange;
  private slider1: HTMLInputElement;
  private slider2: HTMLInputElement;

  constructor(
    title: string,
    filterId: RangeFiltersType,
    range: IRange,
    rangeFilterHandler: RangeCallback
  ) {
    super(title, 'range-filter');

    this.filterId = filterId;
    this.range = range;
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'range-filter__wrapper';
    this.valuesBox = document.createElement('div');
    this.valuesBox.className = 'range-filter__values';

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
        this.valuesBox.innerText = `$${numFrom}`;
      } else {
        if (numFrom > numTo) [numTo, numFrom] = [numFrom, numTo];
        this.valuesBox.innerText = `$${numFrom} - $${numTo}`;
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
    this.container.append(this.createTitle());
    this.container.append(this.valuesBox);
    this.container.append(this.wrapper);
    this.wrapper.append(this.slider1);
    this.wrapper.append(this.slider2);
    return this.container;
  }
}

export default RangeFilter;
