class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
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
    if (quality > 0) this.items[idx].quality = quality - 1;
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
      if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
        this.backstagePassQualityIncrease(i);
      }
      if (this.items[i].name != "Aged Brie" && this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
        if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
          this.decreaseQuality(i);
        }
      } else {
        this.increaseQuality(i);
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn -= 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name === "Aged Brie") this.increaseQuality(i);

        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
              this.decreaseQuality(i);
            }
          } else {
            this.items[i].quality = 0;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
