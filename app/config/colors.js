exports.custom = {
  ninja: "#6A727B",
  dinosaur: "#1ABC9C",
  lumberjack: "#53987B",
  bluejeans: "#588DC0",
  royalty: "#6363B7",
  bacon: "#D2808D",
  lava: "#E88125",
  hunter: "#C2544E",
  pirate: "#76C5C6",
  blacksmith: "#607D8B",
}

exports.defaults = {
  primary: exports.custom.royalty,
  white: "#FEFEFE",
  grey: "#F4F7FA",
  text: "#95A5A6",
}

exports.all = Object.assign({}, exports.custom, exports.defaults)
