export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  specialItems: Array<string>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.specialItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert']
  }

  updateQuality(): Array<Item> {
    this.items.map(item => {
      if (this.isLegendaryItem(item)) return;

      this.decrementSellByDay(item)

      this.isSpecialItem(item.name) ? this.adjustSpecialItem(item) : this.adjustRegularItem(item);
      this.isItemQualityNegative(item) ? item.quality = 0 : null;
      this.isItemQualityMoreThan50(item) ? item.quality = 50 : null;
    })

    return this.items;
  }

  decrementSellByDay(item: Item) {
    item.sellIn -= 1;
  }

  adjustSpecialItem(item: Item) {
    if (item.name === 'Aged Brie') {
      item.sellIn < 0 ? this.changeItemQuality(item, 2) : this.changeItemQuality(item, 1);
      return
    }

    if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      this.adjustBackstagePasses(item);
      return
    }
  }

  adjustRegularItem(item: Item) {
    item.sellIn < 0 ? this.changeItemQuality(item, -2) : this.changeItemQuality(item, -1);
  }

  adjustBackstagePasses(item: Item) {
    if (item.sellIn < 0) item.quality = 0;
    else if (item.sellIn < 5) item.quality += 3;
    else if (item.sellIn < 10) item.quality += 2;
    else item.quality += 1;
  }

  changeItemQuality(item: Item, amount: number) {
    if (this.isConjuredItem(item)) amount = amount * 2;

    item.quality += amount;
  }

  isItemQualityNegative(item: Item): Boolean {
    return item.quality > 0 ? false : true;
  }

  isItemQualityMoreThan50(item: Item): Boolean {
    return item.quality > 50 ? true : false;
  }

  isSpecialItem(name: string): Boolean {
    return this.specialItems.includes(name) ? true : false;
  }

  isLegendaryItem(item: Item): Boolean {
    return item.name === 'Sulfuras, Hand of Ragnaros' ? true : false;
  }

  isConjuredItem(item: Item): Boolean {
    let lowercaseName: string = item.name.toLocaleLowerCase()

    return lowercaseName.toLocaleLowerCase().includes('conjured') ? true : false;
  }
}