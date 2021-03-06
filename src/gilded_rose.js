class Item {
  constructor(name, sellIn, quality, conjured = false) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.conjured = conjured;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  increaseQuality(idx) {
    const quality = this.items[idx].quality;
    if (quality < 50) this.items[idx].quality = quality + 1;
  }

  decreaseQuality(idx) {
    const quality = this.items[idx].quality;
    if (quality > 0) {
      let decrease = 1;
      const conjured = this.items[idx].conjured;
      if (conjured) decrease = 2;
      this.items[idx].quality = quality - decrease;
    }
  }

  backstagePassQualityIncrease(idx) {
    if (this.items[idx].sellIn < 11) {
      this.increaseQuality(idx);
    }
    if (this.items[idx].sellIn < 6) {
      this.increaseQuality(idx);
    }
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      switch (this.items[i].name) {
        case "Aged Brie":
          this.items[i].sellIn -= 1;  
          this.increaseQuality(i);
          if (this.items[i].sellIn < 0) this.increaseQuality(i);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.backstagePassQualityIncrease(i);
          this.items[i].sellIn -= 1;
          this.increaseQuality(i);
          if (this.items[i].sellIn < 0) this.items[i].quality = 0;
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        default:
          this.items[i].sellIn -= 1;
          if (this.items[i].sellIn < 0) this.decreaseQuality(i);
          this.decreaseQuality(i);
          break;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
