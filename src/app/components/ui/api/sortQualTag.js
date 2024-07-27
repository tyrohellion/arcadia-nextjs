const qualCodes = {
  "true": "True",
  "false": "False",
};

function qualFilter(code) {
  return qualCodes[code] || null;
}

export default qualFilter;
export { qualFilter, qualCodes };
