var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it("empty shop", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items).to.length(0);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new Shop([new Item("foo", 0, 5, true), new Item("", 0, 5), new Item("Sulfuras, Hand of Ragnaros", -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
    expect(items[1].quality).to.equal(3);
    expect(items[2].quality).to.equal(5);
  });

  it("The Quality of an item is never negative", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0), new Item("foo", 2, 2), new Item("foo", 1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(1);
    expect(items[2].quality).to.equal(2);
  });

  it("Aged Brie actually increases in Quality the older it gets", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 10), new Item("Aged Brie", 1, 10), new Item("Aged Brie", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
    expect(items[0].sellIn).to.equal(-1);
    expect(items[1].quality).to.equal(11);
    expect(items[1].sellIn).to.equal(0);
    expect(items[2].quality).to.equal(50);
    expect(items[2].sellIn).to.equal(-1);
  });


  it("Sulfuras, being a legendary item, never has to be sold or decreases in Quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(5);
    expect(items[0].sellIn).to.equal(5);
  });

  it("Backstage passes, like aged brie, increases in Quality as its SellIn value approaches", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5), new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5),
    new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(7);
    expect(items[0].sellIn).to.equal(9);
    expect(items[1].quality).to.equal(8);
    expect(items[1].sellIn).to.equal(4);
    expect(items[2].quality).to.equal(6);
    expect(items[2].sellIn).to.equal(10);
  });

  it("Quality drops to 0 after the concert", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 5), new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5), new Item("Backstage passes to a TAFKAL80ETC concert", 6, 5),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49), new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
    expect(items[1].quality).to.equal(0);
    expect(items[2].quality).to.equal(0);
    expect(items[3].quality).to.equal(7);
    expect(items[4].quality).to.equal(50);
    expect(items[5].quality).to.equal(50);
  });
});
