export interface IProcessLogger {
  setIsEnabled(isEnabled: boolean): this;
  setTotalNumOfProcessableItems(totalNumOfItems: number | string): this;
  printMessage(message: string): void;
  printPercentage(processedNumOfItems: number): void;
}

export class UProcessLogger implements IProcessLogger {
  private lastCachedPercentage: number;
  private totalNumOfItems: number;
  private isEnabled: boolean;

  constructor({ isEnabled }: { isEnabled: boolean }) {
    this.lastCachedPercentage = 0;
    this.totalNumOfItems = 0;
    this.isEnabled = isEnabled;
  }

  setIsEnabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;

    return this;
  }

  setTotalNumOfProcessableItems(totalNumOfItems: number | string) {
    this.totalNumOfItems =
      typeof totalNumOfItems === 'string'
        ? parseInt(totalNumOfItems)
        : totalNumOfItems;

    return this;
  }

  printMessage(message: string) {
    if (!this.isEnabled) {
      return;
    }

    process.stdout.write(`${message}\r\n"`);
  }

  printPercentage(processedNumOfItems: number) {
    if (!this.isEnabled) {
      return;
    }

    const currentPercentage = Math.floor(
      (processedNumOfItems / this.totalNumOfItems) * 100
    );

    if (this.lastCachedPercentage !== currentPercentage) {
      process.stdout.write(`${currentPercentage}% \r"`);
    }

    this.lastCachedPercentage = currentPercentage;
  }
}
