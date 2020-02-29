export interface IProcessLogger {
  setTotalNumOfProcessableItems(totalNumOfItems: number | string): this;
  printMessage(message: string): void;
  printPercentage(processedNumOfItems: number): void;
}

export class UProcessLogger implements IProcessLogger {
  private lastCachedPercentage: number;
  private totalNumOfItems: number;

  constructor() {
    this.lastCachedPercentage = 0;
    this.totalNumOfItems = 0;
  }

  setTotalNumOfProcessableItems(totalNumOfItems: number | string) {
    this.totalNumOfItems =
      typeof totalNumOfItems === 'string'
        ? parseInt(totalNumOfItems)
        : totalNumOfItems;

    return this;
  }

  printMessage(message: string) {
    process.stdout.write(`${message}\r\n"`);
  }

  printPercentage(processedNumOfItems: number) {
    const currentPercentage = Math.floor(
      (processedNumOfItems / this.totalNumOfItems) * 100
    );

    if (this.lastCachedPercentage !== currentPercentage) {
      process.stdout.write(`${currentPercentage}% \r"`);
    }

    this.lastCachedPercentage = currentPercentage;
  }
}
