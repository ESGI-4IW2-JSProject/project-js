
function interpolate(obj) {
  const machaine = this.toString();

  const result = machaine.replace(/{{(.*?)}}/g, function(match) {
    const path = match.replace(/[{{}}\s]/g, '');

    return obj.prop_access(path);
  })

  return result;
}

export { interpolate };
