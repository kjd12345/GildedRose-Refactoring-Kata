import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(0);
  });

  it('should have item quality degrade twice as fast once the sell by date has passed', () => {
    const gildedRose = new GildedRose([new Item('test', 1, 5)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(2);
  })

  it('quality should never be negative', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })

  it('"Aged Brie" increases in quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 2)]);

    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);

    // should increase quality by 2 here because the Brie is out of date
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5);
  })

  it('quality should never be more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 49)]);

    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);

    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })

  it('sulfuras never has to be sold', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 20, 30)]);

    let items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(20);
  })

  it('sulfuras never decreases in quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 20, 30)]);

    let items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(30);
  })

  it('Backstage passes should increase variously in Quality if more than 10, less than 10, and less than 5 days', () => {
    let gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 30)]);

    // more than 10 days
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(31);

    // less than 10 days
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(33);

    // less than 5 days
    gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 30)])
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(33);
  })

  it('Backstage passes should drop Quality to zero after the concert', () => {
    let gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 30)]);

    // more than 10 days
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })

  it('should change quality twice as fast for conjured items', () => {
    let gildedRose = new GildedRose([new Item('Conjured Mana Cake', 1, 30)]);

    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(28);

    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(24);
  })

  it('should check to see if item is a conjured item', () => {
    let gildedRose = new GildedRose([]);

    let item = new Item('Conjured Mana Cake', 1, 30)

    expect(gildedRose.isConjuredItem(item)).toBe(true);
  })
});
