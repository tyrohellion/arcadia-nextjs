const modeCodes = {
  3: "3v3",
  2: "2v2",
  1: "1v1",
};

function modeFilterFormatter(code) {
  return modeCodes[code] || null;
}

export default modeFilterFormatter;
export { modeFilterFormatter, modeCodes };
